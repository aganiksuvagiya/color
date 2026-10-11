"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Header } from "./header";
import { SectionTitle } from "@/components/seo/shades-page";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { encodePalette } from "@/lib/share-utils";
import { dayIndex, generateTrendingPalettes, getCuratedTrendPalettes, type PaletteCategory } from "@/lib/trending";

type Category = "all" | PaletteCategory;
type TrendPalette = ReturnType<typeof getCuratedTrendPalettes>[number];
type Faq = { question: string; answer: string };
export type ExploreTile = { name: string; href: string; count: number; strip: string[] };

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "2026", label: "2026 Trends" },
  { key: "saas", label: "SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "mobile", label: "Mobile" },
  { key: "branding", label: "Branding" },
];

const LABEL: Record<PaletteCategory, string> = {
  "2026": "2026 Trends",
  saas: "SaaS",
  ecommerce: "E-commerce",
  mobile: "Mobile",
  branding: "Branding",
};

const SUMMARY: Record<PaletteCategory, string> = {
  "2026": "Emerging digital and editorial color direction.",
  saas: "Balanced for dashboards and polished product UI.",
  ecommerce: "Built for merchandising and conversion-focused experiences.",
  mobile: "Optimized for compact screens and quick scanning.",
  branding: "Great for identity systems and expressive launches.",
};

const TIPS = [
  { title: "Match the trend to your audience", body: "A trending palette only helps if it fits who you're designing for. Check it against your brand personality first." },
  { title: "Borrow the structure, not every color", body: "Keep the neutral-plus-accent balance of a trend palette and swap in a hue that belongs to your brand." },
  { title: "Test contrast before you ship", body: "Trendy pastels and neons often fail WCAG on text. Check buttons and body copy in the contrast checker." },
  { title: "Expect to refresh", body: "Trends move yearly. Use tokens or CSS variables so a palette update is one change, not a redesign." },
];

const hexesOf = (p: TrendPalette) => p.colors.map((c) => c.hex.toUpperCase());

/** /trends: trending palettes by category, in the coolors-style site design (same system as /palettes). */
export function TrendsPage({ faq, explore }: { faq: Faq[]; explore: ExploreTile[] }) {
  const [active, setActive] = useState<Category>("all");
  const [seed, setSeed] = useState(dayIndex());
  const { copied, copy } = useCopy();

  const all = useMemo(() => [...getCuratedTrendPalettes(), ...generateTrendingPalettes(seed)], [seed]);
  const shown = active === "all" ? all : all.filter((p) => p.category === active);
  const count = shown.length;
  const dots = hexesOf(all[0]);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Trends</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Trending Palettes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {dots.map((hex) => (
              <span key={hex} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
            ))}
          </span>
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{count} trending palettes across 5 categories.</span> Curated 2026 color direction plus fresh SaaS, e-commerce, mobile and branding systems you can open straight in the generator.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = active === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(f.key)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setSeed(Date.now())}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Shuffle fresh palettes
          </button>
        </div>
      </section>

      {/* ── All palettes in one grid ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {shown.map((p, i) => {
              const hexes = hexesOf(p);
              const joined = hexes.join(", ");
              return (
                <article key={`${p.label}-${i}`} className="group overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]">
                  <SwatchStrip colors={hexes} height="h-40" copied={copied} onCopy={copy} className="" />
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{LABEL[p.category]}</p>
                    <h3 className="mt-1.5 truncate text-[17px] font-semibold tracking-[-0.02em]">{p.label}</h3>
                    <p className="mt-1 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{hexes.map((h) => h.slice(1)).join(" · ")}</p>
                    <p className="mt-2 text-[13px] leading-5 text-[#1c1712]/55">{SUMMARY[p.category]}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link href={`/generator${encodePalette(p)}`} className="rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                        Open in generator →
                      </Link>
                      <button onClick={() => copy(joined)} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                        {copied === joined ? "✓ Copied" : "Copy all"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Explore the library ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle eyebrow="Library" title="Explore more palettes" body="Hand-picked palettes by style, color and season from the HueFlow library." />
            <Link href="/color-palettes" className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
              Browse the library →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {explore.map((t) => (
              <Link key={t.href} href={t.href} className="group overflow-hidden rounded-xl ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(28,23,18,0.35)]">
                <span className="flex h-14 w-full">
                  {t.strip.map((hex, i) => (
                    <span key={`${hex}-${i}`} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </span>
                <span className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-[14px] font-semibold transition group-hover:text-[#c2410c]">{t.name}</span>
                  <span className="text-[12px] text-[#1c1712]/40">{t.count}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tips + FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <SectionTitle eyebrow="Tips" title="Using trending palettes well" />
            <div className="hub-answer mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {TIPS.map((t, i) => (
                <div key={t.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <span className="text-[12px] font-semibold text-[#c2410c]">0{i + 1}</span>
                  <h3 className="mt-1 text-[15px] font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/60">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions about trending colors" />
            <div className="mt-5 divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {faq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                    {f.question}
                    <span className="text-lg leading-none text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#1c1712]/60">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
