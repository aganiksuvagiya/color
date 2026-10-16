"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";

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

export function CommunityGallery() {
  const [palettes, setPalettes] = useState<PublicPalette[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const { copied, copy } = useCopy();

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

  const dots = (palettes[0] ?? DEMO_PALETTES[0]).colors.map((c) => c.hex);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Community</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Community Palettes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {dots.map((hex) => (
              <span key={hex} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
            ))}
          </span>
          <p className="text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{loading && palettes.length === 0 ? "Loading palettes…" : `${palettes.length} palettes shared by HueFlow users.`}</span>{" "}
            Copy a color, open one in the generator, or share yours from your{" "}
            <Link href="/profile" className="font-semibold text-[#c2410c] hover:underline">profile</Link>.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Sort palettes" className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => {
              const on = sort === opt.key;
              return (
                <button
                  key={opt.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSort(opt.key)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1712] px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
          >
            + Share yours
          </Link>
        </div>
      </section>

      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
          {/* ── Empty state ── */}
          {palettes.length === 0 && !loading && (
            <div className="rounded-2xl py-24 text-center ring-1 ring-black/[0.07]">
              <p className="text-[16px] font-semibold">No public palettes yet</p>
              <p className="mx-auto mt-1 max-w-xs text-[14px] text-[#1c1712]/50">Be the first: make one of your saved palettes public from your profile.</p>
              <Link href="/profile" className="mt-6 inline-block rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                Go to profile
              </Link>
            </div>
          )}

          {/* ── Skeleton loading ── */}
          {loading && palettes.length === 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <div className="flex h-40">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <div key={j} className="flex-1 animate-pulse" style={{ backgroundColor: `hsl(${30 + i * 22 + j * 14}, ${12 + j * 4}%, ${88 - j * 3}%)` }} />
                    ))}
                  </div>
                  <div className="space-y-2.5 p-5">
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-black/[0.06]" />
                    <div className="h-4 w-3/5 animate-pulse rounded-full bg-black/[0.06]" />
                    <div className="h-3 w-4/5 animate-pulse rounded-full bg-black/[0.06]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Grid ── */}
          {palettes.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {palettes.map((palette) => {
                const hexes = palette.colors.map((c) => c.hex.toUpperCase());
                const joined = hexes.join(", ");
                return (
                  <article key={palette.id} className="group overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]">
                    <SwatchStrip colors={hexes} height="h-40" copied={copied} onCopy={copy} className="" />
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{timeAgo(palette.created_at)}</p>
                      <h3 className="mt-1.5 truncate text-[17px] font-semibold tracking-[-0.02em]">{palette.name}</h3>
                      <p className="mt-1 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{hexes.map((h) => h.slice(1)).join(" · ")}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Link href={paletteUrl(palette)} className="rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
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
          )}

          {/* ── Load more ── */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-full px-6 py-2.5 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 disabled:opacity-50"
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
