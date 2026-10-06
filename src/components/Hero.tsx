import Image from "next/image";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import Button from "./Button";
import SocialLinks from "./SocialLinks";
import HeroText from "./HeroText";

export default function Hero() {
  const c = copy.home;
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-ink text-white">
      {/* Headshot: full-bleed behind the text on mobile, right half on desktop. */}
      {site.headshot ? (
        <div className="absolute inset-0 md:left-1/2">
          <Image
            src={site.headshot}
            alt="Peter Sing"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20 md:bg-gradient-to-r md:from-ink md:via-ink/40 md:to-transparent" />
        </div>
      ) : (
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-1/2 md:block"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 20%, #1F3D2B 0%, #0E1A12 70%)",
          }}
        >
          <p className="absolute bottom-10 right-8 select-none font-display text-[13vw] font-extrabold leading-none text-white/[0.04]">
            {site.handle}
          </p>
        </div>
      )}

      <div className="relative mx-auto grid min-h-[88svh] w-full max-w-site items-end px-5 pb-16 pt-20 md:min-h-[86vh] md:grid-cols-12 md:items-center md:px-8 md:pb-24 md:pt-24">
        <div className="md:col-span-7">
          <HeroText headline={c.headline} sub={c.sub} />
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              {c.primaryCta}
            </Button>
            <Button href="/work" variant="outline-light" size="lg">
              {c.secondaryCta}
            </Button>
          </div>
          <SocialLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
