import "server-only";

import type { ContactFormValues } from "@/lib/validation/contact";

/** Escapes the five HTML-significant characters so user-controlled text
 * can never be interpreted as markup inside the generated email HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strips newlines/control characters and caps length so user input can
 * never smuggle extra header lines into the (single-line) email subject.
 */
function sanitizeForSubject(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 100);
}

interface ContactEmailContent {
  subject: string;
  text: string;
  html: string;
}

/**
 * Builds the internal inquiry-notification email FlowMind AI receives.
 *
 * Takes only server-validated `ContactFormValues` (never raw/unvalidated
 * request input) and produces both a plain-text body (the preferred
 * fallback) and a simple, safely-escaped HTML body — no email-template
 * library, no unescaped user content ever interpolated into the HTML.
 */
export function buildContactEmail(values: ContactFormValues): ContactEmailContent {
  const subject = `New FlowMind AI Inquiry — ${sanitizeForSubject(values.company)}`;

  const fields: Array<[string, string]> = [
    ["Name", values.name],
    ["Business / Company", values.company],
    ["Email", values.email],
    ["Website", values.website?.trim() || "Not provided"],
    ["What they want to automate", values.automationInterest],
  ];

  const text = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message / Requirements:",
    values.message,
  ].join("\n");

  const htmlRows = fields
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:6px 16px 6px 0; font-weight:bold; white-space:nowrap; vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:6px 0;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif; color:#111417; line-height:1.6;">
      <h2 style="margin:0 0 16px;">New FlowMind AI Inquiry</h2>
      <table style="border-collapse:collapse; width:100%; max-width:480px;">${htmlRows}</table>
      <p style="font-weight:bold; margin:20px 0 4px;">Message / Requirements</p>
      <p style="white-space:pre-wrap; margin:0;">${escapeHtml(values.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}
