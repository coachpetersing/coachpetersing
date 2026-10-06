export type BrandGroup = { category: string; brands: string[] };

export const brandGroups: BrandGroup[] = [
  {
    category: "Food and drink",
    brands: ["Coca-Cola", "McDonald's", "IHOP", "Oreo", "Heinz", "Annie's", "Lactaid", "Yellow Tail", "Habit", "Blue Bunny"],
  },
  {
    category: "Retail and delivery",
    brands: [
      "Walmart", "Amazon", "Target", "Costco", "Kroger", "CVS", "Walgreens",
      "Lowe's", "DoorDash", "Instacart", "Kohl's",
    ],
  },
  {
    category: "CPG and household",
    brands: [
      "Dove", "Dove Men+Care", "Baby Dove", "Tide", "Charmin", "Pampers", "Swiffer",
      "Bounty", "Luvs", "Puffs", "Clorox", "CeraVe", "Tylenol", "Allegra", "Energizer",
      "Shark Ninja", "Huggies", "Lysol", "Sanofi", "Zevo",
    ],
  },
  {
    category: "Auto, finance, telecom",
    brands: ["Lexus", "Lincoln", "Verizon", "Progressive", "American Express", "Klarna"],
  },
  {
    category: "Entertainment and toys",
    brands: ["Disney", "Paramount", "Lionsgate", "Lego", "Mattel", "Cocomelon", "Minecraft", "Wonka"],
  },
  {
    category: "Travel and apparel",
    brands: ["IHG", "Adidas"],
  },
];

export const allBrands = brandGroups.flatMap((g) => g.brands);

/** The biggest names, in this order. They lead the home marquee and the Work page wall. */
export const tier1 = [
  "Coca-Cola", "McDonald's", "Disney", "Walmart", "Amazon", "Target", "Costco", "Dove",
  "Verizon", "Lexus", "American Express", "Adidas", "Lego", "Paramount", "Progressive",
  "Tide", "Pampers", "CVS", "DoorDash", "IHG",
];

/** Every brand not in tier1, still grouped by category. Empty groups are dropped. */
export const restGroups: BrandGroup[] = brandGroups
  .map((g) => ({ ...g, brands: g.brands.filter((b) => !tier1.includes(b)) }))
  .filter((g) => g.brands.length > 0);

export const restBrands = restGroups.flatMap((g) => g.brands);
