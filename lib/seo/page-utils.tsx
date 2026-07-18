import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ContentPageView } from "@/components/seo/content-page";
import { HubPageView } from "@/components/seo/hub-page";
import { StructuredData } from "@/components/seo/structured-data";
import { findResolvedEntry, getCollection, getHubByPath, resolveContentEntry, type ResolvedContentEntry } from "@/lib/seo/content";
import { buildProgrammaticBrandColorEntry, buildProgrammaticColorEntry, getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.domain}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function renderHub(path: string) {
  const hub = getHubByPath(path);

  if (!hub) {
    notFound();
  }

  const url = `${siteConfig.domain}${hub.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: hub.title, description: hub.description, url })} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hub.title, item: url },
        ])}
      />
      <HubPageView hub={hub} />
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

  return buildPageMetadata({
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    path: `${pathPrefix}/${entry.slug}`,
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
  };
}

function findCollectionEntry<K extends keyof ReturnType<typeof getAllCollections>>(key: K, slug: string) {
  if (key === "colors") {
    const entry = buildProgrammaticColorEntry(slug);
    return entry ? findResolvedEntry("colors", slug) ?? resolveContentEntry(entry) : undefined;
  }

  if (key === "colorMeanings") {
    const colorEntry = buildProgrammaticColorEntry(slug);
    if (colorEntry) {
      return resolveContentEntry({
        ...colorEntry,
        title: `${getProgrammaticColorDescriptor(slug)?.displayName ?? slug} Color Meaning`,
      });
    }
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
}

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
  return getAllCollections()[key].map((entry) => ({ slug: entry.slug }));
}
