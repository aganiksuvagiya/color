"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateTailwindScale, getContrastText, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

export function TailwindScaleTool() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [copied, setCopied] = useState<string | null>(null);
  const [exportTab, setExportTab] = useState<"css" | "tailwind" | "json">("tailwind");

  const valid = isValidHex(baseColor);
  const scale = valid ? generateTailwindScale(baseColor) : [];

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1400);
  }

  const cssVars = scale.map(({ step, hex }) => `  --color-${step}: ${hex};`).join("\n");
  const twConfig = `colors: {\n  brand: {\n${scale.map(({ step, hex }) => `    "${step}": "${hex}",`).join("\n")}\n  }\n}`;
  const jsonCode = JSON.stringify(Object.fromEntries(scale.map(({ step, hex }) => [step, hex])), null, 2);
  const exportCode = exportTab === "css" ? `:root {\n${cssVars}\n}` : exportTab === "tailwind" ? twConfig : jsonCode;

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-5 py-2.5 text-sm font-semibold text-[#e8531f] shadow-[0_4px_20px_rgba(232,83,31,0.12)] whitespace-nowrap">
            ✓ {copied.startsWith("#") ? `${copied.toUpperCase()} copied!` : "Copied!"}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />Color Tool
          </span>
          <h1 className="mt-2.5 font-display text-[2.4rem] font-black leading-none tracking-[-0.04em] sm:text-[3.2rem]">
            Tailwind Scale Generator
          </h1>
          <p className="mt-2 text-[14px] text-[#1c1712]/40">
            Generate a full 50–950 Tailwind shade scale from any color.
          </p>
        </motion.div>

        {/* ── Color Input Card ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-5 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
          <div className="flex flex-col items-start gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Left: swatch + input */}
            <div className="flex items-center gap-4">
              <label className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-black/[0.10] shadow-md transition hover:scale-105"
                style={{ backgroundColor: valid ? baseColor : "#ddd" }}>
                <input type="color" value={valid ? baseColor : "#4F46E5"}
                  onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
              </label>
              <div>
                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/30">Base Color</p>
                <input type="text" value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                  maxLength={7} placeholder="#4F46E5"
                  className="w-32 rounded-xl border border-black/[0.08] bg-[#faf7f2] px-3 py-2 font-mono text-[13px] font-semibold outline-none transition focus:border-black/15 focus:bg-white" />
                <p className="mt-0.5 text-[10px] text-[#1c1712]/30">
                  {valid ? findClosestColorName(baseColor) : "Enter a valid hex"}
                </p>
              </div>
            </div>

            {/* Right: quick stats + copy config */}
            {scale.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-[#1c1712]">{scale.length} shades</p>
                  <p className="text-[10px] text-[#1c1712]/35">50 → 950</p>
                </div>
                <button onClick={() => copy(exportCode)}
                  className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-[#faf7f2] px-4 py-2.5 text-[12px] font-semibold text-[#1c1712]/60 transition hover:bg-[#f0ede8]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  Copy config
                </button>
              </div>
            )}
          </div>

          {/* Scale strip */}
          {scale.length > 0 && (
            <div className="flex overflow-hidden">
              {scale.map(({ step, hex }) => (
                <div key={step}
                  className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]"
                  style={{ backgroundColor: hex, minHeight: 100 }}>
                  <button onClick={() => copy(hex)}
                    className="absolute inset-0 flex flex-col items-center justify-between py-2.5 px-1"
                    aria-label={`Copy ${hex}`}>
                    <span className="font-mono text-[8px] font-bold opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100"
                      style={{ color: getContrastText(hex) === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}>
                      {step}
                    </span>
                    <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {copied === hex ? "✓ Copied" : hex.toUpperCase()}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Step labels row */}
          {scale.length > 0 && (
            <div className="flex border-t border-black/[0.05]">
              {scale.map(({ step }) => (
                <div key={step} className="flex-1 py-2 text-center">
                  <span className="font-mono text-[8px] font-semibold text-[#1c1712]/30">{step}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Detail Cards: 3 key shades ── */}
        {scale.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {[scale[0], scale[2], scale[4], scale[7], scale[10]].filter(Boolean).map(({ step, hex }) => (
              <button key={step} onClick={() => copy(hex)}
                className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="h-14 w-full" style={{ backgroundColor: hex }} />
                <div className="p-3">
                  <p className="font-mono text-[9px] font-bold text-[#1c1712]/30">{step}</p>
                  <p className="mt-0.5 font-mono text-[10px] font-semibold text-[#1c1712]/60">{hex.toUpperCase()}</p>
                  <p className="mt-0.5 truncate text-[9px] text-[#1c1712]/30">{findClosestColorName(hex)}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Export ── */}
        {scale.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-10 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Export</p>
              <div className="flex gap-1">
                {(["tailwind", "css", "json"] as const).map((t) => (
                  <button key={t} onClick={() => setExportTab(t)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition ${exportTab === t ? "bg-[#1c1712] text-white" : "text-[#1c1712]/40 hover:bg-[#faf7f2]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="overflow-x-auto px-5 py-4 font-mono text-[11px] leading-relaxed text-[#1c1712]/55 max-h-64">
                {exportCode}
              </pre>
              <div className="absolute right-4 top-4">
                <button onClick={() => copy(exportCode)}
                  className="flex items-center gap-1.5 rounded-lg border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[10px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                  {copied === exportCode ? "✓ Copied!" : "Copy all"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["tailwind-scale"]} />
      </main>
    </div>
  );
}
