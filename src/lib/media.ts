import fs from "node:fs";
import path from "node:path";
import type { Campaign } from "@/content/campaigns";
import { isSet } from "@/content/offers";

/** Server only. If a media or poster file isn't in /public yet, treat it as TBD so the card shows a color tile, never a broken video. */
function exists(p: string) {
  return isSet(p) && fs.existsSync(path.join(process.cwd(), "public", p));
}

export function resolveMedia(list: Campaign[]): Campaign[] {
  return list.map((c) => ({
    ...c,
    media: exists(c.media) ? c.media : "TBD",
    poster: exists(c.poster) ? c.poster : "TBD",
  }));
}
