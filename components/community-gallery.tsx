"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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

export function CommunityGallery() {
  const [palettes, setPalettes] = useState<PublicPalette[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (pageNum: number, append: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/palettes/public?page=${pageNum}`);
      const data = await res.json();
      setPalettes((prev) => (append ? [...prev, ...(data.palettes ?? [])] : data.palettes ?? []));
      setHasMore(!!data.hasMore);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1, false);
  }, [load]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    load(next, true);
  }

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-orange-400/60">Community</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Palettes from the community</h1>
        <p className="mt-2 max-w-xl text-white/50">
          Public palettes shared by HueFlow users. Made something you&apos;re proud of? Make it public from your{" "}
          <Link href="/profile" className="text-orange-300 hover:text-orange-200">
            profile
          </Link>
          .
        </p>

        {palettes.length === 0 && !loading ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
            <p className="text-sm font-medium text-white/40">No public palettes yet</p>
            <p className="mt-1 text-xs text-white/22">Be the first — make one of your saved palettes public.</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {palettes.map((p) => (
                <Link
                  key={p.id}
                  href={paletteUrl(p)}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                >
                  <div className="flex h-28">
                    {p.colors.map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="rounded-xl border border-white/15 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 disabled:opacity-50"
                >
                  {loading ? "Loading…" : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
