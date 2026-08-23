"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";

type PublicPalette = {
  id: string;
  name: string;
  colors: { hex: string; name?: string }[];
  created_at: string;
};

function paletteUrl(p: PublicPalette) {
  const c = p.colors.map((col) => col.hex.replace("#", "")).join("-");
  return `/generator?label=${encodeURIComponent(p.name)}&c=${c}`;
}

const DEMO_PALETTES: PublicPalette[] = [
  {
    id: "demo-1",
    name: "Sunset Terrace",
    colors: [
      { hex: "#FF6B35" }, { hex: "#F7931E" }, { hex: "#FFD166" }, { hex: "#E8F4F8" }, { hex: "#2C3E50" },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: "demo-2",
    name: "Ocean Depth",
    colors: [
      { hex: "#0D1B2A" }, { hex: "#1B4F72" }, { hex: "#2E86AB" }, { hex: "#A8DADC" }, { hex: "#F1FAEE" },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "demo-3",
    name: "Forest Morning",
    colors: [
      { hex: "#1D2B1A" }, { hex: "#3F6B3A" }, { hex: "#7FA65C" }, { hex: "#C6D9A1" }, { hex: "#F5F0E8" },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "demo-4",
    name: "Lavender Dusk",
    colors: [
      { hex: "#2D1B69" }, { hex: "#7B2D8B" }, { hex: "#C06CE8" }, { hex: "#E8B4F8" }, { hex: "#FDF6FF" },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "demo-5",
    name: "Warm Minimal",
    colors: [
      { hex: "#1C1712" }, { hex: "#4A3728" }, { hex: "#B9924A" }, { hex: "#E8D5A3" }, { hex: "#FAF7F2" },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export function CommunityGallery() {
  const [palettes, setPalettes] = useState<PublicPalette[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const load = useCallback(async (pageNum: number, append: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/palettes/public?page=${pageNum}`);
      const data = await res.json();
      const incoming: PublicPalette[] = data.palettes ?? [];
      const combined = pageNum === 1 ? [...DEMO_PALETTES, ...incoming] : incoming;
      const sorted =
        sort === "oldest"
          ? [...combined].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          : combined;
      setPalettes((prev) => (append ? [...prev, ...sorted] : sorted));
      setHasMore(!!data.hasMore);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    setPage(1);
    setPalettes([]);
    load(1, false);
  }, [load]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    load(next, true);
  }

  async function copyHex(hex: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(hex.toUpperCase());
    setCopiedHex(hex.toUpperCase());
    setTimeout(() => setCopiedHex((c) => (c === hex.toUpperCase() ? null : c)), 1500);
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#1c1712]">
      <Header />

      <div className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">

        {/* ── Hero ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="pt-32 pb-12"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/48 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" aria-hidden="true" />
              Community
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3rem] lg:text-[3.6rem]"
          >
            Palettes made by{" "}
            <span style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              the community
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-7 text-[#1c1712]/50">
            Public palettes shared by HueFlow users. Made something you&apos;re proud of? Share it from your{" "}
            <Link href="/profile" className="font-semibold text-[#e8531f] hover:text-[#c23a10]">
              profile
            </Link>
            .
          </motion.p>
        </motion.div>

        {/* ── Filter bar ── */}
        <div className="-mx-6 overflow-x-auto px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-2 pb-6">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  sort === opt.key
                    ? "bg-[#1c1712] text-white shadow-[0_4px_14px_rgba(28,23,18,0.18)]"
                    : "border border-black/10 bg-white text-[#1c1712]/60 hover:border-black/18 hover:text-[#1c1712]"
                }`}
              >
                {opt.label}
              </button>
            ))}

            <div className="ml-auto flex shrink-0 items-center gap-2.5 pl-2">
              {!loading && (
                <span className="text-sm text-[#1c1712]/38">{palettes.length} palettes</span>
              )}
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1c1712]/60 shadow-[0_1px_4px_rgba(28,23,18,0.06)] transition-all hover:border-black/18 hover:text-[#1c1712] hover:shadow-[0_4px_12px_rgba(28,23,18,0.08)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Share yours
              </Link>
            </div>
          </div>
        </div>

        {/* ── Empty state (should never show since DEMO_PALETTES always present) ── */}
        {palettes.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-black/12 bg-white py-28 text-center shadow-[0_2px_16px_rgba(28,23,18,0.04)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#faf7f2]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8531f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <p className="mt-4 text-base font-semibold text-[#1c1712]">No public palettes yet</p>
            <p className="mt-1 max-w-xs text-sm text-[#1c1712]/40">Be the first — make one of your saved palettes public from your profile.</p>
            <Link
              href="/profile"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.25)] transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
            >
              Go to profile
            </Link>
          </div>
        )}

        {/* ── Skeleton loading ── */}
        {loading && palettes.length === 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_2px_16px_rgba(28,23,18,0.05)]">
                {/* Color strip — 5 equal swatches */}
                <div className="flex h-36">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <div
                      key={j}
                      className="flex-1 animate-pulse"
                      style={{
                        backgroundColor: `hsl(${30 + i * 22 + j * 14}, ${12 + j * 4}%, ${88 - j * 3}%)`,
                        animationDelay: `${(i * 5 + j) * 60}ms`,
                      }}
                    />
                  ))}
                </div>
                {/* Card info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-3.5 w-3/5 animate-pulse rounded-full bg-[#ede8e1]" style={{ animationDelay: `${i * 80}ms` }} />
                    <div className="h-2.5 w-10 animate-pulse rounded-full bg-[#ede8e1]" style={{ animationDelay: `${i * 80 + 40}ms` }} />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="h-2.5 w-14 animate-pulse rounded-full bg-[#ede8e1]" style={{ animationDelay: `${i * 80 + 80}ms` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Grid ── */}
        {palettes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {palettes.map((palette, idx) => (
                <motion.div
                  key={palette.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: Math.min(idx, 8) * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_2px_16px_rgba(28,23,18,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(28,23,18,0.10)]"
                >
                  {/* Color strip */}
                  <div className="flex h-36">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[2.5]"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={(e) => copyHex(color.hex, e)}
                          className="absolute inset-0 flex items-end justify-center pb-2"
                          aria-label={`Copy ${color.hex}`}
                        >
                          <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[8px] text-white opacity-0 transition-opacity duration-150 group-hover/swatch:opacity-100">
                            {copiedHex === color.hex.toUpperCase() ? "✓ Copied" : color.hex.toUpperCase()}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Card info */}
                  <Link href={paletteUrl(palette)} className="block p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-[14px] font-bold tracking-[-0.02em] text-[#1c1712]">{palette.name}</p>
                      <span className="shrink-0 text-[10px] text-[#1c1712]/35">{timeAgo(palette.created_at)}</span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[11px] text-[#1c1712]/40">{palette.colors.length} colors</span>
                      <span className="text-[11px] font-semibold text-[#e8531f] opacity-0 transition-opacity group-hover:opacity-100">
                        Open →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Load more ── */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#1c1712]/60 shadow-[0_2px_12px_rgba(28,23,18,0.06)] transition-all hover:border-black/18 hover:text-[#1c1712] hover:shadow-[0_6px_20px_rgba(28,23,18,0.08)] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Loading…
                </>
              ) : (
                "Load more"
              )}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
