import Image from "next/image";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import Button from "./Button";
import HeroText from "./HeroText";
import ConsultNote from "./ConsultNote";

/**
 * Solid cream hero. From md up: two columns, text on the left (about 60%) and the headshot as a
 * framed 4:5 card on the right (about 40%), vertically centered. On phones the card sits on top
 * at about 70% of the screen width, with the text below.
 *
 * The card crops the landscape headshot to 4:5 using its full height, centered on the face
 * (about 69% across the original), so the head and shoulders keep some room on each side.
 */
export default function Hero() {
  const c = copy.home;
  return (
    <section id="hero" className="bg-cream text-ink">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[3fr_2fr] md:gap-10 md:px-8 md:py-16 lg:gap-16 lg:py-20">
        {site.headshot && (
          <div className="md:order-2 md:flex md:justify-end">
            <div className="relative mx-auto aspect-[4/5] w-[70vw] max-w-[300px] overflow-hidden rounded-2xl border border-[#E2D9C6] bg-[#EFE8DA] shadow-[0_24px_48px_-24px_rgba(14,26,18,0.35)] md:mx-0 md:w-full md:max-w-[300px] lg:max-w-[380px]">
              <Image
                src={site.headshot}
                alt="Peter Sing"
                fill
                priority
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 300px, 70vw"
                className="object-cover object-[90%_50%]"
              />
            </div>
          </div>
        )}

        <div className="md:order-1">
          <HeroText headline={c.headline} sub={c.sub} />
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={site.workWithMeUrl} size="lg">
              {c.primaryCta}
            </Button>
            <Button href="/work" variant="outline-dark" size="lg">
              {c.secondaryCta}
            </Button>
          </div>
          <ConsultNote className="mt-5" />
        </div>
      </div>
    </section>
  );
}
