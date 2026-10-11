import crypto from "node:crypto";
import { env } from "./env";

/** Signed token for unsubscribe links, so nobody can remove someone else from the list. */
export function signEmail(email: string) {
  return crypto.createHmac("sha256", env.cronSecret() || "dev").update(email.trim().toLowerCase()).digest("base64url").slice(0, 32);
}

export function checkEmailSig(email: string, sig: string) {
  const a = Buffer.from(signEmail(email));
  const b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
