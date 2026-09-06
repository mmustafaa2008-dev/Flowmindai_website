import { Container } from "@/components/layout/Container";
import { PricingCard } from "@/components/sections/PricingCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingDisclaimer, pricingTiers } from "@/lib/content/pricing";

/**
 * "Flexible Solutions" — the four confirmed pricing tiers.
 *
 * Server Component. Every figure comes from `pricingTiers`
 * (`lib/content/pricing.ts`) — nothing here is rewritten or
 * reformatted into a different price. The third-party cost disclaimer
 * is rendered verbatim from the same centralized source.
 *
 * No top padding: relies on Projects' bottom padding above it, matching
 * the spacing approach already used between the other plain-background
 * sections (Hero→Services, Services→Why FlowMind).
 */
export function Pricing() {
  return (
    <section id="pricing" className="relative pb-16 md:pb-20 lg:pb-24">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <SectionHeading eyebrow="Flexible Solutions" title="Start With the Right Solution" />
        </FadeIn>

        <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <FadeIn key={tier.slug}>
              <PricingCard tier={tier} />
            </FadeIn>
          ))}
        </div>

        <p className="text-text-secondary mx-auto max-w-2xl text-center text-xs">
          {pricingDisclaimer}
        </p>
      </Container>
    </section>
  );
}
