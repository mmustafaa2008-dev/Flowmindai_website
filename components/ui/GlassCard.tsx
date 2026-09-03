import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /**
   * Adds the restrained hover treatment (brighter border + soft blue glow)
   * used on interactive cards such as service/project cards. Leave off for
   * purely decorative or non-interactive cards.
   */
  hover?: boolean;
}

/**
 * Foundational glass/translucent card used throughout the approved Stitch
 * design (service cards, project cards, pricing cards, the hero workflow
 * panel, etc.). Exact values reproduced from the Stitch export:
 * background rgba(13,17,23,0.6), 12px backdrop blur, 1px white/10 border,
 * a subtle top inner-highlight, and 24px radius.
 */
export function GlassCard({ as: Tag = "div", className, children, hover = false }: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "bg-glass border-border rounded-xl border shadow-[inset_0_1px_0_rgb(255_255_255_/_0.1)] backdrop-blur-md",
        // Stitch combines a brighter inset highlight + outer glow into a
        // single box-shadow on hover, so both must be declared together
        // (a separate `shadow-glow-primary` utility would just replace,
        // not add to, the resting inset highlight).
        hover &&
          "hover:border-border-strong transition-[border-color,box-shadow] duration-300 hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_0_40px_rgb(82_141_255_/_0.15)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
