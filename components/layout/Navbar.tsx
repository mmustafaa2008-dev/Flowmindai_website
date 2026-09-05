import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { primaryNavLinks } from "@/lib/content/navigation";
import { siteConfig } from "@/lib/content/site";

/**
 * Production sticky navbar.
 *
 * Structure mirrors the approved Stitch reference (`<nav class="sticky
 * top-0 ...">`), reimplemented with semantic `<header>` + `<nav>` and the
 * shared `Container` primitive. Because the navbar is `sticky` (not
 * `fixed`), it stays in normal document flow, so the sections below it do
 * not need extra top padding to compensate — only in-page anchor targets
 * do (handled globally via `[id] { scroll-margin-top: var(--nav-height) }`
 * in globals.css).
 *
 * This component is a Server Component. The only interactive piece — the
 * mobile menu trigger + drawer — is isolated in `MobileMenu`, a small
 * Client Component, so the rest of the navbar (and the Hero below it)
 * stays server-renderable.
 */
export function Navbar() {
  return (
    <header className="border-border bg-surface/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-xl">
      <Container
        as="nav"
        aria-label="Primary"
        className="flex h-(--nav-height) items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Image
            src="/assets/brand/flowmind-ai-navbar.png"
            alt=""
            width={445}
            height={315}
            priority
            className="h-9 w-auto"
          />
          <span className="font-heading text-headline-md text-foreground font-extrabold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {primaryNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-label-md text-text-secondary hover:text-primary focus-visible:text-primary font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href={siteConfig.primaryCta.href} variant="primary" size="sm">
            {siteConfig.primaryCta.label}
          </Button>
        </div>

        <MobileMenu navLinks={primaryNavLinks} />
      </Container>
    </header>
  );
}
