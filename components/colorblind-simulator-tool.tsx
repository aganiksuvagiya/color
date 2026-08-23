"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateRandomPalette, getContrastText } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { simulateColorBlind, type ColorBlindType } from "@/lib/colorblind";
import { toolPageContent } from "@/lib/seo/tool-pages";
import type { Palette } from "@/lib/types";

const DEFAULT_PALETTE: Palette = {
  label: "Default palette",
  colors: [
    { name: "Deep Base", hex: "#1c1e21", role: "neutral", text: "light" },
    { name: "Brand",     hex: "#4f46e5", role: "primary", text: "light" },
    { name: "Growth",    hex: "#22c55e", role: "success", text: "light" },
    { name: "Alert",     hex: "#f59e0b", role: "warning", text: "dark"  },
    { name: "Pop",       hex: "#ec4899", role: "accent",  text: "light" },
  ],
};

const TYPES: { key: ColorBlindType | "normal"; label: string; desc: string }[] = [
  { key: "normal",       label: "Normal",       desc: "Full color vision" },
  { key: "protanopia",   label: "Protanopia",   desc: "Red-blind · ~1% of males" },
  { key: "deuteranopia", label: "Deuteranopia", desc: "Green-blind · ~1% of males" },
  { key: "tritanopia",   label: "Tritanopia",   desc: "Blue-blind · very rare" },
];

export function ColorblindSimulatorTool() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);

  function setColor(index: number, hex: string) {
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) =>
        i === index ? { ...c, hex, name: findClosestColorName(hex), text: getContrastText(hex) } : c
      ),
    }));
  }

  function randomize() { setPalette(generateRandomPalette()); }

  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[1040px] px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* Hero */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
          className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Accessibility
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              Colorblind Simulator
            </h1>
          </div>
          <p className="hidden text-[13px] text-[#1c1712]/40 sm:block sm:text-right sm:max-w-[220px]">
            Preview your palette under protanopia, deuteranopia, and tritanopia.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
          className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row">

            {/* ═══ LEFT — Palette editor ═══ */}
            <div className="flex flex-col border-b border-black/[0.06] lg:w-[220px] lg:shrink-0 lg:border-b-0 lg:border-r">

              {/* Header */}
              <div className="border-b border-black/[0.06] px-4 py-3">
                <p className="text-[13px] font-bold text-[#1c1712]">Your Palette</p>
                <p className="text-[10px] text-[#1c1712]/35">Click a swatch to edit</p>
              </div>

              {/* Color rows */}
              <div className="flex flex-row flex-wrap gap-0 lg:flex-col lg:flex-1">
                {palette.colors.map((color, i) => (
                  <label key={i} className="group relative flex cursor-pointer items-center gap-3 border-b border-black/[0.05] px-4 py-3 transition hover:bg-[#faf7f2] last:border-b-0 lg:last:border-b-0 w-full">
                    {/* Swatch */}
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-black/[0.08] shadow-sm transition group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}/>
                    <input type="color" value={color.hex} onChange={e => setColor(i, e.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                    {/* Info */}
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-[#1c1712]">{color.name}</p>
                      <p className="font-mono text-[10px] text-[#1c1712]/35">{color.hex.toUpperCase()}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Randomize */}
              <div className="border-t border-black/[0.06] p-3">
                <button onClick={randomize}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/[0.08] bg-[#f7f4ef] py-2.5 text-[12px] font-semibold text-[#1c1712]/55 transition hover:bg-[#f0ede8] hover:text-[#1c1712]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Randomize
                </button>
              </div>
            </div>

            {/* ═══ RIGHT — Simulation rows ═══ */}
            <div className="flex min-w-0 flex-1 flex-col divide-y divide-black/[0.05]">
              {TYPES.map((type, ti) => {
                const simColors = palette.colors.map(c => ({
                  ...c,
                  simHex: type.key === "normal" ? c.hex : simulateColorBlind(c.hex, type.key),
                }));
                const isNormal = type.key === "normal";
                return (
                  <div key={type.key} className={`flex flex-col gap-3 px-5 py-4 ${isNormal ? "bg-[#faf7f2]" : ""}`}>
                    {/* Row label */}
                    <div className="flex items-center gap-2">
                      {isNormal ? (
                        <span className="rounded-full bg-[#1c1712]/[0.07] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#1c1712]/50">
                          Normal
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#e8531f]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#e8531f]">
                          {type.label}
                        </span>
                      )}
                      <span className="text-[10px] text-[#1c1712]/35">{type.desc}</span>
                    </div>

                    {/* Color strips */}
                    <div className="flex overflow-hidden rounded-2xl">
                      {simColors.map((color, ci) => (
                        <div key={ci} className="group relative flex h-16 flex-1 flex-col justify-end overflow-hidden sm:h-20"
                          style={{ backgroundColor: color.simHex }}
                          title={`${color.role}: ${color.simHex}`}>
                          {/* Hex on hover */}
                          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/30 px-2 py-1.5 backdrop-blur-sm transition-transform duration-150 group-hover:translate-y-0">
                            <p className="font-mono text-[9px] font-semibold text-white">{color.simHex.toUpperCase()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Diff warning — show when colors look too similar */}
                    {!isNormal && (() => {
                      const hexes = simColors.map(c => c.simHex);
                      const hasDup = hexes.some((a, ai) => hexes.some((b, bi) => ai !== bi && a === b));
                      return hasDup ? (
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-600">
                          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                          </svg>
                          Some colors are indistinguishable under this vision type
                        </p>
                      ) : null;
                    })()}
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>

        <ToolPageSections config={toolPageContent["colorblind-simulator"]}/>
      </main>
    </div>
  );
}
