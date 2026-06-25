"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "./header";

type ColorItem = {
  name: string;
  hex: string;
  category: string;
  hsl?: { h: number; s: number; l: number };
  rgb?: { r: number; g: number; b: number };
};

const CATEGORIES = [
  "All", "Red", "Orange", "Brown", "Yellow", "Green",
  "Cyan", "Blue", "Purple", "Pink", "White", "Gray", "Black",
];

const BATCH_SIZE = 24;

export function ExploreColors() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchColors = useCallback(async (pageNum: number, category: string, query: string, append: boolean) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(BATCH_SIZE),
      });
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
    const nextPage = page + 1;
    setPage(nextPage);
    fetchColors(nextPage, activeCategory, search, true);
  }, [hasMore, loading, page, activeCategory, search, fetchColors]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = hex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      <main className="mx-auto max-w-[1560px] px-4 pt-24 pb-20 sm:px-6 sm:pt-40 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Colors
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Browse a curated library of colors organized by category. Click any
            color to copy its hex value.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search colors by name or hex..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-5 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-[#160b05]"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6 text-center text-sm text-white/40"
        >
          {colors.length} color{colors.length !== 1 ? "s" : ""} loaded · scroll for more
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((color, i) => (
            <motion.button
              key={color.hex + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % BATCH_SIZE) * 0.04 }}
              onClick={() => handleCopy(color.hex)}
              className="group relative cursor-pointer rounded-2xl border border-white/10 bg-linear-to-b from-white/8 to-white/3 p-3 text-left backdrop-blur-xl transition-all hover:border-white/20 hover:from-white/12 hover:to-white/6"
            >
              <div
                className="mb-3 aspect-4/3 w-full rounded-xl"
                style={{ backgroundColor: color.hex }}
              />
              <p className="truncate text-sm font-medium text-white">
                {color.name}
              </p>
              <p className="mt-0.5 text-xs font-mono text-white/40 uppercase">
                {color.hex}
              </p>

              {copiedHex === color.hex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm"
                >
                  <span className="text-sm font-semibold text-white">
                    Copied!
                  </span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          </div>
        )}

        {!loading && colors.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-white/40">
              No colors match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-sm text-white/60 underline underline-offset-4 hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
