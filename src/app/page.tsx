import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { credibility } from "@/content/stats";
import { featuredCampaigns } from "@/content/campaigns";
import { resolveMedia } from "@/lib/media";
import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import BrandMarquee from "@/components/BrandMarquee";
import CampaignCard from "@/components/CampaignCard";
import AudienceCards from "@/components/AudienceCards";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import Section, { Heading } from "@/components/Section";

export default function Home() {
  const c = copy.home;
  const featured = resolveMedia(featuredCampaigns);
  return (
    <>
      <Hero />
      <StatStrip />
      <BrandMarquee heading={c.marqueeHeading} />

      {/* Featured work */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading>{c.workHeading}</Heading>
          <Link href="/work" className="font-body text-lg font-medium text-forest underline underline-offset-4 hover:text-ink">
            {c.workLink}
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cp, i) => (
            <Reveal key={`${cp.url}-${cp.name}`} delay={i * 0.06}>
              <CampaignCard c={cp} compact />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Who I help */}
      <Section tone="sand">
        <Heading>{c.whoHeading}</Heading>
        <div className="mt-12">
          <AudienceCards />
        </div>
      </Section>

      {/* How I work */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Heading>{c.howHeading}</Heading>
          </div>
          <div className="space-y-8 md:col-span-7 md:col-start-6">
            {c.how.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="font-body text-xl text-offblack md:text-2xl md:leading-snug">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Credibility row */}
      <section className="border-y border-ink/10 bg-cream">
        <ul className="mx-auto flex w-full max-w-site flex-wrap gap-x-10 gap-y-3 px-5 py-8 font-body text-base text-offblack/70 md:px-8">
          {credibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* About teaser */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-12">
          {site.secondPhoto && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:col-span-5">
              <Image src={site.secondPhoto} alt="Peter Sing" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className={site.secondPhoto ? "md:col-span-6 md:col-start-7" : "md:col-span-9"}>
            <p className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{c.aboutTeaser}</p>
            <Link href="/about" className="mt-8 inline-block font-body text-lg font-medium text-forest underline underline-offset-4 hover:text-ink">
              {c.aboutLink}
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Heading>{c.faqHeading}</Heading>
          </div>
          <div className="md:col-span-8">
            <FAQ />
          </div>
        </div>
      </Section>

      <CTA heading={c.ctaHeading} body={c.ctaBody} />
    </>
  );
}
