import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}.`,
};

/**
 * Baseline Terms of Service.
 *
 * Deliberately generic website-use / inquiry language only. Does not
 * invent a registered corporate entity, governing-law jurisdiction, or
 * contractual warranties — those require real legal/business input and
 * should replace the conservative placeholders below once confirmed.
 */
export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl flex-1 px-6 py-24">
        <h1 className="font-heading text-headline-lg text-foreground font-semibold">
          Terms of Service
        </h1>
        <p className="text-text-muted mt-2 text-sm">Last updated: September 2026</p>

        <div className="text-text-secondary text-body-md mt-8 flex flex-col gap-6 leading-relaxed">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of this website, operated
            by {siteConfig.name}. By using this site, you agree to these Terms.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Use of this website
            </h2>
            <p>
              This website is provided to share information about {siteConfig.name}&apos;s services
              — AI agents, automations, chatbots, and AI-powered websites — and to let visitors
              submit inquiries through the contact form. You agree to use this site only for lawful
              purposes and not to submit false, misleading, or harmful content through the contact
              form.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Inquiries and no automatic booking
            </h2>
            <p>
              Submitting the contact form sends an inquiry email to {siteConfig.name}. It does not
              book, schedule, or confirm any appointment, service, or consultation automatically —
              we follow up directly by email or phone after reviewing your message.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">Pricing</h2>
            <p>
              Pricing shown on this site is indicative starting pricing for the described service
              tiers and may vary based on project scope, usage, integrations, and support needs.
              Figures described as &ldquo;starting from&rdquo; are not fixed quotes; a final price
              is confirmed only after discussing your specific requirements with us directly.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Intellectual property
            </h2>
            <p>
              The content, branding, and design of this website belong to {siteConfig.name} unless
              otherwise noted. You may not copy or reuse them without permission.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              No warranty
            </h2>
            <p>
              This website and its content are provided &ldquo;as is&rdquo;, without warranties of
              any kind, to the extent permitted by applicable law. We aim to keep information on
              this site accurate and up to date, but we do not guarantee it is free of errors at all
              times.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Changes to these Terms
            </h2>
            <p>
              We may update these Terms from time to time as the business and this website evolve.
              The date at the top of this page reflects the most recent update.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">Contact</h2>
            <p>
              Questions about these Terms can be sent to{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>

          <p className="text-text-muted text-sm">
            This page is a plain-language baseline set of website-use terms and is not a substitute
            for professional legal advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
