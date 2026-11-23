export const siteConfig = {
  name: "HueFlow",
  domain: "https://hueflow.site",
  description:
    "HueFlow helps teams choose colors, palettes, gradients, and accessible brand systems for product, marketing, and web design.",
  locale: "en_US",
  audience: "US",
} as const;

/**
 * Official HueFlow profiles (GitHub, X, LinkedIn, Product Hunt, YouTube ...). Add the full URLs here once
 * they exist: they are emitted as Organization `sameAs`, which is how search engines and LLMs connect
 * "HueFlow" on other sites to hueflow.site. Left empty on purpose, so no unverified link is published.
 */
export const socialProfiles: string[] = [];

/** Robots directives for every indexable page: full snippets and large image previews (also what AI answer engines read). */
export const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const defaultRevalidate = 60 * 60 * 24;

export const primaryNav = [
  { href: "/colors", label: "Colors" },
  { href: "/palettes", label: "Palettes" },
  { href: "/gradients", label: "Gradients" },
  { href: "/brand-colors", label: "Brand Colors" },
  { href: "/color-meanings", label: "Color Meanings" },
  { href: "/color-combinations", label: "Combinations" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/web-design", label: "Web Design" },
  { href: "/marketing-colors", label: "Marketing" },
  { href: "/tailwind", label: "Tailwind" },
  { href: "/css-colors", label: "CSS Colors" },
  { href: "/blog", label: "Blog" },
] as const;
