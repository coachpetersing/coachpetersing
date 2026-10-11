"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type EventName = "tryout_click" | "tryout_submit" | "sample_play" | "plan_view" | "faq_open" | "submit_work" | "cancel_click";

/** Cookieless custom events through Vercel Analytics. Never throws. */
export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(name, props);
  } catch {}
}
