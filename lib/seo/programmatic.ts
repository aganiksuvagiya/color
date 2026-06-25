import { getContrastRatio, getWcagLevel } from "@/lib/accessibility";
import {
  findClosestColorName,
  findNamedColorByHex,
  findNamedColorBySlug,
  getPopularHexSamples,
  getPopularNamedColorSlugs,
  namedColors,
  normalizeHexColor,
  type NamedColor,
} from "@/lib/color-names";
import { getContrastText, hexToHsl, isValidHex } from "@/lib/color-utils";

import type { ContentEntry } from "@/lib/seo/content";

type ColorDescriptor = {
  slug: string;
  mode: "name" | "hex";
  hex: string;
  displayName: string;
  canonicalSlug: string;
  hueFamily: string;
  hueLabel: string;
  psychology: string;
  branding: string;
  useCases: string[];
};

const hueRules = [
  { min: 0, max: 15, family: "red", label: "Red", psychology: "urgency, appetite, and intensity", branding: "retail, promotions, food, sports, and performance campaigns" },
  { min: 16, max: 45, family: "orange", label: "Orange", psychology: "action, energy, and friendly momentum", branding: "DTC, onboarding, hospitality, education, and creator brands" },
  { min: 46, max: 65, family: "yellow", label: "Yellow", psychology: "optimism, visibility, and youthful attention", branding: "alerts, highlights, education, and playful consumer brands" },
  { min: 66, max: 160, family: "green", label: "Green", psychology: "growth, wellness, and positive progress", branding: "fintech, healthcare, climate, sustainability, and wellness brands" },
  { min: 161, max: 200, family: "teal", label: "Teal", psychology: "clarity, balance, and calm confidence", branding: "healthcare, SaaS, product design, and modern B2B brands" },
  { min: 201, max: 250, family: "blue", label: "Blue", psychology: "trust, stability, and product clarity", branding: "SaaS, fintech, healthcare, logistics, and enterprise software" },
  { min: 251, max: 290, family: "purple", label: "Purple", psychology: "creativity, premium value, and innovation", branding: "AI products, beauty, creator tools, and premium tech brands" },
  { min: 291, max: 345, family: "pink", label: "Pink", psychology: "warmth, expression, and lifestyle energy", branding: "beauty, fashion, creator, and lifestyle brands" },
  { min: 346, max: 360, family: "red", label: "Red", psychology: "urgency, appetite, and intensity", branding: "retail, promotions, food, sports, and performance campaigns" },
];

const familyPairs: Record<string, { palette: string; gradient: string; brand: string; article: string }> = {
  red: {
    palette: "dtc-energy-stack",
    gradient: "sunset-burst",
    brand: "retail",
    article: "conversion-color-strategy",
  },
  orange: {
    palette: "dtc-energy-stack",
    gradient: "apricot-launch",
    brand: "saas",
    article: "startup-website-color-strategy",
  },
  yellow: {
    palette: "dtc-energy-stack",
    gradient: "sunset-burst",
    brand: "education",
    article: "conversion-color-strategy",
  },
  green: {
    palette: "fintech-growth-grid",
    gradient: "mint-horizon",
    brand: "healthcare",
    article: "conversion-color-strategy",
  },
  teal: {
    palette: "fintech-growth-grid",
    gradient: "ocean-depth",
    brand: "healthcare",
    article: "ai-website-color-strategy",
  },
  blue: {
    palette: "saas-trust-spectrum",
    gradient: "ocean-depth",
    brand: "saas",
    article: "ai-website-color-strategy",
  },
  purple: {
    palette: "creative-orbit",
    gradient: "violet-aurora",
    brand: "stripe",
    article: "ai-website-color-strategy",
  },
  pink: {
    palette: "creative-orbit",
    gradient: "violet-aurora",
    brand: "stripe",
    article: "luxury-brand-color-strategy",
  },
  neutral: {
    palette: "luxury-editorial-noir",
    gradient: "midnight-metal",
    brand: "healthcare",
    article: "luxury-brand-color-strategy",
  },
};

function titleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function hueMeta(hex: string) {
  const { h, s, l } = hexToHsl(hex);

  if (s < 10) {
    return {
      h,
      s,
      l,
      family: "neutral",
      label: "Neutral",
      psychology: "balance, restraint, and readability",
      branding: "luxury, editorial, enterprise, and interface support systems",
    };
  }

  const match = hueRules.find((rule) => h >= rule.min && h <= rule.max) ?? hueRules[0];
  return {
    h,
    s,
    l,
    family: match.family,
    label: match.label,
    psychology: match.psychology,
    branding: match.branding,
  };
}

function buildColorDescriptorFromNamedColor(color: NamedColor): ColorDescriptor {
  const meta = hueMeta(color.hex);
  return {
    slug: color.slug,
    mode: "name",
    hex: color.hex,
    displayName: color.name,
    canonicalSlug: color.slug,
    hueFamily: meta.family,
    hueLabel: meta.label,
    psychology: meta.psychology,
    branding: meta.branding,
    useCases: [
      `${meta.label}-led website sections`,
      `${meta.label}-driven product UI`,
      `${meta.label} brand palettes`,
      `${meta.label} gradients and accessibility checks`,
    ],
  };
}

function buildColorDescriptorFromHex(hex: string): ColorDescriptor {
  const meta = hueMeta(hex);
  const named = findNamedColorByHex(hex);
  const colorName = named?.name ?? findClosestColorName(hex);
  const canonicalSlug = named?.slug ?? hex.slice(1).toLowerCase();

  return {
    slug: hex.slice(1).toLowerCase(),
    mode: "hex",
    hex,
    displayName: colorName,
    canonicalSlug,
    hueFamily: meta.family,
    hueLabel: meta.label,
    psychology: meta.psychology,
    branding: meta.branding,
    useCases: [
      `${meta.label} landing page accents`,
      `${meta.label} buttons and calls to action`,
      `${meta.label} gradients`,
      `${meta.label} accessibility validation`,
    ],
  };
}

export function getProgrammaticColorDescriptor(slug: string): ColorDescriptor | null {
  const named = findNamedColorBySlug(slug);
  if (named) {
    return buildColorDescriptorFromNamedColor(named);
  }

  const normalizedHex = normalizeHexColor(slug);
  if (normalizedHex && isValidHex(normalizedHex)) {
    return buildColorDescriptorFromHex(normalizedHex);
  }

  return null;
}

function buildColorRelatedLinks(descriptor: ColorDescriptor) {
  const familyPair = familyPairs[descriptor.hueFamily] ?? familyPairs.neutral;
  const baseColorSlug = descriptor.mode === "hex" ? descriptor.canonicalSlug : descriptor.slug;
  const display = descriptor.displayName;

  return [
    { title: `${display} color meaning`, href: `/color-meanings/${baseColorSlug}`, label: "Related color meaning" },
    { title: `${descriptor.hueLabel} palettes`, href: `/palettes/${familyPair.palette}`, label: "Related palette" },
    { title: `${descriptor.hueLabel} gradients`, href: `/gradients/${familyPair.gradient}`, label: "Related gradient" },
    { title: `${descriptor.hueLabel} brand colors`, href: `/brand-colors/${familyPair.brand}`, label: "Related branding guide" },
    { title: `${descriptor.hueLabel} accessibility guide`, href: "/accessibility/color-contrast", label: "Related accessibility guide" },
    { title: `${descriptor.hueLabel} Tailwind guide`, href: `/tailwind/${descriptor.hueFamily === "neutral" ? "black" : descriptor.hueFamily}`, label: "Related Tailwind page" },
    { title: `${descriptor.hueLabel} CSS guide`, href: `/css-colors/${descriptor.hueFamily === "neutral" ? "black" : descriptor.hueFamily}`, label: "Related CSS page" },
    { title: `${descriptor.hueLabel} strategy article`, href: `/guides/${familyPair.article}`, label: "Related article" },
  ];
}

function buildColorFaq(descriptor: ColorDescriptor, contrastRatio: number, wcagLevel: string) {
  return [
    {
      question: `What does ${descriptor.displayName.toLowerCase()} communicate in branding?`,
      answer: `${descriptor.displayName} usually communicates ${descriptor.psychology}. It tends to work best for ${descriptor.branding} when the palette also preserves contrast, hierarchy, and semantic clarity.`,
    },
    {
      question: `Is ${descriptor.hex.toLowerCase()} accessible on white?`,
      answer: `${descriptor.hex.toLowerCase()} reaches a contrast ratio of ${contrastRatio}:1 against white, which scores ${wcagLevel} for normal text under WCAG. Teams should still test buttons, links, and gradient contexts before standardizing it.`,
    },
  ];
}

