import { NextResponse } from "next/server";

import { buildContactEmail } from "@/lib/email/contact-email";
import { isDuplicateSubmission } from "@/lib/email/duplicate-guard";
import {
  getResendClient,
  getResendFromEmail,
  MissingResendConfigError,
} from "@/lib/email/resend-client";
import { siteConfig } from "@/lib/content/site";
import { contactApiRequestSchema } from "@/lib/validation/contact";

/**
 * POST /api/contact
 *
 * Server Route Handler behind the Contact form. Validates the request
 * server-side with the exact same Zod schema the client uses (client
 * validation is never trusted alone), then sends a notification email to
 * FlowMind AI via Resend.
 *
 * Response shape is always `{ ok: boolean, error?: string, fieldErrors?
 * Record<string, string[]> }` — never a stack trace, provider error
 * object, or any other internal detail.
 */

// A short contact inquiry never needs to be anywhere near this large.
// Combined with the per-field max() limits in the shared schema, this
// bounds both the transport-level and the validated-content size without
// any streaming/byte-counting middleware.
const MAX_BODY_BYTES = 20_000;

function safeErrorResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return safeErrorResponse("Unsupported content type. Expected application/json.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return safeErrorResponse("Request body is too large.", 413);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return safeErrorResponse("Malformed JSON body.", 400);
  }

  const parsed = contactApiRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please correct the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { honeypot, ...fields } = parsed.data;

  // Honeypot: a real visitor never sees or fills this hidden field. If it
  // has a value, this is almost certainly a bot. Report success without
  // actually sending anything, so the bot gets no signal it was caught —
  // legitimate users are never affected because they never see this field.
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const duplicateKey = `${clientIp}:${fields.email.toLowerCase()}`;
  if (isDuplicateSubmission(duplicateKey)) {
    return safeErrorResponse(
      "We just received this inquiry. Please wait a moment before resubmitting.",
      429,
    );
  }

  let resend: ReturnType<typeof getResendClient>;
  let fromEmail: string;
  try {
    resend = getResendClient();
    fromEmail = getResendFromEmail();
  } catch (error) {
    if (error instanceof MissingResendConfigError) {
      // Never expose which env var / provider detail is missing to the
      // browser — only log it server-side for the developer/operator.
      console.error("[api/contact] Email delivery is not configured:", error.message);
      return safeErrorResponse(
        "Email delivery isn't configured yet. Please contact us directly for now.",
        503,
      );
    }
    throw error;
  }

  const { subject, text, html } = buildContactEmail(fields);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: siteConfig.contact.email,
      replyTo: fields.email,
      subject,
      text,
      html,
    });

    if (error) {
      // Log only the provider's error code/message for diagnosis — never
      // the inquiry content, and never surfaced to the browser.
      console.error("[api/contact] Resend rejected the email:", error.name, error.message);
      return safeErrorResponse(
        "We couldn't send your inquiry right now. Please try again shortly.",
        502,
      );
    }
  } catch (error) {
    console.error("[api/contact] Unexpected error while sending email:", error);
    return safeErrorResponse(
      "We couldn't send your inquiry right now. Please try again shortly.",
      500,
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
