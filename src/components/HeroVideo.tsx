"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { media } from "@/content/site";
import { copy } from "@/content/copy";

/**
 * 9:16 phone-style frame. Muted, looping, inline. The video file only loads once the frame is
 * on screen, and never plays with reduced motion (the poster stays). Until Peter adds the
 * files in content/site.ts, a placeholder shows instead.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const { mp4, webm, poster, captions } = media.hero;
  const hasVideo = Boolean(mp4 || webm);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.preload = "auto";
        v.play().catch(() => {});
      } else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[36px] border-[6px] border-forest-800 bg-forest-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
      {hasVideo ? (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={poster ?? undefined}
          aria-label={copy.hero.videoAlt}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </video>
      ) : poster ? (
        <Image src={poster} alt={copy.hero.videoAlt} fill sizes="320px" className="object-cover" priority />
      ) : (
        <div className="grain flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-forest-800 to-forest-950 p-8 text-center">
          <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-tan-400/60 text-tan-400">
            <svg width="20" height="22" viewBox="0 0 22 24" fill="currentColor">
              <path d="M2 1.5v21l18-10.5z" />
            </svg>
          </span>
          <p className="kicker text-muted">{copy.hero.placeholder}</p>
        </div>
      )}
    </div>
  );
}