export function buildProgrammaticColorEntry(slug: string): ContentEntry | null {
  const descriptor = getProgrammaticColorDescriptor(slug);
  if (!descriptor) {
    return null;
  }

  const contrastOnWhite = getContrastRatio(descriptor.hex, "#FFFFFF");
  const wcagLevel = getWcagLevel(contrastOnWhite);
  const { h, s, l } = hexToHsl(descriptor.hex);
  const textColor = getContrastText(descriptor.hex);
  const titlePrefix = descriptor.mode === "hex" ? `${descriptor.hex.toLowerCase()} Color` : `${descriptor.displayName} Color`;

  return {
    slug,
    title: `${titlePrefix} Meaning, Palettes, Branding, and Accessibility`,
    description: `${titlePrefix} guide covering psychology, brand fit, accessibility, related palettes, gradients, and implementation ideas for HueFlow users targeting SEO, GEO, AEO, and LLMO visibility.`,
    answer: `${titlePrefix} works best when a team needs ${descriptor.psychology} and wants a shade that connects naturally to ${descriptor.branding}. It is most effective when paired with accessible contrast, a clear palette role, and related gradients, branding guides, and UI implementation patterns.`,
    intent: "informational",
    keywords: [
      `${descriptor.displayName.toLowerCase()} color meaning`,
      `${descriptor.hex.toLowerCase()} color`,
      `${descriptor.hueLabel.toLowerCase()} brand color`,
      `${descriptor.hueLabel.toLowerCase()} palette`,
    ],
    sections: [
      {
        title: "Why it matters",
        body: `${titlePrefix} matters because it shapes trust, emotional tone, and interface clarity at the same time. In Google Search and AI systems, pages about this color perform better when they connect psychology, branding, gradients, accessibility, and implementation in one place.`,
      },
      {
        title: "Best use cases",
        body: `${descriptor.displayName} is strongest for ${descriptor.useCases.join(", ")}. It usually works best when assigned one clear semantic role such as primary brand color, accent, or support color instead of being spread across every interface state.`,
      },
      {
        title: "Common mistakes",
        body: `The most common mistake with ${descriptor.displayName.toLowerCase()} is relying on it without testing contrast, hierarchy, or category fit. Another mistake is using the same shade for branding, alerts, and UI states, which weakens accessibility and semantic clarity.`,
      },
    ],
    faq: buildColorFaq(descriptor, contrastOnWhite, wcagLevel),
    examples: [
      {
        title: `${descriptor.displayName} landing page`,
        body: `Use ${descriptor.hex.toLowerCase()} in hero accents, CTA emphasis, and illustration highlights while keeping surface neutrals calmer for readability.`,
      },
      {
        title: `${descriptor.displayName} product UI`,
        body: `Use ${descriptor.displayName.toLowerCase()} for one primary action or category signal, then pair it with status colors and tested neutral surfaces.`,
      },
    ],
    comparisonRows: [
      {
        label: descriptor.displayName,
        bestFor: descriptor.branding,
        strengths: descriptor.psychology,
        watchouts: `Contrast against white is ${contrastOnWhite}:1, so validate text, buttons, and tinted surfaces before scaling.`,
      },
      {
        label: `${descriptor.hueLabel} alternatives`,
        bestFor: `${descriptor.hueLabel} palette exploration`,
        strengths: `More flexibility across palettes and gradients`,
        watchouts: `Can lose brand consistency if the shade family becomes too broad.`,
      },
    ],
    relatedLinks: buildColorRelatedLinks(descriptor),
    quickFacts: [
      { label: "Hex", value: descriptor.hex.toLowerCase() },
      { label: "Closest named color", value: descriptor.displayName },
      { label: "Hue family", value: descriptor.hueLabel },
      { label: "HSL", value: `${h} ${s}% ${l}%` },
      { label: "Text contrast", value: `${contrastOnWhite}:1 on white • ${wcagLevel} • prefers ${textColor} text on the swatch` },
    ],
    definitions: [
      { term: descriptor.displayName, definition: `${descriptor.displayName} is a ${descriptor.hueLabel.toLowerCase()}-family color associated with ${descriptor.psychology}.` },
      { term: "Color entity", definition: `In HueFlow, a color entity links one shade to palettes, gradients, accessibility checks, psychology, branding guidance, Tailwind classes, and CSS implementation.` },
    ],
    keyTakeaways: [
      `${descriptor.displayName} usually signals ${descriptor.psychology}.`,
      `It fits best for ${descriptor.branding}.`,
      `Its contrast against white is ${contrastOnWhite}:1, so accessibility should be validated before production use.`,
    ],
    prosCons: {
      pros: [
        `Supports ${descriptor.psychology} in branding and UI systems.`,
        `Connects naturally to ${descriptor.hueLabel.toLowerCase()} palettes, gradients, and semantic color systems.`,
      ],
      cons: [
        `May create thin hierarchy if the same shade is used for every UI role.`,
        `Needs contrast validation in text, buttons, and gradient overlays before scaling.`,
      ],
    },
    expertSummary: {
      title: "Expert summary",
      body: `${titlePrefix} is most useful when teams treat it as a connected entity rather than a standalone swatch. The strongest implementation ties the color to a palette, a gradient, accessibility validation, brand positioning, and a clear semantic role in UI and marketing systems.`,
    },
    entityRelations: [
      { entity: descriptor.displayName, relationship: "connects to", connectedTo: `${descriptor.hueLabel.toLowerCase()} palettes and gradients` },
      { entity: descriptor.displayName, relationship: "supports", connectedTo: descriptor.branding },
      { entity: descriptor.displayName, relationship: "must be validated against", connectedTo: "accessibility, contrast, Tailwind, and CSS implementation" },
    ],
    aiSections: [
      { title: "What is it?", body: `${descriptor.displayName} is a ${descriptor.hueLabel.toLowerCase()}-family color represented here as ${descriptor.hex.toLowerCase()}.` },
      { title: "Why it matters?", body: `${descriptor.displayName} influences trust, emotion, readability, and brand recognition across product UI, websites, marketing pages, and AI-cited answer content.` },
      { title: "Best use cases", body: descriptor.useCases.join(", ") },
      { title: "Examples", body: `Use ${descriptor.displayName.toLowerCase()} in SaaS hero accents, fintech dashboards, palette systems, gradient treatments, and brand documentation depending on category fit.` },
      { title: "Common mistakes", body: `Avoid using ${descriptor.displayName.toLowerCase()} without testing contrast or assigning it to too many semantic roles at once.` },
      { title: "Related topics", body: buildColorRelatedLinks(descriptor).map((link) => link.title).join(" • ") },
    ],
    citationBlocks: [
      `${titlePrefix} is best when a team needs ${descriptor.psychology} and wants a shade that links naturally to branding, gradients, and accessibility guidance.`,
      `${descriptor.hex.toLowerCase()} reaches ${contrastOnWhite}:1 contrast against white, which means accessibility decisions should be part of the color selection process, not a later cleanup step.`,
      `${descriptor.displayName} should be treated as a color entity connected to palettes, gradients, branding, psychology, Tailwind, CSS, and WCAG validation.`,
    ],
  };
}

