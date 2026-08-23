"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { isValidHex } from "@/lib/color-utils";
import { generateHarmony, type HarmonyMode } from "@/lib/harmony";
import { toolPageContent } from "@/lib/seo/tool-pages";

const MODES: { key: HarmonyMode; label: string; description: string }[] = [
  { key: "complementary",       label: "Complementary",       description: "Two colors opposite each other. High contrast, strong focal points." },
  { key: "analogous",           label: "Analogous",           description: "Colors that sit next to each other. Calm, cohesive, low-tension." },
  { key: "triadic",             label: "Triadic",             description: "Three colors evenly spaced. Vibrant but balanced." },
  { key: "split-complementary", label: "Split-Complementary", description: "Base + two neighbors of its complement. Contrast with less tension." },
  { key: "tetradic",            label: "Tetradic",            description: "Four colors in two complementary pairs. Rich, needs one dominant." },
  { key: "monochromatic",       label: "Monochromatic",       description: "Tints and shades of one hue. Safe, elegant, consistent." },
];

export function ColorHarmonyTool() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [hexInput, setHexInput]   = useState("#4F46E5");
  const [mode, setMode]           = useState<HarmonyMode>("complementary");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const valid   = isValidHex(baseColor);
  const palette = valid ? generateHarmony(baseColor, mode) : null;
  const activeMode = MODES.find((m) => m.key === mode)!;

  function handleHexInput(val: string) {
    setHexInput(val);
    if (isValidHex(val)) setBaseColor(val);
  }

  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    });
  }

  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[1040px] px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* Hero */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
          className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Color Tool
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              Color Harmony
            </h1>
          </div>
          <p className="hidden text-[13px] text-[#1c1712]/40 sm:block sm:text-right sm:max-w-[220px]">
            Generate beautiful palettes from a single base color using harmony rules.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
          className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm lg:h-[580px]">
          <div className="flex flex-col lg:flex-row lg:h-full">

            {/* ═══ LEFT — Color picker + mode list ═══ */}
            <div className="flex flex-col border-b border-black/[0.06] lg:w-[240px] lg:shrink-0 lg:border-b-0 lg:border-r">

              {/* Color swatch picker */}
              <label className="group relative block h-32 shrink-0 cursor-pointer overflow-hidden lg:h-40">
                <div className="h-full w-full transition-[filter] group-hover:brightness-95"
                  style={{ backgroundColor: valid ? baseColor : "#4F46E5" }}/>
                <div className="absolute inset-0 flex items-end p-3">
                  <div className="flex w-full items-center gap-2 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                    <span className="font-mono text-[11px] font-semibold text-white/90">{baseColor.toUpperCase()}</span>
                    <div className="ml-auto text-[9px] font-bold uppercase tracking-wider text-white/50">Click to pick</div>
                  </div>
                </div>
                <input type="color" value={valid ? baseColor : "#4F46E5"}
                  onChange={e => { setBaseColor(e.target.value); setHexInput(e.target.value); }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
              </label>

              {/* Hex text input */}
              <div className="border-b border-black/[0.06] px-4 py-2.5">
                <input type="text" value={hexInput} onChange={e => handleHexInput(e.target.value)}
                  maxLength={7} placeholder="#4F46E5"
                  className={`w-full rounded-xl border px-3 py-2 font-mono text-[12px] outline-none transition-colors ${
                    !isValidHex(hexInput) && hexInput.length > 1
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-black/[0.08] bg-[#faf7f2] text-[#1c1712] focus:border-[#e8531f]/30"
                  }`}/>
              </div>

              {/* Mode list */}
              <div className="lg:flex-1 lg:overflow-y-auto">
                {MODES.map((m, i) => (
                  <button key={m.key} onClick={() => setMode(m.key)}
                    className={`group w-full border-b border-black/[0.05] px-4 py-3 text-left transition-all last:border-b-0 ${
                      mode === m.key
                        ? "bg-[#e8531f]/[0.05] border-l-[3px] border-l-[#e8531f]"
                        : "hover:bg-[#faf7f2]"
                    }`}>
                    <p className={`text-[12px] font-bold transition-colors ${
                      mode === m.key ? "text-[#e8531f]" : "text-[#1c1712] group-hover:text-[#1c1712]"
                    }`}>{m.label}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-[#1c1712]/35">{m.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ RIGHT — Palette ═══ */}
            <div className="flex min-w-0 flex-1 flex-col">

              {/* Mode info bar */}
              <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#faf7f2] px-5 py-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#e8531f]">{activeMode.label}</p>
                  <p className="text-[11px] text-[#1c1712]/45">{activeMode.description}</p>
                </div>
              </div>

              {/* Palette strips — expandable on hover */}
              {palette ? (
                <div className="flex min-h-[240px] flex-1">
                  {palette.colors.map((color) => {
                    const light = color.text === "light";
                    const textHi  = light ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.75)";
                    const textLo  = light ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.38)";
                    const isCopied = copiedHex === color.hex;
                    return (
                      <div key={color.role}
                        className="group relative flex flex-1 flex-col justify-end p-3 transition-all duration-300 hover:flex-[2.2] sm:p-4"
                        style={{ backgroundColor: color.hex }}>

                        {/* Copy button */}
                        <button onClick={() => copyHex(color.hex)}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg opacity-0 transition-all group-hover:opacity-100"
                          style={{ backgroundColor: light ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.35)" }}>
                          <AnimatePresence mode="wait">
                            {isCopied ? (
                              <motion.svg key="check" initial={{ scale:0.5 }} animate={{ scale:1 }} exit={{ scale:0.5 }}
                                className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                style={{ color: textHi }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </motion.svg>
                            ) : (
                              <motion.svg key="copy" initial={{ scale:0.5 }} animate={{ scale:1 }} exit={{ scale:0.5 }}
                                className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                style={{ color: textHi }}>
                                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </button>

                        {/* Color info */}
                        <div className="translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: textLo }}>
                            {color.name}
                          </p>
                        </div>
                        <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: textHi }}>
                          {color.hex}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-[13px] text-[#1c1712]/30">Enter a valid hex color to generate a palette</p>
                </div>
              )}
            </div>

          </div>
        </motion.div>

        <ToolPageSections config={toolPageContent["color-harmony"]}/>
      </main>
    </div>
  );
}
