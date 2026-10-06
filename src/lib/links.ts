import { site } from "@/content/site";
import { introCallUrl, isSet } from "@/content/offers";

export function mailto(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${q ? `?${q}` : ""}`;
}

/** Cal.com link when set, otherwise an email with the right subject so the contact path still works. Defaults to the free intro call. */
export function bookingHref(url: string | null | undefined = introCallUrl) {
  return isSet(url) ? String(url) : mailto("Book a call");
}

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
