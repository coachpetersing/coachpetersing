import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, fill } from "@/content/copy";
import { findPartner } from "@/content/partners";
import { products, referredPrice } from "@/content/site";
import { pageMeta, descriptions } from "@/lib/seo";
import { qrSvg, repLink } from "@/lib/qr";
import PrintButton from "./PrintButton";

export const metadata: Metadata = pageMeta("Card", descriptions.qr, "/card", { noindex: true });

/**
 * The leave-behind a partner hands to a business owner. A 6x4 inch card. Print at 100% on
 * cardstock, or send the page to a print shop as a PDF (Print > Save as PDF).
 */
export default async function CardPage({ params }: { params: Promise<{ code: string }> }) {
  const rep = findPartner((await params).code);
  if (!rep) notFound();
  const svg = await qrSvg(repLink(rep.code), "#0E1A12");

  return (
    <section className="section print:p-0">
      <div className="wrap flex flex-col items-center gap-6 print:gap-0">
        <div className="flex w-full max-w-[6in] items-center justify-between print:hidden">
          <p className="text-sm text-muted">
            {rep.name} · /r/{rep.code} · 6 x 4 in
          </p>
          <PrintButton />
        </div>

        <article className="grain flex h-[4in] w-[6in] shrink-0 overflow-hidden rounded-[0.25in] border border-forest-800 bg-forest-950 text-cream-50 print:rounded-none print:border-0">
          <div className="flex w-[3.7in] flex-col justify-between p-[0.3in]">
            <div>
              <p className="font-display text-[0.42in] font-extrabold uppercase leading-none tracking-tight">Peter Sing</p>
              <p className="kicker mt-1 text-[0.11in] text-tan-400">Coaching</p>
              <p className="mt-[0.18in] text-[0.13in] leading-snug text-cream-50/90">{copy.card.tagline}</p>
            </div>
            <ul className="space-y-[0.04in]">
              {copy.card.stats.map((s) => (
                <li key={s} className="font-display text-[0.19in] font-bold uppercase leading-tight text-tan-400">
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-[0.13in] font-semibold leading-snug">{fill(copy.card.line, { code: rep.code.toUpperCase(), price: referredPrice("call"), full: products.call.price })}</p>
          </div>
          <div className="flex w-[2.3in] flex-col items-center justify-center gap-[0.12in] bg-cream-50 p-[0.25in] text-ink">
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />
            <p className="kicker text-[0.1in] text-forest-600">{copy.card.scan}</p>
            <p className="font-mono text-[0.1in] text-ink/70">coachpetersing.com/r/{rep.code}</p>
          </div>
        </article>

      </div>
    </section>
  );
}
