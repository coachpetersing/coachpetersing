import { env } from "./env";

/** Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Anything else is turned away. */
export function cronAuthorized(req: Request) {
  const secret = env.cronSecret();
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}
