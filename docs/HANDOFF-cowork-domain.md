# Handoff: put coachpetersing.com live

For Cowork, from Peter. The site is built and committed at `~/Developer/coachpetersing`. It is a Next.js static site that hosts on Vercel. Squarespace only holds the domain's DNS. Do not try to host the site on Squarespace, and do not create a Squarespace website.

Do these in order. Stop and ask me if anything on screen doesn't match what's described here.

## 0. What I've already done, or will do before you start

- [ ] Repo pushed to GitHub (Claude Code can do this; ask me if the repo isn't there)
- [ ] I'm logged into GitHub, Vercel, and Squarespace in Chrome

## 1. Create the Vercel project

1. Go to vercel.com, New Project, Import Git Repository, pick `coachpetersing`.
2. Framework preset should auto-detect as Next.js. Leave build settings as they are. No environment variables needed.
3. Click Deploy. Wait for it to finish and open the `.vercel.app` preview URL. Confirm the home page loads with the headline "I've done 150 brand deals."
4. In the project, Analytics tab, click Enable for Web Analytics.

## 2. Add the domain in Vercel

1. Project > Settings > Domains.
2. Add `coachpetersing.com`. When asked, choose to redirect `www.coachpetersing.com` to `coachpetersing.com`.
3. Vercel will show the domain as not configured and list the DNS records it wants. Write them down exactly. They are usually:
   - A record, host `@`, value `76.76.21.21`
   - CNAME record, host `www`, value `cname.vercel-dns.com`
   If Vercel shows different values, use what Vercel shows.

## 3. Change DNS at Squarespace

Go to account.squarespace.com > Domains > coachpetersing.com > DNS.

Never touch these. Google Workspace email depends on them:
- Any MX record
- Any TXT record (SPF starts with `v=spf1`, DKIM is on `google._domainkey`, and `google-site-verification`)
- Any CNAME that is not `www`

Delete only these five Squarespace defaults:
- A `@` 198.185.159.144
- A `@` 198.185.159.145
- A `@` 198.49.23.144
- A `@` 198.49.23.145
- CNAME `www` ext-sq.squarespace.com

Then add the records from step 2:
- A `@` (value from Vercel, normally 76.76.21.21)
- CNAME `www` (value from Vercel, normally cname.vercel-dns.com)

Save. Before you close the page, take a screenshot of the full DNS table so we have a record.

## 4. Confirm

1. Back in Vercel > Settings > Domains, refresh. Within an hour both domains should show Valid Configuration and SSL should be issued automatically.
2. Open https://coachpetersing.com and https://www.coachpetersing.com. Both should land on the site over HTTPS.
3. Send a test email to contact@coachpetersing.com and confirm it arrives. If it doesn't, compare the DNS table against the screenshot and tell me what changed.

## If something goes wrong

Undo is simple: re-add the five Squarespace records listed in step 3 and remove the two Vercel ones. The domain goes back to the Squarespace parking page and email is unaffected either way, as long as the MX and TXT records were never touched.
