import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

/** Renders as a real `<button>` when no `href` is passed (e.g. form submit). */
type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

/** Renders as a link when `href` is passed — never a `<button>` nested in an `<a>`. */
type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md",
  "font-heading text-label-md font-medium",
  "transition-[color,background-color,border-color,box-shadow,transform] duration-300",
  "disabled:pointer-events-none disabled:opacity-50",
);

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-8 py-4",
  sm: "px-6 py-3",
};

const variantStyles: Record<ButtonVariant, string> = {
  // Approved gradient direction + hover glow, reproduced from Stitch's
  // .btn-primary (linear-gradient(135deg, #528dff, #00f1fd)).
  primary: cn(
    "bg-gradient-to-br from-accent to-secondary text-white",
    "hover:shadow-glow-primary-strong hover:-translate-y-0.5",
  ),
  secondary: cn(
    "border border-border-strong bg-transparent text-foreground",
    "hover:bg-white/5 hover:border-[rgb(255_255_255_/_0.3)]",
  ),
  ghost: "bg-transparent text-secondary hover:bg-secondary/10",
};

/**
 * Foundational button used for every CTA/action in the approved design.
 * Renders a real `<a>` (or Next.js `<Link>` for internal routes) when
 * `href` is provided, and a real `<button>` otherwise — never nests one
 * inside the other.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    const isInternalRoute = href.startsWith("/");

    if (isInternalRoute) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    // In-page anchors (#contact), mailto:, tel:, and external URLs are
    // plain anchors — native browser/CSS anchor scrolling is sufficient
    // (see the global scroll-behavior + scroll-margin-top in globals.css).
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as Omit<ButtonAsButton, keyof ButtonOwnProps | "href">;

  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
