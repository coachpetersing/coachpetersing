import type { Slot } from "@/lib/roster";
import { copy, fill } from "@/content/copy";
import TryoutLink from "./TryoutLink";
import { describe } from "@/lib/describe";

const pad = (n: number) => String(n).padStart(2, "0");

/** One jersey on the roster grid. Also used for the live preview on the intake form. */
export default function JerseyCard({ slot }: { slot: Slot }) {
  const base = "relative flex h-full min-h-[128px] flex-col rounded-card p-3 sm:aspect-[3/4] sm:min-h-0 sm:p-4";
  const num = "font-display text-[44px] font-extrabold leading-none tabular-nums sm:text-[64px]";

  if (slot.kind === "open") {
    return (
      <TryoutLink
        location="roster_card"
        className={`${base} group border-2 border-dashed border-tan-400/70 transition duration-200 hover:-translate-y-1 hover:border-tan-400 hover:bg-forest-900 motion-reduce:hover:translate-y-0`}
        aria-label={fill(copy.roster.openLabel, { n: pad(slot.number) })}
      >
        <span className={`${num} text-muted`}>{pad(slot.number)}</span>
        <span className="mt-auto text-sm font-semibold uppercase tracking-[0.12em] text-cream-50">
          <span className="group-hover:hidden group-focus-visible:hidden">{copy.roster.open}</span>
          <span className="hidden text-tan-400 group-hover:inline group-focus-visible:inline">{copy.roster.openHover}</span>
        </span>
      </TryoutLink>
    );
  }

  if (slot.kind === "private") {
    return (
      <div className={`${base} card`}>
        <span className={`${num} text-tan-400`}>{pad(slot.number)}</span>
        <span className="mt-auto text-sm font-medium text-muted">{copy.roster.private}</span>
      </div>
    );
  }

  const e = slot.entry;
  return (
    <div className={`${base} card`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`${num} text-tan-400`}>{pad(slot.number)}</span>
        <span className="mt-1 hidden rounded-full border border-forest-600 px-2 py-0.5 text-sm font-medium text-cream-50 sm:inline">
          {copy.roster.planTag[e.plan]}
        </span>
      </div>
      <div className="mt-auto">
        <p className="text-sm font-medium leading-snug text-cream-50">{describe(e)}</p>
        {e.region && <p className="mt-0.5 text-sm text-muted">{e.region}</p>}
        <p className="mt-1 text-sm text-muted sm:hidden">{copy.roster.planTag[e.plan]}</p>
      </div>
    </div>
  );
}
