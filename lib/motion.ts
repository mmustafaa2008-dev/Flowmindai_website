import type { Variants } from "framer-motion";

/**
 * Shared motion principles for later component work:
 * - subtle fade/translate entrance only (no parallax, no looping
 *   decorative animation)
 * - short, restrained durations
 * - always respect `prefers-reduced-motion` (see `FadeIn`, which applies
 *   these variants and automatically disables motion for users who have
 *   requested it)
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};
