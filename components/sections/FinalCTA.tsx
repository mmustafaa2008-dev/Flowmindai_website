import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { RadialFlare } from "@/components/ui/RadialFlare";
import { siteConfig } from "@/lib/content/site";

/**
 * Final conversion banner — approved Stitch copy ("Ready to Automate Your
 * Next Workflow?"), pointing at the Contact section immediately below it.
 *
 * Deviation from Stitch: the Stitch export merges this headline/CTA with
 * the contact form and details into one `id="contact"` section. This
 * phase's spec explicitly lists "Final CTA" and "Contact" as two separate
 * homepage entries, so the composition is split here — this banner has no
 * id of its own (it isn't linked to directly; every CTA site-wide already
 * targets `#contact`), and the contact details/form live in `Contact`
 * right after it. No secondary "Talk to Us" button exists in the
 * reference, so only the single confirmed primary CTA is rendered.
 *
 * No top padding: About above already ends with generous bottom padding
 * (see the spacing rationale in `About`/`Projects`).
 *
 * Server Component — no interactivity here.
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden pb-16 md:pb-20 lg:pb-24">
      <RadialFlare className="opacity-40" />
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <FadeIn>
          <h2 className="font-heading text-headline-lg-mobile sm:text-headline-lg lg:text-display-lg text-foreground">
            Ready to Automate Your Next Workflow?
          </h2>
        </FadeIn>
        <FadeIn>
          <p className="font-body text-body-lg text-text-secondary max-w-2xl">
            Let&apos;s explore where automation can save your business time, improve customer
            experiences and unlock new opportunities.
          </p>
        </FadeIn>
        <FadeIn>
          <Button href={siteConfig.primaryCta.href} variant="primary" className="mt-2">
            {siteConfig.primaryCta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
