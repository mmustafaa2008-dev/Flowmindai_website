import { Bot, Sparkles } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialFlare } from "@/components/ui/RadialFlare";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/content/site";

/**
 * TEMPORARY DESIGN-SYSTEM PREVIEW — Phase 3 only.
 *
 * This page exists solely to visually verify the global design foundation
 * (background/grid, typography, buttons, glass cards, section heading,
 * badge, radial flare, spacing) at every breakpoint. It is intentionally
 * NOT the real homepage — no Hero/Services/etc. sections are implemented
 * here. Delete this file's contents and replace with the real homepage
 * composition in the next implementation phase.
 */
export default function Home() {
  return (
    <main className="gap-section-gap-mobile py-section-gap-mobile lg:gap-section-gap lg:py-section-gap flex flex-1 flex-col">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/assets/brand/flowmind-ai-logo.png"
          alt={`${siteConfig.name} logo`}
          width={120}
          height={120}
          priority
          className="h-auto w-28"
        />
        <Badge icon={Sparkles}>Design System Preview</Badge>
        <p className="font-body text-body-md text-text-secondary max-w-lg">
          Phase 3 visual foundation — background, typography, buttons, glass cards and spacing
          tokens reproduced from the approved Stitch design. This page is temporary.
        </p>
      </Container>

      {/* Typography scale */}
      <Container as="section" className="flex flex-col gap-6">
        <SectionHeading
          align="left"
          eyebrow="Foundation"
          title="Typography Scale"
          description="Geist for headings/labels, Inter for body copy. The display size scales fluidly down to mobile."
        />
        <div className="flex flex-col gap-4">
          <p className="font-heading text-display-xl text-foreground">Display XL</p>
          <p className="font-heading text-display-lg text-foreground">Display LG</p>
          <p className="font-heading text-headline-lg-mobile sm:text-headline-lg text-foreground">
            Headline LG
          </p>
          <p className="font-heading text-headline-md text-foreground">Headline MD</p>
          <p className="font-body text-body-lg text-text-secondary">Body LG — supporting copy.</p>
          <p className="font-body text-body-md text-text-secondary">Body MD — supporting copy.</p>
          <p className="font-heading text-label-md text-primary uppercase">Label / Eyebrow MD</p>
        </div>
      </Container>

      {/* Buttons */}
      <Container as="section" className="flex flex-col gap-6">
        <SectionHeading align="left" eyebrow="Foundation" title="Buttons" />
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#contact" variant="primary">
            Book a Free Consultation
          </Button>
          <Button href="#services" variant="secondary">
            Secondary Action
          </Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button variant="primary" size="sm" disabled>
            Disabled
          </Button>
        </div>
      </Container>

      {/* Glass cards + radial flare */}
      <Container as="section" className="flex flex-col gap-6">
        <SectionHeading align="left" eyebrow="Foundation" title="Glass Cards" />
        <div className="gap-gutter grid grid-cols-1 sm:grid-cols-2">
          <GlassCard className="relative flex flex-col gap-4 overflow-hidden p-8">
            <RadialFlare className="opacity-60" />
            <Bot aria-hidden="true" className="text-primary relative z-10 h-8 w-8" />
            <p className="font-heading text-headline-md text-foreground relative z-10">
              Static Card
            </p>
            <p className="font-body text-body-md text-text-secondary relative z-10">
              Base glass surface with a radial flare accent.
            </p>
          </GlassCard>
          <FadeIn>
            <GlassCard hover className="flex flex-col gap-4 p-8">
              <Bot aria-hidden="true" className="text-secondary h-8 w-8" />
              <p className="font-heading text-headline-md text-foreground">Hover Card</p>
              <p className="font-body text-body-md text-text-secondary">
                Hover to see the border brighten and the primary glow appear.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </Container>

      {/* Centered section heading example */}
      <Container as="section">
        <SectionHeading
          eyebrow="Foundation"
          title="Centered Section Heading"
          description="Used for most homepage sections — eyebrow label, heading, optional supporting copy."
        />
      </Container>
    </main>
  );
}
