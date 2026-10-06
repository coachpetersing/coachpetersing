"use client";

import { useEffect, useRef, useState } from "react";
import { parsePost } from "@/lib/posts";
import { copy } from "@/content/copy";

const tileStyles = ["bg-forest text-cream", "bg-tan text-ink", "bg-ink text-cream", "bg-[#2a5239] text-cream"];
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Poster with a play button. On click, loads the platform's official embed inline.
 * Nothing loads until the click, and the embed never autoplays with sound.
 * If the embed doesn't load in time, the poster stays and the outbound link remains.
 */
export default function PostEmbed({
  url,
  poster,
  brand,
  eager = false,
}: {
  url: string;
  poster: string | null;
  brand: string;
  eager?: boolean;
}) {
  const post = parsePost(url);
  // idle: poster. loading: embed requested. slow: still waiting, show the outbound link too.
  // loaded: embed up. failed: embed errored, back to the poster with the outbound link.
  const [state, setState] = useState<"idle" | "loading" | "slow" | "loaded" | "failed">("idle");
  const timer = useRef<number>(0);

  useEffect(() => {
    if (state !== "loading") return;
    timer.current = window.setTimeout(() => setState("slow"), 8000);
    return () => window.clearTimeout(timer.current);
  }, [state]);

  const tile = tileStyles[hash(brand) % tileStyles.length];
  const showEmbed = post && (state === "loading" || state === "slow" || state === "loaded");

  return (
    <div className={`relative aspect-[9/16] overflow-hidden rounded-2xl ${poster ? "bg-ink" : tile}`}>
      {/* Poster layer */}
      {!showEmbed && (
        <>
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt={`${brand} post`}
              className="h-full w-full object-cover"
              loading={eager ? "eager" : "lazy"}
              decoding="async"
            />
          ) : (
            <span className="absolute bottom-5 left-5 right-5 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl">
              {brand}
            </span>
          )}
          {post && state !== "failed" && (
            <button
              type="button"
              onClick={() => setState("loading")}
              aria-label={`${copy.work.play} ${brand} on ${post.label}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg transition-transform group-hover:scale-105">
                <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">
                  <path d="M2 1.5v21l18-10.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}
          {post && state === "failed" && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-4 bottom-4 rounded-full bg-cream/95 px-4 py-3 text-center font-body text-base font-medium text-ink"
            >
              {copy.work.openOn} {post.label}
            </a>
          )}
        </>
      )}

      {/* Embed layer */}
      {showEmbed && post && (
        <>
          {(state === "loading" || state === "slow") && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-cream/30 border-t-cream" aria-hidden="true" />
            </div>
          )}
          {state === "slow" && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-4 bottom-4 z-10 rounded-full bg-cream/95 px-4 py-3 text-center font-body text-base font-medium text-ink"
            >
              {copy.work.openOn} {post.label}
            </a>
          )}
          <iframe
            src={post.embedUrl}
            title={`${brand} on ${post.label}`}
            className="relative h-full w-full border-0"
            allow="encrypted-media; picture-in-picture"
            loading="lazy"
            onLoad={() => setState("loaded")}
            onError={() => setState("failed")}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </>
      )}
    </div>
  );
}
