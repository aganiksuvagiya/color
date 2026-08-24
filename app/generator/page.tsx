import { Suspense } from "react";
import { GeneratorPage } from "@/components/generator/generator-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildFaqSchema, buildHowToSchema, buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator - Free Color Scheme Maker | HueFlow",
  description:
    "Free color palette generator — pick a mood, shuffle, or lock colors to build beautiful palettes in seconds. Export as CSS, Tailwind, or JSON. No signup.",
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
    "free color scheme maker",
    "online color palette generator",
  ],
  openGraph: {
    title: "Color Palette Generator - Free Color Scheme Maker | HueFlow",
    description:
      "Free color palette generator. Create beautiful color schemes, brand palettes, and UI color systems in seconds.",
    type: "website",
  },
};

const howToSchema = buildHowToSchema({
  title: "How to Generate a Color Palette",
  description: "Create a beautiful color palette using HueFlow's free palette generator.",
  steps: [
    "Go to HueFlow's Color Palette Generator at hueflow.site/generator.",
    "Choose a mood or color theme, or click Shuffle for a random palette.",
    "Lock colors you like and regenerate to refine the palette.",
    "Export your palette as CSS, Tailwind, JSON, or image.",
  ],
});

const faqSchema = buildFaqSchema([
  { question: "Is HueFlow's color palette generator free?", answer: "Yes, HueFlow's color palette generator is completely free with no signup required." },
  { question: "How do I export a color palette?", answer: "Click the Export button after generating a palette. You can export as CSS variables, Tailwind config, JSON, or PNG image." },
  { question: "Can I generate palettes from an image?", answer: "Yes, use HueFlow's Image Color Extractor tool to generate a palette from any uploaded photo." },
  { question: "What color formats does HueFlow support?", answer: "HueFlow supports HEX, RGB, HSL, HSB, CMYK, and Tailwind color class formats." },
]);

export default function Page() {
  return (
    <>
      <StructuredData data={buildSoftwareApplicationSchema()} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <Suspense>
        <GeneratorPage />
      </Suspense>
    </>
  );
}
