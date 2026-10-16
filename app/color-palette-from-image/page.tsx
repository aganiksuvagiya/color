import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { ToolLanding } from "@/components/seo/tool-landing";
import { buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema, buildWebApplicationSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Color Palette From Image - Free Online Extractor",
  description:
    "Upload a photo and generate a color palette from image dominant colors instantly. Free online tool for branding, websites, and design inspiration - no signup.",
  keywords: [
    "color palette from image",
    "extract color palette from photo",
    "image to color palette",
    "photo palette generator",
    "get color palette from picture",
    "dominant color extractor",
    "image color extractor free",
    "brand palette from image",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-palette-from-image` },
  openGraph: {
    title: "Color Palette From Image - Free Online Extractor",
    description: "Upload a photo and generate a color palette from image dominant colors instantly.",
    url: `${siteConfig.domain}/color-palette-from-image`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-palette-from-image`;

const faq = [
  {
    question: "How do I make a color palette from an image?",
    answer:
      "Upload any photo, screenshot, or moodboard image to HueFlow's extractor and it instantly analyzes the pixels to generate a palette of the dominant colors.",
  },
  {
    question: "What images work best for extracting a palette?",
    answer:
      "Images with clear subjects, strong lighting, and a defined visual mood tend to produce the most useful palettes for branding and interface work.",
  },
  {
    question: "Can I use an extracted palette directly in a website or brand?",
    answer:
      "It's a strong starting point - most teams then check contrast and semantic roles (primary, accent, success, warning) before shipping it to production.",
  },
  {
    question: "Is the color palette from image tool free?",
    answer: "Yes, completely free with no signup or account required.",
  },
];

const features = [
  { icon: "✦", title: "Upload any image", body: "Product shots, screenshots, or inspiration boards - all work." },
  { icon: "◈", title: "Dominant colors", body: "Automatically finds the most visually significant tones." },
  { icon: "⬡", title: "Copy HEX instantly", body: "Every extracted color is ready to copy for CSS or design tools." },
  { icon: "◎", title: "Palette-ready", body: "Turn the extracted colors into a full brand or UI system." },
];

export default function ColorPaletteFromImagePage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Palette From Image - Free Online Extractor",
          description: "Upload a photo and generate a color palette from image dominant colors instantly.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildWebApplicationSchema({ name: "HueFlow Color Palette from Image", description: "Upload a photo and extract its dominant colors as a color palette with HEX codes.", url, featureList: ["Dominant color extraction", "HEX, RGB and HSL codes", "Runs in the browser"] })} />
      <StructuredData data={buildSpeakableSchema(["h1", ".hub-description"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palette From Image", item: url },
        ])}
      />

      <ToolLanding
        crumb="Color Palette From Image"
        badge="Free · No signup · Instant extraction"
        title="Color Palette From Image"
        subtitle="Upload any photo and turn it into a usable color palette instantly. Perfect for branding, websites, and design inspiration."
        primary={{ label: "Extract Palette", href: "/tools/image-colors" }}
        secondary={{ label: "Browse Palettes →", href: "/palettes" }}
        dots={["#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1"]}
        featuresTitle="Turn any photo into a palette"
        features={features}
        faq={faq}
        closing={{ title: "Start extracting palettes, free", body: "No account. No limits. Just upload.", cta: { label: "Open Image Color Extractor →", href: "/tools/image-colors" } }}
      />
    </>
  );
}
