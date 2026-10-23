import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";

import { ContentPageView } from "@/components/seo/content-page";
import { HubPageView, type HubDirectory } from "@/components/seo/hub-page";
import { StructuredData } from "@/components/seo/structured-data";
import { findResolvedEntry, getCollection, getColorMeaningOverride, getHubByPath, isColorMeaningAuthored, resolveContentEntry, type ResolvedContentEntry } from "@/lib/seo/content";
import { buildProgrammaticBrandColorEntry, buildProgrammaticColorEntry, getHexDuplicateCanonicalSlug, getProgrammaticBrandColorSlugs, getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { indexableRobots, siteConfig } from "@/lib/seo/site-config";
import { namedColors } from "@/lib/color-names";

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  canonicalPath,
  noindex,
  imagePath = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Set when this page's canonical URL should point at a different, primary page (e.g. a hex-code page that duplicates a named color). */
  canonicalPath?: string;
  /** Set for pages that duplicate another page's content closely enough that they shouldn't compete in search results. The page itself still works normally for visitors. */
  noindex?: boolean;
  /** Share image for this page. The explicit image here wins over a segment's own opengraph-image file, so pages with their own image must pass its path. */
  imagePath?: string;
}): Metadata {
  const url = `${siteConfig.domain}${path}`;
  const imageUrl = `${siteConfig.domain}${imagePath}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteConfig.domain}${canonicalPath ?? path}`,
    },
    robots: noindex ? { index: false, follow: true } : indexableRobots,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Hubs only feature hand-authored entries as cards, but /colors and /color-meanings
// have a page for every named color (and /brand-colors has programmatic industry
// pages). Without a link from the hub those pages sit in the sitemap with no internal
// links, and Google leaves them as "Discovered - currently not indexed". List the rest
// A-Z so every indexable page is reachable from its hub.
function getHubDirectory(path: string, featuredHrefs: Set<string>): HubDirectory | undefined {
  const byName = <T extends { title: string }>(items: T[]) => items.sort((a, b) => a.title.localeCompare(b.title));

  if (path === "/colors" || path === "/color-meanings") {
    const links = namedColors
      .filter((color) => path === "/colors" || isColorMeaningAuthored(color.slug))
      .map((color) => ({ title: color.name, href: `${path}/${color.slug}`, hex: color.hex }))
      .filter((link) => !featuredHrefs.has(link.href));
    return {
      heading: path === "/colors" ? "All named colors A-Z" : "All color meanings A-Z",
      links: byName(links),
    };
  }

  if (path === "/brand-colors") {
    const links = getProgrammaticBrandColorSlugs()
      .map((slug) => ({ title: buildProgrammaticBrandColorEntry(slug)?.title ?? slug, href: `/brand-colors/${slug}` }))
      .filter((link) => !featuredHrefs.has(link.href));
    return links.length > 0 ? { heading: "More industries", links: byName(links) } : undefined;
  }

  return undefined;
}

export function renderHub(path: string) {
  const hub = getHubByPath(path);

  if (!hub) {
    notFound();
  }

  const url = `${siteConfig.domain}${hub.path}`;
  const directory = getHubDirectory(hub.path, new Set(hub.featuredLinks.map((l) => l.href)));

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: hub.title, description: hub.description, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title: hub.title,
          description: hub.description,
          url,
          items: hub.featuredLinks.map((l) => ({ title: l.title, href: l.href })),
        })}
      />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hub.title, item: url },
        ])}
      />
      <HubPageView hub={hub} directory={directory} />
    </>
  );
}

