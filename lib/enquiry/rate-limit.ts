/**
 * Best-effort in-memory rate limit: 5 submissions per 10 minutes per key.
 * Lives per server instance and resets on cold start, which is adequate while the
 * transport is a console stub. Swap for @upstash/ratelimit (same call shape) when needed.
 */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}
