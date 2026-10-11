import { cronAuthorized } from "@/lib/cron";
import { expirePicks } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!cronAuthorized(req)) return new Response("Unauthorized", { status: 401 });
  try {
    const expired = await expirePicks();
    return Response.json({ expired: expired.length });
  } catch (err) {
    console.error("[cron] expire-picks failed:", err);
    return new Response("Failed", { status: 500 });
  }
}
