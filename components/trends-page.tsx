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
    blurb: "A curated mix of trend palettes and fresh category-driven systems you can drop straight into branding, products, and landing pages.",
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
    case "2026": return "Emerging digital and editorial color direction.";
    case "saas": return "Balanced for dashboards and polished product UI.";
    case "ecommerce": return "Built for merchandising and conversion-focused experiences.";
    case "mobile": return "Optimized for compact screens and quick scanning.";
    case "branding": return "Great for identity systems and expressive launches.";
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

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

  async function copyPalette(palette: TrendPalette) {
    const hex = palette.colors.map((c) => c.hex.toUpperCase()).join(", ");
    await navigator.clipboard.writeText(hex);
    setCopied(palette.label);
    window.setTimeout(() => setCopied((cur) => (cur === palette.label ? null : cur)), 1800);
  }

  async function copySwatch(hex: string) {
    const formatted = hex.toUpperCase();
    await navigator.clipboard.writeText(formatted);
    setCopiedSwatch(formatted);
    window.setTimeout(() => setCopiedSwatch((cur) => (cur === formatted ? null : cur)), 1600);
  }

  return (
    <main className="relative min-h-screen bg-[#faf7f2] text-[#1c1712]">
      <Header />

      <div className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">

        {/* ── Hero ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="pt-32 pb-14"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/48 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" aria-hidden="true" />
              {meta.eyebrow}
            </span>
          </motion.div>

          <div className="mt-5">
              <motion.h1
                variants={fadeUp}
                className="max-w-3xl font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3rem] lg:text-[3.6rem]"
              >
                {meta.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-7 text-[#1c1712]/50">
                {meta.blurb}
              </motion.p>
          </div>
        </motion.div>

        {/* ── Category filter pills ── */}
        <div className="-mx-6 overflow-x-auto px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-2 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active === cat.key
                    ? "bg-[#1c1712] text-white shadow-[0_4px_14px_rgba(28,23,18,0.18)]"
                    : "border border-black/10 bg-white text-[#1c1712]/60 hover:border-black/18 hover:text-[#1c1712]"
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="ml-auto flex shrink-0 items-center gap-2.5 pl-2">
              <span className="text-sm text-[#1c1712]/38">{filtered.length} palettes</span>
              <button
                onClick={() => setSeed(Date.now())}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1c1712]/60 shadow-[0_1px_4px_rgba(28,23,18,0.06)] transition-all hover:border-black/18 hover:text-[#1c1712] hover:shadow-[0_4px_12px_rgba(28,23,18,0.08)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                Shuffle
              </button>
            </div>
          </div>
        </div>

        {/* ── Featured palette ── */}
        {featured && (
          <motion.div
            key={featured.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_4px_40px_rgba(28,23,18,0.08)]"
          >
            <div className="grid lg:grid-cols-[1fr_320px]">
              {/* Color strip */}
              <div className="flex h-56 lg:h-72">
                {featured.colors.map((color) => (
                  <button
                    key={`featured-${color.hex}`}
                    type="button"
                    onClick={() => copySwatch(color.hex)}
                    className="group relative flex-1 overflow-hidden transition-[flex] duration-300 hover:flex-[2]"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Copy ${color.hex.toUpperCase()}`}
                  >
                    <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded-full bg-black/55 px-2 py-1.5 text-center font-mono text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {copiedSwatch === color.hex.toUpperCase() ? "✓ Copied" : color.hex.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Info panel */}
              <div className="flex flex-col justify-between border-t border-black/[0.06] p-6 lg:border-l lg:border-t-0">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8531f]">
                    Featured
                  </span>
                  <h2 className="mt-3 text-xl font-bold tracking-[-0.03em] text-[#1c1712]">{featured.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#1c1712]/50">{getPaletteSummary(featured)}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {categorySignals[featured.category].map((signal) => (
                      <span key={signal} className="rounded-full border border-black/8 bg-[#faf7f2] px-3 py-1 text-[11px] text-[#1c1712]/55">
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href={`/generator${encodePalette(featured)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(232,83,31,0.32)]"
                    style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
                  >
                    Open in Generator
                  </Link>
                  <button
                    onClick={() => copyPalette(featured)}
                    className="rounded-full border border-black/10 bg-white py-2.5 text-sm font-semibold text-[#1c1712]/60 transition-all hover:border-black/18 hover:text-[#1c1712]"
                  >
                    {copied === featured.label ? "✓ Copied" : "Copy all HEX"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(1).map((palette, idx) => (
            <motion.article
              key={`${palette.label}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_2px_16px_rgba(28,23,18,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(28,23,18,0.10)]"
            >
              {/* Color strip */}
              <div className="flex h-44">
                {palette.colors.map((color) => (
                  <button
                    key={`${palette.label}-${color.hex}`}
                    type="button"
                    onClick={() => copySwatch(color.hex)}
                    className="group/swatch relative flex-1 overflow-hidden transition-[flex] duration-300 hover:flex-[2]"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Copy ${color.hex.toUpperCase()}`}
                  >
                    <span className="pointer-events-none absolute inset-x-1.5 bottom-1.5 rounded-full bg-black/55 px-1.5 py-1 text-center font-mono text-[9px] text-white opacity-0 transition-opacity duration-150 group-hover/swatch:opacity-100">
                      {copiedSwatch === color.hex.toUpperCase() ? "✓ Copied" : color.hex.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-bold tracking-[-0.02em] text-[#1c1712]">{palette.label}</p>
                    <p className="mt-1 text-sm leading-5 text-[#1c1712]/50">{getPaletteSummary(palette)}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-black/8 bg-[#faf7f2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">
                    {palette.category}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {categorySignals[palette.category].map((signal) => (
                    <span key={`${palette.label}-${signal}`} className="rounded-full border border-black/6 bg-[#faf7f2] px-2.5 py-0.5 text-[10px] text-[#1c1712]/50">
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/generator${encodePalette(palette)}`}
                    className="flex-1 rounded-full py-2.5 text-center text-sm font-semibold text-white shadow-[0_4px_14px_rgba(232,83,31,0.22)] transition-all hover:scale-[1.01] hover:shadow-[0_6px_18px_rgba(232,83,31,0.30)]"
                    style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
                  >
                    Open in Generator
                  </Link>
                  <button
                    onClick={() => copyPalette(palette)}
                    className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#1c1712]/55 transition-all hover:border-black/18 hover:text-[#1c1712]"
                  >
                    {copied === palette.label ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </main>
  );
}
