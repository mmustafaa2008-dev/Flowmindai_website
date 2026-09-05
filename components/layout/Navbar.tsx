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
 *
 * The desktop nav (links + CTA) only appears at the custom `nav:`
 * breakpoint (1104px, defined in globals.css as `--breakpoint-nav`), not
 * the default Tailwind `md` (768px). Measured in a real browser: at
 * 768-1024px the full set of links + CTA does not fit next to the
 * logo/wordmark, so text wraps awkwardly (e.g. "How It Works" breaking
 * onto two lines). Below `nav:`, `MobileMenu` renders instead. Do not
 * revert this to `md:` — see the comment above `--breakpoint-nav`.
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
          <span className="font-heading text-headline-md text-foreground font-extrabold tracking-tight whitespace-nowrap">
            {siteConfig.name}
          </span>
        </Link>

        <div className="nav:flex hidden items-center gap-8">
          {primaryNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-label-md text-text-secondary hover:text-primary focus-visible:text-primary font-medium whitespace-nowrap transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav:block hidden">
          <Button
            href={siteConfig.primaryCta.href}
            variant="primary"
            size="sm"
            className="whitespace-nowrap"
          >
            {siteConfig.primaryCta.label}
          </Button>
        </div>

        <MobileMenu navLinks={primaryNavLinks} />
      </Container>
    </header>
  );
}
