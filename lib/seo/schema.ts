import { siteConfig } from "@/lib/seo/site-config";

type Crumb = {
  name: string;
  item: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "HueFlow Color Tool",
    url: siteConfig.domain,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.domain}/logo.png`,
    },
    description: siteConfig.description,
    areaServed: "US",
    sameAs: [
      "https://twitter.com/hueflow",
      "https://www.linkedin.com/company/hueflow",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.domain}/explore?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: siteConfig.domain,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI-assisted color palette generator",
      "WCAG contrast checker and accessibility auto-fix",
      "Colorblind simulation",
      "Gradient generator (linear, radial, conic)",
      "Color animation / CSS keyframe generator",
      "Image and website color extraction",
      "Design token generator (color, typography, spacing)",
      "Tailwind and CSS color export",
    ],
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
    isPartOf: siteConfig.domain,
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
  const today = new Date().toISOString().split("T")[0];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    datePublished: datePublished ?? today,
    dateModified: dateModified ?? today,
    author: [
      {
        "@type": "Person",
        name: "HueFlow Editorial Team",
        url: siteConfig.domain,
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}/logo.png`,
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
