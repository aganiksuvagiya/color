"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { generateFromColor } from "@/lib/color-utils";
import { encodePalette } from "@/lib/share-utils";

type ColorItem = {
  name: string;
  hex: string;
  category: string;
  hsl?: { h: number; s: number; l: number };
  rgb?: { r: number; g: number; b: number };
};

type CopiedState = { hex: string; type: "hex" | "rgb" | "hsl" } | null;

const CATEGORIES = [
  { name: "All", dot: null },
  { name: "Red", dot: "#ef4444" },
  { name: "Orange", dot: "#f97316" },
  { name: "Brown", dot: "#92400e" },
  { name: "Yellow", dot: "#eab308" },
  { name: "Green", dot: "#22c55e" },
  { name: "Cyan", dot: "#06b6d4" },
  { name: "Blue", dot: "#3b82f6" },
  { name: "Purple", dot: "#a855f7" },
  { name: "Pink", dot: "#ec4899" },
  { name: "White", dot: "#e2e8f0" },
  { name: "Gray", dot: "#6b7280" },
  { name: "Black", dot: "#1f2937" },
];

const BATCH_SIZE = 24;

function colorSlug(hex: string) {
  return hex.replace("#", "").toLowerCase();
}

function rgbString(rgb: { r: number; g: number; b: number }) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function hslString(hsl: { h: number; s: number; l: number }) {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export function ExploreColors() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState<CopiedState>(null);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const loaderRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchColors = useCallback(async (pageNum: number, category: string, query: string, append: boolean) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: String(BATCH_SIZE) });
      if (category !== "All") params.set("category", category);
      if (query) params.set("search", query);
      const res = await fetch(`/api/colors?${params}`);
      const data = await res.json();
      setColors((prev) => append ? [...prev, ...data.colors] : data.colors);
      setHasMore(data.pagination.hasNext);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchColors(1, activeCategory, search, false);
    }, search ? 300 : 0);
    return () => clearTimeout(searchTimeout.current);
  }, [search, activeCategory, fetchColors]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    fetchColors(next, activeCategory, search, true);
  }, [hasMore, loading, page, activeCategory, search, fetchColors]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleGenerate = useCallback((hex: string) => {
    const palette = generateFromColor(hex);
    router.push(`/generator${encodePalette(palette)}`);
  }, [router]);

  const handleCopy = async (text: string, hex: string, type: "hex" | "rgb" | "hsl") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied({ hex, type });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      <main className="mx-auto max-w-[1560px] px-4 pt-24 pb-20 sm:px-6 sm:pt-36 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 backdrop-blur-xl mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
            Color Library
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Explore Colors
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/45">
            Browse thousands of colors by category. Copy hex, RGB, or HSL with one click.
          </p>
        </motion.div>

        {/* Search + view toggle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or hex..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/22 focus:bg-white/8"
            />
          </div>

          {/* View mode toggle */}
          <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-full p-2 transition-colors ${viewMode === "grid" ? "bg-white/15 text-white" : "text-white/35 hover:text-white/60"}`}
              title="Grid view"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-full p-2 transition-colors ${viewMode === "list" ? "bg-white/15 text-white" : "text-white/35 hover:text-white/60"}`}
              title="List view"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Sidebar + content layout */}
        <div className="flex gap-8">
          {/* Category sidebar - desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="hidden lg:flex lg:w-44 lg:shrink-0 lg:flex-col lg:gap-1 lg:pt-1"
          >
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Category</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all text-left ${
                  activeCategory === cat.name
                    ? "bg-white/10 text-white"
                    : "text-white/45 hover:bg-white/5 hover:text-white/70"
                }`}
              >
                {cat.dot ? (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/10" style={{ backgroundColor: cat.dot }} />
                ) : (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/20 bg-gradient-to-br from-[#ef4444] via-[#3b82f6] to-[#a855f7]" />
                )}
                {cat.name}
              </button>
            ))}
          </motion.aside>

          <div className="flex-1 min-w-0">
            {/* Mobile category pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mb-5 flex flex-wrap gap-2 lg:hidden"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? "bg-white text-[#160b05]"
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
            <p className="mb-4 text-xs text-white/30">
              {colors.length} colors loaded · scroll for more
            </p>

            {/* Grid view */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {colors.map((color, i) => (
                  <GridCard
                    key={color.hex + i}
                    color={color}
                    index={i}
                    copied={copied}
                    onCopy={handleCopy}
                    onGenerate={handleGenerate}
                  />
                ))}
              </div>
            )}

            {/* List view */}
            {viewMode === "list" && (
              <div className="flex flex-col gap-1.5">
                {colors.map((color, i) => (
                  <ListRow
                    key={color.hex + i}
                    color={color}
                    index={i}
                    copied={copied}
                    onCopy={handleCopy}
                    onGenerate={handleGenerate}
                  />
                ))}
              </div>
            )}

            {/* Loader */}
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-white/50" />
              </div>
            )}

            {/* Empty state */}
            {!loading && colors.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-base text-white/40">No colors match your search.</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-3 text-sm text-[#F97A45] underline-offset-4 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Grid Card ─────────────────────────────────────────────────────── */

function GridCard({
  color,
  index,
  copied,
  onCopy,
  onGenerate,
}: {
  color: ColorItem;
  index: number;
  copied: CopiedState;
  onCopy: (text: string, hex: string, type: "hex" | "rgb" | "hsl") => void;
  onGenerate: (hex: string) => void;
}) {
  const light = isLight(color.hex);
  const isCopied = (type: "hex" | "rgb" | "hsl") => copied?.hex === color.hex && copied.type === type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % BATCH_SIZE) * 0.03 }}
      className="group relative rounded-2xl border border-white/8 bg-white/3 overflow-hidden transition-all hover:border-white/16 hover:bg-white/5"
    >
      {/* Swatch */}
      <div
        className="aspect-[4/3] w-full transition-all group-hover:brightness-105"
        style={{ backgroundColor: color.hex }}
      />

      {/* Info */}
      <div className="p-3">
        <p className="truncate text-sm font-medium text-white leading-tight">{color.name}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase text-white/38">{color.hex}</p>
        {color.hsl && (
          <p className="mt-0.5 text-[10px] text-white/25">
            {color.hsl.h}° {color.hsl.s}% {color.hsl.l}%
          </p>
        )}
      </div>

      {/* Hover overlay with actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/65 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl p-3">
        <AnimatePresence>
          {isCopied("hex") || isCopied("rgb") || isCopied("hsl") ? (
            <motion.p
              key="copied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold text-white"
            >
              Copied!
            </motion.p>
          ) : (
            <motion.div key="actions" className="flex flex-col gap-1.5 w-full">
              <button
                onClick={() => onCopy(color.hex, color.hex, "hex")}
                className="w-full rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors text-center"
              >
                Copy HEX
              </button>
              {color.rgb && (
                <button
                  onClick={() => onCopy(rgbString(color.rgb!), color.hex, "rgb")}
                  className="w-full rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 transition-colors text-center"
                >
                  Copy RGB
                </button>
              )}
              {color.hsl && (
                <button
                  onClick={() => onCopy(hslString(color.hsl!), color.hex, "hsl")}
                  className="w-full rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 transition-colors text-center"
                >
                  Copy HSL
                </button>
              )}
              <Link
                href={`/colors/${colorSlug(color.hex)}`}
                className="w-full rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:border-white/30 transition-colors text-center"
              >
                View page →
              </Link>
              <button
                onClick={() => onGenerate(color.hex)}
                className="w-full rounded-lg bg-[#F15B2A]/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#F15B2A] transition-colors text-center"
              >
                Generate palette ✦
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── List Row ──────────────────────────────────────────────────────── */

function ListRow({
  color,
  index,
  copied,
  onCopy,
  onGenerate,
}: {
  color: ColorItem;
  index: number;
  copied: CopiedState;
  onCopy: (text: string, hex: string, type: "hex" | "rgb" | "hsl") => void;
  onGenerate: (hex: string) => void;
}) {
  const isCopied = (type: "hex" | "rgb" | "hsl") => copied?.hex === color.hex && copied.type === type;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: (index % BATCH_SIZE) * 0.02 }}
      className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/3 px-4 py-3 transition-all hover:border-white/15 hover:bg-white/5"
    >
      {/* Swatch */}
      <div
        className="h-9 w-9 shrink-0 rounded-lg border border-white/10"
        style={{ backgroundColor: color.hex }}
      />

      {/* Name + hex */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{color.name}</p>
        <p className="font-mono text-xs uppercase text-white/35">{color.hex}</p>
      </div>

      {/* HSL */}
      {color.hsl && (
        <div className="hidden sm:block text-xs text-white/30 font-mono w-28 shrink-0">
          {color.hsl.h}° {color.hsl.s}% {color.hsl.l}%
        </div>
      )}

      {/* RGB */}
      {color.rgb && (
        <div className="hidden md:block text-xs text-white/30 font-mono w-32 shrink-0">
          {color.rgb.r} {color.rgb.g} {color.rgb.b}
        </div>
      )}

      {/* Category badge */}
      <span className="hidden lg:inline text-[10px] text-white/30 border border-white/10 rounded-full px-2.5 py-0.5 shrink-0">
        {color.category}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {isCopied("hex") || isCopied("rgb") || isCopied("hsl") ? (
          <span className="text-xs font-semibold text-[#F97A45]">Copied!</span>
        ) : (
          <>
            <button
              onClick={() => onCopy(color.hex, color.hex, "hex")}
              className="rounded-lg border border-white/12 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/70 hover:bg-white/15 hover:text-white transition-colors"
            >
              HEX
            </button>
            {color.rgb && (
              <button
                onClick={() => onCopy(rgbString(color.rgb!), color.hex, "rgb")}
                className="rounded-lg border border-white/12 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/70 hover:bg-white/15 hover:text-white transition-colors"
              >
                RGB
              </button>
            )}
            {color.hsl && (
              <button
                onClick={() => onCopy(hslString(color.hsl!), color.hex, "hsl")}
                className="rounded-lg border border-white/12 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/70 hover:bg-white/15 hover:text-white transition-colors"
              >
                HSL
              </button>
            )}
            <Link
              href={`/colors/${colorSlug(color.hex)}`}
              className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-white/45 hover:text-[#F97A45] hover:border-[#F15B2A]/30 transition-colors"
            >
              →
            </Link>
            <button
              onClick={() => onGenerate(color.hex)}
              className="rounded-lg bg-[#F15B2A]/70 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#F15B2A] transition-colors"
              title="Generate palette from this color"
            >
              ✦ Palette
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
