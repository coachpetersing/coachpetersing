import Link from "next/link";
import { nav, site } from "@/content/site";
import { copy } from "@/content/copy";
import { bookingHref } from "@/lib/links";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-white md:pb-16">
      <div className="mx-auto grid w-full max-w-site gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-extrabold tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-sm font-body text-base text-white/70">{copy.footer.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>

        <div className="md:col-span-2">
          <ul className="space-y-2 font-body text-base">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/80 hover:text-tan">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-body text-sm uppercase tracking-[0.18em] text-tan">{copy.footer.emailLabel}</p>
          <a href={`mailto:${site.email}`} className="mt-2 block break-all font-body text-base hover:text-tan">
            {site.email}
          </a>
          <a href={bookingHref()} className="mt-4 inline-block font-body text-base underline underline-offset-4 hover:text-tan">
            {copy.footer.bookLabel}
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="font-body text-sm uppercase tracking-[0.18em] text-tan">{copy.footer.familyLabel}</p>
          <ul className="mt-2 space-y-2 font-body text-base">
            {site.familySocial.map((f) => (
              <li key={f.name}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-tan">
                  {f.name} <span className="text-white/50">{f.followers}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-site flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 pt-6 font-body text-sm text-white/50 md:px-8">
        <p>
          &copy; {new Date().getFullYear()} {copy.footer.rights}
        </p>
        <p>
          {site.location} &middot;{" "}
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