const industryProfiles: Record<string, { title: string; focus: string; colors: string[]; palettes: string[]; gradients: string[] }> = {
  saas: {
    title: "SaaS",
    focus: "trust, product clarity, onboarding, and conversion",
    colors: ["blue", "purple", "teal"],
    palettes: ["saas-trust-spectrum", "creative-orbit"],
    gradients: ["ocean-depth", "violet-aurora"],
  },
  fintech: {
    title: "Fintech",
    focus: "trust, growth, compliance, and product readability",
    colors: ["blue", "green", "black"],
    palettes: ["fintech-growth-grid", "saas-trust-spectrum"],
    gradients: ["ocean-depth", "mint-horizon"],
  },
  healthcare: {
    title: "Healthcare",
    focus: "trust, calm, accessibility, and clarity",
    colors: ["blue", "green", "teal"],
    palettes: ["fintech-growth-grid", "saas-trust-spectrum"],
    gradients: ["mint-horizon", "ocean-depth"],
  },
  retail: {
    title: "Retail",
    focus: "attention, urgency, merchandising, and conversion",
    colors: ["red", "orange", "black"],
    palettes: ["dtc-energy-stack", "luxury-editorial-noir"],
    gradients: ["sunset-burst", "apricot-launch"],
  },
  education: {
    title: "Education",
    focus: "clarity, energy, trust, and motivation",
    colors: ["blue", "orange", "yellow"],
    palettes: ["saas-trust-spectrum", "dtc-energy-stack"],
    gradients: ["apricot-launch", "ocean-depth"],
  },
};

