"use client";

import Script from "next/script";

/**
 * Cloudflare Turnstile. Renders nothing when no site key is set (local dev).
 * The widget adds a hidden `cf-turnstile-response` field to the form it sits in.
 */
export default function Turnstile({ siteKey }: { siteKey: string }) {
  if (!siteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" data-size="flexible" />
    </>
  );
}
