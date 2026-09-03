import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  /** Rendered element/tag. Defaults to "div". */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Shared horizontal layout container used by every homepage section.
 *
 * Centers content, caps it at the approved 1280px max width, and applies
 * the approved responsive horizontal padding (20px mobile / 64px desktop).
 * Sections should use this instead of inventing their own max-width.
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "max-w-content px-margin-mobile md:px-margin-desktop mx-auto w-full",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
