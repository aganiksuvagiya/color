"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Header } from "./header";
import { generateRandomPalette, generateFromColor, hslToHex } from "@/lib/color-utils";
import type { Palette } from "@/lib/types";

/* ─── Types ──────────────────────────────────────────────────────────── */

type CardSize = "sm" | "md" | "lg";
type SortBy = "random" | "az" | "za";
type GeneratedPalette = Palette & { id: string; category: string; size: CardSize };

/* ─── Constants ──────────────────────────────────────────────────────── */

const BATCH_SIZE = 24;
const STRIP_H: Record<CardSize, string> = { sm: "h-28", md: "h-36", lg: "h-52" };
const SIZE_POOL: CardSize[] = ["sm","sm","md","md","md","md","md","lg","lg"];

const CATEGORIES = [
  { name: "Trending", dot: "#E8531F" },
  { name: "All",      dot: null },
  { name: "Warm",     dot: "#E87040" },
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
    const size = SIZE_POOL[Math.floor(Math.random() * SIZE_POOL.length)];
    return { ...palette, id: `p-${ts}-${i}-${Math.random().toString(36).slice(2, 6)}`, category, size };
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

function hexToHue(hex: string): number {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  if (max === min) return -1;
  const d = max - min;
  let h = 0;
  if (max === r) h = ((g-b)/d + (g<b?6:0)) * 60;
  else if (max === g) h = ((b-r)/d + 2) * 60;
  else h = ((r-g)/d + 4) * 60;
  return h;
}

function paletteMatchesHue(palette: GeneratedPalette, hue: number, range = 28): boolean {
  return palette.colors.some(c => {
    const h = hexToHue(c.hex);
    if (h < 0) return false;
    return Math.min(Math.abs(h - hue), 360 - Math.abs(h - hue)) <= range;
  });
}

/* ─── Main Component ─────────────────────────────────────────────────── */

export function ExploreColors() {
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("random");
  const [hueFilter, setHueFilter] = useState<number | null>(null);
  const [palettes, setPalettes] = useState<GeneratedPalette[]>([]);
  const [trendingPalettes] = useState<GeneratedPalette[]>(() => makeBatch("All", BATCH_SIZE));
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef(activeCategory);

  useEffect(() => {
    categoryRef.current = activeCategory;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must run client-only
    if (activeCategory !== "Trending") {
      setPalettes(makeBatch(activeCategory, BATCH_SIZE));
    }
    setSearch("");
    setHueFilter(null);
    setInitialLoading(false);
  }, [activeCategory]);

  const loadMore = useCallback(() => {
    if (loading || categoryRef.current === "Trending") return;
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
    let list = activeCategory === "Trending" ? trendingPalettes : palettes;
    const q = search.toLowerCase().trim();
    if (q) list = list.filter((p) => p.label.toLowerCase().includes(q));
    if (hueFilter !== null) list = list.filter(p => paletteMatchesHue(p, hueFilter));
    if (sortBy === "az") list = [...list].sort((a, b) => a.label.localeCompare(b.label));
    else if (sortBy === "za") list = [...list].sort((a, b) => b.label.localeCompare(a.label));
    return list;
  }, [activeCategory, trendingPalettes, palettes, search, hueFilter, sortBy]);

  const reshuffle = useCallback(() => {
    if (activeCategory !== "Trending") setPalettes(makeBatch(activeCategory, BATCH_SIZE));
    setHueFilter(null);
    setSearch("");
  }, [activeCategory]);

  function handleHueBarClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const hue = Math.round(pct * 360);
    setHueFilter(prev => prev !== null && Math.abs(prev - hue) < 12 ? null : hue);
  }

  return (
    <div className="min-h-screen text-[#1c1712]" style={{ backgroundColor: "#f8f4ef" }}>
      <Header />

      <main className="mx-auto max-w-[1560px] px-4 pt-24 pb-24 sm:px-6 sm:pt-36 lg:px-8">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1c1712]/45 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8531F]" />
            Infinite Palettes
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl text-[#1c1712]">
            Explore Palettes
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#1c1712]/45">
            Endless color palettes, generated fresh. Scroll down to discover more.
          </p>
        </motion.div>

        {/* Search + Sort + Reshuffle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-5 flex items-center gap-2.5 max-w-xl mx-auto"
        >
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1c1712]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search palette names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-11 pr-4 text-sm text-[#1c1712] placeholder-[#1c1712]/30 outline-none transition-colors focus:border-black/20 focus:shadow-[0_0_0_3px_rgba(232,83,31,0.08)]"
            />
          </div>
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-10 rounded-full border border-black/10 bg-white pl-3.5 pr-8 text-sm text-[#1c1712]/65 outline-none transition-colors hover:border-black/16 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231c171260' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="random">Random</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>
          <button
            onClick={reshuffle}
            title="Generate new set"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#1c1712]/45 hover:border-black/16 hover:text-[#1c1712] transition-colors"
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
          className="mb-5 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? cat.name === "Trending"
                    ? "bg-gradient-to-r from-[#ff7a45] to-[#e8531f] text-white shadow-sm"
                    : "bg-[#1c1712] text-white shadow-sm"
                  : "border border-black/10 bg-white text-[#1c1712]/55 hover:border-black/16 hover:text-[#1c1712]"
              }`}
            >
              {cat.name === "Trending" ? (
                <span className="text-[13px] leading-none">🔥</span>
              ) : cat.dot ? (
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: cat.dot }} />
              ) : null}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Hue filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#1c1712]/40 shrink-0 w-20">Filter by hue</span>
            <div
              onClick={handleHueBarClick}
              className="relative flex-1 h-3 rounded-full cursor-crosshair shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]"
              style={{ background: "linear-gradient(to right, hsl(0,75%,55%), hsl(30,75%,55%), hsl(60,75%,55%), hsl(90,75%,50%), hsl(120,75%,45%), hsl(150,75%,45%), hsl(180,75%,45%), hsl(210,75%,55%), hsl(240,75%,55%), hsl(270,75%,55%), hsl(300,75%,55%), hsl(330,75%,55%), hsl(360,75%,55%))" }}
              title="Click to filter by hue · click again to clear"
            >
              {hueFilter !== null && (
                <div
                  className="absolute top-1/2 h-5 w-5 rounded-full border-[2.5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
                  style={{
                    left: `${(hueFilter / 360) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `hsl(${hueFilter}, 80%, 55%)`,
                  }}
                />
              )}
            </div>
            <div className="w-12 flex justify-end">
              {hueFilter !== null && (
                <button
                  onClick={() => setHueFilter(null)}
                  className="text-xs text-[#1c1712]/40 hover:text-[#E8531F] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Count */}
        <p className="mb-5 text-center text-xs text-[#1c1712]/30">
          {visible.length} palettes{hueFilter !== null ? " matching hue" : " loaded"} · {hueFilter !== null ? "clear filter to see all" : "scroll for more"}
        </p>

        {/* Loading skeleton */}
        {initialLoading ? (
          <div className="columns-2 gap-3 sm:columns-3 md:columns-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mb-3 break-inside-avoid rounded-2xl border border-black/8 bg-white overflow-hidden animate-pulse">
                <div className={`${["h-28","h-36","h-52"][i % 3]} bg-black/6`} />
                <div className="px-3.5 py-3">
                  <div className="h-3 w-24 rounded-full bg-black/8 mb-2" />
                  <div className="h-2.5 w-14 rounded-full bg-black/6" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex gap-2">
              {["#E8B4A0","#B4C8E8","#A0E8B4","#E8E0A0","#D4A0E8"].map((c, i) => (
                <div key={i} className="h-10 w-10 rounded-xl opacity-50" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-base font-semibold text-[#1c1712]">No palettes found</p>
            <p className="mt-1.5 text-sm text-[#1c1712]/45">
              {search ? `No results for "${search}"` : "Try a different hue or category"}
            </p>
            <button
              onClick={() => { setSearch(""); setHueFilter(null); }}
              className="mt-5 rounded-full border border-black/12 bg-white px-5 py-2 text-sm font-medium text-[#1c1712]/70 hover:border-black/20 hover:text-[#1c1712] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Masonry grid */
          <div className="columns-2 gap-3 sm:columns-3 md:columns-4">
            {visible.map((palette, i) => (
              <div key={palette.id} className="mb-3 break-inside-avoid">
                <PaletteCard palette={palette} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        {!initialLoading && visible.length > 0 && (
          <div ref={loaderRef} className="flex justify-center py-14">
            {loading && (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-[#E8531F]" />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Palette Card ───────────────────────────────────────────────────── */

async function writeToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text); } catch {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta);
  }
}

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function hexToHslStr(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function copyShareLink(palette: GeneratedPalette) {
  const url = `${window.location.origin}${paletteUrl(palette)}`;
  return writeToClipboard(url);
}

function copyCssVariables(palette: GeneratedPalette) {
  const css = palette.colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n");
  return writeToClipboard(`:root {\n${css}\n}`);
}

function copyTailwind(palette: GeneratedPalette) {
  const lines = palette.colors.map((c, i) => `  '${palette.label.toLowerCase().replace(/\s+/g, "-")}-${i + 1}': '${c.hex}',`).join("\n");
  return writeToClipboard(`// tailwind.config.js\ncolors: {\n${lines}\n}`);
}

function downloadPaletteImage(palette: GeneratedPalette) {
  const W = 1000, H = 320;
  const HEX_ROW = 48, NAME_ROW = 40, FOOTER = HEX_ROW + NAME_ROW;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H + FOOTER;
  const ctx = canvas.getContext("2d")!;
  const n = palette.colors.length;
  const sw = W / n;

  // Color stripes
  palette.colors.forEach((col, i) => {
    ctx.fillStyle = col.hex;
    ctx.fillRect(i * sw, 0, sw, H);
  });

  // Hex row — subtle warm background per stripe column
  palette.colors.forEach((col, i) => {
    ctx.fillStyle = "#f8f4ef";
    ctx.fillRect(i * sw, H, sw, HEX_ROW);
    // Small color accent bar at top of each hex cell
    ctx.fillStyle = col.hex;
    ctx.fillRect(i * sw, H, sw, 3);
  });

  // Each hex code centered under its stripe
  ctx.font = "600 13px 'SF Mono', Menlo, 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  palette.colors.forEach((col, i) => {
    ctx.fillStyle = "rgba(28,23,18,0.6)";
    ctx.fillText(col.hex.toUpperCase(), i * sw + sw / 2, H + HEX_ROW / 2 + 3);
  });

  // Divider line
  ctx.fillStyle = "rgba(28,23,18,0.07)";
  ctx.fillRect(0, H + HEX_ROW, W, 1);

  // Name row — white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, H + HEX_ROW + 1, W, NAME_ROW);

  // Palette name (left)
  ctx.fillStyle = "#1c1712";
  ctx.font = "bold 17px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(palette.label, 24, H + HEX_ROW + NAME_ROW / 2 + 1);

  // Color count (right)
  ctx.fillStyle = "rgba(28,23,18,0.35)";
  ctx.font = "13px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${n} colors · HueFlow`, W - 24, H + HEX_ROW + NAME_ROW / 2 + 1);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${palette.label.replace(/\s+/g, "-")}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function ShareButton({ palette }: { palette: GeneratedPalette }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  async function share(type: "link" | "hex") {
    if (type === "link") await copyShareLink(palette);
    else await writeToClipboard(palette.colors.map(c => c.hex).join(", "));
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1400);
  }

  return (
    <div className="relative" ref={ref} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium text-[#1c1712]/65 hover:border-black/16 hover:text-[#1c1712] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full right-0 mb-2 w-52 rounded-xl border border-black/8 bg-white py-1.5 shadow-[0_8px_32px_rgba(28,23,18,0.14)]"
          >
            <button
              onClick={() => share("link")}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button
              onClick={() => share("hex")}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy HEX codes
            </button>
            <div className="my-1 h-px bg-black/5" />
            <div className="px-3.5 py-2">
              <p className="text-[11px] text-[#1c1712]/35 font-medium">Palette URL</p>
              <p className="mt-1 truncate font-mono text-[10px] text-[#1c1712]/50 bg-black/3 rounded px-2 py-1">
                {typeof window !== "undefined" ? `${window.location.origin}${paletteUrl(palette)}`.replace("https://", "") : ""}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaletteCard({
  palette,
  index,
}: {
  palette: GeneratedPalette;
  index: number;
}) {
  const [copiedStripe, setCopiedStripe] = useState<number | null>(null);
  const [hoveredStripe, setHoveredStripe] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCopied, setMenuCopied] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    if (!fullscreen) return;
    function handler(e: KeyboardEvent) { if (e.key === "Escape") setFullscreen(false); }
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [fullscreen]);

  async function copyStripe(e: React.MouseEvent, hex: string, ci: number) {
    e.preventDefault(); e.stopPropagation();
    await writeToClipboard(hex);
    setCopiedStripe(ci);
    setTimeout(() => setCopiedStripe(null), 1400);
  }

  async function copyFormat(format: "hex" | "rgb" | "hsl" | "css" | "tailwind" | "share") {
    if (format === "hex") await writeToClipboard(palette.colors.map(c => c.hex).join(", "));
    else if (format === "rgb") await writeToClipboard(palette.colors.map(c => { const { r, g, b } = hexToRgb(c.hex); return `rgb(${r}, ${g}, ${b})`; }).join(", "));
    else if (format === "hsl") await writeToClipboard(palette.colors.map(c => hexToHslStr(c.hex)).join(", "));
    else if (format === "css") await copyCssVariables(palette);
    else if (format === "tailwind") await copyTailwind(palette);
    else if (format === "share") await copyShareLink(palette);
    setMenuCopied(format);
    setTimeout(() => { setMenuCopied(null); setMenuOpen(false); }, 1200);
  }

  const catDot = CATEGORIES.find(c => c.name === palette.category)?.dot;
  const stripH = STRIP_H[palette.size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min((index % BATCH_SIZE) * 0.02, 0.48) }}
      className="group rounded-2xl border border-black/8 bg-white overflow-visible hover:border-black/14 transition-colors duration-200 hover:shadow-[0_8px_28px_rgba(28,23,18,0.10)] hover:-translate-y-0.5"
      style={{ position: "relative", zIndex: menuOpen ? 40 : undefined }}
    >
      {/* Color strip */}
      <div className={`relative flex ${stripH} w-full overflow-hidden rounded-t-2xl`}>
        {palette.colors.map((col, ci) => (
          <button
            key={ci}
            onClick={(e) => copyStripe(e, col.hex, ci)}
            title={`Copy ${col.hex}`}
            onMouseEnter={() => setHoveredStripe(ci)}
            onMouseLeave={() => setHoveredStripe(null)}
            className="relative overflow-hidden"
            style={{
              backgroundColor: col.hex,
              width: hoveredStripe === ci ? "28%" : hoveredStripe !== null ? "18%" : "20%",
              flexShrink: 0,
              transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <AnimatePresence>
              {copiedStripe === ci && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: isLight(col.hex) ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.22)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    style={{ color: isLight(col.hex) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.95)" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}

        {/* Full-width glass hex bar — hover only */}
        <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)" }}>
          {palette.colors.map((col, ci) => (
            <div key={ci} className="flex items-center justify-center py-2 overflow-hidden"
              style={{
                width: hoveredStripe === ci ? "28%" : hoveredStripe !== null ? "18%" : "20%",
                flexShrink: 0,
                transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
              <span className={`font-mono font-bold uppercase tracking-widest truncate transition-all duration-200 ${
                copiedStripe === ci
                  ? "text-[9px] text-green-300"
                  : hoveredStripe === ci
                  ? "text-[9px] text-white"
                  : "text-[8px] text-white/75"
              }`}>
                {copiedStripe === ci ? "Copied!" : col.hex.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between gap-2 px-3.5 pt-2.5 pb-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-[#1c1712] leading-tight">{palette.label}</p>
          <div className="mt-1 flex items-center gap-1.5">
            {palette.category !== "All" && catDot && (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ backgroundColor: `${catDot}18`, color: catDot }}>
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: catDot }} />
                {palette.category}
              </span>
            )}
            <span className="text-[10px] text-[#1c1712]/30">{palette.colors.length} colors</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {/* Bookmark */}
          <button
            onClick={() => setSaved(v => !v)}
            title={saved ? "Saved" : "Save palette"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/35 hover:text-[#1c1712] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={saved ? "text-[#E8531F]" : ""}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </button>

          {/* Open in Generator */}
          <Link
            href={paletteUrl(palette)}
            title="Open in Generator"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/35 hover:text-[#1c1712] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18 2l4 4-10 10H8v-4L18 2z" />
            </svg>
          </Link>

          {/* Three dots menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              title="More options"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/35 hover:text-[#1c1712] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
              </svg>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full z-10 mt-1.5 w-56 rounded-xl border border-black/8 bg-white py-1.5 shadow-[0_8px_32px_rgba(28,23,18,0.14)]"
                >
                  {/* Open in Generator */}
                  <Link
                    href={paletteUrl(palette)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18 2l4 4-10 10H8v-4L18 2z" />
                    </svg>
                    Open in Generator
                  </Link>

                  {/* Fullscreen */}
                  <button
                    onClick={() => { setFullscreen(true); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                    </svg>
                    View fullscreen
                  </button>

                  {/* Share link */}
                  <button
                    onClick={() => copyFormat("share")}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                  >
                    {menuCopied === "share" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    )}
                    {menuCopied === "share" ? "Link copied!" : "Share link"}
                  </button>

                  <div className="my-1 h-px bg-black/5" />

                  {/* Copy formats */}
                  {(["hex", "rgb", "hsl"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => copyFormat(fmt)}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                    >
                      {menuCopied === fmt ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      )}
                      Copy {fmt.toUpperCase()}
                    </button>
                  ))}

                  {/* CSS Variables */}
                  <button
                    onClick={() => copyFormat("css")}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                  >
                    {menuCopied === "css" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    )}
                    CSS Variables
                  </button>

                  {/* Tailwind */}
                  <button
                    onClick={() => copyFormat("tailwind")}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-[#1c1712]/70 hover:bg-black/3 hover:text-[#1c1712] transition-colors"
                  >
                    {menuCopied === "tailwind" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M8 12s1-2 4-2 4 2 4 2" />
                      </svg>
                    )}
                    Tailwind Config
                  </button>

                  <div className="my-1 h-px bg-black/5" />

                  {/* Download */}
                  <button
                    onClick={() => { downloadPaletteImage(palette); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-[#E8531F] hover:bg-[#E8531F]/5 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download as image
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fullscreen portal */}
      {fullscreen && typeof document !== "undefined" && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col"
          onClick={() => setFullscreen(false)}
        >
          {/* Color strips */}
          <div className="flex flex-1">
            {palette.colors.map((col, ci) => (
              <div key={ci} className="relative flex flex-1 flex-col items-center justify-end pb-8" style={{ backgroundColor: col.hex }}>
                <span className="font-mono text-sm font-bold uppercase tracking-widest"
                  style={{ color: isLight(col.hex) ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.85)" }}>
                  {col.hex}
                </span>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between bg-white px-6 py-4 shadow-[0_-1px_0_rgba(0,0,0,0.06)]">
            <div>
              <p className="text-base font-semibold text-[#1c1712]">{palette.label}</p>
              <p className="text-xs text-[#1c1712]/40 mt-0.5">Click anywhere to close · Press Esc</p>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton palette={palette} />
              <Link
                href={paletteUrl(palette)}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                Open in Generator
              </Link>
              <button
                onClick={(e) => { e.stopPropagation(); setFullscreen(false); }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#1c1712]/50 hover:text-[#1c1712] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>,
        document.body
      )}
    </motion.div>
  );
}
