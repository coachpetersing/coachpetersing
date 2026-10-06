import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import Section, { Heading, Eyebrow } from "@/components/Section";
import CTA from "@/components/CTA";

export const metadata: Metadata = pageMeta(copy.about.title, descriptions.about, "/about");

export default function AboutPage() {
  const c = copy.about;
  return (
    <>
      <Section dark>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>{c.title}</Eyebrow>
            <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-8xl">{c.heading}</h1>
          </div>
          {site.headshot && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:col-span-4 md:col-start-9">
              <Image src={site.headshot} alt="Peter Sing" fill priority sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-7 md:col-span-7">
            {c.body.map((p, i) => (
              <p key={i} className={`font-body text-offblack ${i === 0 ? "text-xl md:text-2xl md:leading-snug" : "text-lg md:text-xl"}`}>
                {p}
              </p>
            ))}
            <p className="pt-2 font-body text-base text-offblack/70">{c.education}</p>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <ol className="space-y-8 border-l-2 border-tan pl-6">
              {c.timeline.map((t) => (
                <li key={t.what}>
                  <p className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{t.when}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">{t.what}</p>
                  <p className="mt-1 font-body text-base text-offblack/80">{t.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <p className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{c.familyHeading}</p>
              <ul className="mt-3 space-y-2">
                {site.familySocial.map((f) => (
                  <li key={f.name}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="font-body text-lg text-ink underline underline-offset-4 hover:text-forest">
                      {site.familyHandle} on {f.name} <span className="text-offblack/60">{f.followers}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CTA heading={copy.home.ctaHeading} body={copy.home.ctaBody} />
    </>
  );
}
