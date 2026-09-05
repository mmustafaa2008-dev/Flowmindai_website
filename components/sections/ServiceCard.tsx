import { CheckCircle2 } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  /**
   * Alternates the accent tint between the two brand colors for visual
   * rhythm across the grid — purely presentational, matching the
   * alternating primary/secondary icon coloring in the approved Stitch
   * "What We Build" cards. Does not affect the centralized content.
   */
  tone: "primary" | "secondary";
}

/**
 * A single service card in the "What We Build" grid.
 *
 * Reproduces the approved Stitch card: an icon in a radial-flare box that
 * reveals on hover, title, description, and a short use-case list. Stitch's
 * card also had a "Learn More" link/button, but it had no valid
 * destination (no service detail pages exist yet) — per Phase 5
 * instructions, that dead affordance is intentionally omitted rather than
 * reproduced as a non-functional href="#".
 */
export function ServiceCard({ service, tone }: ServiceCardProps) {
  const Icon = service.icon;
  const accentClass = tone === "primary" ? "text-primary" : "text-secondary";

  return (
    <GlassCard hover className="group flex flex-col gap-6 p-8">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <RadialFlare className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Icon aria-hidden="true" className={cn("relative z-10 h-9 w-9", accentClass)} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-headline-md text-foreground">{service.title}</h3>
        <p className="font-body text-body-md text-text-secondary">{service.description}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {service.useCases.map((useCase) => (
          <li key={useCase} className="text-text-secondary flex items-center gap-2 text-sm">
            <CheckCircle2 aria-hidden="true" className={cn("h-4 w-4 shrink-0", accentClass)} />
            {useCase}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
