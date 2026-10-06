import Image from "next/image";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import Button from "./Button";
import HeroText from "./HeroText";

/**
 * Below lg: photo on top (4:5 on phones, 4:3 on tablets, framed on the face), text below on cream.
 * lg and up: the photo fills the hero, anchored right. The hero is never taller than the photo
 * would be at full width (67vw), so the photo always spans the viewport and his hair starts at
 * about 53% across. The text column ends at 46vw and a cream gradient covers the left 40%.
 */
export default function Hero() {
  const c = copy.home;
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-cream text-ink">
      <div className="lg:mx-0 lg:grid lg:h-[min(67vw,calc(100svh-5rem))] lg:min-h-[560px] lg:items-center">
        {site.headshot && (
          <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
            <Image
              src={site.headshot}
              alt="Peter Sing"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[72%_35%] lg:object-right"
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-gradient-to-r from-cream from-0% via-cream via-40% to-transparent to-[46%] lg:block"
            />
          </div>
        )}

        <div className="relative px-5 pb-16 pt-10 md:px-8 lg:box-border lg:w-[46vw] lg:py-16 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:pr-6">
          <HeroText headline={c.headline} sub={c.sub} />
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={site.workWithMeUrl} size="lg">
              {c.primaryCta}
            </Button>
            <Button href="/work" variant="outline-dark" size="lg">
              {c.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
