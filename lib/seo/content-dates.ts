// The date of each page's last significant content change (YYYY-MM-DD). It feeds the sitemap
// <lastmod>, the Article schema's dateModified and the "Updated" line on the page, so the three
// always agree. Only real dates: a lastmod of "now" on every request tells Google every URL
// changed constantly, which makes it ignore lastmod for the whole site. Add a page here whenever
// its content changes substantially; blog posts use their own `updated` date.
export const contentUpdatedOn: Record<string, string> = {
  "/best-colors-for/healthcare-websites": "2026-10-23",
  "/best-colors-for/dental-websites": "2026-10-23",
  "/best-colors-for/education-websites": "2026-10-23",
  "/best-colors-for/fitness-websites": "2026-10-23",
  "/best-colors-for/coffee-shop-websites": "2026-10-23",
  "/best-colors-for/restaurant-websites": "2026-10-23",
  "/best-colors-for/real-estate-websites": "2026-10-23",
  "/best-colors-for/law-firm-websites": "2026-10-23",
  "/color-palettes/christmas": "2026-10-23",
  ...Object.fromEntries(
    ["gold", "silver", "lavender", "turquoise", "navy", "maroon", "indigo", "violet", "magenta", "coral", "beige", "olive"].map((slug) => [`/color-meanings/${slug}`, "2026-10-29"]),
  ),
  "/colors/azure": "2026-10-29",
  "/colors/light-yellow": "2026-10-29",
  "/colors/cyan": "2026-10-29",
  "/best-colors-for/luxury-brand-websites": "2026-10-29",
  "/best-colors-for/corporate-websites": "2026-10-29",
  "/best-colors-for/portfolio-websites": "2026-10-29",
  "/colors/tan": "2026-11-01",
  "/colors/forest-green": "2026-11-01",
  "/colors/crimson": "2026-11-01",
  "/colors/alice-blue": "2026-11-01",
  "/colors/lime": "2026-11-01",
  "/colors/light-gray": "2026-11-01",
  "/colors/gold": "2026-11-14",
  "/colors/silver": "2026-11-14",
  "/colors/lavender": "2026-11-14",
  "/colors/turquoise": "2026-11-14",
  "/colors/navy": "2026-11-14",
  "/colors/maroon": "2026-11-14",
  "/colors/indigo": "2026-11-14",
  "/colors/violet": "2026-11-14",
  "/colors/magenta": "2026-11-14",
  "/colors/coral": "2026-11-14",
  "/colors/beige": "2026-11-14",
  "/colors/olive": "2026-11-14",
  ...Object.fromEntries(
    [
      "green-and-purple", "blue-and-orange", "red-and-purple", "red-and-orange", "purple-and-gold",
      "purple-and-black", "green-and-black", "green-and-red", "black-and-gold", "purple-and-orange",
      "red-and-black", "black-and-orange", "blue-and-purple", "green-and-orange",
    ].map((slug) => [`/color-combinations/${slug}`, "2026-11-14"]),
  ),
  "/color-meanings/white": "2026-11-16",
  "/color-meanings/black": "2026-11-16",
  "/color-meanings/yellow": "2026-11-16",
  "/colors/yellow": "2026-11-17",
  "/colors/red": "2026-11-17",
  "/colors/white": "2026-11-17",
  "/colors/blue": "2026-11-17",
  ...Object.fromEntries(
    ["blue", "azure", "teal", "red", "green", "brown", "gray", "orange", "purple", "pink"].map((slug) => [`/color-meanings/${slug}`, "2026-11-17"]),
  ),
  ...Object.fromEntries(
    ["camel", "hot-pink", "bisque", "wheat", "teal", "ivory", "saddle-brown", "dodger-blue", "linen"].map((slug) => [`/colors/${slug}`, "2026-11-18"]),
  ),
  "/best-colors-for/ecommerce-conversions": "2026-11-20",
  "/best-colors-for/finance-websites": "2026-11-23",
  "/guides/ai-website-color-strategy": "2026-11-23",
  "/guides/dark-mode-color-guide": "2026-11-24",
  "/best-colors-for/saas-websites": "2026-11-25",
  "/best-colors-for/travel-websites": "2026-11-25",
  "/best-colors-for/automotive-websites": "2026-11-25",
  "/best-colors-for/pet-websites": "2026-11-25",
  "/best-colors-for/beauty-salon-websites": "2026-11-25",
  "/best-colors-for/photography-websites": "2026-11-25",
  "/best-colors-for/wedding-websites": "2026-11-25",
  "/best-colors-for/yoga-and-wellness-studio-websites": "2026-11-25",
  "/best-colors-for/construction-websites": "2026-11-25",
  "/best-colors-for/moving-company-websites": "2026-11-25",
  "/best-colors-for/daycare-websites": "2026-11-25",
  "/best-colors-for/insurance-websites": "2026-11-25",
  "/best-colors-for/nonprofit-websites": "2026-11-25",
  "/best-colors-for/fintech-brands": "2026-11-25",
};

/** The page's last real content update, or undefined when we don't know one. */
export function getContentUpdatedOn(path: string): string | undefined {
  return contentUpdatedOn[path];
}
