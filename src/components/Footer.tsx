import Link from "next/link";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain border-t border-forest-800 bg-forest-950 px-4 pb-12 pt-16 print:hidden sm:px-6">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight">
            Peter Sing <span className="kicker align-middle text-tan-400">Coaching</span>
          </p>
          <p className="kicker mt-6 text-muted">{copy.footer.contact}</p>
          <a href={`mailto:${site.email}`} className="link mt-2 inline-block break-all">
            {site.email}
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="kicker text-muted">{copy.footer.follow}</p>
          <ul className="mt-2 space-y-2">
            {site.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-3 hover:text-tan-400">
                  <span>
                    {s.name}
                    {s.name === "Instagram" ? ` ${site.instagramHandle}` : ""}
                  </span>
                  <span className="font-display text-xl font-bold text-tan-400">{s.followers}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2">
            {copy.footer.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-tan-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="wrap mt-12 text-sm text-muted">© {year} Peter Sing</p>
    </footer>
  );
}
