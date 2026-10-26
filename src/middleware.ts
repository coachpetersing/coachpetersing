import { NextResponse, type NextRequest } from "next/server";
import { isValidCode } from "@/content/partners";
import { REF_COOKIE, REF_MAX_AGE } from "@/lib/ref";

/**
 * Remembers a partner code from `?ref=CODE` on any page for 30 days, so the partner gets credit when the
 * visitor buys later. Only the shape is checked here (lowercase letters and numbers); whether the
 * code is a real partner is checked at checkout. /r/CODE does the same thing with a nicer URL.
 */
export function middleware(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("ref")?.trim().toLowerCase();
  if (!code) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.searchParams.delete("ref");
  const res = NextResponse.redirect(url);
  if (isValidCode(code)) res.cookies.set(REF_COOKIE, code, { maxAge: REF_MAX_AGE, path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
