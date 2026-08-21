"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { HubPage } from "@/lib/seo/content";
import { Header } from "@/components/header";

function getIndustry(href: string): string {
  if (href.includes("saas")) return "SaaS";
  if (href.includes("fintech")) return "Fintech";
  if (href.includes("luxury")) return "Luxury";
  if (href.includes("dtc")) return "DTC";
  if (href.includes("creative")) return "Creative";
  if (href.includes("wellness")) return "Wellness";
  if (href.includes("startup")) return "Startup";
  if (href.includes("dark")) return "Dark";
  return "Other";
}

const INDUSTRIES = ["All", "SaaS", "Fintech", "Luxury", "DTC", "Creative", "Wellness", "Startup", "Dark"];

const TIPS = [
  { icon: "🎯", title: "Start with intent", body: "Pick your primary color based on the emotion you want — trust, energy, calm, or prestige." },
  { icon: "🔢", title: "Limit to 5 colors", body: "1–2 primaries, 1–2 neutrals, 1 accent. Fewer colors create more cohesion." },
  { icon: "♿", title: "Test contrast early", body: "Beautiful colors that fail WCAG checks hurt real users. Test before committing." },
  { icon: "🧩", title: "Use tokens, not values", body: "Name by role (primary, surface, error) not value (blue-500). Makes updates painless." },
];

