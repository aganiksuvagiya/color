"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import { dayIndex, generateTrendingPalettes } from "@/lib/trending";

type Category = "all" | "saas" | "ecommerce" | "mobile" | "branding";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "mobile", label: "Mobile" },
  { key: "branding", label: "Branding" },
];

export function TrendsPage() {
  const [active, setActive] = useState<Category>("all");
  const [seed, setSeed] = useState(dayIndex);
  const trendingPalettes = useMemo(() => generateTrendingPalettes(seed), [seed]);

  const filtered = active === "all" ? trendingPalettes : trendingPalettes.filter((p) => p.category === active);

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trending Palettes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">Curated color systems for modern products.</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${active === cat.key ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setSeed(Date.now())}
            className="ml-1 flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 4v5h-5" />
            </svg>
            Shuffle
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((palette, idx) => (
            <motion.div
              key={`${palette.label}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-white/70">{palette.label}</p>
                <span className="rounded-md bg-white/8 px-2 py-0.5 text-[10px] text-white/40">{palette.category}</span>
              </div>
              <div className="mb-3 flex gap-1">
                {palette.colors.map((c, i) => (
                  <div key={i} className="h-12 flex-1 first:rounded-l-lg last:rounded-r-lg" style={{ backgroundColor: c.hex }} title={`${c.name} ${c.hex}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/generator${encodePalette(palette)}`}
                  className="flex-1 rounded-lg bg-white/8 py-1.5 text-center text-xs font-medium text-white/60 transition-colors hover:bg-white/12"
                >
                  Open in Generator
                </Link>
                <button
                  onClick={() => {
                    const hex = palette.colors.map((c) => c.hex).join(", ");
                    navigator.clipboard.writeText(hex);
                  }}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40 hover:bg-white/8"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
