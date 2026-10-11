"use client";
// v2
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { SwatchStrip } from "@/components/seo/swatch-strip";
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

  const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
  const inputCls = "mt-1.5 w-full rounded-xl px-3 py-2 font-mono text-[13px] font-semibold outline-none ring-1 ring-black/[0.12] transition focus:ring-black/30";
  const actionBtn = "rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";
  const scaleCss = `:root {\n${cssVars}\n}`;

  const colorInput = (name: "A" | "B", value: string, valid: boolean, set: (v: string) => void) => (
    <div className="flex flex-1 items-center gap-4 rounded-2xl p-4 ring-1 ring-black/[0.07]">
      <label className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:scale-105" style={{ backgroundColor: valid ? value : "#ddd" }}>
        <input
          type="color"
          value={valid ? value : "#888888"}
          onChange={(e) => set(e.target.value.toUpperCase())}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={`Pick color ${name}`}
        />
      </label>
      <div className="min-w-0 flex-1">
        <label htmlFor={`mix-${name}`} className={label}>Color {name}</label>
        <input id={`mix-${name}`} type="text" value={value} onChange={(e) => set(e.target.value.toUpperCase())} maxLength={7} spellCheck={false} className={inputCls} />
        <p className="mt-1.5 truncate text-[12px] text-[#1c1712]/45">{valid ? findClosestColorName(value) : "Enter a valid HEX"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ {copied.startsWith("#") ? `${copied.toUpperCase()} copied` : "Copied"}
        </div>
      )}

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Color Mixer</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Mixer</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {[colorA, mixed ?? colorA, colorB].map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: valid ? c : "#ddd" }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Blend any two colors.</span> Pick A and B, drag the gradient to set the ratio, and export a 9-step scale as CSS, Tailwind or JSON.
            </p>
          </div>
        </section>

        {/* ── Mixer ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {colorInput("A", colorA, validA, setColorA)}
              <button
                onClick={() => { setColorA(colorB); setColorB(colorA); }}
                className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1c1712]/60 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                aria-label="Swap colors A and B"
                title="Swap"
              >
                ⇄
              </button>
              {colorInput("B", colorB, validB, setColorB)}
            </div>

            {/* Gradient canvas */}
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="relative mt-5 h-52 cursor-crosshair overflow-hidden rounded-2xl ring-1 ring-black/[0.07] sm:h-60"
              style={{ background: valid ? `linear-gradient(to right, ${colorA}, ${colorB})` : "#e5e5e5" }}
            >
              {valid && mixed && (
                <div className="pointer-events-none absolute top-0 flex h-full flex-col items-center" style={{ left: `${ratio}%`, transform: "translateX(-50%)" }}>
                  <div className="h-full w-px opacity-40" style={{ backgroundColor: mixedTc === "light" ? "#fff" : "#000" }} />
                  <div className="absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-[3px] border-white shadow-xl" style={{ backgroundColor: mixed }} />
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                <span className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white">Click or drag to set ratio</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                aria-label="Mix ratio"
                className="absolute inset-0 h-full w-full cursor-crosshair opacity-0"
              />
            </div>

            {/* Result */}
            {mixed && (
              <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl p-4 ring-1 ring-black/[0.07]">
                <div className="h-12 w-12 shrink-0 rounded-xl ring-1 ring-black/10" style={{ backgroundColor: mixed }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{findClosestColorName(mixed)}</p>
                  <p className="font-mono text-[12px] text-[#1c1712]/50">{mixed.toUpperCase()}{rgbM && ` · rgb(${rgbM.r}, ${rgbM.g}, ${rgbM.b})`}</p>
                </div>
                <span className="rounded-full bg-[#1c1712]/[0.05] px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70">A {100 - ratio}% / B {ratio}%</span>
                <button onClick={() => copy(mixed)} className={actionBtn}>{copied === mixed ? "✓ Copied" : "Copy HEX"}</button>
              </div>
            )}
          </div>
        </section>

        {/* ── 9-step scale ── */}
        {steps.length > 0 && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Scale</p>
                  <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">9-step blend</h2>
                  <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">Even steps from A to B. Hover a swatch for its HEX, click to copy.</p>
                </div>
                <button onClick={() => copy(scaleCss)} className={actionBtn}>{copied === scaleCss ? "✓ Copied" : "Copy CSS"}</button>
              </div>
              <div className="mt-8">
                <SwatchStrip colors={steps.map((h) => h.toUpperCase())} height="h-32" copied={copied} onCopy={copy} className="rounded-2xl ring-1 ring-black/[0.07]" />
              </div>
            </div>
          </section>
        )}

        {/* ── Breakdown ── */}
        {valid && mixed && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                Color breakdown
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[
                  { label: "Color A", hex: colorA, rgb: rgbA },
                  { label: "Mix", hex: mixed, rgb: rgbM },
                  { label: "Color B", hex: colorB, rgb: rgbB },
                ].map((c) => (
                  <button
                    key={c.label}
                    onClick={() => copy(c.hex)}
                    className="overflow-hidden rounded-2xl text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]"
                  >
                    <div className="h-24 w-full" style={{ backgroundColor: c.hex }} />
                    <div className="p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{c.label}</p>
                      <p className="mt-1 truncate text-[15px] font-semibold">{findClosestColorName(c.hex)}</p>
                      <p className="font-mono text-[12px] uppercase text-[#1c1712]/50">{copied === c.hex ? "✓ Copied" : c.hex}</p>
                      {c.rgb && (
                        <div className="mt-3 space-y-1.5">
                          {([["R", c.rgb.r, "#f87171"], ["G", c.rgb.g, "#4ade80"], ["B", c.rgb.b, "#60a5fa"]] as const).map(([ch, val, col]) => (
                            <div key={ch} className="flex items-center gap-2">
                              <span className="w-3 text-[10px] font-bold text-[#1c1712]/40">{ch}</span>
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                                <div className="h-full rounded-full" style={{ width: `${(val / 255) * 100}%`, backgroundColor: col }} />
                              </div>
                              <span className="w-7 text-right font-mono text-[10px] text-[#1c1712]/45">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Export ── */}
        {steps.length > 0 && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Export</p>
                  <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Use it in code</h2>
                </div>
                <div role="tablist" aria-label="Export format" className="flex gap-2">
                  {(["css", "tailwind", "json"] as const).map((t) => {
                    const on = exportTab === t;
                    return (
                      <button
                        key={t}
                        role="tab"
                        aria-selected={on}
                        onClick={() => setExportTab(t)}
                        className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold uppercase transition ${
                          on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="relative mt-6 rounded-2xl bg-[#F5F5F5] ring-1 ring-black/[0.07]">
                <pre className="overflow-x-auto px-5 py-5 font-mono text-[12px] leading-relaxed text-[#1c1712]/75">{exportCode}</pre>
                <button onClick={() => copy(exportCode)} className="absolute right-4 top-4 rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                  {copied === exportCode ? "✓ Copied" : "Copy all"}
                </button>
              </div>
            </div>
          </section>
        )}

        <ToolPageSections config={toolPageContent["color-mixer"]} variant="new" />
      </main>
    </div>
  );
}
