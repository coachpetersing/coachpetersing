"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type EventName = "buy_click" | "prices_view" | "faq_open" | "partner_apply" | "book_lookup" | "cancel_click" | "waitlist_join" | "question_sent";

/** Cookieless custom events through Vercel Analytics. Never throws. */
export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(name, props);
  } catch {}
}
