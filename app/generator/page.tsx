import { Suspense } from "react";
import { GeneratorPage } from "@/components/generator/generator-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator - Free Color Scheme Maker | HueFlow",
  description:
    "Free color palette generator. Create beautiful color schemes, brand palettes, and UI color systems in seconds. Pick a mood or shuffle for instant results - no signup required.",
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

export default function Page() {
  return (
    <Suspense>
      <GeneratorPage />
    </Suspense>
  );
}