// Search-facing title and description per hub. The on-page H1 stays the short hub name
// ("Colors", "Color Palettes"); the <title> carries the phrase people actually search for.
const hubSeo: Record<string, { title: string; description: string }> = {
  "/colors": {
    title: "Color Names & Hex Codes: 140+ Colors",
    description: "Browse 140+ named colors with HEX, RGB and HSL codes, meanings, accessibility notes, Tailwind classes and matching palettes. A free color reference.",
  },
  "/palettes": {
    title: "Color Palettes for Websites, Brands & Apps",
    description: "Curated color palettes for SaaS, fintech, luxury, ecommerce and AI brands. Copy hex codes or open any color palette in the free HueFlow generator.",
  },
  "/gradients": {
    title: "CSS Gradients: Free Gradient Colors & Generator",
    description: "Browse named CSS gradients with ready-to-copy code for websites, apps and landing pages, or build your own in the free gradient generator.",
  },
  "/brand-colors": {
    title: "Brand Color Palettes by Industry & Company",
    description: "See the color palettes behind SaaS, fintech, healthcare, luxury and iconic brands, and learn how to choose brand colors for your own business.",
  },
  "/color-meanings": {
    title: "Color Meanings: What Each Color Symbolizes",
    description: "Color meanings and symbolism: what red, blue, green, yellow, purple and more communicate in branding, marketing and web design.",
  },
  "/color-combinations": {
    title: "Color Combinations That Work Well Together",
    description: "Find color combinations that work: two-color pairings with hex codes, brand examples and when to use each in websites and campaigns.",
  },
  "/accessibility": {
    title: "Accessible Colors: WCAG Contrast Guides",
    description: "Guides to WCAG color contrast, accessible color palettes, status colors and readable UI design. Learn AA vs AAA and how to fix failing contrast.",
  },
  "/web-design": {
    title: "Web Design Colors: Color Schemes for Websites",
    description: "Choose website color schemes for landing pages, SaaS sites, hero sections and navigation, with palettes and UI hierarchy tips.",
  },
  "/marketing-colors": {
    title: "Marketing Colors for Conversions & Trust",
    description: "Marketing color strategy for conversions, trust and urgency across ads, email, landing pages and packaging, with palettes you can copy.",
  },
  "/css-colors": {
    title: "CSS Colors: Variables, Tokens & Theming Guide",
    description: "CSS color guides for custom properties, design tokens, theming and scalable design-system colors, with copy-ready code.",
  },
  "/guides": {
    title: "Color Guides: Color Theory & Brand Color Selection",
    description: "In-depth color guides covering color theory, color selection for websites and brands, and practical palette-building steps.",
  },
  "/explainers": {
    title: "Color Theory Explained: Quick Answers",
    description: "Short, clear explainers on color theory, branding and design fundamentals. One color question answered thoroughly per page.",
  },
  "/comparisons": {
    title: "Color Comparisons: Which Color Should You Choose?",
    description: "Side-by-side color comparisons that help you choose between colors, color categories and brand color strategies.",
  },
  "/faqs": {
    title: "Color FAQs: Answers to Common Color Questions",
    description: "Short answers to the color questions designers and developers ask most: HEX vs RGB, contrast ratios, palettes, color meanings and more.",
  },
  "/developer": {
    title: "Developer Color Guides: Design Tokens & CSS Variables",
    description: "Design tokens, CSS custom properties, Figma variables and platform color constants for engineering teams, with copy-ready examples.",
  },
  "/color-psychology": {
    title: "Color Psychology in Marketing & Product Design",
    description: "How color affects perception, trust, urgency and decisions across marketing and product design, with practical examples.",
  },
};

export function buildHubMetadata(path: string): Metadata {
  const hub = getHubByPath(path);

  if (!hub) {
    return buildPageMetadata({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    });
  }

  const seo = hubSeo[hub.path];

  return buildPageMetadata({
    title: seo?.title ?? hub.title,
    description: seo?.description ?? hub.description,
    path: hub.path,
  });
}

export function buildCollectionMetadata<
  K extends keyof ReturnType<typeof getAllCollections>,
