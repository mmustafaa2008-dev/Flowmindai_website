/**
 * Centralized site configuration.
 *
 * This is the single source of truth for FlowMind AI's business identity,
 * contact details, and derived contact links (mailto / tel / WhatsApp /
 * LinkedIn). Components and metadata must read from here instead of
 * hardcoding emails, phone numbers, or social links directly in JSX.
 *
 * Confirmed values only — do not add unverified information here.
 */

/**
 * Public base URL of the site, used for canonical links, sitemap entries
 * and Open Graph metadata.
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL` — explicit override (set this once a custom
 *    domain is connected, or to pin a specific Vercel URL).
 * 2. `VERCEL_URL` — automatically provided by Vercel at build/runtime for
 *    the current deployment (preview or production), so the free
 *    `*.vercel.app` domain works out of the box with no hardcoded guess.
 * 3. `http://localhost:3000` — local development fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "FlowMind AI",
  tagline: "Automate. Optimize. Grow.",
  description:
    "FlowMind AI builds AI agents, chatbots, websites and custom automations that help businesses reduce repetitive work, respond faster and capture more opportunities.",
  url: resolveSiteUrl(),

  /** Confirmed business contact details — do not alter without client sign-off. */
  contact: {
    email: "flowmindai09@gmail.com",
    /** E.164 format, used to derive tel:// and WhatsApp links. */
    phone: "+18132142199",
    phoneDisplay: "+1 813 214 2199",
    linkedinUrl: "https://linkedin.com/in/flowmind-ai-a02070428",
    linkedinDisplay: "linkedin.com/in/flowmind-ai-a02070428",
  },

  /** Primary conversion action, used consistently across all CTA buttons. */
  primaryCta: {
    label: "Book a Free Consultation",
    /** In-page anchor to the single contact/consultation form. No calendar/booking flow exists. */
    href: "#contact",
  },

  /** Core service offerings, referenced by slug from lib/content/services.ts. */
  coreServices: ["AI Agents", "AI Automations", "AI Chatbots", "AI Websites"] as const,

  /**
   * Live AI Agent demo status. No confirmed demo phone number exists yet.
   * Update this in one place once a real number is confirmed — never
   * fabricate one, and never reuse the business phone number for it.
   */
  liveDemo: {
    available: false,
    statusLabel: "Demo Number Coming Soon",
    phone: null as string | null,
  },
} as const;

/** mailto: link for the confirmed contact email. */
export const mailtoHref = `mailto:${siteConfig.contact.email}`;

/** tel: link for the confirmed business phone number. */
export const telHref = `tel:${siteConfig.contact.phone}`;

/** wa.me WhatsApp link for the confirmed business phone number. */
export const whatsappHref = `https://wa.me/${siteConfig.contact.phone.replace("+", "")}`;
