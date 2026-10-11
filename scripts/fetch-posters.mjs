// Downloads a vertical thumbnail for every TikTok post in src/content/caseStudies.ts via TikTok's
// oEmbed endpoint, to public/posters/<videoId>.jpg. Runs before every build (see "prebuild").
// Posters already on disk are kept, so a flaky network never breaks the build.
// `node scripts/fetch-posters.mjs --refresh` re-downloads them all.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const refresh = process.argv.includes("--refresh");
const root = process.cwd();
const src = fs.readFileSync(path.join(root, "src/content/caseStudies.ts"), "utf8");
const urls = [...new Set([...src.matchAll(/https:\/\/www\.tiktok\.com\/@[\w.]+\/video\/(\d+)/g)].map((m) => m[0]))];
const outDir = path.join(root, "public/posters");
fs.mkdirSync(outDir, { recursive: true });
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Keep posters small. sips ships with macOS; elsewhere the file is kept as downloaded.
function shrink(file) {
  try {
    execFileSync("sips", ["--resampleWidth", "540", "-s", "format", "jpeg", file, "--out", file], { stdio: "ignore" });
  } catch {}
}

let ok = 0, kept = 0, failed = 0;
for (const url of urls) {
  const id = url.match(/video\/(\d+)/)[1];
  const file = path.join(outDir, `${id}.jpg`);
  if (!refresh && fs.existsSync(file)) {
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
    ok++;
  } catch (err) {
    if (fs.existsSync(file)) kept++;
    else {
      failed++;
      console.warn(`poster: ${url} -> ${err.message}`);
    }
  }
}
console.log(`posters: ${ok} fetched, ${kept} kept, ${failed} missing, ${urls.length} TikTok posts`);