>(key: K, slug: string, pathPrefix: string): Metadata {
  const entry = findCollectionEntry(key, slug);

  if (!entry) {
    return buildPageMetadata({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    });
  }

  // Hex-code slugs that just re-spell an already-named color (e.g. /colors/000000
  // for "black") shouldn't compete against the named-color page in search - point
  // their canonical at the named page instead of indexing a near-duplicate URL.
  const duplicateOfSlug = key === "colors" || key === "colorMeanings" ? getHexDuplicateCanonicalSlug(slug) : null;

  // Color-meanings pages without hand-written psychology content still fall back to
  // the same generator that powers /colors, so until they're individually authored
  // they'd otherwise duplicate that page - keep them working for visitors, but out
  // of the index.
  const isUnauthoredHexColorPage =
    key === "colors" && !duplicateOfSlug && getProgrammaticColorDescriptor(slug)?.mode === "hex";

  const noindex = (key === "colorMeanings" && !duplicateOfSlug && !isColorMeaningAuthored(slug)) || isUnauthoredHexColorPage;

  return buildPageMetadata({
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    path: `${pathPrefix}/${entry.slug}`,
    canonicalPath: duplicateOfSlug ? `${pathPrefix}/${duplicateOfSlug}` : undefined,
    noindex,
    // Industry pages have a prerendered share image with their own title and palettes.
    imagePath: key === "bestColorsFor" ? `${pathPrefix}/${entry.slug}/opengraph-image` : undefined,
  });
}

function getAllCollections() {
  return {
    colors: getCollection("colors"),
    palettes: getCollection("palettes"),
    gradients: getCollection("gradients"),
    brandColors: getCollection("brandColors"),
    colorMeanings: getCollection("colorMeanings"),
    colorCombinations: getCollection("colorCombinations"),
    accessibility: getCollection("accessibility"),
    tailwind: getCollection("tailwind"),
    cssColors: getCollection("cssColors"),
    guides: getCollection("guides"),
    explainers: getCollection("explainers"),
    comparisons: getCollection("comparisons"),
    bestColorsFor: getCollection("bestColorsFor"),
    faqs: getCollection("faqs"),
    resources: getCollection("resources"),
    developer: getCollection("developer"),
    colorPsychology: getCollection("colorPsychology"),
  };
}

// generateMetadata and the page component both resolve the same entry for a given
// request - cache() dedupes that work (which includes the expensive programmatic
// color/related-links computation) instead of paying for it twice per request.
const findCollectionEntry = cache(function findCollectionEntry<K extends keyof ReturnType<typeof getAllCollections>>(key: K, slug: string) {
  if (key === "colors" || key === "colorMeanings") {
    // A hex slug that isn't an exact duplicate of a named color (e.g. /colors/425bd7)
    // is arbitrary - there are 16M+ possible values, and rendering+caching one per
    // crawled guess caused real production incidents (Worker CPU limit hits, and
    // Cloudflare KV "failed to set to cache" errors under crawl bursts). Treat these
    // as a real 404 instead of a new page, before paying for any of the descriptor
    // or content-resolution work below. Named colors and exact hex duplicates of a
    // named color (which canonicalize instead of rendering their own page) still work.
    const descriptor = getProgrammaticColorDescriptor(slug);
    if (descriptor?.mode === "hex" && !getHexDuplicateCanonicalSlug(slug)) {
      return undefined;
    }
  }

  if (key === "colors") {
    const programmatic = buildProgrammaticColorEntry(slug);
    if (!programmatic) return undefined;
    const resolved = findResolvedEntry("colors", slug);
    // Always use programmatic title/description (has hex, RGB, HSL) but keep resolved content sections if they exist
    const override = resolved?.colorPageOverride;
    const merged = resolved
      ? resolveContentEntry({
          ...programmatic,
          sections: (resolved as { sections?: ResolvedContentEntry["sections"] }).sections ?? programmatic.sections,
          ...(override?.title && { title: override.title }),
          ...(override?.description && { description: override.description }),
          ...(override?.answer && { answer: override.answer }),
          ...(override?.faq && { faq: [...override.faq, ...programmatic.faq] }),
        })
      : resolveContentEntry(programmatic);
    return merged;
  }

  if (key === "colorMeanings") {
    // Hand-authored psychology/symbolism content takes priority over the programmatic
    // hex/RGB generator so these pages stay distinct from their /colors counterpart.
    const authored = findResolvedEntry("colorMeanings", slug);
    if (authored) {
      return authored;
    }

    const colorEntry = buildProgrammaticColorEntry(slug);
    if (!colorEntry) return undefined;

    // colorMeaningEntries only maps over the small hand-authored `colors` array (13
    // base hues), so a named color added to colorMeaningOverrides without a matching
    // `colors` entry (e.g. "gold", "steel-blue") won't be found by findResolvedEntry
    // above - check the override map directly so its authored content (and not the
    // generic programmatic title/sections) is what actually renders.
    const override = getColorMeaningOverride(slug);
    if (override) {
      return resolveContentEntry({
        ...colorEntry,
        title: override.title,
        description: override.description,
        answer: override.answer,
        sections: override.sections,
        faq: override.faq,
        keyTakeaways: override.keyTakeaways,
      });
    }

    return resolveContentEntry({
      ...colorEntry,
      title: `${getProgrammaticColorDescriptor(slug)?.displayName ?? slug} Color Meaning`,
    });
  }

  if (key === "brandColors") {
    const resolved = findResolvedEntry("brandColors", slug);
    if (resolved) {
      return resolved;
    }
    const entry = buildProgrammaticBrandColorEntry(slug);
    return entry ? resolveContentEntry(entry) : undefined;
  }

  return findResolvedEntry(key, slug);
});