export function PalettesHubView({ hub }: { hub: HubPage }) {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Card stack: auto-cycle + mouse parallax
  const validCards = hub.featuredLinks.filter((f) => f.paletteColors?.length).slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!isPaused.current) setActiveIdx((p) => (p + 1) % validCards.length);
    }, 3200);
    return () => clearInterval(t);
  }, [validCards.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
        e.preventDefault();
        setActiveIdx((p) => (p + 1) % validCards.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [validCards.length]);

  const copyColor = useCallback((hex: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1500);
    });
  }, []);

  const enriched = hub.featuredLinks.map((item) => ({
    ...item,
    industry: getIndustry(item.href),
  }));

  const filtered = activeIndustry === "All" ? enriched : enriched.filter((p) => p.industry === activeIndustry);
  const featured = enriched[0];
  const gridItems = activeIndustry === "All" ? filtered.slice(1) : filtered;
  const availableIndustries = INDUSTRIES.filter(
    (ind) => ind === "All" || enriched.some((p) => p.industry === ind)
  );

  return (
    <main className="min-h-screen text-[#1c1712]" style={{ backgroundColor: "#f8f4ef" }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-black/6">
        <div className="mx-auto max-w-[1400px] px-6 pt-28 pb-16 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8531F]/20 bg-[#E8531F]/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8531F] mb-7">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8531F]" />
                HueFlow · Color Library
              </div>

              <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#1c1712] lg:text-[3.8rem] leading-[1.02]">
                Curated palettes<br />
                for every brand.
              </h1>

              <p className="mt-6 max-w-md text-[1.05rem] leading-[1.75] text-[#1c1712]/50">
                Hand-picked color systems for SaaS, fintech, luxury, DTC, and creative brands — each built around a specific context with ready-to-use combinations.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E8531F] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(232,83,31,0.32)] hover:bg-[#C23A10] transition-colors"
                >
                  Generate your palette →
                </Link>
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-semibold text-[#1c1712]/65 hover:border-black/22 hover:text-[#1c1712] transition-all"
                >
                  Browse {hub.featuredLinks.length} collections ↓
                </a>
              </div>

              {/* Stats row */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                {[
                  { n: hub.featuredLinks.length, label: "collections" },
                  { n: "5+", label: "industries" },
                  { n: "40+", label: "color combinations" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-2xl font-semibold tracking-tight text-[#1c1712]">{s.n}</span>
                    <span className="text-xs text-[#1c1712]/40">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: clean crossfade palette showcase */}
            <motion.div
              aria-hidden="true"
              className="hidden lg:flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main card — all cards stacked, crossfade via opacity only (no white flash) */}
              <div
                className="relative overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_8px_40px_rgba(28,23,18,0.10)]"
                onMouseEnter={() => { isPaused.current = true; }}
                onMouseLeave={() => { isPaused.current = false; }}
              >
                {validCards.map((card, i) => (
                  <motion.div
                    key={card.href}
                    initial={false}
                    animate={{ opacity: i === activeIdx ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className={i === 0 ? "relative" : "absolute inset-0"}
                    style={{ pointerEvents: i === activeIdx ? "auto" : "none" }}
                  >
                    {/* Color strip — hover expands individual color */}
                    <div className="flex h-52 w-full">
                      {card.paletteColors?.map((hex, j) => (
                        <div
                          key={j}
                          className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]"
                          style={{ backgroundColor: hex }}
                        >
                          <button
                            onClick={(e) => copyColor(hex, e)}
                            className="absolute inset-0 flex items-end justify-center pb-2.5"
                            aria-label={`Copy ${hex}`}
                          >
                            <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                              {copiedColor === hex ? "✓ Copied" : hex.toUpperCase()}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Card footer — link to palette page */}
                    <div className="flex items-center justify-between px-5 py-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c1712]/32">
                          {getIndustry(card.href)} · {card.paletteColors?.length ?? 0} colors
                        </p>
                        <p className="mt-0.5 truncate text-[15px] font-semibold text-[#1c1712]">
                          {card.title?.replace(" Palette", "")}
                        </p>
                      </div>
                      <Link
                        href={card.href}
                        className="shrink-0 ml-4 text-[13px] font-semibold text-[#E8531F] hover:text-[#C23A10] transition-colors"
                      >
                        Open →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Palette strip indicators */}
              <div className="flex items-center gap-2.5">
                {validCards.map((card, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={[
                      "flex h-7 flex-1 overflow-hidden rounded-lg transition-all duration-200",
                      i === activeIdx
                        ? "ring-2 ring-[#E8531F] ring-offset-1 ring-offset-[#f8f4ef]"
                        : "opacity-50 hover:opacity-80",
                    ].join(" ")}
                  >
                    {card.paletteColors?.map((hex, j) => (
                      <div key={j} className="flex-1" style={{ backgroundColor: hex }} />
                    ))}
                  </button>
                ))}
                <span className="shrink-0 text-[11px] text-[#1c1712]/30 tabular-nums">
                  {activeIdx + 1}/{validCards.length}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ─────────────────────────────────── */}
      <section id="collections" className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">

        {/* Section header + filters */}
        <div className="flex flex-wrap items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8531F] mb-1.5">Collections</p>
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1c1712]">Explore palettes</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  activeIndustry === ind
                    ? "bg-[#1c1712] text-white shadow-sm"
                    : "border border-black/10 bg-white text-[#1c1712]/55 hover:border-black/20 hover:text-[#1c1712]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Featured card */}
        {featured?.paletteColors && activeIndustry === "All" && (
          <Link
            href={featured.href}
            className="group mb-5 block overflow-hidden rounded-[20px] border border-black/8 bg-white shadow-[0_2px_12px_rgba(28,23,18,0.05)] hover:border-black/14 hover:shadow-[0_12px_40px_rgba(28,23,18,0.12)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="relative flex h-64 w-full overflow-hidden">
              {featured.paletteColors.map((hex, i) => (
                <div key={i} className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[2]" style={{ backgroundColor: hex }}>
                  <button
                    onClick={(e) => copyColor(hex, e)}
                    className="absolute inset-0 flex items-end justify-center pb-3"
                    aria-label={`Copy ${hex}`}
                  >
                    <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {copiedColor === hex ? "✓ Copied" : hex.toUpperCase()}
                    </span>
                  </button>
                </div>
              ))}
              {/* Featured badge */}
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E8531F] shadow-sm backdrop-blur-sm">
                  ★ Featured
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c1712]/30">
                  {getIndustry(featured.href)} · {featured.paletteColors.length} colors
                </p>
                <h3 className="mt-1 text-[1.15rem] font-semibold text-[#1c1712]">{featured.title}</h3>
              </div>
              <span className="shrink-0 rounded-full border border-[#E8531F]/20 bg-[#E8531F]/8 px-4 py-2 text-sm font-semibold text-[#E8531F] group-hover:bg-[#E8531F] group-hover:text-white transition-all">
                Open page →
              </span>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gridItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-[20px] border border-black/8 bg-white shadow-[0_2px_8px_rgba(28,23,18,0.04)] hover:border-black/14 hover:shadow-[0_10px_32px_rgba(28,23,18,0.10)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {item.paletteColors?.length ? (
                <div className="relative flex h-36 w-full overflow-hidden">
                  {item.paletteColors.map((hex, i) => (
                    <div key={i} className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[2]" style={{ backgroundColor: hex }}>
                      <button
                        onClick={(e) => copyColor(hex, e)}
                        className="absolute inset-0 flex items-end justify-center pb-2"
                        aria-label={`Copy ${hex}`}
                      >
                        <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[8px] text-white opacity-0 transition-opacity duration-150 group-hover/swatch:opacity-100">
                          {copiedColor === hex ? "✓ Copied" : hex.toUpperCase()}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-36 w-full bg-gradient-to-br from-[#f0ebe4] to-[#e8e0d6]" />
              )}

              <div className="p-5">
                <h3 className="text-[14px] font-semibold text-[#1c1712] leading-snug">{item.title}</h3>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-black/8 bg-[#f8f4ef] px-2.5 py-0.5 text-[10px] font-medium text-[#1c1712]/45">
                      {item.industry}
                    </span>
                    <span className="text-[10px] text-[#1c1712]/30">{item.paletteColors?.length ?? 0} colors</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#E8531F] group-hover:text-[#C23A10] transition-colors">
                    Open →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TIPS ─────────────────────────────────────────── */}
      <section className="border-t border-black/6">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8531F] mb-1.5">Best practices</p>
              <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1c1712]">
                How to build better palettes
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-black/6 overflow-hidden rounded-[20px] sm:grid-cols-2 lg:grid-cols-4">
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className="relative bg-white p-7 flex flex-col gap-0"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 h-[3px] w-12 rounded-b-full" style={{ backgroundColor: "#E8531F" }} />
                {/* Step number */}
                <span className="font-display text-[3.5rem] font-semibold leading-none tracking-[-0.05em] text-[#1c1712]/8 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[13px] font-semibold text-[#1c1712]">{tip.title}</p>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#1c1712]/50">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="border-t border-black/6">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px]"
            style={{ background: "linear-gradient(155deg, #FF8A5A 0%, #E8531F 55%, #C23A10 100%)" }}
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #FFB38A 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FF6020 0%, transparent 70%)" }} />

            <div className="relative flex flex-col items-center px-8 pb-10 pt-12 text-center sm:px-12 sm:pb-12 sm:pt-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Start creating
              </div>

              <h2 className="mx-auto mt-5 max-w-xl font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[3.4rem]">
                Your colors are waiting.
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 text-white/65">
                Build a palette, check contrast, generate shades — all in one place, for free.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#C23A10] shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create a palette
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/18"
                >
                  Explore colors →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
