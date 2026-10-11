"use client";

import { useState } from "react";
import Image from "next/image";
import { media } from "@/content/site";
import { copy } from "@/content/copy";
import { track } from "@/lib/track";

function loomEmbed(src: string) {
  const m = src.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/i);
  return m ? `https://www.loom.com/embed/${m[1]}?autoplay=1&hide_owner=true&hide_share=true` : null;
}

/** Poster and play button. The player (Loom or MP4) only loads after a click. */
export default function SampleReview() {
  const [playing, setPlaying] = useState(false);
  const { src, poster, captions } = media.sampleReview;

  if (!src) {
    return (
      <div className="card grain flex aspect-video w-full items-center justify-center p-6 text-center">
        <p className="font-display text-3xl font-bold uppercase text-muted sm:text-4xl">{copy.sample.placeholder}</p>
      </div>
    );
  }

  const loom = loomEmbed(src);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-forest-800 bg-forest-900">
      {playing ? (
        loom ? (
          <iframe src={loom} title={copy.sample.title} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
        ) : (
          <video className="absolute inset-0 h-full w-full" controls autoPlay playsInline poster={poster ?? undefined} aria-label={copy.sample.title}>
            <source src={src} type="video/mp4" />
            {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
          </video>
        )
      ) : (
        <button
          type="button"
          className="group absolute inset-0 flex items-center justify-center"
          onClick={() => {
            setPlaying(true);
            track("sample_play");
          }}
          aria-label={copy.sample.play}
        >
          {poster && <Image src={poster} alt="" fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />}
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-tan-400 text-ink shadow-lg transition-transform duration-200 group-hover:scale-105">
            <svg width="24" height="26" viewBox="0 0 22 24" aria-hidden="true" fill="currentColor">
              <path d="M2 1.5v21l18-10.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
