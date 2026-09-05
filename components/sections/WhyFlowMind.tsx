import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits } from "@/lib/content/benefits";
import { cn } from "@/lib/utils";

/**
 * Alternating accent tint per card, matching the approved Stitch "Why
 * FlowMind" grid (business_center/trending_up in cyan, the two middle
 * cards in blue). Purely presentational — the content itself stays in
 * `lib/content/benefits.ts`.
 */
const cardTone: Array<"primary" | "secondary"> = ["secondary", "primary", "primary", "secondary"];

/**
 * "Why FlowMind" — the four confirmed value propositions.
 *
 * Server Component. Content comes entirely from the centralized
 * `benefits` array (`lib/content/benefits.ts`).
 *
 * The subtle `bg-surface-elevated/30` band (matching Stitch's
 * `bg-surface-container/30`) visually separates this section from
 * Services above it without needing a large empty gap — the color
 * change itself signals a new section has started.
 */
export function WhyFlowMind() {
  return (
    <section className="bg-surface-elevated/30 pb-section-gap-mobile lg:pb-section-gap relative pt-16 md:pt-20 lg:pt-24">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Why FlowMind"
            title="AI That Works for Your Business"
            description="We focus on practical AI systems built around real business challenges, not technology for the sake of technology."
          />
        </FadeIn>

        <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const tone = cardTone[index % cardTone.length];

            return (
              <FadeIn key={benefit.title}>
                <GlassCard className="flex items-start gap-4 p-8">
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "h-8 w-8 shrink-0",
                      tone === "primary" ? "text-primary" : "text-secondary",
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-headline-md text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-body-md text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
