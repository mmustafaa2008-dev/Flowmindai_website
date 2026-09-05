import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
};

/**
 * Baseline Privacy Policy.
 *
 * Intentionally describes ONLY what this site actually does today:
 * the contact form collects the fields it visibly asks for, and
 * submissions are relayed by email via Resend to the business inbox.
 * No analytics, cookies, or third-party trackers are in use, so none are
 * claimed here. This is a plain-language baseline page for an
 * early-stage business site, not a substitute for legal counsel — update
 * it if that behavior ever changes (e.g. analytics are added).
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl flex-1 px-6 py-24">
        <h1 className="font-heading text-headline-lg text-foreground font-semibold">
          Privacy Policy
        </h1>
        <p className="text-text-muted mt-2 text-sm">Last updated: September 2026</p>

        <div className="text-text-secondary text-body-md mt-8 flex flex-col gap-6 leading-relaxed">
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website. This
            policy explains, in plain language, what information we collect through this site and
            how it is used.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Information we collect
            </h2>
            <p>
              The only information this site collects is what you choose to submit through the
              contact form: your name, business/company name, email address, website (optional), the
              type of automation you&apos;re interested in, and your message. We do not use cookies,
              analytics tools, or any tracking technology on this site at this time.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              How we use your information
            </h2>
            <p>
              Contact form submissions are used solely to respond to your inquiry — to understand
              what you&apos;re asking about and to get back to you by email or phone. We do not use
              this information for any other purpose.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              How your message is delivered
            </h2>
            <p>
              When you submit the contact form, its contents are sent as an email to our business
              inbox using Resend, a third-party transactional email delivery service. Resend
              processes the message solely to deliver it to us and may briefly retain delivery logs
              (such as message status) as part of providing that service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Data sharing and sale
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to anyone. We do not share it
              with third parties except Resend, strictly as needed to deliver your message to us as
              described above.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Data retention
            </h2>
            <p>
              We retain contact form submissions (received as email) for as long as reasonably
              needed to respond to your inquiry and keep a record of business communications. You
              can request that we delete your information by emailing us at the address below.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Contacting us about your data
            </h2>
            <p>
              To ask a question about this policy, or to request access to or deletion of
              information you&apos;ve submitted, email us at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-headline-md text-foreground font-semibold">
              Changes to this policy
            </h2>
            <p>
              If how we handle information changes (for example, if we add analytics in the future),
              we will update this page accordingly.
            </p>
          </section>

          <p className="text-text-muted text-sm">
            This page is a plain-language baseline description of current site behavior and is not a
            substitute for professional legal advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
