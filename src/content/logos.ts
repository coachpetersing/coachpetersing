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
  "DoorDash": { file: "doordash.svg", ratio: 8.598, scale: 0.9, source: "about.doordash.com site header (inline SVG) (wordmark)" },
  "Instacart": { file: "instacart.svg", ratio: 6.371, source: "instacart.com site header logo (wordmark)" },
  "Verizon": { file: "verizon.svg", ratio: 4.472, source: "verizon.com site header (logo in the site stylesheet) (wordmark)" },
  "American Express": { file: "american-express.svg", ratio: 15.907, scale: 0.78, source: "americanexpress.com (Amex static CDN) (wordmark)" },
  "Klarna": { file: "klarna.svg", ratio: 4.122, source: "klarna.com site header (inline SVG) (wordmark)" },
  "Adidas": { file: "adidas.svg", ratio: 4.325, source: "adidas-group.com (organization logo) (wordmark)" },
  "Allegra": { file: "allegra.svg", ratio: 3.529, source: "allegra.com site header logo" },
  "Amazon": { file: "amazon.svg", ratio: 3, scale: 1.15, source: "press.aboutamazon.com/logos" },
  "Blue Bunny": { file: "blue-bunny.svg", ratio: 1.66, scale: 1.25, source: "bluebunny.com site header logo (wellscdn.com)" },
  "Habit": { file: "habit.svg", ratio: 2.302, scale: 1.05, source: "habitburger.com site header logo" },
  "Heinz": { file: "heinz.svg", ratio: 2.484, scale: 1.2, source: "heinz.com site header (inline SVG)" },
  "IHOP": { file: "ihop.svg", ratio: 1.924, scale: 1.1, source: "ihop.com site header logo" },
  "Lactaid": { file: "lactaid.svg", ratio: 4.313, source: "lactaid.com site header (inline SVG)" },
  "Pampers": { file: "pampers.svg", ratio: 1.971, scale: 1.2, source: "pampers.com site header logo (Contentful CDN)" },
  "Sanofi": { file: "sanofi.svg", ratio: 3.891, source: "sanofi.com media room (inline SVG)" },
  "Shark Ninja": { file: "shark-ninja.svg", ratio: 4.465, scale: 1.15, source: "sharkninja.com site header logo" },
  "Tylenol": { file: "tylenol.svg", ratio: 4.36, source: "tylenol.com site header logo (Contentful CDN)" },
  "Yellow Tail": { file: "yellow-tail.svg", ratio: 5.312, scale: 1.12, source: "yellowtailwine.com site header logo" },
  "Walmart": { file: "walmart.svg", ratio: 5.511, source: "corporate.walmart.com/news/media-library" },
  "CVS": { file: "cvs.svg", ratio: 3.986, source: "cvs.com site header logo" },
  "Kroger": { file: "kroger.svg", ratio: 2.685, scale: 1.15, source: "thekrogerco.com media contacts page header" },
  "Lowe's": { file: "lowes.svg", ratio: 2.177, scale: 1.1, source: "corporate.lowes.com/newsroom (white version)" },
  "Progressive": { file: "progressive.svg", ratio: 8.385, source: "progressive.mediaroom.com/media-resources (official newsroom, hosted by Cision)" },
  "Walgreens": { file: "walgreens.svg", ratio: 4.835, scale: 1.12, source: "corporate.walgreens.com newsroom stylesheet (footer logo)" },
  "McDonald's": { file: "mcdonalds.svg", ratio: 1.145, source: "Simple Icons (CC0), from https://www.mcdonalds.com/gb/en-gb/newsroom.html" },
  "Target": { file: "target.svg", ratio: 1, scale: 0.9, source: "Simple Icons (CC0), from https://www.target.com" },
  "Paramount": { file: "paramount.svg", ratio: 1.25, scale: 1.1, source: "paramount.com site header logo" },
  "IHG": { file: "ihg.svg", ratio: 6.129, scale: 1.3, source: "ihgplc.com/en/news-and-media" },
  "Tide": { file: "tide.svg", ratio: 1, scale: 0.95, source: "tide.com site header logo, converted to one color (tints)" },
  "Clorox": { file: "clorox.svg", ratio: 1.71, scale: 1.05, source: "clorox.com site logo, converted to one color (white as cut-out)" },
  "Lysol": { file: "lysol.png", ratio: 1.067, scale: 1.15, source: "lysol.com site header logo, converted to one color (white as cut-out)" },
  "CeraVe": { file: "cerave.svg", ratio: 2.879, source: "cerave.com site header logo, converted to one color (white as cut-out)" },
  "Minecraft": { file: "minecraft.svg", ratio: 5.844, source: "minecraft.net site header logo, converted to one color (tints)" },
  "Annie's": { file: "annies.png", ratio: 1.551, scale: 1.3, source: "annies.com site header logo, converted to one color (white as cut-out)" },
  "Costco": { file: "costco.svg", ratio: 3.6, source: "costco.com site header logo, converted to one color (white as cut-out)" },
  "Mattel": { file: "mattel.svg", ratio: 1.002, scale: 0.95, source: "corporate.mattel.com news page logo (builder.io CDN), converted to one color (white as cut-out)" },
  "Lego": { file: "lego.svg", ratio: 1, scale: 0.92, source: "lego.com newsroom brand assets page, converted to one color (white as cut-out)" },
  "Dove": { file: "dove.svg", ratio: 1.421, scale: 1.2, source: "dove.com (Dove standard brandmark, from the site's own CSS)" },
  "Kohl's": { file: "kohls.svg", ratio: 6.761, source: "kohls.com site header logo (Kohl's design system)" },
  "Lincoln": { file: "lincoln.svg", ratio: 2.862, scale: 1.05, source: "lincoln.com (site logo)" },
  "Charmin": { file: "charmin.png", ratio: 1.887, scale: 1.05, source: "charmin.com site header logo (PNG), converted to one color (white as cut-out)" },
  "Swiffer": { file: "swiffer.png", ratio: 2.013, source: "swiffer.com site logo (PNG), converted to one color (white as cut-out)" },
  "Bounty": { file: "bounty.png", ratio: 1.087, scale: 1.05, source: "bountytowels.com site header logo (PNG), converted to one color (white as cut-out)" },
  "Luvs": { file: "luvs.png", ratio: 1.506, source: "luvsdiapers.com site header logo (PNG inside SVG), converted to one color (white as cut-out)" },
  "Puffs": { file: "puffs.png", ratio: 1.031, scale: 1.1, source: "puffs.com site header logo (PNG), converted to one color (tints)" },
  "Cocomelon": { file: "cocomelon.png", ratio: 1.58, scale: 1.15, source: "cocomelon.com site header (inline SVG), converted to one color (white as cut-out)" },
  "Huggies": { file: "huggies.svg", ratio: 4.979, source: "huggies.com.au site header logo (Kimberly-Clark)" },
  "Lexus": { file: "lexus.svg", ratio: 4.75, source: "lexus.co.uk (inline SVG logo)" },
  "Energizer": { file: "energizer.png", ratio: 2.67, source: "energizer.com site header logo (PNG)" },
  "Zevo": { file: "zevo.png", ratio: 3.206, source: "zevoinsect.com site header logo (PNG)" },
  "Lionsgate": { file: "lionsgate.png", ratio: 7.972, scale: 1.1, source: "investors.lionsgate.com site header logo (PNG)" },
  "Wonka": { file: "wonka.png", ratio: 1.675, scale: 1.2, source: "Warner Bros. Discovery title treatment from the film's HBO Max page (PNG)" },
  "Disney": { file: "disney.png", ratio: 2.375, scale: 1.1, source: "disney.com site header logo (PNG)" },
  "Oreo": { file: "oreo.png", ratio: 2.663, scale: 1.0, source: "oreo.com.au site header logo (PNG), converted to one color (white as cut-out)" },
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
