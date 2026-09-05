import { Bot, CalendarCheck, Database, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";
import { cn } from "@/lib/utils";

interface FlowStep {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Restrained highlight tone for the "AI-active" steps. Neutral by default. */
  tone?: "primary" | "secondary";
}

/**
 * Content reproduced from the approved Stitch hero's "Lead Qualification
 * Flow" workflow card, with one client-requested copy fix ("Appt Booked"
 * → "Appointment Booked", Phase 5). This is a generic, illustrative
 * example of how a FlowMind AI agent slots into a business's existing
 * process — not a real client deployment, result, or metric.
 */
const flowSteps: FlowStep[] = [
  { icon: User, title: "New Inquiry", description: "User visits website" },
  {
    icon: Bot,
    title: "AI Agent Engages",
    description: "Qualifies instantly",
    tone: "primary",
  },
  { icon: Database, title: "CRM Sync", description: "Data captured" },
  {
    icon: CalendarCheck,
    title: "Appointment Booked",
    description: "Calendar updated",
    tone: "secondary",
  },
];

const toneStyles: Record<"primary" | "secondary", { icon: string; card: string; title: string }> = {
  primary: {
    icon: "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_rgb(175_198_255_/_0.3)]",
    card: "border-primary/30",
    title: "text-primary",
  },
  secondary: {
    icon: "bg-secondary/20 border-secondary/50 text-secondary",
    card: "border-secondary/30",
    title: "text-secondary",
  },
};

/**
 * Decorative "AI workflow" panel shown beside (desktop) or below (mobile)
 * the hero's messaging column. Reproduces the approved Stitch composition
 * with real components (GlassCard, RadialFlare) and Lucide icons instead
 * of a screenshot of the Stitch interface.
 */
export function HeroWorkflowVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <RadialFlare className="scale-150 rounded-full opacity-60" />
      <GlassCard className="relative z-10 flex flex-col gap-6 p-6 sm:p-8">
        <div className="border-border flex items-center justify-between border-b pb-4">
          <span className="font-heading text-label-md text-foreground">
            Lead Qualification Flow
          </span>
          <div aria-hidden="true" className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="bg-secondary h-3 w-3 rounded-full" />
            <div className="bg-primary h-3 w-3 rounded-full" />
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          {/* Connecting line running through the icon column. */}
          <div aria-hidden="true" className="bg-border absolute top-6 bottom-6 left-6 z-0 w-0.5" />

          {flowSteps.map((step) => {
            const tone = step.tone ? toneStyles[step.tone] : null;
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative z-10 flex items-start gap-4">
                <div
                  className={cn(
                    "border-border flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
                    tone ? tone.icon : "bg-surface-elevated text-text-secondary",
                  )}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <GlassCard className={cn("flex-1 p-4", tone?.card)}>
                  <p
                    className={cn(
                      "font-heading text-label-md mb-1",
                      tone ? tone.title : "text-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-text-secondary text-xs">{step.description}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
