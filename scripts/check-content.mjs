// Fails the build if banned content shows up.
//   node scripts/check-content.mjs           checks src/ and scripts/ (runs before build)
//   node scripts/check-content.mjs --built   checks the built HTML and RSC output (runs after build)
// Rules: no em dashes, no roster or tryout wording, no old plan prices or free consult, no bare Cal.com link.
import fs from "node:fs";
import path from "node:path";

const built = process.argv.includes("--built");
const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]))
    : [];

const rules = [
  { name: "em dash", re: /—/ },
  { name: "old roster wording", re: /\b(roster|tryouts?|try out)\b/i },
  { name: "old plan price", re: /\$(297|697|197|597|1,000|500)\b/ },
  { name: "old video review product", re: /video review/i },
  { name: "the 20% rate (private, never on the site)", re: /20%/ },
  { name: "free consult", re: /free (15[\s‑-]minute )?consult/i },
  { name: "old Cal.com booking page", re: /cal\.com\/coachpetersing\b(?!\/)/i },
  { name: '"Work with me" button', re: /Work with me/ },
];

let files;
if (built) {
  // Only our pages: the prerendered HTML and RSC payloads Next writes for each route.
  files = walk(".next/server/app").filter((f) => /\.(html|rsc|body|meta)$/.test(f));
  if (!files.length) {
    console.error("content check: no built pages found in .next/server/app");
    process.exit(1);
  }
} else {
  files = [...walk("src"), ...walk("scripts")].filter((f) => /\.(ts|tsx|mjs|css|json)$/.test(f) && !f.endsWith("check-content.mjs"));
}

const problems = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  for (const r of rules) {
    const m = text.match(r.re);
    if (m) {
      const line = text.slice(0, m.index).split("\n").length;
      problems.push(`${r.name} in ${f}${built ? "" : `:${line}`}`);
    }
  }
}

if (problems.length) {
  console.error("content check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`content check (${built ? "built output" : "source"}): ${files.length} files, all good`);
