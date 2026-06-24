"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { isValidHex } from "@/lib/color-utils";
import { getContrastRatio, getWcagLevel } from "@/lib/accessibility";
import { findClosestColorName } from "@/lib/color-names";

export function ContrastChecker() {
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#4F46E5");

  const ratio = isValidHex(fg) && isValidHex(bg) ? getContrastRatio(fg, bg) : 0;
  const level = getWcagLevel(ratio);
  const largeLevel = ratio >= 4.5 ? "AAA" : ratio >= 3 ? "AA" : "Fail";

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

      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-24">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contrast Checker</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">Check WCAG accessibility between any two colors.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="mb-2 block text-xs text-white/40">Foreground (text)</label>
              <div className="flex items-center gap-3">
                <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent" />
                <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} maxLength={7} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none" />
              </div>
              <p className="mt-2 text-xs text-white/30">{isValidHex(fg) ? findClosestColorName(fg) : "Invalid hex"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="mb-2 block text-xs text-white/40">Background</label>
              <div className="flex items-center gap-3">
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent" />
                <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} maxLength={7} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none" />
              </div>
              <p className="mt-2 text-xs text-white/30">{isValidHex(bg) ? findClosestColorName(bg) : "Invalid hex"}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-5xl font-bold">{ratio}:1</p>
            <div className="mt-4 flex justify-center gap-3">
              <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${level === "AAA" ? "bg-emerald-500/20 text-emerald-400" : level === "AA" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                Normal text: {level}
              </span>
              <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${largeLevel === "AAA" ? "bg-emerald-500/20 text-emerald-400" : largeLevel === "AA" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                Large text: {largeLevel}
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: bg }}>
            <div className="space-y-3 p-6">
              <p style={{ color: fg }} className="text-3xl font-bold">Large Heading Text</p>
              <p style={{ color: fg }} className="text-base">This is regular body text at normal size. Check if it&apos;s readable against the background color.</p>
              <p style={{ color: fg }} className="text-sm">This is small text. It needs higher contrast to be accessible.</p>
            </div>
          </div>

          <button onClick={() => { const t = fg; setFg(bg); setBg(t); }} className="mx-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/60 hover:bg-white/10">
            ⇅ Swap Colors
          </button>
        </motion.div>
      </div>
    </main>
  );
}
