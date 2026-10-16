"use client";
// v3
import Link from "next/link";
import { useState, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { SwatchStrip } from "@/components/seo/swatch-strip";
import { findClosestColorName } from "@/lib/color-names";
import { getContrastText, hexToHsl, isValidHex } from "@/lib/color-utils";
import { toolPageContent } from "@/lib/seo/tool-pages";

const STEPS = 9;

const BLENDS = [
  { name: "Sunset", a: "#F97316", b: "#EC4899" },
  { name: "Ocean", a: "#06B6D4", b: "#4F46E5" },
  { name: "Forest", a: "#16A34A", b: "#FACC15" },
  { name: "Berry", a: "#9333EA", b: "#F43F5E" },
];

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

const labelCls = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "h-10 min-w-0 flex-1 rounded-xl px-3 font-mono text-[13px] font-semibold text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]";
const actionBtn = "rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

function CopyIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4" />
    </svg>
  );
}

function ColorField({ name, value, valid, onChange }: { name: "A" | "B"; value: string; valid: boolean; onChange: (v: string) => void }) {
  return (
    <div className="min-w-0">
      <label className={labelCls} htmlFor={`mix-${name}`}>Color {name}</label>
      <div className="mt-1.5 flex items-center gap-2.5">
        <label
          className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
          title="Open your system color picker"
        >
          <input
            type="color"
            value={valid ? value.toLowerCase() : "#888888"}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Pick color ${name}`}
          />
          <span className="block h-full w-full" style={{ backgroundColor: valid ? value : "#ddd" }} />
        </label>
        <input id={`mix-${name}`} type="text" value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} maxLength={7} spellCheck={false} placeholder="#000000" className={inputCls} />
      </div>
      <p className="mt-1.5 truncate text-[12px] text-[#1c1712]/45">{valid ? findClosestColorName(value) : "Enter a valid HEX"}</p>
    </div>
  );
}

export function ColorMixerTool() {
  const [colorA, setColorA] = useState("#4F46E5");
  const [colorB, setColorB] = useState("#F59E0B");
  const [ratio, setRatio] = useState(50);
  const [exportTab, setExportTab] = useState<"css" | "tailwind" | "json">("css");
  const { copied, copy } = useCopy();

  const validA = isValidHex(colorA), validB = isValidHex(colorB);
  const valid = validA && validB;
  const steps = valid ? Array.from({ length: STEPS }, (_, i) => mix(colorA, colorB, i / (STEPS - 1))) : [];
  const mixed = valid ? mix(colorA, colorB, ratio / 100) : null;
  const mixedFg = mixed && getContrastText(mixed) === "light" ? "#ffffff" : "#1c1712";
  const mixedMuted = mixed && getContrastText(mixed) === "light" ? "rgba(255,255,255,0.75)" : "rgba(28,23,18,0.6)";
  const chipBg = mixed && getContrastText(mixed) === "light" ? "rgba(255,255,255,0.16)" : "rgba(28,23,18,0.07)";
  const chipBorder = mixed && getContrastText(mixed) === "light" ? "rgba(255,255,255,0.3)" : "rgba(28,23,18,0.16)";

  const rgbM = mixed ? hexToRgb(mixed) : null;
  const hslM = mixed ? hexToHsl(mixed) : null;

  const cssVars = steps.map((h, i) => `  --mix-${i + 1}: ${h};`).join("\n");
  const scaleCss = `:root {\n${cssVars}\n}`;
  const exportCode =
    exportTab === "css" ? scaleCss :
    exportTab === "tailwind" ? `// tailwind.config.js\ncolors: {\n${steps.map((h, i) => `  'mix-${i + 1}': '${h}',`).join("\n")}\n}` :
    JSON.stringify(Object.fromEntries(steps.map((h, i) => [`mix-${i + 1}`, h])), null, 2);

  const rows = mixed && rgbM && hslM
    ? [
        { label: "HEX", value: mixed.toUpperCase() },
        { label: "RGB", value: `rgb(${rgbM.r}, ${rgbM.g}, ${rgbM.b})` },
        { label: "HSL", value: `hsl(${hslM.h}, ${hslM.s}%, ${hslM.l}%)` },
      ]
    : [];

  function loadBlend(a: string, b: string) {
    setColorA(a);
    setColorB(b);
    setRatio(50);
  }

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

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-12">
            {/* Blend: the gradient with its two ends, then the two colors */}
            <div className="flex flex-col rounded-2xl p-4 ring-1 ring-black/[0.07] sm:p-5">
              <div
                className="relative h-52 overflow-hidden rounded-2xl ring-1 ring-black/[0.07] focus-within:ring-2 focus-within:ring-[#1c1712] sm:h-60 lg:flex-1"
                style={{ background: valid ? `linear-gradient(to right, ${colorA}, ${colorB})` : "#e5e5e5" }}
              >
                {valid && (
                  <>
                    <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1c1712] ring-1 ring-black/10">A · {colorA.toUpperCase()}</span>
                    <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1c1712] ring-1 ring-black/10">B · {colorB.toUpperCase()}</span>
                  </>
                )}
                {valid && mixed && (
                  <div className="pointer-events-none absolute top-0 flex h-full flex-col items-center" style={{ left: `${ratio}%`, transform: "translateX(-50%)" }}>
                    <div className="h-full w-px bg-white/70" />
                    <div className="absolute top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border-[3px] border-white shadow-xl" style={{ backgroundColor: mixed }} />
                  </div>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white">Drag to set the ratio</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ratio}
                  onChange={(e) => setRatio(Number(e.target.value))}
                  aria-label="Mix ratio"
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>

              <div className="mt-5 grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
                <ColorField name="A" value={colorA} valid={validA} onChange={setColorA} />
                <button
                  onClick={() => { setColorA(colorB); setColorB(colorA); }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-center rounded-xl text-[#1c1712]/60 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 max-sm:rotate-90 sm:mt-[22px]"
                  aria-label="Swap colors A and B"
                  title="Swap"
                >
                  <SwapIcon />
                </button>
                <ColorField name="B" value={colorB} valid={validB} onChange={setColorB} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-4">
                <span className="mr-1 text-[13px] text-[#1c1712]/50">Try a blend</span>
                {BLENDS.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => loadBlend(b.a, b.b)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3 text-[13px] font-semibold text-[#1c1712]/75 transition hover:border-black/25 hover:text-[#1c1712]"
                  >
                    <span className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: `linear-gradient(135deg, ${b.a}, ${b.b})` }} />
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Result: the mixed color on top, its specs underneath */}
            {valid && mixed && rgbM ? (
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.07]">
                <div className="flex min-h-[15rem] flex-1 flex-col justify-between p-5 transition-colors duration-150 sm:p-6" style={{ backgroundColor: mixed }}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full px-3 py-1.5 text-[12px] font-semibold" style={{ color: mixedFg, backgroundColor: chipBg, border: `1px solid ${chipBorder}` }}>
                      A {100 - ratio}% · B {ratio}%
                    </span>
                    <button
                      onClick={() => copy(mixed)}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition hover:opacity-80"
                      style={{ color: mixedFg, backgroundColor: chipBg, border: `1px solid ${chipBorder}` }}
                    >
                      <CopyIcon />
                      {copied === mixed ? "✓ Copied" : "Copy HEX"}
                    </button>
                  </div>
                  <div>
                    <p className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl" style={{ color: mixedFg }}>{findClosestColorName(mixed)}</p>
                    <p className="mt-2 font-mono text-xl font-semibold tracking-[0.08em]" style={{ color: mixedMuted }}>{mixed.toUpperCase()}</p>
                  </div>
                </div>
                <ul className="divide-y divide-black/[0.06]">
                  {rows.map((row) => (
                    <li key={row.label}>
                      <button onClick={() => copy(row.value)} className="group flex w-full items-center gap-4 px-5 py-3 text-left transition hover:bg-[#fafafa] sm:px-6">
                        <span className="w-10 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{row.label}</span>
                        <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-[#1c1712]/85">{copied === row.value ? "✓ Copied" : row.value}</span>
                        <span className="text-[#1c1712]/25 transition group-hover:text-[#1c1712]/70"><CopyIcon /></span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-black/[0.06] px-5 py-4 sm:px-6">
                  {([["R", rgbM.r, "#f87171"], ["G", rgbM.g, "#4ade80"], ["B", rgbM.b, "#60a5fa"]] as const).map(([ch, val, col]) => (
                    <div key={ch} className="flex items-center gap-3">
                      <span className="w-3 text-[11px] font-bold text-[#1c1712]/45">{ch}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                        <span className="block h-full rounded-full" style={{ width: `${(val / 255) * 100}%`, backgroundColor: col }} />
                      </span>
                      <span className="w-8 text-right font-mono text-[11px] text-[#1c1712]/50">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p role="alert" className="h-fit rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700">
                Enter two valid HEX colors (like #4F46E5) to see the mix.
              </p>
            )}
          </div>
        </section>

        {/* ── Scale + export ── */}
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

              <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
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
