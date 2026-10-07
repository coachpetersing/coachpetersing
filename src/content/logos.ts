/**
 * Official brand logos, rendered as single-color masks (see BrandMark). Each file in public/logos is
 * tight-cropped to the artwork and optimized with SVGO. `ratio` is the viewBox width / height.
 * `scale` nudges one logo's optical size if it reads too big or small next to the others.
 * Brands not listed here render as a text wordmark.
 *
 * Sourcing rule: Simple Icons (CC0) first, then the brand's own press or media kit page.
 * Never traced, recreated, or generated.
 */
export type Logo = { file: string; ratio: number; scale?: number; source: string };

export const logos: Record<string, Logo> = {
  "Coca-Cola": { file: "coca-cola.svg", ratio: 3.188, scale: 1.25, source: "Simple Icons (CC0), from https://commons.wikimedia.org/wiki/File:Coca-Cola_logo.svg" },
  "McDonald's": { file: "mcdonalds.svg", ratio: 1.145, source: "Simple Icons (CC0), from https://www.mcdonalds.com/gb/en-gb/newsroom.html" },
  "Target": { file: "target.svg", ratio: 1, scale: 0.9, source: "Simple Icons (CC0), from https://www.target.com" },
  "DoorDash": { file: "doordash.svg", ratio: 1.76, source: "Simple Icons (CC0), from https://www.doordash.com/about/" },
  "Instacart": { file: "instacart.svg", ratio: 0.896, scale: 0.95, source: "Simple Icons (CC0), from https://www.instacart.com/press" },
  "Verizon": { file: "verizon.svg", ratio: 0.833, scale: 0.95, source: "Simple Icons (CC0), from https://www.verizondigitalmedia.com/about/logo-usage/" },
  "American Express": { file: "american-express.svg", ratio: 1, scale: 0.9, source: "Simple Icons (CC0), from https://commons.wikimedia.org/wiki/File:American_Express_logo_(2018).svg" },
  "Klarna": { file: "klarna.svg", ratio: 1.2, source: "Simple Icons (CC0), from https://klarna.design" },
  "Adidas": { file: "adidas.svg", ratio: 1.593, source: "Simple Icons (CC0), from https://www.adidas.com" },
  "Allegra": { file: "allegra.svg", ratio: 3.529, source: "allegra.com site header logo" },
  "Amazon": { file: "amazon.svg", ratio: 3, scale: 1.15, source: "press.aboutamazon.com/logos" },
  "Blue Bunny": { file: "blue-bunny.svg", ratio: 1.66, scale: 1.25, source: "bluebunny.com site header logo (wellscdn.com)" },
  "Habit": { file: "habit.svg", ratio: 2.302, scale: 1.05, source: "habitburger.com site header logo" },
  "Heinz": { file: "heinz.svg", ratio: 2.484, scale: 1.2, source: "heinz.com site header (inline SVG)" },
  "IHOP": { file: "ihop.svg", ratio: 1.924, scale: 1.1, source: "ihop.com site header logo" },
  "Lactaid": { file: "lactaid.svg", ratio: 4.313, source: "lactaid.com site header (inline SVG)" },
  "Pampers": { file: "pampers.svg", ratio: 1.971, scale: 1.2, source: "pampers.com site header logo (Contentful CDN)" },
  "Paramount": { file: "paramount.svg", ratio: 1.25, scale: 1.1, source: "paramount.com site header logo" },
  "Sanofi": { file: "sanofi.svg", ratio: 3.891, source: "sanofi.com media room (inline SVG)" },
  "Shark Ninja": { file: "shark-ninja.svg", ratio: 4.465, scale: 1.15, source: "sharkninja.com site header logo" },
  "Tylenol": { file: "tylenol.svg", ratio: 4.36, source: "tylenol.com site header logo (Contentful CDN)" },
  "Yellow Tail": { file: "yellow-tail.svg", ratio: 5.312, scale: 1.12, source: "yellowtailwine.com site header logo" },
  "Walmart": { file: "walmart.svg", ratio: 5.511, source: "corporate.walmart.com/news/media-library" },
  "CVS": { file: "cvs.svg", ratio: 3.986, source: "cvs.com site header logo" },
  "IHG": { file: "ihg.svg", ratio: 6.129, scale: 1.3, source: "ihgplc.com/en/news-and-media" },
  "Kroger": { file: "kroger.svg", ratio: 2.685, scale: 1.15, source: "thekrogerco.com media contacts page header" },
  "Lowe's": { file: "lowes.svg", ratio: 2.177, scale: 1.1, source: "corporate.lowes.com/newsroom (white version)" },
  "Progressive": { file: "progressive.svg", ratio: 8.385, source: "progressive.mediaroom.com/media-resources (official newsroom, hosted by Cision)" },
  "Walgreens": { file: "walgreens.svg", ratio: 4.835, scale: 1.12, source: "corporate.walgreens.com newsroom stylesheet (footer logo)" },
};

/** Sub-brands without their own logo. When the parent has a logo, it appears once and the sub-brands are folded into it. */
export const logoParent: Record<string, string> = {
  "Dove Men+Care": "Dove",
  "Baby Dove": "Dove",
};

/** Drops sub-brands whose parent has a logo, so the parent logo shows once instead of three times. */
export function foldSubBrands(brands: string[]): string[] {
  return brands.filter((b) => !(logoParent[b] && logos[logoParent[b]]));
}
