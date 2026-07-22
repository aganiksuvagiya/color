"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ColorBlindPanel } from "./generator/colorblind-panel";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateRandomPalette, getContrastText } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";
import type { Palette } from "@/lib/types";

const DEFAULT_PALETTE: Palette = {
  label: "Default palette",
  colors: [
    { name: "Deep Base", hex: "#1c1e21", role: "neutral", text: "light" },
    { name: "Brand", hex: "#4f46e5", role: "primary", text: "light" },
    { name: "Growth", hex: "#22c55e", role: "success", text: "light" },
    { name: "Alert", hex: "#f59e0b", role: "warning", text: "dark" },
    { name: "Pop", hex: "#ec4899", role: "accent", text: "light" },
  ],
};

export function ColorblindSimulatorTool() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);

  function setColor(index: number, hex: string) {
    setPalette((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, hex, name: findClosestColorName(hex), text: getContrastText(hex) } : c)),
    }));
  }

  function randomize() {
    setPalette(generateRandomPalette());
  }

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Color Blind Simulator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Preview your palette under protanopia, deuteranopia, and tritanopia to catch colors that become indistinguishable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          {palette.colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/15" style={{ backgroundColor: color.hex }}>
                <input
                  type="color"
                  aria-label={`${color.role} color`}
                  value={color.hex}
                  onChange={(e) => setColor(i, e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-white/70">{color.name}</p>
                <p className="font-mono text-[10px] uppercase text-white/30">{color.hex}</p>
              </div>
            </div>
          ))}
          <button
            onClick={randomize}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
          >
            Randomize palette
          </button>
        </motion.div>

        <ColorBlindPanel palette={palette} />

        <ToolPageSections config={toolPageContent["colorblind-simulator"]} />
      </div>
    </main>
  );
}
