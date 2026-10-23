import type { Metadata } from "next";
import { ColorPicker } from "@/components/color-picker";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebApplicationSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

// The picker tool and its text live on this search-phrase URL; /tools/picker 308s here.
const page = toolPageContent.picker;
const title = "Color Picker - Free Online HEX, RGB & HSL Color Tool";
const description =
  "Pick any color and instantly get HEX, RGB, and HSL values, plus matching shades and tints. Free online color picker for designers and developers - no signup.";
const url = `${siteConfig.domain}/color-picker`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "color picker",
    "hex color picker",
    "online color picker",
    "hsl color picker",
    "rgb color picker",
    "free color picker tool",
    "website color picker",
    "hex to rgb converter",
    "pick a color online",
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Pick any color and instantly get HEX, RGB, and HSL values, plus matching shades and tints.",
    url,
    type: "website",
  },
};

export default function ColorPickerPage() {
  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData data={buildWebApplicationSchema({ name: "HueFlow Color Picker", description: "Pick any color and instantly get HEX, RGB, HSL, HSB and CMYK values, plus matching shades and tints.", url, featureList: ["HEX, RGB, HSL, HSB and CMYK values", "Shades and tints", "EyeDropper screen picker (Chrome and Edge)"] })} />
      {/* The how-to steps and FAQ are the ones ColorPicker shows on the page. */}
      <StructuredData data={buildHowToSchema({ title: `How to use the ${page.title}`, description: page.description, steps: page.howToSteps })} />
      <StructuredData data={buildFaqSchema(page.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools` },
          { name: "Color Picker", item: url },
        ])}
      />
      <ColorPicker />
    </>
  );
}
