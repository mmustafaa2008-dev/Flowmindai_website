import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content/services";

/**
 * "What We Build" — the four core service offerings.
 *
 * Server Component. Content comes entirely from the centralized
 * `services` array (`lib/content/services.ts`) — nothing is duplicated
 * or hardcoded here.
 *
 * Spacing: intentionally has no top padding of its own. The Hero already
 * ends with generous bottom padding, so stacking a full section-gap on
 * top of that would create the "excessive blank gap" the client
 * explicitly asked to avoid. Services keeps its own bottom padding to
 * separate it from "Why FlowMind" below.
 */
export function Services() {
  return (
    <section id="services" className="relative pb-16 md:pb-20 lg:pb-24">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <SectionHeading
            eyebrow="What We Build"
            title="Purpose-Built AI Solutions"
            description="Purpose-built AI solutions tailored to streamline your specific business needs."
          />
        </FadeIn>

        <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={service.slug}>
              <ServiceCard service={service} tone={index % 2 === 0 ? "primary" : "secondary"} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
