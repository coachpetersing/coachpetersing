import { cronAuthorized } from "@/lib/cron";
import { emailWaitlist } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!cronAuthorized(req)) return new Response("Unauthorized", { status: 401 });
  try {
    return Response.json(await emailWaitlist());
  } catch (err) {
    console.error("[cron] waitlist failed:", err);
    return new Response("Failed", { status: 500 });
  }
}