export function renderCollectionPage<
  K extends keyof ReturnType<typeof getAllCollections>,
>({
  keyName,
  slug,
  hubName,
  hubHref,
  pathPrefix,
  answerLabel,
}: {
  keyName: K;
  slug: string;
  hubName: string;
  hubHref: string;
  pathPrefix: string;
  answerLabel?: string;
}) {
  const entry = findCollectionEntry(keyName, slug);

  if (!entry) {
    notFound();
  }

  return renderEntryPage({
    entry,
    hubName,
    hubHref,
    pathPrefix,
    answerLabel,
  });
}

export function renderEntryPage({
  entry,
  hubName,
  hubHref,
  pathPrefix,
  answerLabel,
}: {
  entry: ResolvedContentEntry;
  hubName: string;
  hubHref: string;
  pathPrefix: string;
  answerLabel?: string;
}) {
  const url = `${siteConfig.domain}${pathPrefix}/${entry.slug}`;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: hubName, href: hubHref },
    { name: entry.title, href: `${pathPrefix}/${entry.slug}` },
  ];

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: entry.title, description: entry.description, url })} />
      <StructuredData data={buildArticleSchema({ title: entry.title, description: entry.description, url })} />
      <StructuredData
        data={buildHowToSchema({
          title: `How to use ${entry.title}`,
          description: entry.description,
          steps: entry.sections.map((section) => `${section.title}: ${section.body}`),
        })}
      />
      <StructuredData data={buildFaqSchema(entry.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hubName, item: `${siteConfig.domain}${hubHref}` },
          { name: entry.title, item: url },
        ])}
      />
      <ContentPageView entry={entry} breadcrumbs={breadcrumbs} answerLabel={answerLabel} />
    </>
  );
}

export function staticParamsFor<K extends keyof ReturnType<typeof getAllCollections>>(key: K) {
  const authoredSlugs = getAllCollections()[key].map((entry) => entry.slug);

  // brandColors also has programmatic-only profiles (e.g. retail, education) with no
  // hand-authored entry - include them so those pages get statically generated too.
  if (key === "brandColors") {
    const programmaticSlugs = getProgrammaticBrandColorSlugs().filter((slug) => !authoredSlugs.includes(slug));
    return [...authoredSlugs, ...programmaticSlugs].map((slug) => ({ slug }));
  }

  return authoredSlugs.map((slug) => ({ slug }));
}
