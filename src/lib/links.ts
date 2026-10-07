import { site } from "@/content/site";
import { bookingPageUrl, isSet } from "@/content/offers";

export function mailto(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${q ? `?${q}` : ""}`;
}

/** Cal.com link when set, otherwise an email with the right subject so the contact path still works. Defaults to the page listing every session. */
export function bookingHref(url: string | null | undefined = bookingPageUrl) {
  return isSet(url) ? String(url) : mailto("Book a session");
}

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
