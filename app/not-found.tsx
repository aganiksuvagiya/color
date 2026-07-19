"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/header";

const SUGGESTIONS = [
  { href: "/", label: "Home", hex: "#F97316" },
  { href: "/generator", label: "Palette generator", hex: "#4F46E5" },
  { href: "/colors", label: "Colors", hex: "#10B981" },
  { href: "/palettes", label: "Palettes", hex: "#F59E0B" },
  { href: "/gradients", label: "Gradients", hex: "#EF4444" },
  { href: "/tools/contrast", label: "Contrast checker", hex: "#8B5CF6" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(0,0,0,0.95),transparent_20%),radial-gradient(circle_at_88%_10%,rgba(255,106,44,0.22),transparent_32%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <div className="relative">
        <Header />

        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 pb-24 pt-24 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p
              className="gradient-text-animated inline-block bg-clip-text font-mono text-6xl font-bold tracking-[0.2em] text-transparent sm:text-7xl"
              style={{
                backgroundImage: "linear-gradient(90deg, #fb923c, #ef4444, #a855f7, #fb923c)",
              }}
            >
              404
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">This page doesn&apos;t exist</h1>
            <p className="mx-auto mt-4 max-w-md text-white/50">
              That color isn&apos;t in the palette. The page may have moved or been renamed — here are some places to start instead.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {SUGGESTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-left text-sm font-medium text-white/70 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-black/20"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: s.hex }}
                />
                {s.label}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <Link
              href="/"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/35 active:translate-y-0"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span> Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
