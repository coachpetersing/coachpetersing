import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { campaigns, repeatPartners } from "@/content/campaigns";
import { resolveMedia } from "@/lib/media";
import { pageMeta, descriptions } from "@/lib/seo";
import Section, { Heading, Eyebrow } from "@/components/Section";
import WorkGrid from "@/components/WorkGrid";
import BrandWall from "@/components/BrandWall";
import CTA from "@/components/CTA";

export const metadata: Metadata = pageMeta(copy.work.title, descriptions.work, "/work");

export default function WorkPage() {
  const c = copy.work;
  return (
    <>
      <Section dark>
        <Eyebrow>{c.title}</Eyebrow>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-8xl">{c.heading}</h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl">{c.intro}</p>
      </Section>

      <Section>
        <h2 className="sr-only">Campaigns</h2>
        <WorkGrid campaigns={resolveMedia(campaigns)} />
      </Section>

      <Section dark>
        <Heading dark>{c.repeatHeading}</Heading>
        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {repeatPartners.map((p) => (
            <div key={p.brand} className="border-t border-white/15 pt-5">
              <dt className="font-display text-2xl font-bold uppercase tracking-wide text-cream">{p.brand}</dt>
              <dd className="mt-1 font-body text-base text-tan">{p.note}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <Heading>{c.wallHeading}</Heading>
        <div className="mt-12">
          <BrandWall />
        </div>
      </Section>

      <CTA heading={c.ctaHeading} body={c.ctaBody} primaryHref="/brands" primaryLabel={c.ctaButton} />
    </>
  );
}
