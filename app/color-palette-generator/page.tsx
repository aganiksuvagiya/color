import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { ToolLanding } from "@/components/seo/tool-landing";
import { buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema, buildWebApplicationSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Free Color Palette Generator: Create Palettes Online",
  description:
    "HueFlow's free color palette generator: create color palettes for websites, apps and brands in seconds, lock colors, start from an image or mood, and export hex codes. No signup.",
  keywords: [
    "color palette generator",
    "best color palette generator",
    "free color palette generator",
    "color scheme generator",
    "color palette maker",
    "color generator for designers",
    "color palette generator for web design",
    "color palette generator for UI design",
    "best color generator",
    "color combination generator",
    "online color palette generator",
    "color palette generator free",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-palette-generator` },
  openGraph: {
    title: "Free Color Palette Generator: Create Palettes Online | HueFlow",
    description:
      "HueFlow's free color palette generator: create color palettes for websites, apps and brands in seconds.",
    url: `${siteConfig.domain}/color-palette-generator`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-palette-generator`;

const faq = [
  {
    question: "What is the best free color palette generator?",
    answer:
      "HueFlow is one of the best free color palette generators - it creates complete 5-color systems with semantic roles (primary, neutral, accent, success, warning), accessibility scoring, CSS/Tailwind export, and palette insights. No signup required.",
  },
  {
    question: "How do I generate a color palette for a website?",
    answer:
      "Open HueFlow's generator, type a mood or brand description (e.g. 'luxury fintech' or 'playful food app'), and get a complete palette instantly. You can lock colors you like and shuffle the rest, then export to CSS or Tailwind variables.",
  },
  {
    question: "How do I choose colors for UI design?",
    answer:
      "A strong UI palette typically needs 5 roles: a neutral base, a primary brand color, a success state (green), a warning state (amber/orange), and an accent for highlights. HueFlow generates all 5 with contrast scores built in.",
  },
  {
    question: "Can I generate a color palette from a mood or keyword?",
    answer:
      "Yes - HueFlow supports mood-based generation. Type words like 'minimal SaaS', 'bold gaming', or 'warm editorial' and the generator creates a matching palette with human-curated color names.",
  },
  {
    question: "Is HueFlow's color palette generator free?",
    answer:
      "Yes, completely free. No account needed. Generate unlimited palettes, export to CSS/Tailwind, save to your browser, and share via link - all at no cost.",
  },
];

const features = [
  { icon: "✦", title: "Mood-based generation", body: "Type a brand, mood, or industry - get a matched palette instantly." },
  { icon: "◈", title: "Semantic color roles", body: "Every palette includes primary, neutral, accent, success, and warning - ready for real UI." },
  { icon: "⌘", title: "Lock & shuffle", body: "Lock colors you love, shuffle the rest. Build the perfect palette incrementally." },
  { icon: "⬡", title: "CSS & Tailwind export", body: "One-click export to CSS variables, Tailwind config, or raw hex codes." },
  { icon: "◎", title: "Accessibility scoring", body: "WCAG contrast ratios checked automatically on every palette." },
  { icon: "↗", title: "Share & save", body: "Save palettes to your browser or share via a persistent URL." },
];

export default function ColorPaletteGeneratorPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Palette Generator - Free Online Color Scheme Maker",
          description: "The best free color palette generator. Create stunning color schemes for websites, apps, and brands in seconds.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildWebApplicationSchema({ name: "HueFlow Color Palette Generator", description: "Create color palettes for websites, apps and brands in seconds, lock colors, and export hex codes.", url, featureList: ["Space-to-shuffle palette generation", "Color locking and undo", "Export to CSS, Tailwind and JSON"] })} />
      <StructuredData data={buildSpeakableSchema(["h1", ".hub-description"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palette Generator", item: url },
        ])}
      />

      <ToolLanding
        crumb="Color Palette Generator"
        badge="Free · No signup · Unlimited"
        title="Color Palette Generator"
        subtitle="The best free color palette generator for designers and developers. Type a mood, brand, or industry and get a complete color scheme in seconds."
        primary={{ label: "Generate a Palette", href: "/generator" }}
        secondary={{ label: "Browse Colors →", href: "/explore" }}
        dots={["#C94B1A", "#2563EB", "#10B981", "#F59E0B", "#6366F1"]}
        samples={[
          { label: "Terracotta Sessions", colors: ["#241008", "#C94B1A", "#7FBE6B", "#F4B93F", "#F15B2A"] },
          { label: "Nordic Blue", colors: ["#0E1A2B", "#2563EB", "#10B981", "#F59E0B", "#6366F1"] },
          { label: "Gilded Atelier", colors: ["#1A1209", "#B8860B", "#8B7355", "#D4AF37", "#C9A84C"] },
        ]}
        featuresTitle="Everything a palette generator should do"
        features={features}
        faq={faq}
        closing={{ title: "Start generating palettes, free", body: "No account. No limits. Just colors.", cta: { label: "Open Color Palette Generator →", href: "/generator" } }}
      />
    </>
  );
}
