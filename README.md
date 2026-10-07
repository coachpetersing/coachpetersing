# coachpetersing.com

Personal brand site for Peter Sing. Next.js 15 (App Router), TypeScript, Tailwind. Hosted on Vercel; every page prerenders to static HTML, and Vercel serves `next/image` in AVIF and WebP. No database, no CMS. Every word and number lives in `src/content/`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. To check the production build locally, run `npm run build` then `npm start`.

## Edit copy

All sentences are in [`src/content/copy.ts`](src/content/copy.ts), keyed by page. Change the text there and the page updates. Keep the voice plain. No em dashes, no exclamation points in body copy.

Headline numbers are in [`src/content/stats.ts`](src/content/stats.ts). The credibility row and audience snapshot are in the same file.

Contact details, handles, and social URLs are in [`src/content/site.ts`](src/content/site.ts).

FAQ questions are in [`src/content/faq.ts`](src/content/faq.ts).

## Add a campaign

Open [`src/content/campaigns.ts`](src/content/campaigns.ts) and add an object to the `campaigns` array:

```ts
{
  brand: "Walmart",
  name: "Back to school",
  category: "Retail and delivery",     // must match a category in brands.ts
  result: "8.2M views",                // the one headline number
  detail: "120K likes, 900 comments",
  year: 2025,
  role: "Concept, script, production",
  media: "/video/walmart-bts.mp4",     // or "TBD"
  poster: "/images/walmart-bts.jpg",   // or "TBD"
  url: "https://www.tiktok.com/@thesingfamily/video/...",  // or "TBD"
  featured: false,                     // true puts it on the home page (first four featured show)
}
```

Anything set to `"TBD"` is hidden or replaced with a styled color tile. Nothing breaks.

To take a campaign off the site without losing its data, add `hidden: true`. It disappears from the Work grid and the home page, and the brand stays in the marquee and the brand wall. Remove the flag once a working link exists. The home page shows the `featured` campaigns that aren't hidden, and if fewer than four are left it fills the rest with the highest-view visible campaigns.

Repeat partners for the "Brands that came back" block are in the same file under `repeatPartners`.

## Post embeds and posters

Every campaign with a TikTok or Instagram `url` shows a poster with a play button. Clicking loads the platform's official embed inline, muted, nothing loads before the click. The card also links to the live post in a new tab.

TikTok posters are fetched automatically from TikTok's oEmbed endpoint by `scripts/fetch-posters.mjs`, which runs before every build and saves to `public/posters/`. Already-fetched posters are kept, so a flaky network never breaks a build. To re-download them all:

```bash
npm run posters -- --refresh
```

Instagram has no public thumbnail endpoint, so Instagram cards show a color tile with the brand name until you add a `poster` image yourself. If an embed fails or stalls, the card shows an "Open on TikTok" or "Open on Instagram" button and the outbound link stays.

The source for campaign numbers and links is the Brand Deal Stats table in Notion (Projects > Brand Deal Stats). Years are derived from the post id.

## Add a video

1. Export the MP4 from the original post. H.264, 9:16 or 1:1, under 4 MB. HandBrake with the "Fast 1080p30" preset and a lower quality slider gets there. Trim to the first 10 to 15 seconds if needed.
2. Grab a still for the poster (a frame from the video, JPG, around 1080 px tall).
3. Drop both in `public/video/` and `public/images/`.
4. Set `media` and `poster` on the campaign in `campaigns.ts`.

Videos are muted, lazy-loaded, and play on hover (desktop) or tap (mobile). They never autoplay with sound.

## Add the headshot

The headshot is `public/images/peter-headshot.jpg`, set as `headshot` in `site.ts`. On large screens it fills the hero, anchored right, with a cream gradient on the left; below 1024 px it sits above the text, framed on the face. The About page uses the same file cropped to 4:5. To swap it, replace the file with one framed the same way: plain light background, face in the right third, at least 2000 px wide. The link preview image uses a separate crop at `src/app/og-headshot.jpg` (600 x 630); regenerate it if the photo changes. A second candid goes in `secondPhoto` and shows on the home page about teaser.

## Add brands

[`src/content/brands.ts`](src/content/brands.ts), grouped by category. Add the name to the right group. Text wordmarks only. Do not pull logos from the internet.

