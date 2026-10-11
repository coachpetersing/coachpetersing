/** Server-side environment access. Missing values return "" so callers can degrade instead of crash. */
export const env = {
  stripeKey: () => process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: () => process.env.STRIPE_WEBHOOK_SECRET || "",
  priceNotes: () => process.env.STRIPE_PRICE_NOTES || "",
  priceCoaching: () => process.env.STRIPE_PRICE_COACHING || "",
  couponOpeningDay: () => process.env.STRIPE_COUPON_OPENING_DAY || "",
  portalLoginUrl: () => process.env.STRIPE_PORTAL_LOGIN_URL || "",
  resendKey: () => process.env.RESEND_API_KEY || "",
  emailFrom: () => process.env.EMAIL_FROM || "Peter Sing <peter@coachpetersing.com>",
  emailPeter: () => process.env.EMAIL_PETER || "contact@coachpetersing.com",
  googleServiceAccount: () => process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "",
  googleSheetId: () => process.env.GOOGLE_SHEET_ID || "",
  turnstileSiteKey: () => process.env.TURNSTILE_SITE_KEY || "",
  turnstileSecret: () => process.env.TURNSTILE_SECRET_KEY || "",
  cronSecret: () => process.env.CRON_SECRET || "",
  calCoachingUrl: () => process.env.NEXT_PUBLIC_CAL_COACHING_URL || "",
  siteUrl: () => (process.env.NEXT_PUBLIC_SITE_URL || "https://coachpetersing.com").replace(/\/$/, ""),
};
