import { offers, isSet, introCallUrl } from "@/content/offers";
import { copy } from "@/content/copy";
import { bookingHref, mailto } from "@/lib/links";
import Button from "./Button";

type Key = "oneOnOne" | "workshop" | "business";

function Price({ price }: { price: number | null }) {
  if (!isSet(price)) return null;
  return <p className="mt-4 font-display text-2xl font-bold tabular-nums text-ink">${price.toLocaleString("en-US")}</p>;
}

export default function OfferCard({ offerKey, body, cta }: { offerKey: Key; body: string; cta: string }) {
  const o = offers[offerKey];
  const c = copy.coaching;

  let action: React.ReactNode;
  let meta: string | null = null;

  if (offerKey === "workshop") {
    const w = offers.workshop;
    meta = isSet(w.nextDate) ? `${c.nextDateLabel}: ${w.nextDate}` : c.nextDateFallback;
    action = isSet(w.waitlistFormAction) ? (
      <form action={String(w.waitlistFormAction)} method="POST" className="flex w-full flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`waitlist-${offerKey}`}>
          Email
        </label>
        <input
          id={`waitlist-${offerKey}`}
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-full border border-ink/20 bg-white px-5 py-3 font-body text-base text-offblack outline-none focus:border-forest"
        />
        <input type="hidden" name="_subject" value="Workshop list" />
        <button
          type="submit"
          className="rounded-full bg-forest px-6 py-3 font-body font-medium text-white transition-colors hover:bg-[#2a5239]"
        >
          {cta}
        </button>
      </form>
    ) : (
      <Button href={mailto("Workshop list", "Add me to the workshop list.")} variant="forest">
        {cta}
      </Button>
    );
  } else if (offerKey === "oneOnOne") {
    action = (
      <div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {offers.oneOnOne.options.map((opt) => (
            <li key={opt.label} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-body text-base font-medium text-ink">{opt.label}</p>
                <p className="font-display text-2xl font-bold tabular-nums text-ink">${opt.priceUsd.toLocaleString("en-US")}</p>
              </div>
              <Button href={bookingHref(opt.bookingUrl)} variant="forest">
                {c.bookOption}
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-body text-base text-offblack">
          {c.introBefore}{" "}
          <a
            href={bookingHref(introCallUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest underline underline-offset-4 hover:text-ink"
          >
            {c.introLink}
          </a>
        </p>
      </div>
    );
  } else {
    action = (
      <Button href={bookingHref(offers.business.bookingUrl)} variant="forest">
        {cta}
      </Button>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7 md:p-9">
      <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink">{o.name}</h3>
      {offerKey === "workshop" && (
        <p className="mt-2 font-body text-base text-forest">{offers.workshop.location}</p>
      )}
      <p className="mt-5 flex-1 font-body text-base text-offblack md:text-lg">{body}</p>
      <Price price={o.priceUsd} />
      {meta && <p className="mt-5 font-body text-base font-medium text-offblack/70">{meta}</p>}
      <div className="mt-6">{action}</div>
    </article>
  );
}
