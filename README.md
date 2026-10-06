# coachpetersing.com

Personal brand site for Peter Sing. Next.js 15 (App Router), TypeScript, Tailwind, Framer Motion. Static export, hosted on Vercel. No database, no CMS. Every word and number lives in `src/content/`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` writes the static site to `out/`.

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

Repeat partners for the "Brands that came back" block are in the same file under `repeatPartners`.

## Add a video

1. Export the MP4 from the original post. H.264, 9:16 or 1:1, under 4 MB. HandBrake with the "Fast 1080p30" preset and a lower quality slider gets there. Trim to the first 10 to 15 seconds if needed.
2. Grab a still for the poster (a frame from the video, JPG, around 1080 px tall).
3. Drop both in `public/video/` and `public/images/`.
4. Set `media` and `poster` on the campaign in `campaigns.ts`.

Videos are muted, lazy-loaded, and play on hover (desktop) or tap (mobile). They never autoplay with sound.

## Add the headshot

Put the photo in `public/images/headshot.jpg` (at least 2000 px wide) and set `headshot: "/images/headshot.jpg"` in `site.ts`. A second candid goes in `secondPhoto` and shows on the home page about teaser. Until then the hero uses a dark panel and the layout holds.

## Add brands

[`src/content/brands.ts`](src/content/brands.ts), grouped by category. Add the name to the right group. Text wordmarks only. Do not pull logos from the internet.

## Swap a link

- Cal.com booking: set `bookingUrl` in [`src/content/offers.ts`](src/content/offers.ts) (there is one per offer and one under `brands`). While it says `"TBD"`, every "Book a call" button opens an email with the subject "Book a call".
- Formspree contact form: create a free form at formspree.io, copy the id from the endpoint (`https://formspree.io/f/<id>`), and set `formspreeId` in `site.ts`. In Formspree, allow the redirect to `https://coachpetersing.com/thanks`. While it says `"TBD"`, the contact page shows the email instead of the form.
- Workshop waitlist: set `waitlistFormAction` in `offers.ts` to a second Formspree endpoint. Until then "Join the list" opens an email.
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
