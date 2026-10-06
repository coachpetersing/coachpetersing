import Link from "next/link";
import { nav, site } from "@/content/site";
import { copy } from "@/content/copy";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 text-white backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <nav className="mx-auto flex h-16 w-full max-w-site items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-7 font-body text-base md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-white/80 transition-colors hover:text-tan">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-tan px-5 py-2.5 font-medium text-ink transition-colors hover:bg-[#d9bb82]"
            >
              {copy.nav.cta}
            </Link>
          </li>
        </ul>

        <MobileMenu />
      </nav>
    </header>
  );
}
