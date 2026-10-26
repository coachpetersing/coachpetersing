import Image from "next/image";
import { copy, fill } from "@/content/copy";
import { products, productIds, stats, media, site } from "@/content/site";
import { caseStudies, repeatLine } from "@/content/caseStudies";
import BrandMarquee from "@/components/BrandMarquee";
import StatCounter from "@/components/StatCounter";
import Faq from "@/components/Faq";
import CaseStudyCard from "@/components/CaseStudyCard";
import BuyButton from "@/components/BuyButton";
import PartnerNote from "@/components/PartnerNote";
import PartnerCode from "@/components/PartnerCode";
import ViewTracker from "@/components/ViewTracker";
import Reveal from "@/components/Reveal";

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
      name: "Content coaching",
      serviceType: "Content coaching",
      provider: { "@type": "Person", name: "Peter Sing", url: site.url },
      areaServed: { "@type": "Country", name: "United States" },
      offers: productIds.map((id) => ({
        "@type": "Offer",
        name: products[id].name,
        price: products[id].price,
        priceCurrency: "USD",
        ...(products[id].per === "month"
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: products[id].price,
                priceCurrency: "USD",
                unitCode: "MON",
                referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
              },
            }
          : {}),
        url: `${site.url}/#prices`,
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Home() {
  return (
    <>
      <JsonLd />

      {/* Hero: words on the left, the numbers on the right, logos right underneath. */}
      <section id="hero" className="grain section pb-10 pt-10 lg:pb-14 lg:pt-16">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="kicker text-tan-400">{copy.hero.kicker}</p>
            <h1 className="h1 mt-4 max-w-[12ch]">{copy.hero.h1}</h1>
            <p className="mt-6 max-w-[52ch] text-lg text-cream-50/90">{copy.hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BuyButton product="call" location="hero">
                {copy.hero.primary}, {money(products.call.price)}
              </BuyButton>
              <a href="#prices" className="btn-secondary">
                {copy.hero.secondary}
              </a>
            </div>
          </div>
          <ul aria-label="By the numbers" className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <li key={s.label} className={`card animate-rise p-5 sm:p-6 lg:p-7 ${i % 3 === 0 ? "bg-forest-800/60" : ""}`} style={{ animationDelay: `${120 + i * 70}ms` }}>
                <StatCounter {...s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand logos */}
      <BrandMarquee />

      {/* Prices */}
      <section id="prices" aria-labelledby="prices-h" className="on-cream section bg-cream-50 text-ink">
        <ViewTracker event="prices_view">
          <div className="wrap">
            <h2 id="prices-h" className="h2">
              {copy.prices.h2}
            </h2>
            <p className="mt-4 text-lg">{copy.prices.sub}</p>

            <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
              {productIds.map((id) => {
                const p = products[id];
                return (
                  <article key={id} className="flex flex-col rounded-card border border-cream-200 bg-white/60 p-6 sm:p-8">
                    <h3 className="font-display text-5xl font-extrabold uppercase leading-none">{p.name}</h3>
                    <p className="kicker mt-2 text-forest-600">{p.tagline}</p>
                    <p className="mt-5 flex items-baseline gap-1">
                      <span className="font-display text-[56px] font-extrabold leading-none">{money(p.price)}</span>
                      <span className="text-base text-ink/80">{p.per === "month" ? copy.prices.perMonth : copy.prices.once}</span>
                    </p>
                    <PartnerNote product={id} />
                    <ul className="mt-6 space-y-3">
                      {p.lines.map((f) => (
                        <li key={f} className="flex gap-3">
                          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" className="mt-1 shrink-0 text-forest-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 10.5l4 4 8-9" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <BuyButton product={id} location={`price_${id}`} className="btn-dark w-full">
                        {p.cta}
                        <span className="sr-only">: {p.name}</span>
                      </BuyButton>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 max-w-[80ch] text-sm text-ink/85">{copy.prices.fine}</p>
            <PartnerCode />
          </div>
        </ViewTracker>
      </section>

      {/* About */}
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

      {/* How it works */}
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

      {/* What a call looks like */}
      <section id="call" aria-labelledby="call-h" className="grain section">
        <div className="wrap">
          <h2 id="call-h" className="h2">
            {copy.onePager.h2}
          </h2>
          <p className="mt-4 max-w-[60ch] text-cream-50/85">{copy.onePager.body}</p>
          <figure className="mt-10">
            <ol className="grid gap-3 sm:grid-cols-3">
              {copy.onePager.parts.map((p, i) => (
                <li key={p.label} className="card p-6">
                  <span aria-hidden="true" className="kicker text-muted">
                    {i + 1}
                  </span>
                  <span className="mt-2 block font-display text-4xl font-extrabold text-tan-400">{p.label}</span>
                  <span className="mt-2 block text-cream-50/85">{p.text}</span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-4 text-sm text-muted">{copy.onePager.caption}</figcaption>
          </figure>
          <p className="mt-8">
            {media.samplePdf ? (
              <a href={media.samplePdf} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {copy.onePager.sample}
              </a>
            ) : (
              <span className="kicker text-muted">{copy.onePager.placeholder}</span>
            )}
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="who-h" className="grain section">
        <div className="wrap">
          <h2 id="who-h" className="h2">
            {copy.who.h2}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
            {[copy.who.creators, copy.who.owners].map((c) => (
              <article key={c.title} className="card p-6 sm:p-8">
                <h3 className="font-display text-4xl font-extrabold uppercase text-tan-400">{c.title}</h3>
                <p className="mt-4 text-lg text-cream-50/90">{c.body}</p>
              </article>
            ))}
            <article className="on-cream rounded-card bg-cream-50 p-6 text-ink sm:p-8 md:col-span-2">
              <h3 className="font-display text-3xl font-extrabold uppercase">{copy.who.notFor.title}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {copy.who.notFor.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg">
                    <span aria-hidden="true" className="font-bold text-forest-600">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-8 text-cream-50/85">
            {copy.who.brands.text}{" "}
            <a href={copy.who.brands.link.href} className="link font-semibold">
              {copy.who.brands.link.label} →
            </a>
          </p>
        </div>
      </section>

      {/* Work */}
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

      {/* FAQ */}
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

      {/* Final CTA */}
      <section aria-labelledby="final-h" className="grain section bg-forest-900 py-24 lg:py-32">
        <div className="wrap text-center">
          <h2 id="final-h" className="h1">
            {copy.final.h2}
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg text-cream-50/90">{fill(copy.final.sub, { call: products.call.price })}</p>
          <div className="mt-8 flex justify-center">
            <BuyButton product="call" location="final">
              {copy.final.cta}, {money(products.call.price)}
            </BuyButton>
          </div>
        </div>
      </section>
    </>
  );
}
