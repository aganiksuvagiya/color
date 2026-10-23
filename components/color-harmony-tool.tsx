"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { hexToHsl, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
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

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const ghostBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

const WHEEL = `conic-gradient(${Array.from({ length: 13 }, (_, i) => `hsl(${i * 30} 85% 55%)`).join(", ")})`;

/** Hue ring with a dot for every color of the palette, joined by lines, so the rule is visible. */
function HarmonyWheel({ hues, colors }: { hues: number[]; colors: string[] }) {
  const r = 84;
  const pos = (h: number) => {
    const a = (h * Math.PI) / 180;
    return { x: 100 + r * Math.sin(a), y: 100 - r * Math.cos(a) };
  };
  const pts = hues.map(pos);
  return (
    <div className="relative h-48 w-48 shrink-0" role="img" aria-label={`Hue positions: ${hues.map((h) => `${h} degrees`).join(", ")}`}>
      <div className="absolute inset-0 rounded-full" style={{ background: WHEEL }} />
      <div className="absolute inset-6 rounded-full bg-white" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {pts.length > 1 && (
          <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="rgba(28,23,18,0.05)" stroke="rgba(28,23,18,0.35)" strokeWidth="1.5" strokeLinejoin="round" />
        )}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === 0 ? 11 : 9} fill={colors[i]} stroke="#ffffff" strokeWidth="3" />
        ))}
      </svg>
    </div>
  );
}

