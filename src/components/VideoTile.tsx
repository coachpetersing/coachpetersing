"use client";

import { useRef, useState } from "react";
import { isSet } from "@/content/offers";

const tileStyles = [
  "bg-forest text-cream",
  "bg-tan text-ink",
  "bg-ink text-cream",
  "bg-[#2a5239] text-cream",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function VideoTile({
  media,
  poster,
  brand,
  className = "",
}: {
  media: string;
  poster: string;
  brand: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  if (!isSet(media)) {
    const style = tileStyles[hash(brand) % tileStyles.length];
    return (
      <div className={`relative flex aspect-[9/16] items-end overflow-hidden rounded-2xl p-5 ${style} ${className}`}>
        <span className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl">
          {brand}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && pause()}
      onClick={() => (playing ? pause() : play())}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={media}
        poster={isSet(poster) ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${brand} campaign clip, muted`}
      />
      {!playing && (
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-body text-sm text-white md:hidden">
          Tap to play
        </span>
      )}
    </div>
  );
}
