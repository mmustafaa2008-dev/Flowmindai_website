"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";
import type { NavLink } from "@/types";

interface MobileMenuProps {
  navLinks: NavLink[];
}

/**
 * Accessible mobile navigation trigger + drawer.
 *
 * This is the only client-interactive piece of the navbar. It renders:
 * - a real `<button>` trigger with `aria-expanded`/`aria-controls`
 * - a dropdown drawer (below the sticky navbar) listing every primary
 *   nav link plus the primary CTA
 * - a click-outside backdrop and Escape-key handler to dismiss it
 *
 * Kept intentionally lightweight — no focus-trap library. Focus simply
 * remains in the normal document order; keyboard users can Tab through
 * the drawer's links/button and press Escape to close it.
 */
export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll while the drawer is open so the page behind it
  // doesn't scroll along with it.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  return (
    <div className="nav:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-foreground flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-white/5"
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Menu aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Backdrop — click outside the drawer to dismiss it. */}
            <motion.div
              aria-hidden="true"
              onClick={close}
              className="fixed inset-x-0 top-(--nav-height) bottom-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="border-border bg-surface fixed inset-x-0 top-(--nav-height) z-50 border-b shadow-lg"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <nav
                aria-label="Mobile primary"
                className="px-margin-mobile flex flex-col gap-1 py-6"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="font-heading text-label-md text-text-secondary hover:text-primary rounded-md px-4 py-4 font-medium transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  href={siteConfig.primaryCta.href}
                  variant="primary"
                  onClick={close}
                  className="mt-4 w-full"
                >
                  {siteConfig.primaryCta.label}
                </Button>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
