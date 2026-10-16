"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "./header";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateRandomPalette, getContrastText, isValidHex } from "@/lib/color-utils";
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
  { key: "normal",       label: "Normal vision", desc: "Full color vision" },
  { key: "protanopia",   label: "Protanopia",    desc: "Red-blind · about 1% of males" },
  { key: "deuteranopia", label: "Deuteranopia",  desc: "Green-blind · about 1% of males" },
  { key: "tritanopia",   label: "Tritanopia",    desc: "Blue-blind · very rare" },
];

/** Colors closer than this (CIE76 ΔE) are hard to tell apart in a chart or legend. */
const SIMILAR_BELOW = 20;

function hexToLab(hex: string): [number, number, number] {
  const lin = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const [r, g, b] = lin;
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function deltaE(a: string, b: string) {
  const [l1, a1, b1] = hexToLab(a);
  const [l2, a2, b2] = hexToLab(b);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";

function HexField({ value, onCommit }: { value: string; onCommit: (hex: string) => void }) {
  // Shows half-typed text as a draft; a complete HEX is applied at once.
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      type="text"
      value={draft ?? value.toUpperCase()}
      maxLength={7}
      spellCheck={false}
      aria-label="HEX value"
      onChange={(e) => {
        let v = e.target.value.toUpperCase();
        if (!v.startsWith("#")) v = `#${v}`;
        const ok = isValidHex(v) && v.length === 7;
        setDraft(ok ? null : v);
        if (ok) onCommit(v.toLowerCase());
      }}
      onBlur={() => setDraft(null)}
      className="h-10 w-[6.5rem] shrink-0 rounded-xl px-3 font-mono text-[13px] font-semibold text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]"
    />
  );
}

export function ColorblindSimulatorTool() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
  const { copied, copy } = useCopy();

  function setColor(index: number, hex: string) {
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) =>
        i === index ? { ...c, hex, name: findClosestColorName(hex), text: getContrastText(hex) } : c
      ),
    }));
  }

  function randomize() { setPalette(generateRandomPalette()); }

  const colors = palette.colors;

  // Pairs that look different to most people but run together under a given vision type.
  const confused = (type: ColorBlindType) => {
    const sim = colors.map((c) => simulateColorBlind(c.hex, type));
    const pairs: { a: number; b: number }[] = [];
    for (let a = 0; a < colors.length; a++) {
      for (let b = a + 1; b < colors.length; b++) {
        if (deltaE(colors[a].hex, colors[b].hex) >= SIMILAR_BELOW && deltaE(sim[a], sim[b]) < SIMILAR_BELOW) pairs.push({ a, b });
      }
    }
    return pairs;
  };

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ {copied} copied
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
            <span className="text-[#1c1712]/60">Colorblind Simulator</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Colorblind Simulator</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {colors.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c.hex }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Check your palette for color vision deficiency, free.</span> See it under protanopia, deuteranopia and tritanopia, and find the colors that run together.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-12">
            {/* Palette editor */}
            <aside className="min-w-0 rounded-2xl ring-1 ring-black/[0.07] lg:sticky lg:top-24">
              <div className="px-5 pb-3 pt-5 sm:px-6">
                <p className={label}>Your palette</p>
                <p className="mt-1 text-[13px] text-[#1c1712]/50">Click a swatch or type a HEX to change it.</p>
              </div>
              <ul className="divide-y divide-black/[0.06] border-t border-black/[0.06]">
                {colors.map((color, i) => (
                  <li key={i} className="flex items-center gap-3 px-5 py-3 sm:px-6">
                    <label
                      className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
                      title="Open your system color picker"
                    >
                      <input
                        type="color"
                        value={color.hex.toLowerCase()}
                        onChange={(e) => setColor(i, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        aria-label={`Pick color ${i + 1}`}
                      />
                      <span className="block h-full w-full" style={{ backgroundColor: color.hex }} />
                    </label>
                    <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">{color.name}</span>
                    <HexField value={color.hex} onCommit={(hex) => setColor(i, hex)} />
                  </li>
                ))}
              </ul>
              <div className="border-t border-black/[0.06] p-4 sm:px-6">
                <button onClick={randomize} className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
                  </svg>
                  Randomize
                </button>
              </div>
            </aside>

            {/* Simulations */}
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              {TYPES.map((type) => {
                const isNormal = type.key === "normal";
                const simHexes = colors.map((c) => (type.key === "normal" ? c.hex : simulateColorBlind(c.hex, type.key)).toUpperCase());
                const pairs = isNormal ? [] : confused(type.key as ColorBlindType);
                return (
                  <article key={type.key} className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                    <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-4">
                      <div className="min-w-0">
                        <h2 className="text-[15px] font-semibold">{type.label}</h2>
                        <p className="text-[13px] text-[#1c1712]/50">{type.desc}</p>
                      </div>
                      {isNormal ? (
                        <span className="shrink-0 rounded-full bg-[#1c1712]/[0.05] px-2.5 py-0.5 text-[11px] font-bold text-[#1c1712]/60">Reference</span>
                      ) : pairs.length === 0 ? (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">✓ All clear</span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-600/25">
                          {pairs.length} {pairs.length === 1 ? "pair" : "pairs"} run together
                        </span>
                      )}
                    </div>
                    <SwatchStrip colors={simHexes} height="h-28" copied={copied} onCopy={copy} className="" />
                    {!isNormal && (
                      <div className="px-5 py-3.5">
                        {pairs.length === 0 ? (
                          <p className="text-[13px] text-[#1c1712]/55">Every color stays easy to tell apart.</p>
                        ) : (
                          <ul className="space-y-2">
                            {pairs.map(({ a, b }) => (
                              <li key={`${a}-${b}`} className="flex items-center gap-2 text-[13px]">
                                <span className="flex -space-x-1">
                                  <span className="h-4 w-4 rounded-full ring-2 ring-white" style={{ backgroundColor: simHexes[a] }} />
                                  <span className="h-4 w-4 rounded-full ring-2 ring-white" style={{ backgroundColor: simHexes[b] }} />
                                </span>
                                <span className="min-w-0 truncate text-[#1c1712]/70">
                                  <span className="font-semibold text-[#1c1712]">{colors[a].name}</span> and <span className="font-semibold text-[#1c1712]">{colors[b].name}</span> look alike
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["colorblind-simulator"]} variant="new" />
      </main>
    </div>
  );
}
