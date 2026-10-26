import { cookies } from "next/headers";
import { findPartner, type Partner } from "@/content/partners";
import { referral } from "@/content/site";

export const REF_COOKIE = "ref";
export const REF_MAX_AGE = referral.cookieDays * 24 * 60 * 60;

/** The partner whose code the visitor entered or arrived through, if it's a real one. Server only. */
export async function currentPartner(): Promise<Partner | null> {
  const jar = await cookies();
  return findPartner(jar.get(REF_COOKIE)?.value);
}
