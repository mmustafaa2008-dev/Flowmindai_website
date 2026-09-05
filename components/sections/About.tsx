import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";

/**
 * "About FlowMind AI" — honest, early-stage framing.
 *
 * Server Component. Copy is the approved Stitch eyebrow/H2/body/mission
 * quote, reproduced verbatim — deliberately describes FlowMind AI as "an
 * emerging AI solutions agency" and makes no claims about team size,
 * years in business, client count, or results. Do not add any of those
 * without explicit client-approved material.
 *
 * The right-hand visual reproduces Stitch's decorative "abstract tech
 * visual" grid rather than the full square brand sheet
 * (`flowmind-ai-logo.png`): that asset bakes in a solid-black background
 * and a secondary tagline/feature-icon row ("AI Voice Agents", "Lead
 * Generation", "Cost Reduction", ...) that doesn't match the confirmed
 * core-services taxonomy used everywhere else on the site, so dropping it
 * in here would both create a visible background seam and contradict
 * copy elsewhere. Per this phase's own guidance ("if it looks worse than
 * live text/brand styling, do not force it"), this uses live CSS instead.
 * The Navbar/Footer already carry the brand mark via the derived FM icon.
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
          <GlassCard className="relative flex h-80 w-full items-center justify-center overflow-hidden md:h-96">
            <RadialFlare className="opacity-60" />
            <div
              aria-hidden="true"
              className="relative z-10 grid h-full w-full grid-cols-3 gap-4 p-8 opacity-70"
            >
              <div className="border-border bg-surface/30 rounded-lg border" />
              <div className="border-primary/20 bg-primary/10 row-span-2 rounded-lg border" />
              <div className="border-border bg-surface/30 rounded-lg border" />
              <div className="border-secondary/20 bg-secondary/10 rounded-lg border" />
              <div className="border-border bg-surface/30 col-span-2 rounded-lg border" />
            </div>
          </GlassCard>
        </FadeIn>
      </Container>
    </section>
  );
}
