import { offers, isSet } from "@/content/offers";
import { copy } from "@/content/copy";
import { bookingHref } from "@/lib/links";
import Button from "./Button";
import ConsultNote from "./ConsultNote";

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
    meta = isSet(w.nextDate) ? `${c.nextDateLabel}: ${w.nextDate}` : null;
    action = (
      <Button href="/contact" variant="forest">
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
        <ConsultNote variant="coaching" className="mt-5" />
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