export function ColorHarmonyTool() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [hexInput, setHexInput]   = useState("#4F46E5");
  const [mode, setMode]           = useState<HarmonyMode>("complementary");
  const [copied, setCopied]       = useState<string | null>(null);

  const valid   = isValidHex(baseColor);
  const palette = valid ? generateHarmony(baseColor, mode) : null;
  const activeMode = MODES.find((m) => m.key === mode)!;

  function handleHexInput(val: string) {
    setHexInput(val);
    const n = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(n) && n.length === 7) setBaseColor(n.toUpperCase());
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1600);
    });
  }

  const hexes = palette ? palette.colors.map((c) => c.hex.toUpperCase()) : [];
  const hues = palette ? palette.colors.map((c) => hexToHsl(c.hex).h) : [];
  const allHex = hexes.join(", ");
  const generatorHref = `/generator?label=${encodeURIComponent(`${activeMode.label} ${findClosestColorName(baseColor)}`)}&c=${hexes.map((h) => h.slice(1)).join("-")}`;
  const dots = hexes.length ? hexes : [baseColor];

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ {copied.startsWith("#") && !copied.includes(",") ? `${copied.toUpperCase()} copied` : "Copied"}
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
            <span className="text-[#1c1712]/60">Color Harmony</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Harmony</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.slice(0, 5).map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">6 harmony rules, free.</span> Pick one base color and get a palette built on the color wheel, ready to copy or open in the generator.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-12">
            {/* Base color + rule */}
            <aside className="min-w-0 divide-y divide-black/[0.06] rounded-2xl ring-1 ring-black/[0.07] lg:sticky lg:top-24">
              <div className="p-5 sm:p-6">
                <label htmlFor="harmony-hex" className={label}>Base color</label>
                <div className="mt-3 flex items-center gap-3">
                  <label
                    className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
                    title="Open your system color picker"
                  >
                    <input
                      type="color"
                      value={valid ? baseColor.toLowerCase() : "#4f46e5"}
                      onChange={(e) => { setBaseColor(e.target.value.toUpperCase()); setHexInput(e.target.value.toUpperCase()); }}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label="Pick the base color"
                    />
                    <span className="block h-full w-full" style={{ backgroundColor: valid ? baseColor : "#ddd" }} />
                  </label>
                  <input
                    id="harmony-hex"
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexInput(e.target.value)}
                    maxLength={7}
                    spellCheck={false}
                    placeholder="#4F46E5"
                    className={`h-12 min-w-0 flex-1 rounded-xl px-4 font-mono text-[14px] font-semibold outline-none ring-1 transition focus:ring-2 ${
                      !valid && hexInput.length > 1 ? "text-red-600 ring-red-300 focus:ring-red-500" : "text-[#1c1712] ring-black/[0.12] focus:ring-[#1c1712]"
                    }`}
                  />
                </div>
                <p className="mt-2 text-[13px] text-[#1c1712]/50">
                  {valid ? findClosestColorName(baseColor) : "Enter a valid HEX, like #4F46E5."}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className={label}>Harmony rule</p>
                <div className="mt-3 flex flex-wrap gap-2 lg:block lg:space-y-2" role="group" aria-label="Harmony rule">
                  {MODES.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      aria-pressed={mode === m.key}
                      className={`rounded-xl px-4 py-3 text-left transition max-lg:rounded-full max-lg:py-2 lg:w-full ${
                        mode === m.key ? "bg-[#1c1712]/[0.04] ring-2 ring-[#1c1712]" : "ring-1 ring-black/[0.08] hover:ring-black/25"
                      }`}
                    >
                      <span className="block text-[14px] font-semibold">{m.label}</span>
                      <span className="mt-0.5 hidden text-[13px] leading-5 text-[#1c1712]/55 lg:block">{m.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Palette */}
            <div className="min-w-0">
              {palette ? (
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                    <div className="min-w-0 flex-1">
                      <p className={label}>{activeMode.label} · {hexes.length} colors from {baseColor.toUpperCase()}</p>
                      <p className="mt-1 max-w-xl text-[14px] leading-6 text-[#1c1712]/60">{activeMode.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => copy(allHex)} className={ghostBtn}>{copied === allHex ? "✓ Copied" : "Copy all HEX"}</button>
                      <Link href={generatorHref} className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                        Open in generator →
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col sm:h-80 sm:flex-row">
                    {palette.colors.map((color) => {
                      const fg = color.text === "light" ? "#ffffff" : "#1c1712";
                      const hex = color.hex.toUpperCase();
                      return (
                        <button
                          key={`${color.name}-${hex}`}
                          onClick={() => copy(hex)}
                          aria-label={`Copy ${color.name} ${hex}`}
                          className="flex min-h-[4.5rem] flex-1 items-center justify-between gap-3 p-4 text-left transition-[flex,background-color] duration-300 sm:flex-col sm:items-stretch sm:p-5 sm:hover:flex-[1.5]"
                          style={{ backgroundColor: color.hex, color: fg }}
                        >
                          <span className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ opacity: 0.75 }}>{color.name}</span>
                          <span className="text-right sm:text-left">
                            <span className="block font-mono text-[15px] font-semibold">{copied === hex ? "✓ Copied" : hex}</span>
                            <span className="block truncate text-[12px]" style={{ opacity: 0.75 }}>{findClosestColorName(color.hex)}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid gap-6 border-t border-black/[0.06] p-5 sm:p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
                    <div className="mx-auto">
                      <HarmonyWheel hues={hues} colors={hexes} />
                    </div>
                    <div>
                      <p className={label}>Where they sit on the wheel</p>
                      <ul className="mt-3 divide-y divide-black/[0.06]">
                        {palette.colors.map((color, i) => (
                          <li key={`${color.name}-${i}`} className="flex items-center gap-3 py-2.5">
                            <span className="h-6 w-6 shrink-0 rounded-full ring-1 ring-black/10" style={{ backgroundColor: color.hex }} />
                            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">{color.name}</span>
                            <span className="font-mono text-[12px] uppercase text-[#1c1712]/50">{color.hex}</span>
                            <span className="w-14 text-right font-mono text-[12px] font-semibold text-[#1c1712]/70">{hues[i]}°</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700">
                  Enter a valid HEX color (like #4F46E5) to build a palette.
                </p>
              )}
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["color-harmony"]} variant="new" />
      </main>
    </div>
  );
}
