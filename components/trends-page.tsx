"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import { dayIndex, generateTrendingPalettes, getCuratedTrendPalettes, type PaletteCategory } from "@/lib/trending";

type Category = "all" | PaletteCategory;

type TrendPalette = ReturnType<typeof getCuratedTrendPalettes>[number];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "2026", label: "2026 Trends" },
  { key: "saas", label: "SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "mobile", label: "Mobile" },
  { key: "branding", label: "Branding" },
];

const categoryMeta: Record<Category, { eyebrow: string; title: string; blurb: string }> = {
  all: {
    eyebrow: "Palette Radar",
    title: "Trending palettes built for modern interfaces",
    blurb: "A sharper mix of curated trend palettes and fresh category-driven systems you can drop straight into branding, products, and landing pages.",
  },
  "2026": {
    eyebrow: "Forecast",
    title: "The palettes shaping 2026 visual culture",
    blurb: "Soft futurism, tech contrast, and warmer neutrals are leading brand and product palettes this cycle.",
  },
  saas: {
    eyebrow: "Product Systems",
    title: "SaaS palettes with trust, contrast, and clarity",
    blurb: "Focused on dashboards, onboarding, and polished UI surfaces that need to feel stable without looking flat.",
  },
  ecommerce: {
    eyebrow: "Conversion Colors",
    title: "E-commerce palettes with energy and intent",
    blurb: "Designed to support product highlights, urgency, and warmer conversion moments without losing polish.",
  },
  mobile: {
    eyebrow: "App First",
    title: "Mobile palettes tuned for bright UI moments",
    blurb: "High-readability combinations for cards, tabs, notifications, and motion-heavy app interfaces.",
  },
  branding: {
    eyebrow: "Brand Identity",
    title: "Branding palettes with memorability built in",
    blurb: "Expressive color systems for launches, studios, campaigns, and visual identities that need distinct personality.",
  },
};

const categorySignals: Record<PaletteCategory, string[]> = {
  "2026": ["Soft future neutrals", "Editorial contrast"],
  saas: ["UI-safe contrast", "Trustworthy depth"],
  ecommerce: ["Conversion warmth", "Product focus"],
  mobile: ["App-store brightness", "Quick scanning"],
  branding: ["Memorable accents", "Distinct voice"],
};

function getPaletteSummary(palette: TrendPalette) {
  switch (palette.category) {
    case "2026":
      return "Emerging digital and editorial color direction.";
    case "saas":
      return "Balanced for dashboards and polished product UI.";
    case "ecommerce":
      return "Built for merchandising and conversion-focused experiences.";
    case "mobile":
      return "Optimized for compact screens and quick scanning.";
    case "branding":
      return "Great for identity systems and expressive launches.";
  }
}

function getRoleLabel(index: number) {
  return ["Base", "Primary", "Support", "Highlight", "Accent"][index] ?? `Tone ${index + 1}`;
}

