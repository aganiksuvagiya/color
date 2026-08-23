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
    <main className="relative min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 pb-24 pt-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p
            className="inline-block bg-clip-text font-mono text-6xl font-black tracking-[0.2em] text-transparent sm:text-7xl"
            style={{ backgroundImage: "linear-gradient(90deg, #e8531f, #f97316, #e8531f)" }}
          >
            404
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#1c1712] sm:text-4xl">
            This page doesn&apos;t exist
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-[#1c1712]/45">
            That color isn&apos;t in the palette. The page may have moved or been renamed — here are some places to start instead.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3"
        >
          {SUGGESTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-left text-[13px] font-medium text-[#1c1712]/60 shadow-sm transition-all hover:-translate-y-0.5 hover:border-black/[0.12] hover:shadow-md hover:text-[#1c1712]"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: s.hex }}
              />
              {s.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e8531f] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            <span>←</span> Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
