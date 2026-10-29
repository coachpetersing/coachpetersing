"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { site } from "@/content/site";
import { findPartner, isValidCode } from "@/content/partners";
import { configured, createCheckout, isProductId } from "@/lib/stripe";
import { currentPartner, REF_COOKIE, REF_MAX_AGE } from "@/lib/ref";

/**
 * Where a buy button goes when Stripe checkout can't run (no key yet, or Stripe errored). A Call goes
 * straight to the Cal.com page where they pick a time and pay in one step. A monthly plan goes to a
 * page that says checkout is down and offers a single call instead. Never a mailto link: on most
 * computers that does nothing visible, which looks like a broken button.
 */
function fallback(product: string) {
  return product === "call" ? site.bookCallUrl : `/welcome?unavailable=${product}`;
}

/**
 * Starts Stripe Checkout for one product and sends the browser there. The partner code (if the
 * visitor entered one or came through a partner's link) goes along for attribution and the
 * first-payment discount.
 */
export async function startCheckout(product: string) {
  if (!isProductId(product)) redirect("/#prices");
  if (!configured()) redirect(fallback(product));

  const partner = await currentPartner();
  let url: string;
  try {
    url = await createCheckout(product, partner?.code ?? null);
  } catch (err) {
    console.error("[checkout] failed:", (err as Error).message);
    redirect(fallback(product));
  }
  redirect(url);
}

export type CodeState = { status: "idle" | "ok" | "unknown" | "removed"; code?: string; name?: string };

/** The code box under the prices. A real code is remembered for 30 days; anything else is rejected. */
export async function applyCode(_prev: CodeState, fd: FormData): Promise<CodeState> {
  const jar = await cookies();
  if (fd.get("remove") === "1") {
    jar.delete(REF_COOKIE);
    return { status: "removed" };
  }
  const raw = String(fd.get("code") ?? "")
    .trim()
    .toLowerCase();
  const partner = isValidCode(raw) ? findPartner(raw) : null;
  if (!partner) return { status: "unknown", code: raw };
  jar.set(REF_COOKIE, partner.code, { maxAge: REF_MAX_AGE, path: "/", sameSite: "lax" });
  return { status: "ok", code: partner.code, name: partner.name };
}
