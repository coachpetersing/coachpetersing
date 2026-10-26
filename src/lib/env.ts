/** Server-side environment access. Missing values return "" so callers can degrade instead of crash. */
export const env = {
  stripeKey: () => process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: () => process.env.STRIPE_WEBHOOK_SECRET || "",
  priceCall: () => process.env.STRIPE_PRICE_CALL || "",
  priceTwo: () => process.env.STRIPE_PRICE_TWO || "",
  priceFour: () => process.env.STRIPE_PRICE_FOUR || "",
  couponCall: () => process.env.STRIPE_COUPON_CALL || "",
  couponTwo: () => process.env.STRIPE_COUPON_TWO || "",
  couponFour: () => process.env.STRIPE_COUPON_FOUR || "",
  portalLoginUrl: () => process.env.STRIPE_PORTAL_LOGIN_URL || "",
  resendKey: () => process.env.RESEND_API_KEY || "",
  emailFrom: () => process.env.EMAIL_FROM || "Peter Sing <peter@coachpetersing.com>",
  emailPeter: () => process.env.EMAIL_PETER || "contact@coachpetersing.com",
  googleServiceAccount: () => process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "",
  googleSheetId: () => process.env.GOOGLE_SHEET_ID || "",
  turnstileSiteKey: () => process.env.TURNSTILE_SITE_KEY || "",
  turnstileSecret: () => process.env.TURNSTILE_SECRET_KEY || "",
  /** Cal.com event for a paid one-time Call (60 minutes). */
  calCallUrl: () => process.env.NEXT_PUBLIC_CAL_CALL_URL || "",
  /** Cal.com event for monthly plan members (60 minutes). */
  calMemberUrl: () => process.env.NEXT_PUBLIC_CAL_MEMBER_URL || "",
  siteUrl: () => (process.env.NEXT_PUBLIC_SITE_URL || "https://coachpetersing.com").replace(/\/$/, ""),
};
