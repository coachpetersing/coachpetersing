import { headers } from "next/headers";
import { env } from "./env";

/** Verifies a Cloudflare Turnstile token. Skipped (returns true) when no secret is set, for local dev. */
export async function verifyTurnstile(token: string | null, ip: string) {
  const secret = env.turnstileSecret();
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch (err) {
    console.error("[turnstile] verify failed:", (err as Error).message);
    return false;
  }
}

export async function clientIp() {
  const h = await headers();
  return h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// Per-instance memory. Serverless instances are short-lived, so this is a best-effort limit
// that stops bursts from one IP; Turnstile is the main line of defense.
const hits = new Map<string, number[]>();

/** True if this key is still under `limit` hits in the last `windowMs`. Records the hit. */
export function rateLimit(key: string, limit = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}
