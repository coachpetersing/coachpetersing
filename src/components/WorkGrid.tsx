"use client";

import { useState } from "react";
import { campaignCategories, type Campaign } from "@/content/campaigns";
import { copy } from "@/content/copy";
import CampaignCard from "./CampaignCard";

export default function WorkGrid({ campaigns }: { campaigns: Campaign[] }) {
  const [active, setActive] = useState<string>("All");
  const used = campaignCategories.filter((cat) => campaigns.some((c) => c.category === cat));
  const list = active === "All" ? campaigns : campaigns.filter((c) => c.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...used].map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 font-body text-base transition-colors ${
                on ? "border-ink bg-ink text-white" : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {cat === "All" ? copy.work.allChip : cat}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <CampaignCard key={`${c.url}-${c.name}`} c={c} showRole eager={i < 3} viewPostLabel={copy.work.viewPost} />
        ))}
      </div>
    </div>
  );
}
