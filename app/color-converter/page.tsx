import type { Metadata } from "next";
import { ColorConverter } from "@/components/color-converter";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Color Converter - HEX to RGB, RGB to HEX, HSL Converter",
  description:
    "Free online color converter. Convert HEX to RGB, RGB to HEX, HEX to HSL, and more. Instant results with copy-to-clipboard - no signup needed.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hex to hsl",
    "hsl to hex",
    "rgb to hsl",
    "color code converter",
    "hex color converter",
    "online color converter",
    "hex to rgb converter",
    "rgb to hex converter",
    "color format converter",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-converter` },
  openGraph: {
    title: "Color Converter - HEX to RGB, RGB to HEX, HSL Converter",
    description:
      "Free online color converter. Convert HEX to RGB, RGB to HEX, HEX to HSL instantly.",
    url: `${siteConfig.domain}/color-converter`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-converter`;

const faq = [
  {
    question: "How do I convert HEX to RGB?",
    answer:
      "Enter any HEX code (e.g. #3B82F6) in the converter above and it instantly shows the RGB value (e.g. rgb(59, 130, 246)). You can copy it with one click.",
  },
  {
    question: "How do I convert RGB to HEX?",
    answer:
      "Enter R, G, B values (0–255 each) and the converter outputs the HEX code instantly. For example, rgb(59, 130, 246) converts to #3B82F6.",
  },
  {
    question: "What is HSL color format?",
    answer:
      "HSL stands for Hue, Saturation, Lightness. Hue is a degree on the color wheel (0–360), Saturation is the intensity (0–100%), and Lightness is how light or dark the color is (0–100%). HSL is easier for designers to adjust than HEX or RGB.",
  },
  {
    question: "Which color format should I use in CSS?",
    answer:
      "HEX is the most common in CSS and design tools. RGB is useful when you need transparency (rgba). HSL is best when you want to programmatically adjust brightness or saturation. All three are fully supported in modern browsers.",
  },
];

export default function ColorConverterPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Converter - HEX to RGB, RGB to HEX, HSL Converter",
          description: "Free online color converter. Convert HEX to RGB, RGB to HEX, HEX to HSL instantly.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Converter", item: url },
        ])}
      />
      <ColorConverter />
    </>
  );
}
