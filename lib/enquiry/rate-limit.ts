import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting shared across every server instance via Upstash Redis, so limits hold on Vercel
 * serverless (cold starts and parallel instances no longer reset them).
 *
 * Configure with UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or the KV_REST_API_URL +
 * KV_REST_API_TOKEN pair the Vercel marketplace integration sets). Without them — e.g. local dev —
 * it falls back to a per-instance in-memory limiter. If Redis errors at runtime, that request is
 * checked against the in-memory limiter instead of failing.
 */
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/** Best-effort per-instance limiter: the fallback when Redis is not configured or unreachable. */
function createMemoryLimiter(limit: number, windowMs: number) {
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

/** Returns an async `isLimited(key)`: true when `key` has used up `limit` calls in the last `windowMs`. */
export function createRateLimiter(name: string, limit: number, windowMs: number) {
  const memory = createMemoryLimiter(limit, windowMs);
  const shared = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
        prefix: `dude:rl:${name}`,
      })
    : null;

  return async function isLimited(key: string): Promise<boolean> {
    if (!shared) return memory(key);
    try {
      const { success } = await shared.limit(key);
      return !success;
    } catch (err) {
      console.error(`[rate-limit:${name}] Redis unavailable, using in-memory fallback`, err);
      return memory(key);
    }
  };
}

/** Enquiry forms: 5 submissions per 10 minutes per key. */
export const isRateLimited = createRateLimiter("enquiry", 5, 10 * 60 * 1000);
