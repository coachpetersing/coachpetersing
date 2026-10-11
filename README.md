# coachpetersing.com

Peter Sing's coaching site: a 15-spot monthly coaching roster. People try out, Peter picks, and each pick gets a personal Stripe link that works once and expires after 72 hours.

Next.js 15 (App Router), TypeScript, Tailwind, hosted on Vercel. Stripe for billing, Resend for email, a Google Sheet for records, Cal.com for Coaching calls. Every word, price and number on the site lives in `src/content/`.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs with none of it
npm run dev
```

Open http://localhost:3000. With no keys set, the roster falls back to `src/content/roster.ts`, forms still succeed, and the server log notes what it skipped.

`npm run build` runs a content check before and after the build. It fails on an em dash, the old $150 or $250 prices, a free consult, or an old Cal.com booking link, in the source or in the built pages.

## Edit content

| What | File |
|---|---|
| Every sentence on the site | [`src/content/copy.ts`](src/content/copy.ts) |
| Prices, plan features, roster size, Coaching cap, stats, social counts, marquee brands, media | [`src/content/site.ts`](src/content/site.ts) |
| Approved roster descriptions and the Stripe-down fallback | [`src/content/roster.ts`](src/content/roster.ts) |
| Case studies | [`src/content/caseStudies.ts`](src/content/caseStudies.ts) |
| FAQ | [`src/content/faq.ts`](src/content/faq.ts) |
| Terms and Privacy | [`src/content/legal.ts`](src/content/legal.ts) |
| Every email | [`src/content/emails.ts`](src/content/emails.ts) |

Each file has a note at the top on how to edit it. Keep the voice plain and first person, and no em dashes.

**Prices** shown on the site come from `site.ts`. The amount charged comes from Stripe. Change both together, and give members 30 days' email notice (see the Terms).

### Swap in media

All in `media` in `src/content/site.ts`. Until a value is set, the site shows a placeholder.

- **Hero montage:** put `hero.mp4`, `hero.webm` and `hero-poster.jpg` in `public/video` and `public/images` (9:16, under 15 seconds), then set `media.hero`. Add a `.vtt` captions file if it has speech.
- **Sample review:** set `media.sampleReview.src` to a Loom share link or an MP4 in `public/video`. For an MP4, add a poster (16:9) and a `.vtt` captions file.
- **About photo:** replace `public/images/peter-portrait.jpg` or point `media.aboutPhoto` at a new file. Update `aboutPhotoAlt`.
- **Case-study thumbnails:** TikTok thumbnails download automatically before each build. To use your own, put a 9:16 image in `public/images` and set `poster` in `caseStudies.ts`.

## Running the roster

### How the numbers work

The roster count, open spots, Coaching availability and Opening Day spots left all come from Stripe:

- A spot is filled by any subscription on the Notes or Coaching price with status `active` or `past_due`.
- Coaching is capped at 6 (`COACHING_CAP` in `site.ts`).
- Opening Day spots left = the coupon's max redemptions minus times redeemed.

The site refreshes these every hour, and right away after every signing or cancellation. If Stripe can't be reached, it shows the numbers in `fallback` in `src/content/roster.ts`. Set those by hand if Stripe is ever down.

### Making a pick

1. Open the Google Sheet, tab **Tryouts**. New tryouts come in with status `New`. You also get an email for each one.
2. Pick someone. Run:

   ```bash
   npm run pick -- --email jane@example.com --plan notes
   ```

   Options:
   - `--plan coaching` for the Coaching plan.
   - `--note https://www.loom.com/share/...` adds your quick video note to the email.
   - `--opening-day` prefills the OPENINGDAY code (only while Opening Day spots are left).
   - `--force` sends even if every open spot already has a pick link out.

3. The script checks Stripe first. It refuses if the roster is full, if Coaching is full for a Coaching pick, or if every open spot already has a live pick link.
4. It creates a single-use Stripe Payment Link (good for 72 hours), emails it to them ("You made the roster"), logs it in the **Picks** tab, marks their Tryouts row `Picked`, and prints the link.
5. If they pay, the webhook takes it from there (see emails below) and their Picks row turns `Signed`.
6. If they don't pay in 72 hours, the hourly cron turns the link off, emails them "Your spot passed", emails you to pick the next person, and marks the Picks row `Expired`.

People you aren't picking this month: set their Tryouts row status to `Waiting`. On the 1st, if the roster is full, they get the "Still on the list" email. Anyone who unsubscribes is set to `Removed`.

### Approving a roster description

1. A new member fills out their intake on `/welcome`. If they chose "List me anonymously", the row lands in the **Intake** tab with status `Pending approval`, and you get an email with a ready-to-paste line.
2. Check the wording: type, a few words of niche, a follower range, an optional region. No names, handles, exact numbers or cities.
3. Add the line to `listed` in [`src/content/roster.ts`](src/content/roster.ts). Pick a jersey number from 1 to 15 that isn't used. Push.
4. Set the Intake row to `Approved`.
5. To take someone down, delete their line. Their spot still shows as a private "Roster member".

### What each email does

Member and tryout emails come from `EMAIL_FROM`. Replies go to `EMAIL_PETER`.

| Email | Sent when | Sent by |
|---|---|---|
| You're on the list | Someone submits a tryout | `/tryouts` form |
| You made the roster | You run `npm run pick` | `scripts/pick.ts` |
| Your spot passed | A pick link hits 72 hours unpaid | Hourly cron |
| Welcome to the roster | Checkout completes. **Required by California law.** It has the price, renewal day, how to cancel, and the refund policy. Don't remove those. | Stripe webhook |
| Your plan is canceled | A member schedules a cancel in the billing portal (it gives their last day). Also sent if a plan ends without a scheduled cancel, for example if you cancel it in Stripe. | Stripe webhook |
| Still on the list | The 1st of each month, only if the roster is full, to Tryouts rows marked `Waiting`. Run it by hand with `npm run waitlist-email`. | Monthly cron |

