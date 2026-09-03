/**
 * Minimal, dependency-free className combiner.
 *
 * Joins truthy class name fragments with a single space, ignoring
 * `false`/`null`/`undefined`/empty strings. This intentionally does not
 * perform Tailwind conflict resolution (unlike `tailwind-merge`) — our
 * components only ever append an optional extra `className`, so a simple
 * join is sufficient and avoids adding an extra dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
