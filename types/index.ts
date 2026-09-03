/**
 * Shared, project-wide TypeScript types.
 *
 * Keep this file focused on structural/domain types used across multiple
 * content files or components. Component-specific prop types should live
 * next to the component instead.
 */

import type { LucideIcon } from "lucide-react";

/** A single link used in the navbar / footer navigation. */
export interface NavLink {
  /** Visible label. */
  label: string;
  /** In-page anchor (e.g. "#services") or a route (e.g. "/privacy"). */
  href: string;
}

/** One of the four core FlowMind AI service offerings. */
export interface Service {
  slug: "ai-agents" | "ai-automations" | "ai-chatbots" | "ai-websites";
  title: string;
  description: string;
  icon: LucideIcon;
  /** Short bullet list of concrete use cases shown on the service card. */
  useCases: string[];
}

/** A "Why FlowMind AI" value-proposition entry. */
export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** One step in the "How It Works" process timeline. */
export interface ProcessStep {
  /** Two-digit display order, e.g. "01". */
  order: string;
  title: string;
  description: string;
}

/**
 * Verification status for a "Selected Work" entry.
 *
 * - "demo": an illustrative concept used to demonstrate FlowMind's
 *   capabilities. Must never be presented as a completed client project.
 * - "comingSoon": a project that exists but has no public link/asset yet.
 * - "verified": a real, client-approved project safe to present as such.
 */
export type ProjectStatus = "demo" | "comingSoon" | "verified";

export interface Project {
  slug: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  status: ProjectStatus;
  /** Only present when status is "verified" and a real URL exists. */
  href?: string;
}

/** A single pricing tier/card. */
export interface PricingTier {
  slug: string;
  title: string;
  description: string;
  /** e.g. "$400" or "Custom Quote". */
  price: string;
  /** e.g. "Starting from" or null when price is a custom quote. */
  priceLabel?: string;
  /** Optional recurring-cost note, e.g. "Up to $200/month depending on usage." */
  recurringNote?: string;
  featured?: boolean;
  ctaLabel: string;
}
