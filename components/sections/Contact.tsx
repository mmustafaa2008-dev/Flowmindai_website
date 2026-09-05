import { Briefcase, Mail, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/content/site";
import { cn } from "@/lib/utils";

interface ContactDetail {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  tone: "primary" | "secondary";
  external?: boolean;
}

/**
 * Confirmed contact channels, derived entirely from `siteConfig` — no
 * duplicated email/phone/LinkedIn strings. WhatsApp gets its own row
 * (distinct from the plain phone call action) using the same confirmed
 * business number, per the client's explicit instruction that WhatsApp be
 * separately available and never reused for the Live Demo number.
 */
const contactDetails: ContactDetail[] = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: mailtoHref,
    icon: Mail,
    tone: "primary",
  },
  {
    label: "Phone",
    value: siteConfig.contact.phoneDisplay,
    href: telHref,
    icon: Phone,
    tone: "secondary",
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.phoneDisplay,
    href: whatsappHref,
    icon: MessageCircle,
    tone: "primary",
    external: true,
  },
  {
    label: "LinkedIn",
    value: siteConfig.contact.linkedinDisplay,
    href: siteConfig.contact.linkedinUrl,
    icon: Briefcase,
    tone: "secondary",
    external: true,
  },
];

/**
 * Contact — the single primary conversion destination (`id="contact"`).
 * Every "Book a Free Consultation" CTA site-wide points here.
 *
 * Server Component wrapper: only the form itself (`ContactForm`) needs
 * client-side state; the contact-details column and section shell stay
 * server-rendered.
 *
 * No top padding: Final CTA above already ends with generous bottom
 * padding. Bottom padding here is kept (rather than pt-0'd by Footer)
 * because Footer is a visually distinct landmark with its own
 * background/border, matching how tinted sections (`WhyFlowMind`,
 * `LiveDemo`) keep full padding on both sides.
 */
export function Contact() {
  return (
    <section id="contact" className="relative pb-16 md:pb-20 lg:pb-24">
      <Container className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <FadeIn>
          <div className="flex flex-col gap-8">
            <h3 className="font-heading text-headline-md text-foreground">Contact Details</h3>
            <div className="flex flex-col gap-6">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                      "bg-glass border-border border shadow-[inset_0_1px_0_rgb(255_255_255_/_0.1)] backdrop-blur-md",
                      detail.tone === "primary" ? "text-primary" : "text-secondary",
                    )}
                  >
                    <detail.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text-muted mb-1 text-xs tracking-wider uppercase">
                      {detail.label}
                    </span>
                    <a
                      href={detail.href}
                      target={detail.external ? "_blank" : undefined}
                      rel={detail.external ? "noopener noreferrer" : undefined}
                      className="font-body text-foreground hover:text-primary font-medium break-all transition-colors"
                    >
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <GlassCard className="p-8 md:p-10">
            <h3 className="font-heading text-headline-md text-foreground mb-6">
              Let&apos;s Build Something Smarter.
            </h3>
            <ContactForm />
          </GlassCard>
        </FadeIn>
      </Container>
    </section>
  );
}
