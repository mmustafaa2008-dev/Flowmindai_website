import type { PricingTier } from "@/types";

/**
 * Pricing tiers shown in the "Start With the Right AI Solution" section.
 * Figures are sourced from the approved Stitch export / client blueprint
 * and must stay in sync with the sales sheet. Uses "starting from"
 * language deliberately — these are not fixed, all-inclusive prices.
 */
export const pricingTiers: PricingTier[] = [
  {
    slug: "ai-website",
    title: "AI Website",
    priceLabel: "Starting from",
    price: "$400",
    description:
      "High-converting landing pages built with AI-optimized copy and structure. + applicable ongoing/maintenance fees.",
    ctaLabel: "Get Started",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot",
    priceLabel: "Starting from",
    price: "$500",
    description: "Intelligent text-based assistants trained on your specific business data.",
    recurringNote: "Up to $200/month depending on usage, integrations and support.",
    ctaLabel: "Get Started",
  },
  {
    slug: "ai-agent",
    title: "AI Agent",
    priceLabel: "Starting from",
    price: "$1,000",
    description: "Human-like conversational voice agents that handle inbound/outbound calls 24/7.",
    recurringNote: "Up to $300/month depending on usage, platform and support.",
    featured: true,
    ctaLabel: "Get Started",
  },
  {
    slug: "custom-ai-automation",
    title: "Custom AI Automation",
    price: "Custom Quote",
    description: "Complex, multi-step workflows connecting various apps and databases.",
    ctaLabel: "Contact Us",
  },
];

/**
 * Disclaimer shown beneath the pricing grid. Third-party platform/usage
 * costs are the client's responsibility and are explicitly not included.
 */
export const pricingDisclaimer =
  "*Note: Subscription/usage fees for third-party tools (e.g., Vapi, Bland AI, Zapier, Make, Synthflow, OpenAI, Twilio, Calendly, domain registration/hosting) are the responsibility of the client and are not included in these prices.";
