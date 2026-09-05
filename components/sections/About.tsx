import { AboutVisual } from "@/components/sections/AboutVisual";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";

/**
 * "About FlowMind AI" — honest, early-stage framing.
 *
 * Server Component. Copy is the approved Stitch eyebrow/H2/body/mission
 * quote, reproduced verbatim — deliberately describes FlowMind AI as "an
 * emerging AI solutions agency" and makes no claims about team size,
 * years in business, client count, or results. Do not add any of those
 * without explicit client-approved material.
 *
 * The right-hand visual is `AboutVisual` — a lightweight, on-brand FM-mark
 * "hub + capability cards" composition (see that component) — replacing
 * an earlier decorative abstract-rectangle placeholder the client asked
 * to remove.
 *
 * No top padding: Pricing above already ends with generous bottom
 * padding, so adding a full section-gap here would recreate the
 * "excessive blank gap" problem addressed in Phase 7 (see `Projects`).
 */
export function About() {
  return (
    <section id="about" className="relative pb-16 md:pb-20 lg:pb-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="flex flex-col gap-6">
            <span className="font-heading text-label-md text-primary block font-medium tracking-wider uppercase">
              About FlowMind AI
            </span>
            <h2 className="font-heading text-headline-lg-mobile sm:text-headline-lg lg:text-display-lg text-foreground">
              Practical AI. Real Business Impact.
            </h2>
            <p className="font-body text-body-lg text-text-secondary">
              FlowMind AI is an emerging AI solutions agency focused on building practical systems
              that help businesses automate repetitive processes, improve customer interactions and
              create more efficient operations.
            </p>
            <GlassCard className="border-secondary/40 border-l-4 p-6">
              <p className="font-body text-body-md text-foreground font-semibold italic">
                &ldquo;Our mission is to make powerful AI solutions practical and accessible for
                growing businesses.&rdquo;
              </p>
            </GlassCard>
          </div>
        </FadeIn>

        <FadeIn>
          <AboutVisual />
        </FadeIn>
      </Container>
    </section>
  );
}
