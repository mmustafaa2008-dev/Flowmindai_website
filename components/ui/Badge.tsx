import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

/**
 * Small pill-shaped tag used for standalone labels such as the hero's
 * "Next-Gen AI Agency" badge — distinct from `SectionHeading`'s plain-text
 * eyebrow label, which has no border/background.
 */
export function Badge({ icon: Icon, children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "border-primary/30 bg-primary/10 inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md",
        className,
      )}
    >
      {Icon ? <Icon aria-hidden="true" className="text-primary h-4 w-4" /> : null}
      <span className="font-heading text-label-md text-primary tracking-wider uppercase">
        {children}
      </span>
    </div>
  );
}
