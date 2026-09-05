import { ArrowRight, Zap } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { HeroWorkflowVisual } from "@/components/sections/HeroWorkflowVisual";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/content/site";

/** Shared gradient treatment for the emphasized headline words. */
function GradientWord({ children }: { children: ReactNode }) {
  return (
    <span className="from-accent to-secondary bg-gradient-to-r bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/**
 * Homepage Hero — locked content, approved Stitch composition.
 *
 * Server Component: the only client-side pieces on the page are inside
 * `FadeIn` (entrance animation) and `Navbar`'s `MobileMenu`. Everything
 * else here is static markup, so it stays server-renderable.
 *
 * Layout: a two-column grid on large screens (messaging left, workflow
 * visual right) that collapses to a single stacked column on mobile in
 * exactly this priority order — badge, headline, supporting copy, service
 * line, primary CTA, secondary CTA, then the supporting visual — because
 * that is simply document order once the grid collapses to one column.
 *
 * Only two CTAs remain: primary "Book a Free Consultation" (→ `#contact`)
 * and secondary "Explore Our Solutions" (→ `#services`).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 lg:pt-20 lg:pb-24">
      <HeroBackground />

      <Container className="lg:gap-gutter relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6 lg:gap-8">
          <FadeIn>
            <Badge icon={Zap}>Next-Gen AI Agency</Badge>
          </FadeIn>

          <FadeIn>
            <h1 className="font-heading text-display-xl text-foreground max-w-2xl">
              AI Solutions That
              <br className="hidden lg:block" /> <GradientWord>Automate</GradientWord>,{" "}
              <GradientWord>Convert</GradientWord> & <GradientWord>Scale</GradientWord> Your
              Business.
            </h1>
          </FadeIn>

          <FadeIn>
            <p className="font-body text-body-lg text-text-secondary max-w-xl">
              We build AI agents, chatbots, websites and custom automations that help businesses
              reduce repetitive work, respond faster and capture more opportunities.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="font-heading text-label-md text-text-muted tracking-wider uppercase">
              {siteConfig.coreServices.join(" • ")}
            </p>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={siteConfig.primaryCta.href} variant="primary">
                {siteConfig.primaryCta.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button href="#services" variant="secondary">
                Explore Our Solutions
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <HeroWorkflowVisual />
        </FadeIn>
      </Container>
    </section>
  );
}
