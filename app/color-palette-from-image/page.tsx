import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
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
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palette From Image", item: url },
        ])}
      />

      <div className="min-h-screen bg-[#160b05] text-white">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
              Free · No signup · Instant extraction
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">Color Palette From Image</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/55 leading-relaxed">
              Upload any photo and turn it into a usable color palette instantly - perfect for branding, websites, and design inspiration.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/tools/image-colors"
                className="rounded-2xl bg-[#F15B2A] px-8 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
              >
                Extract Palette - Free
              </Link>
              <Link
                href="/palettes"
                className="rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/65 hover:border-white/30 hover:text-white transition-colors"
              >
                Browse Palettes →
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Turn any photo into a palette</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <div className="mb-2 text-xl text-[#F97A45]">{f.icon}</div>
                  <p className="mb-1 text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            <div className="space-y-4">
              {faq.map((q) => (
                <div key={q.question} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <p className="mb-2 text-sm font-semibold text-white">{q.question}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#F15B2A]/20 bg-[#F15B2A]/8 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Start extracting palettes - free</h2>
            <p className="mb-6 text-white/50">No account. No limits. Just upload.</p>
            <Link
              href="/tools/image-colors"
              className="inline-block rounded-2xl bg-[#F15B2A] px-10 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
            >
              Open Image Color Extractor →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
