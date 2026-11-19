import type { Metadata } from "next";

import { ColorWheelPage } from "@/components/color-wheel-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildSpeakableSchema,
  buildWebApplicationSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { colorWheel } from "@/lib/seo/guide-pages";
import { siteConfig } from "@/lib/seo/site-config";

const path = "/color-wheel";
const title = "Color Wheel Chart: Primary, Secondary & Tertiary Colors";
const description =
  "Interactive color wheel with all 12 colors: primary, secondary and tertiary colors, warm and cool colors, and complementary, analogous, triadic and tetradic schemes. Free color wheel calculator.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
  keywords: [
    "color wheel",
    "color wheel chart",
    "online color wheel",
    "primary secondary tertiary colors",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "warm and cool colors",
    "complementary color calculator",
    "color wheel generator",
    "12 color wheel",
    "rgb color wheel",
  ],
});



const { steps, faq } = colorWheel;

export default function Page() {
  const url = `${siteConfig.domain}${path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildWebApplicationSchema({
          name: "HueFlow Color Wheel",
          description,
          url,
          featureList: [
            "Interactive 12-color artist (RYB) and screen (RGB) color wheels",
            "Complementary, split-complementary, analogous, triadic and tetradic schemes",
            "Color wheel calculator for any HEX code",
            "HEX, RGB and HSL codes with one-click copy",
          ],
        })}
      />
      <StructuredData data={buildHowToSchema({ title: "How to use a color wheel to choose colors", description, steps })} />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Wheel", item: url },
        ])}
      />
      <ColorWheelPage faq={faq} steps={steps} />
    </>
  );
}