The `tier1` list in the same file sets the biggest names, in order. They make up the first row of the home marquee and lead the Work page wall. Everything else follows, grouped by category. A brand in `tier1` must also be in a category group.

`npm run build` runs a content check first. It fails if a campaign brand is missing from `brands.ts`, if a `tier1` brand isn't in a group, or if an em dash shows up in `src/content`. Run it alone with `npm run check`.

## Swap a link

- Cal.com booking: every "Work with me" and "Book a session" button goes to `bookingPageUrl` in [`src/content/offers.ts`](src/content/offers.ts), which lists all sessions. Only the Coaching page links straight to a session: the 30 and 60 minute options use their own `bookingUrl`. The free 15-minute consult is not bookable; it's requested by email (subject "Free consult request") from the Coaching page, the home closing section, and the Contact page. The build fails if a link to the old `/intro` booking page comes back.
- Formspree contact form: create a free form at formspree.io and copy the id from the endpoint (`https://formspree.io/f/<id>`). In Vercel, Project > Settings > Environment Variables, add `NEXT_PUBLIC_FORMSPREE_ID` with that id for Production and Preview, then redeploy. Locally, put it in `.env.local`. While it's unset, the Contact page hides the form and shows only the email and Book a session. The form submits in place and shows a confirmation without leaving the page.
- "Work with me" buttons and "DM me" links: `workWithMeUrl` and `dmUrl` in `site.ts`. The @coachpetersing social accounts are deliberately not linked; the build fails if one of those URLs shows up in `src`.
- Workshops: the button says "Ask about workshops" and goes to the Contact page.
- Workshop date: set `nextDate` in `offers.ts`, for example `"Saturday, March 14"`.
- Prices: set `priceUsd` to a number on an offer and it shows. Leave `null` to hide.

## Pixels (optional)

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_META_PIXEL_ID` or `NEXT_PUBLIC_TIKTOK_PIXEL_ID`. On Vercel, add the same variables under Project > Settings > Environment Variables. Blank means the pixel is not loaded. Vercel Web Analytics is on by default and needs no key once enabled in the Vercel project.

## Deploy

1. Push the repo to GitHub. The production branch is `main`.
2. In Vercel, New Project > import the repo. Framework is detected as Next.js. No settings to change.
3. Every push to `main` deploys to production. Pull requests get a preview URL.
4. In the Vercel project, turn on Web Analytics under the Analytics tab.

## Point the domain

DNS is at Squarespace Domains: account.squarespace.com > Domains > coachpetersing.com > DNS. Google Workspace email is set up there.

Do not delete or edit any MX, SPF (TXT starting `v=spf1`), DKIM (TXT on `google._domainkey`), or `google-site-verification` records.

1. In Vercel, Project > Settings > Domains. Add `coachpetersing.com` and `www.coachpetersing.com`. Set `coachpetersing.com` as the primary and let `www` redirect to it. Vercel shows the A record and CNAME values to add.
2. In Squarespace DNS, delete only these five records:
   - A `@` 198.185.159.144
   - A `@` 198.185.159.145
   - A `@` 198.49.23.144
   - A `@` 198.49.23.145
   - CNAME `www` ext-sq.squarespace.com
3. Add the records Vercel shows. Typically:
   - A `@` 76.76.21.21
   - CNAME `www` cname.vercel-dns.com
   Use whatever values the Vercel Domains page shows for this project if they differ.
4. Save. Back in Vercel the domain shows as pending, then valid. Allow up to an hour. SSL is automatic.
5. Send a test email to contact@coachpetersing.com afterwards to confirm mail still works.

## Checks before shipping

- `npm run build` passes with no warnings about images or metadata.
- Lighthouse mobile: Performance 85+ on pages with video, 90+ elsewhere. Accessibility 95+. SEO 95+.
- Every page has its own title and description (see `src/lib/seo.ts`).
- No em dashes in any copy: `grep -rnP "\x{2014}" src/content` returns nothing.
- Site works with JavaScript off: nav, links, mailto, and the form all function.

## Layout

```
src/app/            pages, layout, sitemap, robots, OG image
src/components/     UI pieces, each one file
src/content/        site.ts copy.ts stats.ts brands.ts campaigns.ts offers.ts faq.ts
src/lib/            seo.ts links.ts
public/images/      headshot, posters, stills
public/video/       campaign clips (mp4)
```
