"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { encodePalette } from "@/lib/share-utils";
import type { Palette } from "@/lib/types";

type Category = "all" | "saas" | "ecommerce" | "mobile" | "branding";

const trendingPalettes: (Palette & { category: Category })[] = [
  { label: "Indigo SaaS", category: "saas", colors: [
    { name: "Ink", hex: "#0f172a", role: "neutral", text: "light" },
    { name: "Indigo", hex: "#4F46E5", role: "primary", text: "light" },
    { name: "Emerald", hex: "#10B981", role: "success", text: "dark" },
    { name: "Amber", hex: "#F59E0B", role: "warning", text: "dark" },
    { name: "Sky", hex: "#0EA5E9", role: "accent", text: "dark" },
  ]},
  { label: "Warm Commerce", category: "ecommerce", colors: [
    { name: "Charcoal", hex: "#1C1917", role: "neutral", text: "light" },
    { name: "Terracotta", hex: "#C2410C", role: "primary", text: "light" },
    { name: "Sage", hex: "#65A30D", role: "success", text: "dark" },
    { name: "Gold", hex: "#D97706", role: "warning", text: "dark" },
    { name: "Rose", hex: "#E11D48", role: "accent", text: "light" },
  ]},
  { label: "Clean Mobile", category: "mobile", colors: [
    { name: "Slate", hex: "#1E293B", role: "neutral", text: "light" },
    { name: "Blue", hex: "#3B82F6", role: "primary", text: "light" },
    { name: "Green", hex: "#22C55E", role: "success", text: "dark" },
    { name: "Orange", hex: "#FB923C", role: "warning", text: "dark" },
    { name: "Purple", hex: "#A855F7", role: "accent", text: "light" },
  ]},
  { label: "Luxury Brand", category: "branding", colors: [
    { name: "Obsidian", hex: "#0C0A09", role: "neutral", text: "light" },
    { name: "Gold", hex: "#B45309", role: "primary", text: "light" },
    { name: "Forest", hex: "#166534", role: "success", text: "light" },
    { name: "Bronze", hex: "#92400E", role: "warning", text: "light" },
    { name: "Plum", hex: "#7E22CE", role: "accent", text: "light" },
  ]},
  { label: "Neon Dashboard", category: "saas", colors: [
    { name: "Void", hex: "#09090B", role: "neutral", text: "light" },
    { name: "Violet", hex: "#7C3AED", role: "primary", text: "light" },
    { name: "Cyan", hex: "#06B6D4", role: "success", text: "dark" },
    { name: "Yellow", hex: "#EAB308", role: "warning", text: "dark" },
    { name: "Pink", hex: "#EC4899", role: "accent", text: "light" },
  ]},
  { label: "Earth Store", category: "ecommerce", colors: [
    { name: "Bark", hex: "#1C1210", role: "neutral", text: "light" },
    { name: "Clay", hex: "#9A3412", role: "primary", text: "light" },
    { name: "Moss", hex: "#3F6212", role: "success", text: "light" },
    { name: "Sand", hex: "#CA8A04", role: "warning", text: "dark" },
    { name: "Rust", hex: "#DC2626", role: "accent", text: "light" },
  ]},
  { label: "Pastel Mobile", category: "mobile", colors: [
    { name: "Smoke", hex: "#18181B", role: "neutral", text: "light" },
    { name: "Periwinkle", hex: "#818CF8", role: "primary", text: "dark" },
    { name: "Mint", hex: "#6EE7B7", role: "success", text: "dark" },
    { name: "Peach", hex: "#FCD34D", role: "warning", text: "dark" },
    { name: "Lavender", hex: "#C084FC", role: "accent", text: "dark" },
  ]},
  { label: "Studio Brand", category: "branding", colors: [
    { name: "Carbon", hex: "#171717", role: "neutral", text: "light" },
    { name: "Crimson", hex: "#BE123C", role: "primary", text: "light" },
    { name: "Olive", hex: "#4D7C0F", role: "success", text: "light" },
    { name: "Copper", hex: "#B45309", role: "warning", text: "light" },
    { name: "Teal", hex: "#0D9488", role: "accent", text: "light" },
  ]},
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "mobile", label: "Mobile" },
  { key: "branding", label: "Branding" },
];

export function TrendsPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? trendingPalettes : trendingPalettes.filter((p) => p.category === active);

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <div className="fixed left-0 right-0 top-0 z-50 px-6 pt-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-[1560px] items-center justify-between rounded-full border border-white/18 bg-white/8 px-5 py-3 backdrop-blur-xl"
        >
          <Link href="/" className="flex items-center">
            <img src="/hueflow.svg" alt="HueFlow" width={100} height={20} />
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
            <Link href="/generator">Generator</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/trends">Trends</Link>
            <Link href="/tools/picker">Picker</Link>
            <Link href="/tools/gradient">Gradient</Link>
            <Link href="/tools/contrast">Contrast</Link>
            <Link href="/tools/tailwind">Tailwind</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link href="/generator" className="rounded-full bg-white px-5 py-3 text-base font-semibold text-[#22130d]">
            Try Demo
          </Link>
        </motion.header>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trending Palettes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">Curated color systems for modern products.</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${active === cat.key ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((palette, idx) => (
            <motion.div
              key={palette.label}
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
