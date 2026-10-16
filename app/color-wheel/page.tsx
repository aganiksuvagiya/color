import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { ToolLanding } from "@/components/seo/tool-landing";
import { buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema, buildWebApplicationSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Color Wheel - Free Online Color Harmony Tool",
  description:
    "Use an online color wheel to build complementary, analogous, triadic, tetradic, split-complementary, and monochromatic palettes from one base color. Free, no signup.",
  keywords: [
    "color wheel",
    "online color wheel",
    "color wheel tool",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "color harmony wheel",
    "color wheel generator",
    "free color wheel",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-wheel` },
  openGraph: {
    title: "Color Wheel - Free Online Color Harmony Tool",
    description: "Build complementary, analogous, triadic, and monochromatic palettes from one base color.",
    url: `${siteConfig.domain}/color-wheel`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-wheel`;

const faq = [
  {
    question: "What is a color wheel used for?",
    answer:
      "A color wheel maps how colors relate to each other by hue, making it easy to find combinations - like complementary or analogous colors - that feel visually balanced.",
  },
  {
    question: "What is the difference between complementary and analogous colors?",
    answer:
      "Complementary colors sit opposite each other on the wheel and create strong contrast, while analogous colors sit next to each other and create a calmer, cohesive look.",
  },
  {
    question: "How do I use a color wheel to build a palette?",
    answer:
      "Pick a base color, then choose a harmony type - complementary, analogous, triadic, tetradic, split-complementary, or monochromatic - and HueFlow generates a full palette from the wheel relationship automatically.",
  },
  {
    question: "Is HueFlow's color wheel tool free?",
    answer: "Yes, completely free with unlimited use and no account required.",
  },
];

const harmonies = [
  { title: "Complementary", body: "Opposite hues for maximum contrast and energy." },
  { title: "Analogous", body: "Neighboring hues for a calm, cohesive feel." },
  { title: "Triadic", body: "Three evenly spaced hues for balanced variety." },
  { title: "Tetradic", body: "Four hues in two pairs for rich, complex palettes." },
  { title: "Split-complementary", body: "A base hue plus its complement's two neighbors." },
  { title: "Monochromatic", body: "One hue across multiple shades - safe and minimal." },
];

export default function ColorWheelPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Wheel - Free Online Color Harmony Tool",
          description: "Build complementary, analogous, triadic, and monochromatic palettes from one base color.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildWebApplicationSchema({ name: "HueFlow Color Wheel", description: "Build complementary, analogous, triadic, tetradic, split-complementary and monochromatic color schemes from one base color.", url, featureList: ["Six color harmony types", "Live color wheel", "Copy HEX values"] })} />
      <StructuredData data={buildSpeakableSchema(["h1", ".hub-description"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Wheel", item: url },
        ])}
      />

      <ToolLanding
        crumb="Color Wheel"
        badge="Free · No signup · 6 harmony types"
        title="Color Wheel"
        subtitle="Build complementary, analogous, triadic, tetradic, split-complementary, and monochromatic palettes from one base color using proven color-wheel relationships."
        primary={{ label: "Open Color Wheel", href: "/tools/color-harmony" }}
        secondary={{ label: "Try Palette Generator →", href: "/color-palette-generator" }}
        dots={["#ef4444", "#f59e0b", "#22c55e", "#0ea5e9", "#8b5cf6"]}
        featuresTitle="Six harmony types on the wheel"
        features={harmonies}
        faq={faq}
        closing={{ title: "Start building with the color wheel, free", body: "No account. No limits. Just harmony.", cta: { label: "Open Color Wheel →", href: "/tools/color-harmony" } }}
      />
    </>
  );
}
