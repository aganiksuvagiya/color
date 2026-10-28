import { siteConfig, socialProfiles } from "@/lib/seo/site-config";

type Crumb = {
  name: string;
  item: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

// Stable @ids let every page's JSON-LD point at the same Organization / WebSite / app entity,
// so search engines and LLMs resolve "HueFlow" to one brand instead of treating each page's
// block as a separate thing.
export const organizationId = `${siteConfig.domain}/#organization`;
export const websiteId = `${siteConfig.domain}/#website`;
export const appId = `${siteConfig.domain}/#app`;

const brandAlternateNames = ["Hue Flow", "HueFlow Color Tool", "HueFlow color palette generator", "hueflow.site"];

export const siteFeatureList = [
  "Color palette generator with color locking, shuffle and undo",
  "Color picker with HEX, RGB, HSL, HSB and CMYK values",
  "Color converter: HEX to RGB, RGB to HEX, HSL, CMYK and OKLCH",
  "WCAG color contrast checker with accessibility auto-fix",
  "Color palette from image extractor",
  "CSS gradient generator (linear, radial, conic)",
  "Color wheel and color harmony tool (complementary, analogous, triadic, tetradic)",
  "Colorblind simulator (protanopia, deuteranopia, tritanopia)",
  "Tailwind CSS color scale generator and Tailwind colors reference",
  "Design token generator (color, typography, spacing)",
  "Random color generator",
  "Palette export as CSS variables, Tailwind config, JSON and PNG",
];

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: brandAlternateNames,
    url: siteConfig.domain,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.domain}/apple-icon`,
      width: 180,
      height: 180,
    },
    description: siteConfig.description,
    slogan: "Find colors that feel right.",
    knowsAbout: [
      "Color palettes",
      "Color theory",
      "Color contrast and WCAG accessibility",
      "CSS gradients",
      "Tailwind CSS colors",
      "Color conversion (HEX, RGB, HSL, CMYK, OKLCH)",
      "Brand color strategy",
    ],
    areaServed: "US",
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "suvagiyaaganik@gmail.com",
      availableLanguage: "English",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: ["HueFlow Color Tool", "Hue Flow", "hueflow.site"],
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": appId,
    name: siteConfig.name,
    alternateName: ["HueFlow Color Tool", "Hue Flow"],
    applicationCategory: "DesignApplication",
    applicationSubCategory: "Color palette generator",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in current Chrome, Edge, Firefox and Safari.",
    isAccessibleForFree: true,
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: siteFeatureList,
  };
}

/** A single tool page (converter, random color generator, ...) as a free web app that is part of HueFlow. */
export function buildWebApplicationSchema({
  name,
  description,
  url,
  featureList,
}: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: { "@id": appId },
    publisher: { "@id": organizationId },
    ...(featureList ? { featureList } : {}),
  };
}

export function buildAboutPageSchema({ title, description, url }: { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en-US",
  };
}

export function buildWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: { "@id": websiteId },
    inLanguage: "en-US",
  };
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    // Only real dates: defaulting to "today" stamped every page with its build or request
    // date, which Google's helpful-content guidance treats as faking freshness.
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}/favicon.svg`,
      },
    },
  };
}

export function buildHowToSchema({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  url,
  items,
}: {
  title: string;
  description: string;
  url: string;
  items: Array<{ title: string; href: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${siteConfig.domain}${item.href}`,
      })),
    },
  };
}

export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
