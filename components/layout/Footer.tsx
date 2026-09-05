import { Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { footerLinkGroups } from "@/lib/content/navigation";
import { siteConfig } from "@/lib/content/site";

/**
 * Production Footer.
 *
 * Server Component. Nav links come from `footerLinkGroups`
 * (`lib/content/navigation.ts`) — nothing here is a dead `href="#"`.
 * Brand mark reuses the same derived "FM" icon already used in the
 * Navbar (per this phase's explicit guidance: "FM icon + FlowMind AI is
 * acceptable"), not the full square brand sheet. Only LinkedIn is linked
 * as a social profile — no Instagram/Facebook/X, since none are
 * confirmed.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-muted border-border relative border-t">
      <Container className="flex flex-col gap-12 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/assets/brand/flowmind-ai-navbar.png"
                alt=""
                width={445}
                height={315}
                className="h-9 w-auto"
              />
              <span className="font-heading text-headline-md text-foreground font-extrabold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="font-body text-body-md text-text-secondary max-w-xs">
              {siteConfig.tagline} We build intelligent systems for modern businesses.
            </p>
            <a
              href={siteConfig.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FlowMind AI on LinkedIn"
              className="border-border text-text-secondary hover:text-primary hover:border-border-strong flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
            >
              <Briefcase aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
              <h4 className="font-heading text-label-md text-foreground font-semibold tracking-wider uppercase">
                {group.title}
              </h4>
              {group.links.map((link) => {
                const isInternalRoute = link.href.startsWith("/");
                const className =
                  "font-heading text-label-md text-text-secondary hover:text-foreground w-fit transition-colors";

                return isInternalRoute ? (
                  <Link key={link.href + link.label} href={link.href} className={className}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href + link.label} href={link.href} className={className}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
          ))}
        </div>

        <p className="border-border text-text-muted border-t pt-8 text-sm">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
