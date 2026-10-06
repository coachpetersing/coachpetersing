import type { Campaign } from "@/content/campaigns";
import { isSet } from "@/content/offers";
import VideoTile from "./VideoTile";

export default function CampaignCard({
  c,
  showRole = false,
  compact = false,
  viewPostLabel = "See the post",
}: {
  c: Campaign;
  showRole?: boolean;
  compact?: boolean;
  viewPostLabel?: string;
}) {
  return (
    <article className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:hover:translate-y-0">
      <VideoTile media={c.media} poster={c.poster} brand={c.brand} />
      <div className="mt-5">
        <p className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">{c.brand}</p>
        <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink">{c.name}</h3>
        <p
          className={`mt-3 font-display font-extrabold tabular-nums tracking-tight text-ink ${
            compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
          }`}
        >
          {c.result}
        </p>
        <p className="mt-1 font-body text-base text-offblack/70">{c.detail}</p>
        {showRole && <p className="mt-3 font-body text-base text-offblack">{c.role}</p>}
        {isSet(c.url) && (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-body text-base font-medium text-forest underline underline-offset-4 hover:text-ink"
          >
            {viewPostLabel}
          </a>
        )}
      </div>
    </article>
  );
}
