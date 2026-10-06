// Fetches a poster image for every TikTok post in campaigns.ts via TikTok's oEmbed endpoint
// and writes it to public/posters/<videoId>.jpg plus a map in src/content/posters.json.
// Runs before every build (see "prebuild" in package.json). If a fetch fails, the existing
// file is kept, so a flaky network never breaks the build or shows a broken image.
// Instagram has no public oEmbed without a token, so those cards use the brand tile instead.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

// `node scripts/fetch-posters.mjs --refresh` re-downloads posters that already exist.
const refresh = process.argv.includes("--refresh");

const root = process.cwd();
const src = fs.readFileSync(path.join(root, "src/content/campaigns.ts"), "utf8");
const urls = [...new Set([...src.matchAll(/https:\/\/www\.tiktok\.com\/@[\w.]+\/video\/(\d+)/g)].map((m) => m[0]))];
const outDir = path.join(root, "public/posters");
const mapPath = path.join(root, "src/content/posters.json");
fs.mkdirSync(outDir, { recursive: true });
const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, "utf8")) : {};
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Keep posters small. sips ships with macOS; elsewhere the file is kept as downloaded.
function shrink(file) {
  try {
    execFileSync("sips", ["--resampleWidth", "540", "-s", "format", "jpeg", "-s", "formatOptions", "low", file, "--out", file], { stdio: "ignore" });
  } catch {}
}

let ok = 0, kept = 0, failed = 0;
for (const url of urls) {
  const id = url.match(/video\/(\d+)/)[1];
  const file = path.join(outDir, `${id}.jpg`);
  if (!refresh && fs.existsSync(file)) {
    map[url] = map[url] || { poster: `/posters/${id}.jpg`, title: "" };
    kept++;
    continue;
  }
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`oembed ${res.status}`);
    const data = await res.json();
    if (!data.thumbnail_url) throw new Error("no thumbnail_url");
    const img = await fetch(data.thumbnail_url, { headers: { "User-Agent": UA } });
    if (!img.ok) throw new Error(`thumbnail ${img.status}`);
    fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    shrink(file);
    map[url] = { poster: `/posters/${id}.jpg`, title: data.title || "" };
    ok++;
  } catch (err) {
    if (fs.existsSync(file)) { map[url] = map[url] || { poster: `/posters/${id}.jpg`, title: "" }; kept++; }
    else { failed++; console.warn(`poster: ${url} -> ${err.message}`); }
  }
}
fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n");
console.log(`posters: ${ok} fetched, ${kept} kept from cache, ${failed} without poster, ${urls.length} TikTok posts total`);