export function buildProgrammaticBrandColorEntry(slug: string): ContentEntry | null {
  const profile = industryProfiles[slug];
  if (!profile) {
    return null;
  }

  const relatedLinks = [
    ...profile.colors.map((color) => ({ title: `${titleCase(color)} color`, href: `/colors/${color}`, label: "Related color" })),
    ...profile.palettes.map((palette) => ({ title: `${titleCase(palette)} palette`, href: `/palettes/${palette}`, label: "Related palette" })),
    ...profile.gradients.map((gradient) => ({ title: `${titleCase(gradient)} gradient`, href: `/gradients/${gradient}`, label: "Related gradient" })),
    { title: `${profile.title} accessibility guide`, href: "/accessibility/color-contrast", label: "Related accessibility guide" },
    { title: `${profile.title} conversion guide`, href: "/guides/conversion-color-strategy", label: "Related article" },
  ];

  return {
    slug,
    title: `Best Brand Colors for ${profile.title}`,
    description: `Programmatic ${profile.title.toLowerCase()} brand color guide connecting trust, accessibility, palettes, gradients, psychology, and conversion patterns for HueFlow.`,
    answer: `The best brand colors for ${profile.title.toLowerCase()} usually combine shades that support ${profile.focus}. The strongest systems connect individual colors to palettes, gradients, accessibility, psychology, and UI implementation so the brand works in search, AI retrieval, product surfaces, and conversion pages.`,
    intent: "commercial",
    keywords: [
      `${profile.title.toLowerCase()} brand colors`,
      `best colors for ${profile.title.toLowerCase()}`,
      `${profile.title.toLowerCase()} website palette`,
    ],
    sections: [
      { title: "Why it matters", body: `${profile.title} brands need colors that work across marketing, product UI, trust building, and accessibility. A disconnected palette usually causes lower clarity, weaker recall, and inconsistent conversion cues.` },
      { title: "Best use cases", body: `Use these recommendations when building ${profile.title.toLowerCase()} homepages, onboarding flows, product dashboards, email systems, landing pages, and brand guidelines.` },
      { title: "Common mistakes", body: `The most common mistake is copying category colors without differentiating the palette structure, accessibility rules, and semantic use of primary, accent, and status colors.` },
    ],
    faq: [
      { question: `What color palette works for ${profile.title.toLowerCase()} brands?`, answer: `${profile.colors.map((color) => titleCase(color)).join(", ")} usually work best because they support ${profile.focus} while mapping cleanly to product and marketing systems.` },
      { question: `How should ${profile.title.toLowerCase()} brands avoid generic colors?`, answer: `Differentiate through palette structure, accent logic, gradients, and typography rather than relying on one category-default hue alone.` },
    ],
    relatedLinks,
  };
}

export function getProgrammaticColorStaticParams() {
  const nameParams = getPopularNamedColorSlugs(72).map((slug) => ({ slug }));
  const hexParams = getPopularHexSamples(24).map((slug) => ({ slug }));
  return [...nameParams, ...hexParams];
}

export function getProgrammaticColorSitemapPaths(limit = 120) {
  const namedPaths = namedColors.slice(0, limit).flatMap((color) => [
    `/colors/${color.slug}`,
    `/color-meanings/${color.slug}`,
  ]);

  const hexPaths = getPopularHexSamples(40).flatMap((slug) => [
    `/colors/${slug}`,
    `/color-meanings/${slug}`,
  ]);
  return [...namedPaths, ...hexPaths];
}
