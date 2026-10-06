import type { Campaign } from "@/content/campaigns";
import { isSet } from "@/content/offers";
import { parsePost } from "@/lib/posts";
import posters from "@/content/posters.json";
import VideoTile from "./VideoTile";
import PostEmbed from "./PostEmbed";

const posterMap = posters as Record<string, { poster: string; title: string }>;

export default function CampaignCard({
  c,
  showRole = false,
  compact = false,
  eager = false,
  viewPostLabel = "See the post",
}: {
  c: Campaign;
  showRole?: boolean;
  compact?: boolean;
  eager?: boolean;
  viewPostLabel?: string;
}) {
  const hasUrl = isSet(c.url);
  const post = hasUrl ? parsePost(c.url) : null;
  // Prefer a self-hosted clip if Peter added one. Otherwise the platform post. Otherwise a color tile.
  const media = isSet(c.media) ? (
    <VideoTile media={c.media} poster={c.poster} brand={c.brand} />
  ) : (
    <PostEmbed
      url={hasUrl ? c.url : ""}
      poster={isSet(c.poster) ? c.poster : (hasUrl && posterMap[c.url]?.poster) || null}
      brand={c.brand}
      eager={eager}
    />
  );

  return (
    <article className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:hover:translate-y-0">
      {media}
      <div className="mt-5">
        <p className="font-body text-sm font-medium uppercase tracking-[0.18em] text-forest">
          {c.brand}
          {c.year && <span className="text-offblack/70"> &middot; {c.year}</span>}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink">{c.name}</h3>
        <p
          className={`mt-3 font-display font-extrabold tabular-nums tracking-tight text-ink ${
            compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
          }`}
        >
          {c.result}
        </p>
        <p className="mt-1 font-body text-base text-offblack/70">{c.detail}</p>
        {showRole && c.role && <p className="mt-3 font-body text-base text-offblack">{c.role}</p>}
        {hasUrl && (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-body text-base font-medium text-forest underline underline-offset-4 hover:text-ink"
          >
            {viewPostLabel}
            {post ? ` on ${post.label}` : ""}
          </a>
        )}
      </div>
    </article>
  );
}
