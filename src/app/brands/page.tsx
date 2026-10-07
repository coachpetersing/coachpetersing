import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { audience } from "@/content/stats";
import { offers } from "@/content/offers";
import { pageMeta, descriptions } from "@/lib/seo";
import { bookingHref, mailto } from "@/lib/links";
import Section, { Heading, Eyebrow } from "@/components/Section";
import StatStrip from "@/components/StatStrip";
import Button from "@/components/Button";
import CTA from "@/components/CTA";

export const metadata: Metadata = pageMeta(copy.brands.title, descriptions.brands, "/brands");

export default function BrandsPage() {
  const c = copy.brands;
  const mediaKit = `mailto:${offers.brands.mediaKitEmail}?subject=${encodeURIComponent(c.mediaKitSubject)}`;
  return (
    <>
      <Section dark>
        <Eyebrow>{c.title}</Eyebrow>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">{c.heading}</h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl">{c.intro}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={mediaKit} size="lg">
            {c.mediaKitButton}
          </Button>
          <Button href={bookingHref(offers.brands.bookingUrl)} variant="outline-light" size="lg">
            {copy.common.bookCall}
          </Button>
        </div>
      </Section>

      <Section>
        <Heading>{c.waysHeading}</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.ways.map((w) => (
            <div key={w.title} className="rounded-3xl bg-white p-7 md:p-9">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{w.title}</h3>
              <p className="mt-4 font-body text-base text-offblack md:text-lg">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark className="border-b border-white/10">
        <Heading dark>{c.audienceHeading}</Heading>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {audience.platforms.map((p) => (
            <div key={p.name} className="border-t border-white/15 pt-5">
              <p className="font-body text-sm font-medium uppercase tracking-[0.18em] text-tan">{p.name}</p>
              <p className="mt-3 font-display text-5xl font-extrabold tabular-nums tracking-tight md:text-6xl">{p.followers}</p>
              <p className="mt-1 font-body text-base text-white/70">followers</p>
            </div>
          ))}
        </div>
        <ul className="mt-14 grid gap-4 font-body text-lg text-white/85 md:grid-cols-2 md:text-xl">
          <li className="border-l-2 border-tan pl-5">{audience.coreDemo}</li>
          <li className="border-l-2 border-tan pl-5">{audience.overIndex}</li>
          <li className="border-l-2 border-tan pl-5">{audience.engagement}</li>
          <li className="border-l-2 border-tan pl-5">{audience.safety}</li>
        </ul>
      </Section>

      <StatStrip bordered={false} />

      <CTA
        heading={c.ctaHeading}
        body={c.ctaBody}
        primaryHref={mailto("Brand partnership")}
        primaryLabel={copy.common.emailMe}
      />
    </>
  );
}
