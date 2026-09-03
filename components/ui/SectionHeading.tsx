import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label shown above the heading, e.g. "Why FlowMind". */
  eyebrow?: string;
  title: string;
  /** Optional supporting paragraph shown below the heading. */
  description?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Reusable "eyebrow + heading + optional supporting copy" pattern repeated
 * across every homepage section in the approved Stitch design (What We
 * Build, Why FlowMind, Our Process, Selected Work, Pricing, About, etc.).
 *
 * This is a primitive only — it does not render any section content.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={cn("flex flex-col gap-4", isCentered && "items-center text-center", className)}>
      {eyebrow ? (
        <span className="font-heading text-label-md text-primary block font-medium tracking-wider uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-heading text-headline-lg-mobile sm:text-headline-lg lg:text-display-lg text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "font-body text-body-lg text-text-secondary",
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
