import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content/process";
import { cn } from "@/lib/utils";

/**
 * "How It Works" — the five-step process (Discover → Design → Build →
 * Launch → Optimize).
 *
 * Server Component. Content comes entirely from `processSteps`
 * (`lib/content/process.ts`) — no duplicated array here.
 *
 * Layout reproduces the approved Stitch composition: a horizontal
 * connecting line running behind the numbered circles on large screens
 * only (`hidden lg:block`), with the grid collapsing to 3 columns on
 * tablet and a single stacked column on mobile — never a squeezed
 * horizontal row of five on phones. The numbering itself (01–05) already
 * communicates the progression at every breakpoint, exactly as in the
 * approved reference (which has no separate mobile connector either).
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Process"
            title="From Business Problem to Intelligent Solution"
          />
        </FadeIn>

        <FadeIn>
          <div className="relative">
            {/* Desktop-only connecting line behind the step circles. */}
            <div
              aria-hidden="true"
              className="via-secondary/30 absolute top-8 right-0 left-0 z-0 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent lg:block"
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
              {processSteps.map((step, index) => {
                const isPrimaryTone = index % 2 === 0;

                return (
                  <div
                    key={step.order}
                    className="group flex flex-col items-center gap-4 text-center"
                  >
                    <div
                      className={cn(
                        "font-heading text-headline-md text-foreground bg-surface-elevated flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/10 transition-colors",
                        isPrimaryTone
                          ? "group-hover:border-primary"
                          : "group-hover:border-secondary",
                      )}
                    >
                      {step.order}
                    </div>
                    <h3 className="font-heading text-label-md text-foreground">{step.title}</h3>
                    <p className="font-body text-body-md text-text-secondary">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
