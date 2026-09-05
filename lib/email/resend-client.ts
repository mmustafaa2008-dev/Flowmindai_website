import "server-only";

import { Resend } from "resend";

/**
 * Thrown when required Resend server configuration is missing. Caught by
 * the API route and turned into a safe, generic 503 response — never a
 * raw stack trace or provider detail sent to the browser.
 */
export class MissingResendConfigError extends Error {
  constructor(missingVar: string) {
    super(`${missingVar} is not configured.`);
    this.name = "MissingResendConfigError";
  }
}

let cachedClient: Resend | null = null;

/**
 * Lazily creates (and caches) the Resend client.
 *
 * Deliberately NOT instantiated at module load time / build time — it is
 * only ever called from inside the `/api/contact` request handler. This
 * means `next build` succeeds even when `RESEND_API_KEY` is absent from
 * the environment (e.g. CI, a fresh clone before secrets are configured);
 * only a real POST request without the key configured fails, and it does
 * so with a controlled, safe error rather than a build-time crash.
 *
 * Server-only: importing this file from a Client Component is a build
 * error (enforced by the `server-only` package), which is the guardrail
 * against ever initializing Resend or touching `RESEND_API_KEY` in the
 * browser bundle.
 */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new MissingResendConfigError("RESEND_API_KEY");
  }

  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }

  return cachedClient;
}

/** The verified/permitted sender address. Never assume a default. */
export function getResendFromEmail(): string {
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new MissingResendConfigError("RESEND_FROM_EMAIL");
  }

  return fromEmail;
}
