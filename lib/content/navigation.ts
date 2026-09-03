import type { NavLink } from "@/types";

/**
 * Primary navbar links.
 *
 * These map 1:1 to real homepage section ids that will exist once the
 * sections are built (Phase 6). There is intentionally no "Solutions" link:
 * the original Stitch export linked to a "#solutions" anchor that has no
 * corresponding section, which would be a broken link in production.
 */
export const primaryNavLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

/** Footer link groups, kept separate from the primary nav for layout purposes. */
export const footerLinkGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "AI Agents", href: "#services" },
      { label: "AI Automations", href: "#services" },
      { label: "AI Chatbots", href: "#services" },
      { label: "AI Websites", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