Notes to you: every tryout, every intake, every work submission (with the count for the month, and `(OVER LIMIT)` when someone goes over), each new signing, each scheduled cancel, each spot that opens, each failed payment, and each expired pick.

### Member pages

- `/welcome` is where Stripe sends people after paying. Intake form, a link to `/submit`, and for Coaching the Cal.com booking embed.
- `/submit` is where members send work. It checks the email against active Stripe subscriptions. Over-limit submissions still go through and are flagged.
- `/cancel` links to the Stripe billing portal login. It's linked in the footer of every page.

## Setup

### 1. Stripe

1. Put a test key (`sk_test_...`) in `.env.local` and run `npm run stripe:setup`. It creates the Notes ($297) and Coaching ($697) monthly prices with lookup keys `notes_monthly` and `coaching_monthly`, the Opening Day coupon ($100 off for 3 months, 5 redemptions), and the `OPENINGDAY` promotion code. Copy the IDs it prints into `.env.local`.
2. Dashboard steps (test mode, then again in live mode):
   - **Settings > Business > Public details:** set the Terms of service URL to `https://coachpetersing.com/terms` and the Privacy URL to `/privacy`. Pick links require terms consent at checkout, which needs this.
   - **Settings > Billing > Customer portal:** turn on cancel at end of billing period, update payment method, and invoice history. Turn **off** plan switching. Copy the **Login link** into `STRIPE_PORTAL_LOGIN_URL`.
   - **Settings > Billing > Invoices > Default footer:** `Your plan renews monthly until you cancel. Cancel anytime at coachpetersing.com/cancel.`
   - **Developers > Webhooks:** add `https://coachpetersing.com/api/stripe/webhook` with events `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. For local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

About the renewal checkbox: Stripe Payment Links have no checkbox field. The pick link uses a required dropdown with one option, "Yes, I understand", labeled `I understand this renews monthly at $297 until I cancel.` ($697 for Coaching; Opening Day picks show the discounted price and then the regular price). The customer can't pay without choosing it, so it works as a separate, affirmative consent to the renewal.

### 2. Google Sheet

1. Create a sheet called **Coaching Roster**.
2. In Google Cloud, create a service account, enable the Google Sheets API, and download a JSON key.
3. Share the sheet with the service account's `client_email` as an Editor.
4. Put the JSON (or a base64 copy of it) in `GOOGLE_SERVICE_ACCOUNT_JSON` and the sheet ID in `GOOGLE_SHEET_ID`.
5. Run `npm run sheet:setup`. It adds the tabs `Tryouts`, `Picks`, `Members`, `Intake`, `Submissions` and `Events` (used so a retried Stripe event isn't handled twice) with header rows.

If a Sheet write fails, the form still succeeds, you still get the email (with a note to add the row by hand), and the error is logged.

### 3. Resend

Add the domain `coachpetersing.com` in Resend and add the SPF, DKIM and DMARC records it shows at Squarespace DNS. Don't touch the existing Google Workspace records (see "Point the domain" below). Put the API key in `RESEND_API_KEY`.

### 4. Turnstile, cron, Cal.com

- **Turnstile:** create a widget in Cloudflare for `coachpetersing.com`, then set `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Leave them blank locally to skip the check.
- **Cron:** set `CRON_SECRET` to a long random string. `vercel.json` schedules `/api/cron/expire-picks` hourly and `/api/cron/waitlist` at 10am Pacific on the 1st. Hourly crons need a Vercel Pro plan; on Hobby, change it to daily (`0 17 * * *`) and links expire within a day of their 72 hours.
- **Cal.com:** create a private 45-minute event for Coaching members and put its URL in `NEXT_PUBLIC_CAL_COACHING_URL`.

### 5. Vercel

Add every variable from `.env.example` under Project > Settings > Environment Variables. Use Stripe test keys for Preview and live keys for Production. Turn on Web Analytics. Custom events: `tryout_click` (with `location`), `tryout_submit`, `sample_play`, `plan_view`, `faq_open`, `submit_work`, `cancel_click`.

Spam protection on `/tryouts`: a honeypot field, Turnstile, and a 5-per-hour limit per IP. The IP limit lives in each server instance's memory, so it stops bursts but isn't exact across instances. Turnstile does the heavy lifting.

## Test run (Stripe test mode)

1. Submit a tryout at `/tryouts`.
2. `npm run pick -- --email you+test@example.com --plan notes --opening-day`.
3. Open the link from the email. Pay with card `4242 4242 4242 4242`, check both consents.
4. You land on `/welcome`, get the welcome email, and the roster shows 1 signed.
5. Fill out the intake, then send something from `/submit`.
6. Cancel from `/cancel` through the portal. You get the canceled email with your last day.
7. Cancel the subscription immediately in the Stripe Dashboard. The roster drops back.
8. Try the same pick link again: it's used up. Run a pick and wait (or edit its `expires_at` metadata to the past) and call the cron: `curl -H "Authorization: Bearer $CRON_SECRET" localhost:3000/api/cron/expire-picks`.

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
src/app/            pages, API routes (Stripe webhook, crons), sitemap, robots, OG image
src/components/     UI pieces
src/content/        everything editable
src/lib/            Stripe, roster math, Sheets, email, spam checks, dates
scripts/            pick, waitlist email, Stripe and Sheet setup, content check, posters
public/             images, posters, video
```
