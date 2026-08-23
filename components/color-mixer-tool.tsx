"use client";
// v2
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { findClosestColorName } from "@/lib/color-names";
import { getContrastText, isValidHex } from "@/lib/color-utils";
import { toolPageContent } from "@/lib/seo/tool-pages";

const STEPS = 9;

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function mix(a: string, b: string, t: number) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return rgbToHex(ca.r + (cb.r - ca.r) * t, ca.g + (cb.g - ca.g) * t, ca.b + (cb.b - ca.b) * t);
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(c => c === text ? null : c), 1400);
  }, []);
  return { copied, copy };
}

export function ColorMixerTool() {
  const [colorA, setColorA] = useState("#4F46E5");
  const [colorB, setColorB] = useState("#F59E0B");
  const [ratio, setRatio] = useState(50);
  const [exportTab, setExportTab] = useState<"css" | "tailwind" | "json">("css");
  const canvasRef = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy();

  const validA = isValidHex(colorA), validB = isValidHex(colorB);
  const valid = validA && validB;
  const steps = valid ? Array.from({ length: STEPS }, (_, i) => mix(colorA, colorB, i / (STEPS - 1))) : [];
  const mixed = valid ? mix(colorA, colorB, ratio / 100) : null;
  const mixedTc = mixed ? getContrastText(mixed) : "dark";

  function handleCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setRatio(Math.round(pct * 100));
  }

  const rgbA = validA ? hexToRgb(colorA) : null;
  const rgbB = validB ? hexToRgb(colorB) : null;
  const rgbM = mixed ? hexToRgb(mixed) : null;

  const cssVars = steps.map((h, i) => `  --mix-${i + 1}: ${h};`).join("\n");
  const exportCode =
    exportTab === "css" ? `:root {\n${cssVars}\n}` :
    exportTab === "tailwind" ? `// tailwind.config.js\ncolors: {\n${steps.map((h, i) => `  'mix-${i + 1}': '${h}',`).join("\n")}\n}` :
    JSON.stringify(Object.fromEntries(steps.map((h, i) => [`mix-${i + 1}`, h])), null, 2);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      {/* ── Toast ── */}
      <AnimatePresence>
        {copied && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-5 py-2.5 text-sm font-semibold text-[#e8531f] shadow-[0_4px_20px_rgba(232,83,31,0.12)] whitespace-nowrap">
            ✓ {copied.startsWith("#") ? `${copied.toUpperCase()} copied!` : "Copied!"}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto w-full max-w-[880px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="mb-7 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />Color Tool
          </span>
          <h1 className="mt-2.5 font-display text-[2.6rem] font-black leading-none tracking-[-0.04em] sm:text-[3.4rem]">
            Color Mixer
          </h1>
          <p className="mt-2 text-[14px] text-[#1c1712]/40">
            Pick two colors — click the gradient to blend.
          </p>
        </motion.div>

        {/* ── Main tool card ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }}
          className="mb-4 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">

          {/* Color inputs row */}
          <div className="flex items-stretch divide-x divide-black/[0.06]">

            {/* Color A */}
            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <label className="group relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-black/[0.10] shadow-md transition hover:scale-105"
                style={{ backgroundColor: validA ? colorA : "#ddd" }}>
                <input type="color" value={validA ? colorA : "#888888"}
                  onChange={e => setColorA(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer" />
              </label>
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Color A</p>
                <input type="text" value={colorA} onChange={e => setColorA(e.target.value.toUpperCase())}
                  maxLength={7}
                  className="w-full rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2.5 py-1.5 font-mono text-[12px] font-semibold outline-none transition focus:border-black/15 focus:bg-white" />
                <p className="mt-0.5 truncate text-[10px] text-[#1c1712]/30">{validA ? findClosestColorName(colorA) : "—"}</p>
              </div>
            </div>

            {/* Swap */}
            <div className="flex items-center px-3">
              <button onClick={() => { setColorA(colorB); setColorB(colorA); }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/35 transition hover:bg-[#f0ede8]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5"/>
                </svg>
              </button>
            </div>

            {/* Color B */}
            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <label className="group relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-black/[0.10] shadow-md transition hover:scale-105"
                style={{ backgroundColor: validB ? colorB : "#ddd" }}>
                <input type="color" value={validB ? colorB : "#888888"}
                  onChange={e => setColorB(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer" />
              </label>
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Color B</p>
                <input type="text" value={colorB} onChange={e => setColorB(e.target.value.toUpperCase())}
                  maxLength={7}
                  className="w-full rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2.5 py-1.5 font-mono text-[12px] font-semibold outline-none transition focus:border-black/15 focus:bg-white" />
                <p className="mt-0.5 truncate text-[10px] text-[#1c1712]/30">{validB ? findClosestColorName(colorB) : "—"}</p>
              </div>
            </div>
          </div>

          {/* ── Gradient canvas ── */}
          <div ref={canvasRef} onClick={handleCanvasClick}
            className="relative mx-4 mb-4 cursor-crosshair overflow-hidden rounded-2xl"
            style={{
              height: 180,
              background: valid ? `linear-gradient(to right, ${colorA}, ${colorB})` : "#e5e5e5",
            }}>

            {/* Ratio thumb */}
            {valid && mixed && (
              <div className="pointer-events-none absolute top-0 flex h-full flex-col items-center"
                style={{ left: `${ratio}%`, transform: "translateX(-50%)" }}>
                <div className="h-full w-px opacity-40" style={{ backgroundColor: mixedTc === "light" ? "#fff" : "#000" }} />
                <div className="absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white shadow-xl"
                  style={{ backgroundColor: mixed }}>
                  <div className="flex gap-0.5">
                    <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: mixedTc === "light" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)" }} />
                    <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: mixedTc === "light" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Hint */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[9px] font-semibold text-white">
                Click to set ratio
              </span>
            </div>

            {/* Range slider overlay */}
            <input type="range" min={0} max={100} value={ratio}
              onChange={e => setRatio(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-crosshair opacity-0" />
          </div>

          {/* Result row */}
          {mixed && (
            <div className="mx-4 mb-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#faf7f2] px-4 py-3">
              <div className="h-10 w-10 shrink-0 rounded-xl border border-black/[0.08] shadow-md" style={{ backgroundColor: mixed }} />
              <div className="flex-1 min-w-0">
                <p className="truncate text-[12px] font-bold">{findClosestColorName(mixed)}</p>
                <p className="font-mono text-[10px] text-[#1c1712]/40">{mixed.toUpperCase()} · {rgbM && `rgb(${rgbM.r}, ${rgbM.g}, ${rgbM.b})`}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded-full bg-[#e8531f]/10 px-2.5 py-1 text-[10px] font-bold text-[#e8531f]">
                  A {100 - ratio}% / B {ratio}%
                </span>
                <button onClick={() => copy(mixed)}
                  className="rounded-lg border border-black/[0.07] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#1c1712]/50 transition hover:bg-[#f0ede8]">
                  {copied === mixed ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── 9-Step Scale ── */}
        {steps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
            className="mb-4 overflow-hidden rounded-3xl border border-black/[0.08] shadow-sm">
            <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-5 py-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">9-Step Scale</p>
              <button onClick={() => copy(`:root {\n${cssVars}\n}`)}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[10px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                {copied === `:root {\n${cssVars}\n}` ? "Copied!" : "Copy CSS"}
              </button>
            </div>
            <div className="flex overflow-hidden">
              {steps.map((hex, i) => (
                <div key={i}
                  className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]"
                  style={{ backgroundColor: hex, minHeight: 110 }}>
                  {/* MID badge */}
                  {i === 4 && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/25 px-1.5 py-0.5">
                      <span className="text-[7px] font-bold text-white">MID</span>
                    </div>
                  )}
                  <button onClick={() => copy(hex)}
                    className="absolute inset-0 flex items-end justify-center pb-3"
                    aria-label={`Copy ${hex}`}>
                    <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {copied === hex ? "✓ Copied" : hex.toUpperCase()}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Color breakdown ── */}
        {valid && mixed && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}
            className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: "Color A", hex: colorA, rgb: rgbA },
              { label: "Mix", hex: mixed, rgb: rgbM },
              { label: "Color B", hex: colorB, rgb: rgbB },
            ].map(s => (
              <button key={s.label} onClick={() => copy(s.hex)}
                className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="h-16 w-full transition-transform group-hover:scale-105" style={{ backgroundColor: s.hex }} />
                <div className="p-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#1c1712]/30">{s.label}</p>
                  <p className="mt-0.5 truncate text-[11px] font-bold">{findClosestColorName(s.hex)}</p>
                  <p className="font-mono text-[10px] text-[#1c1712]/40">{s.hex.toUpperCase()}</p>
                  {s.rgb && (
                    <div className="mt-2 space-y-1">
                      {[["R", s.rgb.r, "#f87171"], ["G", s.rgb.g, "#4ade80"], ["B", s.rgb.b, "#60a5fa"]].map(([ch, val, col]) => (
                        <div key={ch as string} className="flex items-center gap-1.5">
                          <span className="w-2.5 text-[8px] font-bold text-[#1c1712]/25">{ch}</span>
                          <div className="flex-1 overflow-hidden rounded-full bg-black/[0.05]" style={{ height: 4 }}>
                            <div className="h-full rounded-full" style={{ width: `${((val as number) / 255) * 100}%`, backgroundColor: col as string }} />
                          </div>
                          <span className="w-5 text-right font-mono text-[8px] text-[#1c1712]/25">{val as number}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Export ── */}
        {steps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Export</p>
              <div className="flex gap-1">
                {(["css", "tailwind", "json"] as const).map(t => (
                  <button key={t} onClick={() => setExportTab(t)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition ${exportTab === t ? "bg-[#1c1712] text-white" : "text-[#1c1712]/40 hover:bg-[#faf7f2]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="overflow-x-auto px-5 py-4 font-mono text-[11px] leading-relaxed text-[#1c1712]/55">
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

        <ToolPageSections config={toolPageContent["color-mixer"]} />
      </main>
    </div>
  );
}
