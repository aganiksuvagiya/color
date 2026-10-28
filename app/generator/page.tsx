import { Suspense } from "react";
import { GeneratorPage } from "@/components/generator/generator-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Scheme Generator: Lock, Shuffle & Export Palettes",
  alternates: { canonical: "/generator" },
  description:
    "HueFlow's palette maker: press space to generate color schemes, lock colors you like, start from a mood, base color or image, and export as CSS, Tailwind or JSON. Free, no signup.",
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
    title: "Color Scheme Generator: Lock, Shuffle & Export Palettes | HueFlow",
    description:
      "Free color palette generator. Create beautiful color schemes, brand palettes, and UI color systems in seconds.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* No FAQ/HowTo markup here: the full-screen app shows neither, and Google's rules
          forbid marking up content that isn't visible on the page. */}
      <StructuredData data={buildSoftwareApplicationSchema()} />
      <h1 className="sr-only">Color Palette Generator</h1>
      <Suspense>
        <GeneratorPage />
      </Suspense>
    </>
  );
}
