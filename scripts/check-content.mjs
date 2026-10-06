// Fails the build if the content files drift: every campaign brand must be in brands.ts,
// every tier1 brand must exist in a category group, and no em dashes anywhere in src/content.
import fs from "node:fs";

const brandsSrc = fs.readFileSync("src/content/brands.ts", "utf8");
const campaignsSrc = fs.readFileSync("src/content/campaigns.ts", "utf8");

const groupsBlock = brandsSrc.slice(brandsSrc.indexOf("brandGroups"), brandsSrc.indexOf("allBrands"));
const tier1Block = brandsSrc.slice(brandsSrc.indexOf("export const tier1"), brandsSrc.indexOf("restGroups"));
const strings = (block) => [...block.matchAll(/"((?:[^"\\]|\\.)+)"/g)].map((m) => m[1]);
const inGroups = new Set(strings(groupsBlock).filter((s) => !/^(category|brands)$/.test(s)));
const tier1 = strings(tier1Block);

const campaignBlock = campaignsSrc.slice(campaignsSrc.indexOf("export const campaigns"), campaignsSrc.indexOf("export const repeatPartners"));
// "Wonka x IHOP" is a co-brand, so each side must be listed.
const campaignBrands = [...campaignBlock.matchAll(/brand: "([^"]+)"/g)].flatMap((m) => m[1].split(" x "));

const problems = [];
for (const b of new Set(campaignBrands)) if (!inGroups.has(b)) problems.push(`campaigns.ts brand "${b}" is missing from brands.ts`);
for (const b of tier1) if (!inGroups.has(b)) problems.push(`tier1 brand "${b}" is not in any category group`);
// The @coachpetersing social accounts are not linked anywhere. The domain, email, and Cal.com stay.
const socialRe = /(instagram\.com|tiktok\.com\/@|youtube\.com\/@)coachpetersing/i;
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(`${dir}/${d.name}`) : [`${dir}/${d.name}`]));
for (const f of walk("src")) {
  if (socialRe.test(fs.readFileSync(f, "utf8"))) problems.push(`@coachpetersing social link found in ${f}`);
}
for (const f of fs.readdirSync("src/content")) {
  if (fs.readFileSync(`src/content/${f}`, "utf8").includes("—")) problems.push(`em dash found in src/content/${f}`);
}

if (problems.length) {
  console.error("content check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`content check: ${new Set(campaignBrands).size} campaign brands, ${tier1.length} tier1, ${inGroups.size} brands total, all good`);
