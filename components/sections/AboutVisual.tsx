import { Gauge, MessageCircle, TrendingUp, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";

interface Capability {
  icon: LucideIcon;
  label: string;
}

/**
 * Capability labels supporting the About section's "Practical AI. Real
 * Business Impact." message. Deliberately generic/aspirational
 * positioning statements (not metrics/claims) — safe without client
 * verification, consistent with the rest of the site's honest framing.
 */
const capabilities: Capability[] = [
  { icon: Workflow, label: "Automate Operations" },
  { icon: MessageCircle, label: "Enhance Customer Experience" },
  { icon: Gauge, label: "Increase Efficiency" },
  { icon: TrendingUp, label: "Drive Growth" },
];

/**
 * "About FlowMind AI" right-hand visual.
 *
 * Replaces the earlier abstract empty-rectangle placeholder with a real,
 * on-brand composition: the FM mark as a central "hub" with a short
 * supporting label, connected by a subtle line to a 2x2 grid of
 * capability cards. Built entirely from existing primitives (`GlassCard`,
 * `RadialFlare`, Lucide icons, the same derived FM mark already used in
 * the Navbar/Footer) — no new image assets, no stock photography, no
 * animation loop, so it stays lightweight and consistent with the Hero's
 * `HeroWorkflowVisual` treatment.
 */
export function AboutVisual() {
  return (
    <GlassCard className="relative flex w-full flex-col items-center gap-8 overflow-hidden p-8 md:p-10">
      <RadialFlare className="opacity-50" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="border-primary/40 bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full border shadow-[0_0_30px_rgb(82_141_255_/_0.35)]">
          <Image
            src="/assets/brand/flowmind-ai-navbar.png"
            alt=""
            width={445}
            height={315}
            className="h-10 w-auto"
          />
        </div>
        <span className="font-heading text-label-md text-text-secondary tracking-wider uppercase">
          Smarter Businesses with AI
        </span>
      </div>

      <div aria-hidden="true" className="bg-border relative z-10 h-8 w-px" />

      <div className="relative z-10 grid w-full max-w-sm grid-cols-2 gap-3 sm:gap-4">
        {capabilities.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="border-border bg-surface/40 flex items-center gap-3 rounded-lg border p-3 backdrop-blur-sm"
          >
            <div className="border-border bg-surface-elevated text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
              <Icon aria-hidden="true" className="h-4 w-4" />
            </div>
            <span className="font-body text-text-secondary text-xs leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
