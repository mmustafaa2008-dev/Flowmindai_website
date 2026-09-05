import "server-only";

const WINDOW_MS = 30_000;
const MAX_TRACKED_KEYS = 500;

const recentSubmissions = new Map<string, number>();

/**
 * Best-effort, in-memory, single-process duplicate-submission guard.
 *
 * IMPORTANT LIMITATION (documented per Phase 9 spec, item 16/17): this is
 * NOT durable rate limiting. Serverless platforms (e.g. Vercel) can run
 * multiple isolated function instances simultaneously, or cold-start a
 * brand-new instance per request — in either case this in-memory `Map`
 * provides zero protection, since each instance has its own independent
 * memory. It only ever helps within a single long-lived process (e.g.
 * local `next dev`, or two quick consecutive requests that happen to hit
 * the same already-warm instance).
 *
 * This is intentionally NOT backed by Redis/Upstash/a database — those
 * are explicitly out of scope for this phase. True, durable rate
 * limiting requires a shared external store and should be added later if
 * abuse becomes a real problem. For this early-stage release, the
 * combination of this best-effort guard + the honeypot + Zod validation
 * + the client's own pending-submit lock is considered sufficient.
 */
export function isDuplicateSubmission(key: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the Map can't grow unbounded within one
  // long-lived process.
  if (recentSubmissions.size > MAX_TRACKED_KEYS) {
    for (const [trackedKey, timestamp] of recentSubmissions) {
      if (now - timestamp > WINDOW_MS) recentSubmissions.delete(trackedKey);
    }
  }

  const lastSubmittedAt = recentSubmissions.get(key);
  recentSubmissions.set(key, now);

  return Boolean(lastSubmittedAt && now - lastSubmittedAt < WINDOW_MS);
}
