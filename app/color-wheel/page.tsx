import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
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
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Wheel", item: url },
        ])}
      />

      <div className="min-h-screen bg-[#160b05] text-white">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
              Free · No signup · 6 harmony types
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">Color Wheel</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/55 leading-relaxed">
              Build complementary, analogous, triadic, tetradic, split-complementary, and monochromatic palettes from one base color using proven color-wheel relationships.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/tools/color-harmony"
                className="rounded-2xl bg-[#F15B2A] px-8 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
              >
                Open Color Wheel - Free
              </Link>
              <Link
                href="/color-palette-generator"
                className="rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/65 hover:border-white/30 hover:text-white transition-colors"
              >
                Try Palette Generator →
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Six harmony types on the wheel</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {harmonies.map((h) => (
                <div key={h.title} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <p className="mb-1 text-sm font-semibold text-white">{h.title}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{h.body}</p>
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
            <h2 className="mb-3 text-2xl font-bold">Start building with the color wheel - free</h2>
            <p className="mb-6 text-white/50">No account. No limits. Just harmony.</p>
            <Link
              href="/tools/color-harmony"
              className="inline-block rounded-2xl bg-[#F15B2A] px-10 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
            >
              Open Color Wheel →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
