/**
 * Best-effort in-memory rate limit, keyed per connection (usually the client IP).
 * Lives per server instance and resets on cold start, which is adequate while the
 * transport is a console stub. Swap for @upstash/ratelimit (same call shape) when needed.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function isLimited(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return false;
  };
}

/** Enquiry forms: 5 submissions per 10 minutes per key. */
export const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);
