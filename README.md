# coachpetersing.com

Peter Sing's coaching site. Three things for sale, all paid up front through Stripe Checkout:

| What | Price | After paying |
|---|---|---|
| Call | $299 once | Cal.com booking on `/welcome` (60 minutes). Peter emails a one-pager after the call. |
| Two calls a month | $499/month | Cal.com booking on `/welcome`, and anytime on `/book`. One-pager after each call. |
| Four calls a month | $899/month | Same. |

Referral partners each have a code. A customer types it in the box under the prices (or arrives through the partner's link or QR code) and gets a first-payment discount: $50 off a Call, $100 off the first month of Two calls, $200 off the first month of Four. Every sale, renewal and refund with a code is logged with the payout owed, and `npm run payouts` totals a month per partner straight from Stripe. The partner program isn't linked anywhere public: `/partners` (pitch, terms, apply form), `/qr` and `/card/CODE` are unlisted.

Next.js 15 (App Router), TypeScript, Tailwind, hosted on Vercel. Stripe for billing, Resend for email, a Google Sheet for records, Cal.com for calls. Every word, price and number on the site lives in `src/content/`.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs with none of it
npm run dev
```

Open http://localhost:3000. With no Stripe key (or if Stripe errors), the Call button goes straight to the Cal.com page where people pick a time and pay in one step (`site.bookCallUrl`, currently cal.com/coachpetersing/60min at $299), and the plan buttons land on a short "checkout is down" page that offers a single call.

`npm run build` runs a content check before and after the build. It fails on an em dash, any leftover roster or video-review wording, the old prices, the private 20% rate, or a bare Cal.com link.

## Edit content

| What | File |
|---|---|
| Every sentence on the site | [`src/content/copy.ts`](src/content/copy.ts) |
| Prices, what each product includes, referral discounts and payout rules, stats, social counts, media | [`src/content/site.ts`](src/content/site.ts) |
| Partners (code and name) | [`src/content/partners.ts`](src/content/partners.ts) |
| Case studies | [`src/content/caseStudies.ts`](src/content/caseStudies.ts) |
| FAQ | [`src/content/faq.ts`](src/content/faq.ts) |
| Terms and Privacy | [`src/content/legal.ts`](src/content/legal.ts) |
| Every email | [`src/content/emails.ts`](src/content/emails.ts) |

Each file has a note at the top on how to edit it. Keep the voice plain and first person, and no em dashes.

**Prices** shown on the site come from `site.ts`. The amount charged comes from Stripe. To change a price: edit `site.ts`, create the new price in Stripe (easiest: change the `lookupKey` in `site.ts` and run `npm run stripe:setup`), update the price ID in Vercel, redeploy. Give plan members 30 days' email notice (see the Terms).

### Swap in media

All in `media` in `src/content/site.ts`. Until a value is set, the site shows a placeholder.

- **Hero montage:** put `hero.mp4`, `hero.webm` and `hero-poster.jpg` in `public/video` and `public/images` (9:16, under 15 seconds), then set `media.hero`.
- **Sample one-pager:** drop a real one in `public` and set `media.samplePdf` to `/sample-one-pager.pdf`.
- **About photo:** replace `public/images/peter-portrait.jpg` or point `media.aboutPhoto` at a new file.
- **Case-study thumbnails:** TikTok thumbnails download automatically before each build.

## Partners

**Adding one.** Add a line to `src/content/partners.ts`: `{ code: "jess", name: "Jess" }`. Push. Applications from `/partners` land in the Sheet tab **Partners** and in your inbox with the line ready to paste.

**What they get.** Their code (type it under the prices), their link `coachpetersing.com/r/jess` (sets a 30-day cookie and lands on the prices; `?ref=jess` on any page does the same), a QR code at `/qr`, and a printable 6 x 4 card at `/card/jess` (Print > Save as PDF for a print shop).

**What the customer gets.** Once a real code is in, each price card shows the first-payment price ("$249 with Jess's code", "$399 first month with Jess's code, then $499") and Checkout applies that product's coupon. The code goes on the Stripe session as `client_reference_id` and metadata, and onto the subscription, so renewals carry it. First purchase only: Stripe can't check that by email, so the webhook checks for earlier payments from the same email and flags the row `RETURNING CUSTOMER USED A CODE`. You decide whether to charge the difference.

**Why the code box is on the site and not inside Stripe Checkout.** A Stripe promotion code maps to exactly one coupon, and the three products have three different discounts. The box on the site picks the right coupon for whatever they buy.

**Paying them.** Every sale, renewal and refund with a code is a row in the Sheet tab **Sales** with `Partner code`, `Month #` and `Payout` ($30 once on a Call; 15% of full price each month on a plan for 12 months; a refund is a negative row). On the 1st, run

```bash
npm run payouts -- --month 2026-11
```

for the month before last (that's the 30-day hold). It reads Stripe directly and prints a total per partner, marking anything under $100 as rolling over. Pay the totals through Melio. The 15% in `site.ts` is what the site and the script use; a private rate for a manager or agency is a hand adjustment.

**Removing one.** Delete their line. Old links still land on the site, but the code stops applying and stops counting.

## What each email does

Buyer emails come from `EMAIL_FROM`. Replies go to `EMAIL_PETER`.

| Email | Sent when | Sent by |
|---|---|---|
| Paid. Pick a time for your call. | A one-time Call is paid. Has the Cal.com link. | Stripe webhook |
| Welcome. Here's how your plan works. | A plan starts. **Required by California law.** Price, renewal day, how to cancel, refunds. Don't remove those. | Stripe webhook |
| Your plan is canceled | A member schedules a cancel in the billing portal (gives their last day). Also sent if a plan ends without a scheduled cancel. | Stripe webhook |

Notes to you: every sale, renewal and refund (with the partner code and payout), every partner application, each scheduled cancel, each ended plan, each failed payment.

## Pages

- `/` everything. `/#prices` is where every button points.
- `/welcome?session_id=...` where Stripe sends people after paying. Shows the Call calendar or the member calendar depending on what they bought. Without a valid paid session it shows a plain thanks.
- `/book` members enter their email, the site checks Stripe for an active plan, and shows the member calendar.
- `/cancel` links to the Stripe billing portal. Linked in the footer of every page.
- `/partners`, `/qr`, `/card/CODE`, `/r/CODE` partner pages and tools (unlisted, noindex).
- `/brands`, `/terms`, `/privacy`.

Call limits (two or four a month) aren't enforced by Cal.com. The welcome email and `/book` both say how many are included; if someone books more, you'll see it in Cal.com and can say so.

## Setup

### 1. Stripe

1. Put a test key (`sk_test_...`) in `.env.local` and run `npm run stripe:setup`. It creates the three prices (lookup keys from `site.ts`) and the three referral coupons, each restricted to its product and good once, and prints the IDs for `.env.local` and Vercel.
2. Dashboard steps (test mode, then again in live mode):
   - **Settings > Business > Public details:** Terms of service URL `https://coachpetersing.com/terms`, Privacy URL `/privacy`. Plan checkouts require terms consent, which needs this.
   - **Settings > Billing > Customer portal:** turn on cancel at end of billing period, update payment method, invoice history. Turn **off** plan switching. Copy the **Login link** into `STRIPE_PORTAL_LOGIN_URL`.
   - **Settings > Billing > Invoices > Default footer:** `Plans renew monthly until you cancel. Cancel anytime at coachpetersing.com/cancel.`
   - **Developers > Webhooks:** add `https://coachpetersing.com/api/stripe/webhook` with events `checkout.session.completed`, `invoice.paid`, `charge.refunded`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. Local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Plan checkouts have a required dropdown, "I understand this renews monthly at $499 until I cancel" ($899 for four calls), with one option, "Yes, I understand". That's the separate affirmative consent to the renewal.

### 2. Google Sheet

1. Create a sheet called **Coaching Sales**.
2. In Google Cloud, create a service account, enable the Google Sheets API, download a JSON key.
3. Share the sheet with the service account's `client_email` as an Editor.
4. Put the JSON (or a base64 copy) in `GOOGLE_SERVICE_ACCOUNT_JSON` and the sheet ID in `GOOGLE_SHEET_ID`.
5. Run `npm run sheet:setup`. It adds `Sales`, `Partners` and `Events` (used so a retried Stripe event isn't handled twice) with header rows.

If a Sheet write fails, you still get the email (with a note to add the row by hand), and the error is logged.

### 3. Resend

Add the domain `coachpetersing.com` in Resend and add the SPF, DKIM and DMARC records it shows at Squarespace DNS. Don't touch the existing Google Workspace records (see "Point the domain"). Put the API key in `RESEND_API_KEY`.

### 4. Cal.com and Turnstile

- **Cal.com:** two 60-minute event types, both hidden from your public Cal.com page: one for a paid Call (`NEXT_PUBLIC_CAL_CALL_URL`), one for members (`NEXT_PUBLIC_CAL_MEMBER_URL`). Set a 24-hour minimum notice for rescheduling. Limit availability to your call days.
- **Turnstile:** create a widget in Cloudflare for `coachpetersing.com`, then set `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Leave blank locally to skip the check.

### 5. Vercel

Add every variable from `.env.example` under Project > Settings > Environment Variables. Stripe test keys for Preview, live keys for Production. Turn on Web Analytics. Custom events: `buy_click` (with `product` and `location`), `prices_view`, `faq_open`, `partner_apply`, `book_lookup`, `cancel_click`.

## Test run (Stripe test mode)

1. On the home page, type `peter` in the code box under the prices. The cards should show $249, $399 then $499, and $699 then $899.
2. Click **Book a call**. Checkout should show $299 with $50 off. Pay with `4242 4242 4242 4242`.
3. You land on `/welcome` with the calendar, get the "Pick a time" email, and the Sheet has a Sales row with code `peter`, month 1, payout 30.
4. Start **Two calls a month** with the same email. Check both consents. The welcome email arrives, and the Sales row is flagged as a returning customer (same email already paid). Go to `/book`, enter the email, see the calendar.
5. Cancel from `/cancel` through the portal. You get the canceled email with your last day.
6. In the Stripe Dashboard, refund the $249 call. A Refund row appears with payout -30.
7. Run `npm run payouts -- --month <this month>`. Peter: $75 + $30 - $30 = $75, marked rolls over.

## Deploy

1. The production branch is `main`. Every push deploys. Pull requests get a preview URL.
2. Old pages (`/work`, `/coaching`, `/about`, `/contact`, `/thanks`) 301 to the home page.

## Point the domain

DNS is at Squarespace Domains: account.squarespace.com > Domains > coachpetersing.com > DNS. Google Workspace email is set up there.

Do not delete or edit any MX, SPF (TXT starting `v=spf1`), DKIM (TXT on `google._domainkey`), or `google-site-verification` records. When you add Resend, add its records alongside them; if Resend asks for an SPF include, add it to the existing `v=spf1` record instead of creating a second one.

1. In Vercel, Project > Settings > Domains. Add `coachpetersing.com` and `www.coachpetersing.com`. Set `coachpetersing.com` as the primary and let `www` redirect to it.
2. In Squarespace DNS, delete only these five records:
   - A `@` 198.185.159.144
   - A `@` 198.185.159.145
   - A `@` 198.49.23.144
   - A `@` 198.49.23.145
   - CNAME `www` ext-sq.squarespace.com
3. Add the records Vercel shows. Typically A `@` 76.76.21.21 and CNAME `www` cname.vercel-dns.com.
4. Allow up to an hour. SSL is automatic. Send a test email to contact@coachpetersing.com afterwards to confirm mail still works.

## Layout

```
src/app/            pages, the Stripe webhook, checkout action, sitemap, robots, OG image
src/components/     UI pieces
src/content/        everything editable (copy, prices, partners, FAQ, legal, emails)
src/lib/            Stripe, partner cookie, QR, Sheets, email, spam checks, dates
scripts/            Stripe and Sheet setup, monthly payouts, content check, posters
public/             images, posters, video
```
