import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content/copy";
import { partners, findPartner } from "@/content/partners";
import { pageMeta, descriptions } from "@/lib/seo";
import { qrSvg, qrPng, repLink } from "@/lib/qr";

export const metadata: Metadata = pageMeta("Partner codes", descriptions.qr, "/qr", { noindex: true });

/** Unlisted. One place to grab every partner's QR code, link and card. */
export default async function QrPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  const rep = findPartner(code);

  if (code && !rep) {
    return (
      <Shell>
        <p className="text-lg">{copy.qr.unknown}</p>
        <Link href="/qr" className="link mt-4 inline-block">
          {copy.qr.back}
        </Link>
      </Shell>
    );
  }

  if (!rep) {
    return (
      <Shell>
        {partners.length === 0 ? (
          <p className="text-lg text-muted">{copy.qr.none}</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {partners.map((r) => (
              <li key={r.code}>
                <Link href={`/qr?code=${r.code}`} className="card flex items-center justify-between p-5 hover:border-tan-400">
                  <span className="text-xl font-semibold">{r.name}</span>
                  <span className="font-mono text-sm text-muted">/r/{r.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Shell>
    );
  }

  const link = repLink(rep.code);
  const [svg, png] = await Promise.all([qrSvg(link, "#F6F0E4"), qrPng(link)]);
  const svgHref = `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace('fill="#F6F0E4"', 'fill="#0E1A12"'))}`;

  return (
    <Shell>
      <Link href="/qr" className="link text-sm">
        ← {copy.qr.back}
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="card flex aspect-square items-center justify-center p-6" dangerouslySetInnerHTML={{ __html: svg }} />
        <div>
          <h2 className="font-display text-5xl font-extrabold uppercase">{rep.name}</h2>
          <p className="kicker mt-4 text-muted">{copy.qr.link}</p>
          <p className="mt-1 break-all font-mono text-lg">{link}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={png} download={`qr-${rep.code}.png`} className="btn-primary">
              {copy.qr.downloadPng}
            </a>
            <a href={svgHref} download={`qr-${rep.code}.svg`} className="btn-secondary">
              {copy.qr.download}
            </a>
            <Link href={`/card/${rep.code}`} className="btn-secondary">
              {copy.qr.card}
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[880px]">
        <h1 className="h1">{copy.qr.h1}</h1>
        <p className="mt-4 text-cream-50/85">{copy.qr.intro}</p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
