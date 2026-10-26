import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PartnerForm from "./PartnerForm";

export const metadata: Metadata = pageMeta("Partners", descriptions.partners, "/partners", { noindex: true });

/** Unlisted. Not in the nav or footer, not in the sitemap. Send the URL to people you want as partners. */
export default function PartnersPage() {
  const t = copy.partners;
  return (
    <>
      <section className="grain section pt-10">
        <div className="wrap">
          <h1 className="h1 max-w-[12ch]">{t.h1}</h1>
          <p className="mt-6 max-w-[60ch] text-xl text-cream-50/90">{t.sub}</p>
        </div>
      </section>

      <section aria-labelledby="phow-h" className="grain section pt-0">
        <div className="wrap">
          <h2 id="phow-h" className="h2">
            {t.how.h2}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {t.how.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 80}>
                  <span aria-hidden="true" className="font-display text-[88px] font-extrabold leading-none text-tan-400">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-cream-50/85">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="pterms-h" className="on-cream section bg-cream-50 text-ink">
        <div className="wrap">
          <h2 id="pterms-h" className="h2">
            {t.terms.h2}
          </h2>
          <ul className="mt-10 max-w-[72ch] space-y-4">
            {t.terms.items.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <span aria-hidden="true" className="mt-[2px] font-bold text-forest-600">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pform-h" className="grain section">
        <div className="wrap max-w-[760px]">
          <h2 id="pform-h" className="h2">
            {t.form.h2}
          </h2>
          <p className="mt-4 text-lg text-cream-50/90">{t.form.intro}</p>
          <div className="mt-10">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
