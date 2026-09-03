"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

/**
 * Thin wrapper that applies the shared `fadeInUp` entrance animation and
 * automatically disables it for users with `prefers-reduced-motion`
 * enabled, so future sections don't need to re-implement that check.
 */
export function FadeIn({ children, className }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={prefersReducedMotion ? undefined : fadeInUp}
    >
      {children}
    </motion.div>
  );
}
