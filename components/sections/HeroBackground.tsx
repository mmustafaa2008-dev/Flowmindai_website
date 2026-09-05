/**
 * Purely decorative hero backdrop.
 *
 * The approved Stitch export reserves an empty `<div class="absolute
 * inset-0 z-0">` at the top of the hero section for a background
 * treatment that its DESIGN.md describes but never codes explicitly:
 * a "subtle mesh gradient in the corners (Navy to Electric Blue at 5%
 * opacity)" plus "light-leaks and electric accents to guide the user's
 * eye." This component is our faithful, restrained interpretation of
 * that documented (but not literally coded) effect — soft corner glows
 * plus a couple of thin diagonal light-leak bands.
 *
 * Always non-interactive: aria-hidden, pointer-events-none, and confined
 * to the hero's `relative overflow-hidden` parent so it never influences
 * layout or causes horizontal overflow.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Corner mesh gradient — Navy to Electric Blue, ~5-8% opacity. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(82_141_255_/_0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgb(0_241_253_/_0.06),transparent_50%)]" />

      {/* Diagonal light-leak accents. Restrained, blurred, and toned down
          on small screens where there is less room for them to breathe. */}
      <div className="via-secondary/10 absolute -top-1/3 right-[8%] h-[140%] w-[10%] rotate-[18deg] bg-gradient-to-b from-transparent to-transparent opacity-60 blur-2xl sm:opacity-100" />
      <div className="via-primary/10 absolute -top-1/4 right-[22%] hidden h-[130%] w-[6%] rotate-[18deg] bg-gradient-to-b from-transparent to-transparent blur-2xl md:block" />
    </div>
  );
}