export function TrendsPage() {
  const [active, setActive] = useState<Category>("all");
  const [seed, setSeed] = useState(dayIndex());
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const trendingPalettes = useMemo(
    () => [...getCuratedTrendPalettes(), ...generateTrendingPalettes(seed)],
    [seed],
  );

  const filtered = active === "all" ? trendingPalettes : trendingPalettes.filter((p) => p.category === active);
  const featured = filtered[0] ?? trendingPalettes[0];
  const meta = categoryMeta[active];
  const uniqueCategories = new Set(trendingPalettes.map((palette) => palette.category)).size;

  async function copyPalette(palette: TrendPalette) {
    const hex = palette.colors.map((color) => color.hex.toUpperCase()).join(", ");
    await navigator.clipboard.writeText(hex);
    setCopied(palette.label);
    window.setTimeout(() => setCopied((current) => (current === palette.label ? null : current)), 1800);
  }

  async function copySwatch(hex: string) {
    const formatted = hex.toUpperCase();
    await navigator.clipboard.writeText(formatted);
    setCopiedSwatch(formatted);
    window.setTimeout(() => setCopiedSwatch((current) => (current === formatted ? null : current)), 1600);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#130904] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,153,76,0.16),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(255,92,33,0.18),transparent_30%),linear-gradient(145deg,#1b0d06_0%,#130904_42%,#0c0604_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8 sm:pt-36">
        <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 py-6 shadow-[0_24px_120px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-7 sm:py-8 lg:px-9 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ff9d6c]">{meta.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[0.92]">
              {meta.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
              {meta.blurb}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="min-w-[150px] rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Live Mix</p>
                <p className="mt-1 text-lg font-semibold text-white">{filtered.length} palettes</p>
              </div>
              <div className="min-w-[150px] rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Coverage</p>
                <p className="mt-1 text-lg font-semibold text-white">{uniqueCategories} categories</p>
              </div>
              <div className="min-w-[210px] rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Built For</p>
                <p className="mt-1 text-lg font-semibold text-white">UI, brands, launches</p>
              </div>
            </div>
          </div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#221510]/85 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            >
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#ff9d6c]">Featured Palette</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{featured.label}</h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                    {featured.category}
                  </span>
                </div>
              </div>

              <div className="flex h-40 w-full sm:h-44">
                {featured.colors.map((color) => (
                  <button
                    key={`${featured.label}-${color.hex}`}
                    type="button"
                    onClick={() => copySwatch(color.hex)}
                    className="group relative flex-1 overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Copy ${color.hex.toUpperCase()}`}
                    title={`Copy ${color.hex.toUpperCase()}`}
                  >
                    <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded-full bg-black/20 px-2 py-1 text-center font-mono text-[10px] text-white/0 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100 group-hover:text-white/90 group-focus-visible:opacity-100 group-focus-visible:text-white/90">
                      {copiedSwatch === color.hex.toUpperCase() ? "Copied" : color.hex.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              <div className="px-5 py-4 sm:px-6">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => copyPalette(featured)}
                    className="shrink-0 text-sm font-medium text-white/52 transition-colors hover:text-white"
                  >
                    {copied === featured.label ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/generator${encodePalette(featured)}`}
                    className="block rounded-2xl bg-[#f46b35] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#ff844d]"
                  >
                    Open in Generator
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
          </div>
        </section>

        <section className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Browse by lane</p>
              <p className="mt-1 text-sm text-white/55">Switch mood, reshuffle fresh options, or jump straight into a palette.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all ${
                    active === cat.key
                      ? "bg-white text-[#180a05] shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
                      : "border border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => setSeed(Date.now())}
                className="ml-1 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                  <path d="M21 4v5h-5" />
                </svg>
                Shuffle Set
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((palette, idx) => (
            <motion.article
              key={`${palette.label}-${idx}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_18px_80px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-44">
                {palette.colors.map((color) => (
                  <button
                    key={`${palette.label}-${color.hex}`}
                    type="button"
                    onClick={() => copySwatch(color.hex)}
                    className="group relative flex-1 overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Copy ${color.hex.toUpperCase()}`}
                    title={`Copy ${color.hex.toUpperCase()}`}
                  >
                    <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded-full bg-black/20 px-2 py-1 text-center font-mono text-[10px] text-white/0 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100 group-hover:text-white/90 group-focus-visible:opacity-100 group-focus-visible:text-white/90">
                      {copiedSwatch === color.hex.toUpperCase() ? "Copied" : color.hex.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.03em] text-white">{palette.label}</p>
                    <p className="mt-2 text-sm leading-6 text-white/55">{getPaletteSummary(palette)}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {palette.category}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categorySignals[palette.category].map((signal) => (
                    <span key={`${palette.label}-${signal}`} className="rounded-full bg-white/6 px-3 py-1 text-[11px] text-white/55">
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/generator${encodePalette(palette)}`}
                    className="flex-1 rounded-2xl bg-white/10 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/16"
                  >
                    Open in Generator
                  </Link>
                  <button
                    onClick={() => copyPalette(palette)}
                    className="rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/12 hover:text-white"
                  >
                    {copied === palette.label ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
