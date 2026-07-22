"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { generateHarmony, type HarmonyMode } from "@/lib/harmony";
import { toolPageContent } from "@/lib/seo/tool-pages";

const MODES: { key: HarmonyMode; label: string; description: string }[] = [
  { key: "complementary", label: "Complementary", description: "Two colors opposite each other on the wheel. High contrast, strong focal points." },
  { key: "analogous", label: "Analogous", description: "Colors that sit next to each other. Calm, cohesive, low-tension palettes." },
  { key: "triadic", label: "Triadic", description: "Three colors evenly spaced around the wheel. Vibrant but balanced." },
  { key: "split-complementary", label: "Split-complementary", description: "A base color plus the two neighbors of its complement. Contrast with less tension." },
  { key: "tetradic", label: "Tetradic", description: "Four colors in two complementary pairs. Rich palettes that need one dominant color." },
  { key: "monochromatic", label: "Monochromatic", description: "Tints and shades of a single hue. Safe, elegant, and easy to keep consistent." },
];

export function ColorHarmonyTool() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [mode, setMode] = useState<HarmonyMode>("complementary");

  const palette = isValidHex(baseColor) ? generateHarmony(baseColor, mode) : null;
  const activeMode = MODES.find((m) => m.key === mode)!;

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Color Harmony Generator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Generate complementary, analogous, triadic, tetradic, split-complementary, and monochromatic palettes from one base color.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/15" style={{ backgroundColor: isValidHex(baseColor) ? baseColor : "#333" }}>
              <input
                type="color"
                aria-label="Base color"
                value={isValidHex(baseColor) ? baseColor : "#4F46E5"}
                onChange={(e) => setBaseColor(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              maxLength={7}
              placeholder="#4F46E5"
              className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-white/25"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  mode === m.key ? "bg-white/15 text-white" : "text-white/40 hover:bg-white/8 hover:text-white/70"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-center text-sm text-white/50"
        >
          {activeMode.description}
        </motion.p>

        {palette && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 gap-3 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-5"
          >
            {palette.colors.map((color) => (
              <div key={color.role} className="flex h-40 flex-col justify-end p-4" style={{ backgroundColor: color.hex, color: color.text === "light" ? "#fff" : "#111" }}>
                <p className="text-xs font-semibold">{color.name}</p>
                <p className="font-mono text-[11px] uppercase opacity-80">{color.hex}</p>
              </div>
            ))}
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["color-harmony"]} />
      </div>
    </main>
  );
}
