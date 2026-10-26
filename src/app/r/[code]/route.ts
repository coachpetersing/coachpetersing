import { NextResponse, type NextRequest } from "next/server";
import { isValidCode } from "@/content/partners";
import { REF_COOKIE, REF_MAX_AGE } from "@/lib/ref";
import { env } from "@/lib/env";

/** Short link for QR codes and cards: coachpetersing.com/r/CODE sets the partner cookie and lands on the home page. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = (await params).code.trim().toLowerCase();
  const res = NextResponse.redirect(`${env.siteUrl()}/#prices`, 302);
  if (isValidCode(code)) res.cookies.set(REF_COOKIE, code, { maxAge: REF_MAX_AGE, path: "/", sameSite: "lax" });
  return res;
}
