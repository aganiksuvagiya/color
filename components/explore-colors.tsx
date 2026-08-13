"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Header } from "./header";
import { generateRandomPalette, generateFromColor, hslToHex } from "@/lib/color-utils";
import type { Palette } from "@/lib/types";

/* ─── Types ──────────────────────────────────────────────────────────── */

type GeneratedPalette = Palette & { id: string; category: string };

/* ─── Constants ──────────────────────────────────────────────────────── */

const BATCH_SIZE = 24;

const CATEGORIES = [
  { name: "All",     dot: null },
  { name: "Warm",    dot: "#E87040" },
  { name: "Cool",    dot: "#4080D0" },
  { name: "Nature",  dot: "#50A840" },
  { name: "Minimal", dot: "#909090" },
  { name: "Bold",    dot: "#E00050" },
  { name: "Pastel",  dot: "#D8A0C8" },
  { name: "Dark",    dot: "#303048" },
  { name: "Earth",   dot: "#B06040" },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */

function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seedForCategory(cat: string): string {
  switch (cat) {
    case "Warm":    return hslToHex(ri(0,   55),  ri(65, 88), ri(38, 58));
    case "Cool":    return hslToHex(ri(190, 270), ri(60, 88), ri(35, 58));
    case "Nature":  return hslToHex(ri(80,  155), ri(50, 75), ri(30, 50));
    case "Minimal": return hslToHex(ri(0,   360), ri(0,  12), ri(28, 58));
    case "Bold":    return hslToHex(ri(0,   360), ri(85, 100),ri(42, 58));
    case "Pastel":  return hslToHex(ri(0,   360), ri(45, 70), ri(68, 82));
    case "Dark":    return hslToHex(ri(200, 280), ri(15, 35), ri(8,  22));
    case "Earth":   return hslToHex(ri(18,  42),  ri(45, 70), ri(28, 48));
    default:        return hslToHex(ri(0,   360), ri(40, 85), ri(35, 65));
  }
}

function makeBatch(category: string, count: number): GeneratedPalette[] {
  const ts = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const palette = category === "All"
      ? generateRandomPalette()
      : generateFromColor(seedForCategory(category));
    return { ...palette, id: `p-${ts}-${i}-${Math.random().toString(36).slice(2, 6)}`, category };
  });
}

function paletteUrl(p: GeneratedPalette) {
  const c = p.colors.map((col) => col.hex.replace("#", "")).join("-");
  return `/generator?label=${encodeURIComponent(p.label)}&c=${c}`;
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

/* ─── Main Component ─────────────────────────────────────────────────── */

export function ExploreColors() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [palettes, setPalettes] = useState<GeneratedPalette[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef(activeCategory);

  useEffect(() => {
    categoryRef.current = activeCategory;
    setPalettes(makeBatch(activeCategory, BATCH_SIZE));
    setSearch("");
  }, [activeCategory]);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setPalettes((prev) => [...prev, ...makeBatch(categoryRef.current, BATCH_SIZE)]);
      setLoading(false);
    }, 250);
  }, [loading]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  const visible = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return palettes;
    return palettes.filter((p) => p.label.toLowerCase().includes(q));
  }, [palettes, search]);

  const copyAll = useCallback(async (p: GeneratedPalette) => {
    const text = p.colors.map((c) => c.hex).join(", ");
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const reshuffle = useCallback(() => {
    setPalettes(makeBatch(activeCategory, BATCH_SIZE));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      <main className="mx-auto max-w-[1560px] px-4 pt-24 pb-24 sm:px-6 sm:pt-36 lg:px-8">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 backdrop-blur-xl mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
            Infinite Palettes
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Explore Palettes
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/45">
            Endless color palettes, generated fresh. Scroll down to discover more.
          </p>
        </motion.div>

        {/* Search + Reshuffle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-5 flex items-center gap-3 max-w-md mx-auto"
        >
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search palette names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/22 focus:bg-white/8"
            />
          </div>
          <button
            onClick={reshuffle}
            title="Generate new set"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
            </svg>
          </button>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? "bg-white text-[#160b05] shadow-lg"
                  : "border border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.dot && (
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: cat.dot }} />
              )}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <p className="mb-5 text-center text-xs text-white/25">
          {visible.length} palettes loaded · scroll for more
        </p>

        {/* Palette grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {visible.map((palette, i) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              index={i}
              isCopied={copiedId === palette.id}
              onCopyAll={copyAll}
            />
          ))}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={loaderRef} className="flex justify-center py-14">
          {loading && (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-white/50" />
          )}
        </div>
      </main>
    </div>
  );
}

/* ─── Palette Card ───────────────────────────────────────────────────── */

function PaletteCard({
  palette,
  index,
  isCopied,
  onCopyAll,
}: {
  palette: GeneratedPalette;
  index: number;
  isCopied: boolean;
  onCopyAll: (p: GeneratedPalette) => void;
}) {
  const [copiedStripe, setCopiedStripe] = useState<number | null>(null);

  async function copyStripe(e: React.MouseEvent, hex: string, ci: number) {
    e.preventDefault();
    e.stopPropagation();
    try { await navigator.clipboard.writeText(hex); } catch {
      const ta = document.createElement("textarea");
      ta.value = hex; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopiedStripe(ci);
    setTimeout(() => setCopiedStripe(null), 1400);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min((index % BATCH_SIZE) * 0.02, 0.48) }}
      className="group rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-white/20 transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
    >
      {/* Color strip — each stripe clickable to copy hex */}
      <div className="relative flex h-28 w-full sm:h-32 overflow-hidden">
        {palette.colors.map((col, ci) => (
          <button
            key={ci}
            onClick={(e) => copyStripe(e, col.hex, ci)}
            title={`Copy ${col.hex}`}
            className="relative flex-1 overflow-hidden"
            style={{ backgroundColor: col.hex }}
          >
            {/* Hex label overlay — fades in on card hover */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                background: isLight(col.hex)
                  ? "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 65%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 65%)",
              }}
            >
              <span
                className="mb-1.5 font-mono text-[7px] font-bold uppercase tracking-widest leading-none"
                style={{ color: isLight(col.hex) ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.92)" }}
              >
                {col.hex.slice(1)}
              </span>
            </div>

            <AnimatePresence>
              {copiedStripe === ci && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: isLight(col.hex) ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.22)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    style={{ color: isLight(col.hex) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.95)" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white leading-tight">{palette.label}</p>
          <p className="mt-0.5 text-[11px] text-white/35">{palette.category}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onCopyAll(palette)}
            title="Copy all hex codes"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8 text-white/40 hover:bg-white/15 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isCopied ? (
                <motion.span key="check" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link
            href={paletteUrl(palette)}
            title="Open in Generator"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F15B2A]/20 text-[#F97A45] hover:bg-[#F15B2A]/40 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
