import { routeCollections } from "@/lib/seo/content";
import { getProgrammaticColorSitemapPaths } from "@/lib/seo/programmatic";
import { siteConfig } from "@/lib/seo/site-config";

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

const now = new Date().toISOString();

function page(path: string, changefreq: SitemapEntry["changefreq"], priority: number): SitemapEntry {
  return {
    loc: `${siteConfig.domain}${path}`,
    lastmod: now,
    changefreq,
    priority,
  };
}

export const staticPages = [
  page("/", "weekly", 1),
  page("/generator", "weekly", 0.95),
  page("/explore", "weekly", 0.82),
  page("/trends", "weekly", 0.82),
  page("/tools/picker", "monthly", 0.76),
  page("/tools/gradient", "monthly", 0.8),
  page("/tools/contrast", "monthly", 0.8),
  page("/tools/tailwind", "monthly", 0.8),
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
  page("/blog", "weekly", 0.8),
  page("/developer", "weekly", 0.84),
  page("/color-psychology", "weekly", 0.8),
];

export const sitemapFiles = [
  "/sitemap-pages.xml",
  "/sitemap-colors.xml",
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

export const palettesSitemap = dynamicEntries(
  routeCollections.palettes.map((entry) => `/palettes/${entry.slug}`),
  "weekly",
  0.82,
);

export const gradientsSitemap = dynamicEntries(
  routeCollections.gradients.map((entry) => `/gradients/${entry.slug}`),
  "weekly",
  0.8,
);

export const brandColorsSitemap = dynamicEntries(
  routeCollections.brandColors.map((entry) => `/brand-colors/${entry.slug}`),
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
        `<url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndexXml(paths: string[]) {
  const body = paths
    .map((path) => `<sitemap><loc>${siteConfig.domain}${path}</loc><lastmod>${now}</lastmod></sitemap>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
