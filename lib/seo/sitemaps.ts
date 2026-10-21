import { converterSlugList } from "@/lib/seo/converter-specs";
import { routeCollections } from "@/lib/seo/content";
import { getProgrammaticBrandColorSlugs, getProgrammaticColorSitemapPaths } from "@/lib/seo/programmatic";
import { siteConfig } from "@/lib/seo/site-config";
import { colorPalettesPath, getLibraryTags } from "@/lib/palette-library";
import { getShadeFamilies, shadesPath } from "@/lib/shades-data";

// No <lastmod>: nothing tracks when each page's content actually changed, and a
// lastmod of "now" on every request tells Google every URL changed constantly,
// which makes it ignore lastmod for the whole site. Omitting it is the honest option.
type SitemapEntry = {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

function page(path: string, changefreq: SitemapEntry["changefreq"], priority: number): SitemapEntry {
  return {
    loc: `${siteConfig.domain}${path}`,
    changefreq,
    priority,
  };
}

export const staticPages = [
  page("/", "weekly", 1),
  page("/generator", "weekly", 0.95),
  page("/explore", "weekly", 0.82),
  page("/trends", "weekly", 0.82),
  page("/tools", "monthly", 0.88),
  page("/tools/playground", "monthly", 0.8),
  page("/tools/picker", "monthly", 0.76),
  page("/tools/gradient", "monthly", 0.8),
  page("/tools/contrast", "monthly", 0.8),
  page("/tools/tailwind", "monthly", 0.8),
  page("/tailwind-colors", "monthly", 0.88),
  page("/color-palette-generator", "weekly", 0.92),
  page("/color-picker", "weekly", 0.9),
  page("/color-wheel", "weekly", 0.92),
  page("/color-mixing-chart", "weekly", 0.9),
  page("/pastel-colors", "weekly", 0.9),
  page("/color-palette-from-image", "weekly", 0.88),
  page("/color-converter", "monthly", 0.88),
  ...converterSlugList.map((slug) => page(`/${slug}`, "monthly", 0.86)),
  page("/random-color-generator", "monthly", 0.84),
  page("/color-name-finder", "monthly", 0.82),
  page("/tools/animation", "monthly", 0.76),
  page("/tools/brand-analyzer", "monthly", 0.76),
  page("/tools/contrast-fixer", "monthly", 0.76),
  page("/tools/design-tokens", "monthly", 0.76),
  page("/tools/image-colors", "monthly", 0.76),
  page("/tools/image-recolor", "monthly", 0.76),
  page("/tools/palette-visualizer", "monthly", 0.8),
  page("/tools/color-harmony", "monthly", 0.8),
  page("/tools/color-mixer", "monthly", 0.76),
  page("/tools/colorblind-simulator", "monthly", 0.78),
  page("/tools/tailwind-scale", "monthly", 0.8),
  page("/tools/color-psychology-explorer", "monthly", 0.8),
  page("/tools/collage", "monthly", 0.76),
  page("/colors", "weekly", 0.92),
  page("/shades", "weekly", 0.92),
  page("/color-palettes", "weekly", 0.94),
  page("/color-codes", "weekly", 0.9),
  page("/palettes", "weekly", 0.92),
  page("/gradients", "weekly", 0.9),
  page("/brand-colors", "weekly", 0.9),
  page("/color-meanings", "weekly", 0.88),
  page("/color-combinations", "weekly", 0.88),
  page("/accessibility", "weekly", 0.9),
  page("/web-design", "weekly", 0.86),
  page("/marketing-colors", "weekly", 0.86),
  page("/tailwind", "weekly", 0.84),
  page("/css-colors", "weekly", 0.84),
  page("/guides", "weekly", 0.86),
  page("/explainers", "weekly", 0.8),
  page("/comparisons", "weekly", 0.8),
  page("/best-colors-for", "weekly", 0.84),
  page("/faqs", "weekly", 0.82),
  page("/resources", "weekly", 0.78),
  page("/developer", "weekly", 0.84),
  page("/color-psychology", "weekly", 0.8),
  page("/about", "monthly", 0.5),
  page("/contact", "monthly", 0.5),
  page("/privacy", "monthly", 0.3),
  page("/terms", "monthly", 0.3),
];

export const sitemapFiles = [
  "/sitemap-pages.xml",
  "/sitemap-colors.xml",
  "/sitemap-shades.xml",
  "/sitemap-palettes.xml",
  "/sitemap-gradients.xml",
  "/sitemap-brand-colors.xml",
  "/sitemap-guides.xml",
  "/sitemap-blog.xml",
];

function dynamicEntries(paths: string[], changefreq: SitemapEntry["changefreq"], priority: number) {
  return paths.map((path) => page(path, changefreq, priority));
}

export const colorsSitemap = dynamicEntries(
  [
    ...getProgrammaticColorSitemapPaths(),
    ...routeCollections.colorCombinations.map((entry) => `/color-combinations/${entry.slug}`),
    ...routeCollections.tailwind.map((entry) => `/tailwind/${entry.slug}`),
    ...routeCollections.cssColors.map((entry) => `/css-colors/${entry.slug}`),
  ],
  "weekly",
  0.8,
);

export const palettesSitemap = [
  ...dynamicEntries(routeCollections.palettes.map((entry) => `/palettes/${entry.slug}`), "weekly", 0.82),
  // Palette library tag pages (/color-palettes/pastel, /color-palettes/blue, ...).
  ...dynamicEntries(getLibraryTags().map((tag) => colorPalettesPath(tag.slug)), "weekly", 0.88),
];

// "Shades of <color>" pages, served at their search-phrase URL (/shades-of-blue).
export const shadesSitemap = dynamicEntries(
  getShadeFamilies().map((family) => shadesPath(family.slug)),
  "weekly",
  0.9,
);

export const gradientsSitemap = dynamicEntries(
  routeCollections.gradients.map((entry) => `/gradients/${entry.slug}`),
  "weekly",
  0.8,
);

export const brandColorsSitemap = dynamicEntries(
  [
    ...routeCollections.brandColors.map((entry) => `/brand-colors/${entry.slug}`),
    ...getProgrammaticBrandColorSlugs()
      .filter((slug) => !routeCollections.brandColors.some((entry) => entry.slug === slug))
      .map((slug) => `/brand-colors/${slug}`),
  ],
  "weekly",
  0.82,
);

export const guidesSitemap = dynamicEntries(
  [
    ...routeCollections.guides.map((entry) => `/guides/${entry.slug}`),
    ...routeCollections.explainers.map((entry) => `/explainers/${entry.slug}`),
    ...routeCollections.comparisons.map((entry) => `/comparisons/${entry.slug}`),
    ...routeCollections.bestColorsFor.map((entry) => `/best-colors-for/${entry.slug}`),
    ...routeCollections.faqs.map((entry) => `/faqs/${entry.slug}`),
    ...routeCollections.resources.map((entry) => `/resources/${entry.slug}`),
    ...routeCollections.accessibility.map((entry) => `/accessibility/${entry.slug}`),
    ...routeCollections.developer.map((entry) => `/developer/${entry.slug}`),
    ...routeCollections.colorPsychology.map((entry) => `/color-psychology/${entry.slug}`),
  ],
  "weekly",
  0.78,
);

export const blogSitemap = [page("/blog", "weekly", 0.8)];

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map(
      (entry) =>
        `<url><loc>${entry.loc}</loc><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndexXml(paths: string[]) {
  const body = paths
    .map((path) => `<sitemap><loc>${siteConfig.domain}${path}</loc></sitemap>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
