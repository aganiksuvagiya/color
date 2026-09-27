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
import { siteConfig } from "@/lib/seo/site-config";
import { namedColors } from "@/lib/color-names";

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  canonicalPath,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Set when this page's canonical URL should point at a different, primary page (e.g. a hex-code page that duplicates a named color). */
  canonicalPath?: string;
  /** Set for pages that duplicate another page's content closely enough that they shouldn't compete in search results. The page itself still works normally for visitors. */
  noindex?: boolean;
}): Metadata {
  const url = `${siteConfig.domain}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteConfig.domain}${canonicalPath ?? path}`,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
      images: [
        {
          url: `${siteConfig.domain}/opengraph-image`,
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
      images: [`${siteConfig.domain}/opengraph-image`],
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

export function buildHubMetadata(path: string): Metadata {
  const hub = getHubByPath(path);

  if (!hub) {
    return buildPageMetadata({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    });
  }

  return buildPageMetadata({
    title: hub.title,
    description: hub.description,
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
