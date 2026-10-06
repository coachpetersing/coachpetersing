import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import { mailto } from "@/lib/links";
import Section, { Heading, Eyebrow } from "@/components/Section";
import OfferCard from "@/components/OfferCard";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export const metadata: Metadata = pageMeta(copy.coaching.title, descriptions.coaching, "/coaching");

export default function CoachingPage() {
  const c = copy.coaching;
  return (
    <>
      <Section dark>
        <Eyebrow>{c.title}</Eyebrow>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-8xl">{c.heading}</h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl">{c.intro}</p>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {c.offers.map((o) => (
            <OfferCard key={o.key} offerKey={o.key} body={o.body} cta={o.cta} />
          ))}
        </div>
        <p className="mt-12 font-body text-lg text-offblack md:text-xl">
          {c.closerBefore}{" "}
          <a href={mailto("Coaching")} className="font-medium text-forest underline underline-offset-4 hover:text-ink">
            {c.closerLink}
          </a>{" "}
          {c.closerAfter}
        </p>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Heading>{copy.home.faqHeading}</Heading>
          </div>
          <div className="md:col-span-8">
            <FAQ />
          </div>
        </div>
      </Section>

      <CTA heading={copy.home.ctaHeading} body={copy.home.ctaBody} />
    </>
  );
}
