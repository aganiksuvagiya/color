"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText, isValidHex } from "@/lib/color-utils";
import { getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import { toolPageContent } from "@/lib/seo/tool-pages";

const QUICK_PICKS = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899"];

export function ColorPsychologyExplorer() {
  const [hex, setHex] = useState("#3B82F6");

  const descriptor = useMemo(() => {
    if (!isValidHex(hex)) return null;
    return getProgrammaticColorDescriptor(hex.slice(1).toLowerCase());
  }, [hex]);

  const textColor = descriptor ? getContrastText(descriptor.hex) : "light";

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Color Psychology Explorer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Pick any color and see what it signals psychologically, and which industries use it best.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/15" style={{ backgroundColor: isValidHex(hex) ? hex : "#333" }}>
              <input
                type="color"
                aria-label="Explore color"
                value={isValidHex(hex) ? hex : "#3B82F6"}
                onChange={(e) => setHex(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              maxLength={7}
              placeholder="#3B82F6"
              className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-white/25"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {QUICK_PICKS.map((c) => (
              <button
                key={c}
                onClick={() => setHex(c)}
                className="h-8 w-8 rounded-lg border border-white/15 transition-transform hover:scale-110"
                style={{ backgroundColor: c }}
                aria-label={`Explore ${c}`}
                title={c}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {descriptor ? (
            <motion.div
              key={descriptor.hex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="p-8" style={{ backgroundColor: descriptor.hex, color: textColor === "light" ? "#fff" : "#111" }}>
                <p className="text-sm font-medium opacity-80">{descriptor.hueLabel}</p>
                <h2 className="mt-1 text-3xl font-bold">{descriptor.displayName}</h2>
                <p className="mt-1 font-mono text-sm uppercase opacity-70">{descriptor.hex}</p>
              </div>
              <div className="space-y-5 bg-white/5 p-6">
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">Psychology</p>
                  <p className="text-white/80">This color signals {descriptor.psychology}.</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">Best for</p>
                  <p className="text-white/80">Commonly used in {descriptor.branding}.</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">Use cases</p>
                  <ul className="space-y-1 text-white/70">
                    {descriptor.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/colors/${descriptor.canonicalSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Full {descriptor.displayName} color guide →
                </Link>
              </div>
            </motion.div>
          ) : (
            <p className="text-center text-sm text-white/40">Enter a valid hex color to explore its psychology.</p>
          )}
        </AnimatePresence>

        <ToolPageSections config={toolPageContent["color-psychology-explorer"]} />
      </div>
    </main>
  );
}
