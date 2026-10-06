import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { bookingHref, mailto } from "@/lib/links";
import Button from "./Button";

export default function CTA({
  heading,
  body,
  primaryHref,
  primaryLabel,
  showAll = true,
}: {
  heading: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  showAll?: boolean;
}) {
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-site px-5 md:px-8">
        <h2 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">{heading}</h2>
        <p className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {primaryHref && primaryLabel ? (
            <Button href={primaryHref} size="lg">
              {primaryLabel}
            </Button>
          ) : (
            <Button href={mailto()} size="lg">
              {copy.common.emailMe}
            </Button>
          )}
          {showAll && (
            <>
              <Button href={bookingHref()} variant="outline-light" size="lg">
                {copy.common.bookCall}
              </Button>
              <Button href={site.social.instagram} variant="outline-light" size="lg">
                {copy.common.dm}
              </Button>
            </>
          )}
        </div>
        <a href={`mailto:${site.email}`} className="mt-10 inline-block font-body text-lg text-tan underline-offset-4 hover:underline">
          {site.email}
        </a>
      </div>
    </section>
  );
}
