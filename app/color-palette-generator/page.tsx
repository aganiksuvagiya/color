import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Color Palette Generator - Free Online Color Scheme Maker",
  description:
    "The best free color palette generator. Create stunning color schemes for websites, apps, and brands in seconds. No signup, no limits - just beautiful palettes.",
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
    "online color palette generator",
    "color palette generator free",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-palette-generator` },
  openGraph: {
    title: "Color Palette Generator - Free Online Color Scheme Maker",
    description:
      "The best free color palette generator. Create stunning color schemes for websites, apps, and brands in seconds.",
    url: `${siteConfig.domain}/color-palette-generator`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-palette-generator`;

const faq = [
  {
    question: "What is the best free color palette generator?",
    answer:
      "HueFlow is one of the best free color palette generators - it creates complete 5-color systems with semantic roles (primary, neutral, accent, success, warning), accessibility scoring, CSS/Tailwind export, and palette insights. No signup required.",
  },
  {
    question: "How do I generate a color palette for a website?",
    answer:
      "Open HueFlow's generator, type a mood or brand description (e.g. 'luxury fintech' or 'playful food app'), and get a complete palette instantly. You can lock colors you like and shuffle the rest, then export to CSS or Tailwind variables.",
  },
  {
    question: "How do I choose colors for UI design?",
    answer:
      "A strong UI palette typically needs 5 roles: a neutral base, a primary brand color, a success state (green), a warning state (amber/orange), and an accent for highlights. HueFlow generates all 5 with contrast scores built in.",
  },
  {
    question: "Can I generate a color palette from a mood or keyword?",
    answer:
      "Yes - HueFlow supports mood-based generation. Type words like 'minimal SaaS', 'bold gaming', or 'warm editorial' and the generator creates a matching palette with human-curated color names.",
  },
  {
    question: "Is HueFlow's color palette generator free?",
    answer:
      "Yes, completely free. No account needed. Generate unlimited palettes, export to CSS/Tailwind, save to your browser, and share via link - all at no cost.",
  },
];

const features = [
  { icon: "✦", title: "Mood-based generation", body: "Type a brand, mood, or industry - get a matched palette instantly." },
  { icon: "◈", title: "Semantic color roles", body: "Every palette includes primary, neutral, accent, success, and warning - ready for real UI." },
  { icon: "⌘", title: "Lock & shuffle", body: "Lock colors you love, shuffle the rest. Build the perfect palette incrementally." },
  { icon: "⬡", title: "CSS & Tailwind export", body: "One-click export to CSS variables, Tailwind config, or raw hex codes." },
  { icon: "◎", title: "Accessibility scoring", body: "WCAG contrast ratios checked automatically on every palette." },
  { icon: "↗", title: "Share & save", body: "Save palettes to your browser or share via a persistent URL." },
];

export default function ColorPaletteGeneratorPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Palette Generator - Free Online Color Scheme Maker",
          description: "The best free color palette generator. Create stunning color schemes for websites, apps, and brands in seconds.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palette Generator", item: url },
        ])}
      />

      <div className="min-h-screen bg-[#160b05] text-white">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
              Free · No signup · Unlimited
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">
              Color Palette Generator
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/55 leading-relaxed">
              The best free color palette generator for designers and developers. Type a mood, brand, or industry - get a complete color scheme in seconds.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/generator"
                className="rounded-2xl bg-[#F15B2A] px-8 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
              >
                Generate a Palette - Free
              </Link>
              <Link
                href="/explore"
                className="rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/65 hover:border-white/30 hover:text-white transition-colors"
              >
                Browse Colors →
              </Link>
            </div>
          </div>

          {/* Preview swatches */}
          <div className="mb-20 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Terracotta Sessions", colors: ["#241008", "#C94B1A", "#7FBE6B", "#F4B93F", "#F15B2A"] },
              { label: "Nordic Blue", colors: ["#0E1A2B", "#2563EB", "#10B981", "#F59E0B", "#6366F1"] },
              { label: "Gilded Atelier", colors: ["#1A1209", "#B8860B", "#8B7355", "#D4AF37", "#C9A84C"] },
            ].map((p) => (
              <div key={p.label} className="rounded-2xl border border-white/10 bg-white/4 overflow-hidden">
                <div className="flex h-20">
                  {p.colors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="px-3 py-2 text-xs font-medium text-white/55">{p.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Everything a palette generator should do</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <div className="mb-2 text-xl text-[#F97A45]">{f.icon}</div>
                  <p className="mb-1 text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
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

          {/* CTA */}
          <div className="rounded-2xl border border-[#F15B2A]/20 bg-[#F15B2A]/8 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Start generating palettes - free</h2>
            <p className="mb-6 text-white/50">No account. No limits. Just colors.</p>
            <Link
              href="/generator"
              className="inline-block rounded-2xl bg-[#F15B2A] px-10 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
            >
              Open Color Palette Generator →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
