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
 * A "Selected Work" entry.
 *
 * These are real, client-provided projects (client-supplied source of
 * truth as of the September 2026 portfolio update) — not illustrative
 * concepts. Keep this data honest: no field here should imply metrics,
 * clients, or results beyond what was actually supplied.
 */
export interface Project {
  slug: string;
  title: string;
  /** Primary category/type shown as the card's badge, e.g. "AI Agent". */
  category: string;
  /** Concise "website description" shown as the card's main copy. */
  description: string;
  /** Longer problem statement — retained for a future project-detail view, not necessarily rendered on the homepage card. */
  problem: string;
  /**
   * Full feature list. The card renders only the first few (see
   * `ProjectCard`'s `MAX_CARD_FEATURES`) — the rest is kept here for a
   * future project-detail page rather than duplicated elsewhere.
   */
  features: string[];
  /**
   * Full technology-stack list. The card renders only the first few (see
   * `ProjectCard`'s `MAX_CARD_TECHNOLOGIES`).
   */
  technologies: string[];
  /** Public GitHub repository URL, if one is confirmed reachable. */
  githubUrl?: string;
  /**
   * Whether `githubUrl` has been confirmed reachable and is safe to link
   * publicly. When `false`, the card renders a disabled CTA instead of a
   * dead/unconfirmed link — never silently substitute a guessed URL.
   */
  repositoryAvailable: boolean;
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
