export const siteConfig = {
  name: "HueFlow",
  domain: "https://hueflow.site",
  description:
    "HueFlow helps teams choose colors, palettes, gradients, and accessible brand systems for product, marketing, and web design.",
  locale: "en_US",
  audience: "US",
} as const;

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
