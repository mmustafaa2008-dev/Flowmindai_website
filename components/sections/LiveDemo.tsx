import { CheckCircle2, Mic, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liveDemoCapabilities } from "@/lib/content/live-demo";
import { siteConfig } from "@/lib/content/site";

/**
 * "Live AI Agent Demo" — the destination of the Hero's "See Live AI Agent
 * Demo" CTA (`#live-demo`).
 *
 * Server Component. Demonstrates the Dental AI Receptionist concept
 * confirmed by the client blueprint — explicitly a demonstration of the
 * TYPE of agent FlowMind AI can build, never a real client deployment.
 * No demo phone number exists yet (`siteConfig.liveDemo`), so the call
 * control is a real disabled `<button>` rather than a fake/dead link.
 */
export function LiveDemo() {
  return (
    <section
      id="live-demo"
      className="border-border bg-surface-elevated/50 relative overflow-hidden border-y py-16 md:py-20 lg:py-24"
    >
      <RadialFlare className="opacity-50" />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="Experience AI In Action"
              title="Talk to an AI Agent Yourself."
              description="Try our live demo of a Dental AI Receptionist. Experience how naturally it converses, qualifies leads, and handles complex queries in real-time."
            />

            <ul className="flex flex-col gap-4">
              {liveDemoCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="text-secondary mt-1 h-5 w-5 shrink-0"
                  />
                  <span className="font-body text-body-md text-text-secondary">{capability}</span>
                </li>
              ))}
            </ul>

            <p className="text-text-muted text-xs italic">
              This is a demonstration of the type of AI agent FlowMind AI can build — not a real
              dental practice or a completed client project. Once a live number is available,
              calling it will indicate your consent to be recorded so the AI agent can function
              properly.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <GlassCard className="border-secondary/20 relative flex flex-col items-center overflow-hidden p-8 text-center md:p-12">
            <div
              aria-hidden="true"
              className="from-secondary/10 absolute inset-0 bg-gradient-to-br to-transparent"
            />

            <div
              aria-hidden="true"
              className="bg-secondary/20 relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-[0_0_30px_rgb(0_241_253_/_0.3)]"
            >
              <Mic className="text-secondary h-10 w-10" />
            </div>

            <h3 className="font-heading text-headline-md text-foreground relative z-10 mt-6">
              Dental Receptionist Demo
            </h3>
            <p className="text-text-secondary relative z-10 mt-2">
              Available 24/7. Try asking to book a cleaning or inquire about business hours.
            </p>

            <button
              type="button"
              disabled
              className="border-border bg-surface-elevated text-text-secondary font-heading text-label-md relative z-10 mt-8 flex w-full max-w-sm items-center justify-center gap-3 rounded-full border px-8 py-4 disabled:cursor-not-allowed disabled:opacity-100"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {siteConfig.liveDemo.statusLabel}
            </button>
          </GlassCard>
        </FadeIn>
      </Container>
    </section>
  );
}
