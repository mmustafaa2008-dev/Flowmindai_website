import { z } from "zod";

/**
 * Options for "What do you want to automate?" — limited to the confirmed
 * core services (`siteConfig.coreServices`) plus the two locked catch-all
 * options. Do not add services here that aren't offered.
 */
export const automationInterestOptions = [
  "AI Agents",
  "AI Automations",
  "AI Chatbots",
  "AI Websites",
  "Custom AI Automation",
  "Not Sure Yet",
] as const;

export type AutomationInterest = (typeof automationInterestOptions)[number];

/**
 * Permissive "looks like a website" check used only for the optional
 * Website field. `z.string().url()` would reject the exact placeholder
 * shown in the field ("example.com") because it requires an explicit
 * `http(s)://` scheme — real leads very often type a bare domain, so this
 * accepts an optional scheme instead of forcing users to add one.
 */
const websitePattern = /^(https?:\/\/)?([\da-z-]+\.)+[a-z]{2,}([/?#]\S*)?$/i;

/**
 * Contact form validation schema — the single source of truth for field
 * rules, shared by the client (`ContactForm`, via `zodResolver`) and the
 * server (`app/api/contact/route.ts`, via `safeParse`). The server never
 * trusts client-side validation alone; it re-runs this exact schema
 * against the raw request body.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Keep your name under 80 characters."),

  company: z
    .string()
    .trim()
    .min(2, "Enter your business or company name.")
    .max(100, "Keep this under 100 characters."),

  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),

  website: z
    .string()
    .trim()
    .max(200, "Keep the website under 200 characters.")
    .optional()
    .refine((value) => !value || websitePattern.test(value), {
      message: "Enter a valid website, e.g. example.com.",
    }),

  automationInterest: z.enum(automationInterestOptions, {
    message: "Choose what you'd like to automate.",
  }),

  message: z
    .string()
    .trim()
    .min(15, "Add a few more details (at least 15 characters).")
    .max(1000, "Keep your message under 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * API request schema — the exact same `contactFormSchema` fields, plus a
 * honeypot field that only exists at the transport layer. It is never
 * shown to real users, never validated as a "real" form field, and never
 * included in `ContactFormValues`/the email content — the API route
 * strips it off immediately after parsing (see `route.ts`).
 */
export const contactApiRequestSchema = contactFormSchema.extend({
  /**
   * Hidden honeypot field. Real visitors never see or fill this in.
   * Deliberately plain `.optional()` (no `.default()`) so the input and
   * output types are identical — otherwise `zodResolver` and RHF's
   * `useForm` generic fall out of sync (input allows `undefined`,
   * output wouldn't).
   */
  honeypot: z.string().max(200).optional(),
});

export type ContactApiRequest = z.infer<typeof contactApiRequestSchema>;
