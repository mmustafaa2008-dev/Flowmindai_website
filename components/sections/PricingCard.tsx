import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types";

interface PricingCardProps {
  tier: PricingTier;
}

/**
 * A single pricing tier card.
 *
 * Reproduces the approved Stitch pricing card, including the "Featured"
 * treatment for the AI Agent tier (lifted, glowing border, primary CTA)
 * — "Featured" is the exact approved badge wording; no "Most Popular" or
 * other popularity claim is added. The optional `recurringNote` is
 * rendered as its own visually distinct line (not merged into the same
 * sentence as the base price) so the one-time starting price and the
 * potential ongoing fee stay clearly distinguishable, per the client's
 * explicit requirement.
 *
 * Every CTA points at the locked consultation flow (`#contact`) — this
 * is a lead-generation site, not a checkout flow.
 */
export function PricingCard({ tier }: PricingCardProps) {
  return (
    <GlassCard
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden p-8",
        tier.featured &&
          "border-primary/50 shadow-[0_0_30px_rgb(82_141_255_/_0.15)] lg:-translate-y-4",
      )}
    >
      {tier.featured ? (
        <>
          <span className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-bold tracking-wide uppercase">
            Featured
          </span>
          <div
            aria-hidden="true"
            className="from-primary/5 absolute inset-0 bg-gradient-to-b to-transparent"
          />
        </>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col gap-6">
        <h3 className="font-heading text-headline-md text-foreground">{tier.title}</h3>

        <div className="flex flex-col gap-1">
          {tier.priceLabel ? (
            <span className="font-body text-text-secondary text-sm">{tier.priceLabel}</span>
          ) : null}
          <span
            className={cn(
              "font-heading text-foreground font-bold",
              tier.priceLabel ? "text-3xl" : "text-xl",
            )}
          >
            {tier.price}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="font-body text-body-md text-text-secondary">{tier.description}</p>
          {tier.recurringNote ? (
            <p className="text-text-muted text-xs">+ {tier.recurringNote}</p>
          ) : null}
        </div>

        <Button
          href={siteConfig.primaryCta.href}
          variant={tier.featured ? "primary" : "secondary"}
          className="w-full"
        >
          {tier.ctaLabel}
        </Button>
      </div>
    </GlassCard>
  );
}
