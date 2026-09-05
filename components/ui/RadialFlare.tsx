import { cn } from "@/lib/utils";

interface RadialFlareProps {
  className?: string;
}

/**
 * Ambient blue radial glow used sparingly behind hero visuals and other
 * feature panels in the approved Stitch design. Purely decorative —
 * always non-interactive and hidden from assistive tech.
 *
 * Usage: place inside a `relative overflow-hidden` parent and size/position
 * it with `className` (the default is `absolute inset-0`, matching most
 * Stitch usages). Tone it down or hide it on small screens via className
 * (e.g. `opacity-40 sm:opacity-100`) if it competes with foreground content.
 */
export function RadialFlare({ className }: RadialFlareProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgb(82_141_255_/_0.2)_0%,transparent_70%)]",
        className,
      )}
    />
  );
}
