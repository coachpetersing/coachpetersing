import Image from "next/image";
import { copy, fill } from "@/content/copy";
import { plans, stats, media, site, openingDay, COACHING_CAP, type PlanId } from "@/content/site";
import { caseStudies, repeatLine } from "@/content/caseStudies";
import { getRoster, buildSlots } from "@/lib/roster";
import { heroStatus } from "@/lib/status";
import { shortDate } from "@/lib/dates";
import HeroVideo from "@/components/HeroVideo";
import StatCounter from "@/components/StatCounter";
import Marquee from "@/components/Marquee";
import SampleReview from "@/components/SampleReview";
import Faq from "@/components/Faq";
import JerseyCard from "@/components/JerseyCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import TryoutLink from "@/components/TryoutLink";
import ViewTracker from "@/components/ViewTracker";
import Reveal from "@/components/Reveal";

export const revalidate = 3600;

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Peter Sing",
      url: site.url,
      jobTitle: "Content coach",
      address: { "@type": "PostalAddress", addressLocality: "Orange County", addressRegion: "CA", addressCountry: "US" },
      sameAs: site.social.map((s) => s.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Content coaching roster",
      serviceType: "Content coaching",
      provider: { "@type": "Person", name: "Peter Sing", url: site.url },
      areaServed: { "@type": "Country", name: "United States" },
      offers: (Object.keys(plans) as PlanId[]).map((id) => ({
        "@type": "Offer",
        name: plans[id].name,
        price: plans[id].price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plans[id].price,
          priceCurrency: "USD",
          unitCode: "MON",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
        url: `${site.url}/tryouts?plan=${id}`,
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function Home() {
  const roster = await getRoster();
  const slots = buildSlots(roster);
  const coachingFull = roster.coachingOpen <= 0;

  return (
    <>
      <JsonLd />

      {/* 5.1 Hero */}
      <section id="hero" className="grain section pt-8 lg:pt-16">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="kicker text-tan-400">{copy.hero.kicker}</p>
            <h1 className="h1 mt-4">{copy.hero.h1}</h1>
            <p className="mt-6 max-w-[60ch] text-cream-50/90">{copy.hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TryoutLink location="hero">{copy.hero.primary}</TryoutLink>
              <a href="#sample" className="btn-secondary">
                {copy.hero.secondary}
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-cream-50">
              <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${roster.open > 0 ? "bg-tan-400" : "bg-muted"}`} />
              {heroStatus(roster)}
            </p>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* 5.2 Stats */}
      <section aria-label="By the numbers" className="grain px-4 pb-16 sm:px-6">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 border-t border-forest-800 pt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* 5.3 Marquee */}
      <Marquee />

      {/* 5.4 How it works */}
      <section id="how" aria-labelledby="how-h" className="grain section">
        <div className="wrap">
          <h2 id="how-h" className="h2">
            {copy.how.h2}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {copy.how.steps.map((s, i) => (
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

      {/* 5.5 What you get */}
      <section id="what" aria-labelledby="what-h" className="grain section">
        <div className="wrap">
          <h2 id="what-h" className="h2">
            {copy.what.h2}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-6 lg:gap-6">
            <article className="card p-6 sm:p-8 md:col-span-4 md:row-span-2">
              <h3 className="font-display text-5xl font-extrabold uppercase text-tan-400">{copy.what.review.title}</h3>
              <p className="mt-4 max-w-[52ch] text-cream-50/90">{copy.what.review.body}</p>
              <figure className="mt-8">
                <ol className="grid gap-3 sm:grid-cols-3">
                  {copy.what.review.parts.map((p) => (
                    <li key={p.label} className="rounded-xl border border-forest-800 bg-forest-950 p-4">
                      <span className="font-display text-3xl font-extrabold text-tan-400">{p.label}</span>
                      <span className="mt-1 block text-sm text-cream-50/85">{p.text}</span>
                    </li>
                  ))}
                </ol>
                <figcaption className="mt-3 text-sm text-muted">{copy.what.review.caption}</figcaption>
              </figure>
            </article>
            <article className="card p-6 sm:p-8 md:col-span-2">
              <h3 className="kicker text-tan-400">{copy.what.turnaround.title}</h3>
              <p className="mt-3 font-display text-3xl font-bold uppercase leading-tight">{copy.what.turnaround.body}</p>
            </article>
            <article className="card p-6 sm:p-8 md:col-span-2">
              <h3 className="kicker text-tan-400">{copy.what.audit.title}</h3>
              <p className="mt-3 text-lg">{copy.what.audit.body}</p>
            </article>
            <article className="card p-6 sm:p-8 md:col-span-6 lg:col-span-4">
              <h3 className="font-display text-5xl font-extrabold uppercase text-tan-400">{copy.what.brief.title}</h3>
              <p className="mt-4 max-w-[60ch] text-cream-50/90">{copy.what.brief.body}</p>
            </article>
            <article className="on-cream rounded-card bg-cream-50 p-6 text-ink sm:p-8 md:col-span-6 lg:col-span-2">
              <p className="text-lg font-medium">{copy.what.coach}</p>
            </article>
          </div>
        </div>
      </section>

      {/* 5.6 Sample review */}
      <section id="sample" aria-labelledby="sample-h" className="grain section">
        <div className="wrap">
          <h2 id="sample-h" className="h2">
            {copy.sample.h2}
          </h2>
          <p className="mt-4 max-w-[60ch] text-cream-50/85">{copy.sample.sub}</p>
          <div className="mt-10">
            <SampleReview />
          </div>
        </div>
      </section>

      {/* 5.7 Plans */}
      <section id="plans" aria-labelledby="plans-h" className="on-cream section bg-cream-50 text-ink">
        <ViewTracker event="plan_view">
          <div className="wrap">
            <h2 id="plans-h" className="h2">
              {copy.plans.h2}
            </h2>
            <p className="mt-4 text-lg">{copy.plans.sub}</p>

            {roster.openingDayLeft > 0 && (
              <p className="mt-8 rounded-card border-2 border-forest-600 bg-white/50 p-5 font-medium">
                {fill(copy.plans.openingDay, {
                  spots: roster.openingDayMax || openingDay.spots,
                  notesOD: plans.notes.openingDayPrice,
                  coachingOD: plans.coaching.openingDayPrice,
                  months: openingDay.months,
                  left: roster.openingDayLeft,
                })}
              </p>
            )}

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-6">
              {(Object.keys(plans) as PlanId[]).map((id) => {
                const p = plans[id];
                return (
                  <article key={id} className="flex flex-col rounded-card border border-cream-200 bg-white/60 p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-5xl font-extrabold uppercase">{p.name}</h3>
                      {id === "coaching" && (
                        <span className="mt-2 rounded-full bg-ink px-3 py-1 text-sm font-semibold text-cream-50">
                          {coachingFull ? copy.plans.coachingFull : fill(copy.plans.coachingBadge, { cap: COACHING_CAP })}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-[64px] font-extrabold leading-none">${p.price}</span>
                      <span className="text-lg">{copy.plans.perMonth}</span>
                    </p>
                    <ul className="mt-6 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" className="mt-1 shrink-0 text-forest-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 10.5l4 4 8-9" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-cream-200 pt-4 text-ink/85">
                      <span className="font-semibold text-ink">{copy.plans.goodFor}: </span>
                      {p.goodFor}
                    </p>
                    <div className="mt-auto pt-8">
                      <TryoutLink location={`plan_${id}`} href={`/tryouts?plan=${id}`} className="btn-dark w-full">
                        {copy.plans.cta}
                        <span className="sr-only"> for {p.name}</span>
                      </TryoutLink>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 max-w-[80ch] text-sm text-ink/85">{copy.plans.fine}</p>
          </div>
        </ViewTracker>
      </section>

      {/* 5.8 Roster */}
      <section id="roster" aria-labelledby="roster-h" className="grain section">
        <div className="wrap">
          <h2 id="roster-h" className="h2">
            {copy.roster.h2}
          </h2>
          <p className="mt-4 max-w-[60ch] text-cream-50/85">{copy.roster.sub}</p>
          <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-forest-800 px-4 py-2 text-sm font-medium">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${roster.open > 0 ? "bg-tan-400" : "bg-muted"}`} />
            {fill(copy.roster.status, {
              filled: roster.filled,
              size: roster.size,
              open: roster.open,
              updated: shortDate(new Date(roster.updatedAt)),
            })}
          </p>
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
            {slots.map((s) => (
              <li key={s.number}>
                <JerseyCard slot={s} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[56ch] text-cream-50/85">{copy.roster.draft}</p>
            <TryoutLink location="roster">{copy.roster.cta}</TryoutLink>
          </div>
        </div>
      </section>

      {/* 5.9 Work */}
      <section id="work" aria-labelledby="work-h" className="grain section">
        <div className="wrap">
          <h2 id="work-h" className="h2">
            {copy.work.h2}
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.url} c={c} />
            ))}
          </div>
          <p className="mt-10 text-lg text-cream-50/90">{repeatLine}</p>
        </div>
      </section>

      {/* 5.10 Who it's for */}
      <section aria-labelledby="who-h" className="grain section">
        <div className="wrap">
          <h2 id="who-h" className="h2">
            {copy.who.h2}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
            {[
              { ...copy.who.notFor, mark: "✕", tone: "text-muted" },
              { ...copy.who.isFor, mark: "✓", tone: "text-tan-400" },
            ].map((c) => (
              <article key={c.title} className="card p-6 sm:p-8">
                <h3 className={`font-display text-3xl font-extrabold uppercase ${c.tone}`}>{c.title}</h3>
                <ul className="mt-5 space-y-3">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-3 text-lg text-cream-50/90">
                      <span aria-hidden="true" className={`font-bold ${c.tone}`}>
                        {c.mark}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 text-cream-50/85">
            {copy.who.brands.text}{" "}
            <a href={copy.who.brands.link.href} className="link font-semibold">
              {copy.who.brands.link.label} →
            </a>
          </p>
        </div>
      </section>

      {/* 5.11 About */}
      <section aria-labelledby="about-h" className="grain section">
        <div className="wrap grid items-center gap-10 md:grid-cols-[2fr_3fr] lg:gap-16">
          {media.aboutPhoto && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-forest-800">
              <Image src={media.aboutPhoto} alt={media.aboutPhotoAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
            </div>
          )}
          <div>
            <h2 id="about-h" className="h2">
              {copy.about.h2}
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg text-cream-50/90">{copy.about.body}</p>
          </div>
        </div>
      </section>

      {/* 5.12 FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="on-cream section bg-cream-50 text-ink">
        <div className="wrap">
          <h2 id="faq-h" className="h2">
            {copy.faq.h2}
          </h2>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      {/* 5.13 Final CTA */}
      <section aria-labelledby="final-h" className="grain section bg-forest-900 py-24 lg:py-32">
        <div className="wrap text-center">
          <h2 id="final-h" className="h1">
            {copy.final.h2}
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg text-cream-50/90">{copy.final.sub}</p>
          <div className="mt-8 flex justify-center">
            <TryoutLink location="final">{copy.final.cta}</TryoutLink>
          </div>
        </div>
      </section>
    </>
  );
}
