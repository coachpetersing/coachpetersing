"use client";

import { track } from "@/lib/track";

export default function CancelButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="btn-primary min-h-[56px] px-8 text-lg" onClick={() => track("cancel_click")}>
      {label}
    </a>
  );
}
