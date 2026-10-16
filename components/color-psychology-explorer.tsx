"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText, isValidHex } from "@/lib/color-utils";
import { generateHarmony } from "@/lib/harmony";
import { colorFamily } from "@/lib/palette-library";
import { getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import { toolPageContent } from "@/lib/seo/tool-pages";

const QUICK_PICKS = [
  { hex: "#EF4444", name: "Red" },
  { hex: "#F97316", name: "Orange" },
  { hex: "#EAB308", name: "Yellow" },
  { hex: "#22C55E", name: "Green" },
  { hex: "#14B8A6", name: "Teal" },
  { hex: "#3B82F6", name: "Blue" },
  { hex: "#8B5CF6", name: "Purple" },
  { hex: "#EC4899", name: "Pink" },
];

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const ghostBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

/** "trust, stability, and product clarity" -> chips. Falls back to null when the text is not a tidy list. */
function keywords(text: string): string[] | null {
  const parts = text.split(/,\s*(?:and\s+)?|\s+and\s+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2 || parts.length > 6 || parts.some((p) => p.length > 32)) return null;
  return parts;
}

export function ColorPsychologyExplorer() {
  const [hex, setHex] = useState("#3B82F6");
  const [hexInput, setHexInput] = useState("#3B82F6");
  const { copied, copy } = useCopy();

  const descriptor = useMemo(() => {
    if (!isValidHex(hex)) return null;
    return getProgrammaticColorDescriptor(hex.slice(1).toLowerCase());
  }, [hex]);

  const light = descriptor ? getContrastText(descriptor.hex) === "dark" : false;
  const fg = light ? "#1c1712" : "#ffffff";
  const muted = light ? "rgba(28,23,18,0.6)" : "rgba(255,255,255,0.75)";

  function handleHexInput(val: string) {
    setHexInput(val);
    const n = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(n) && n.length === 7) setHex(n.toUpperCase());
  }

  function pickColor(c: string) {
    setHex(c);
    setHexInput(c);
  }

  const pairing = descriptor ? generateHarmony(descriptor.hex, "complementary").colors.map((c) => c.hex.toUpperCase()) : [];
  const family = descriptor ? colorFamily(descriptor.hex) : "";
  const familyName = family.charAt(0).toUpperCase() + family.slice(1);
  const words = descriptor ? keywords(descriptor.psychology) : null;
  const hasGuide = descriptor ? !(descriptor.mode === "hex" && descriptor.canonicalSlug === descriptor.slug) : false;
  const dots = descriptor ? [descriptor.hex, ...pairing.slice(0, 3)] : [hex];

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
            <span className="text-[#1c1712]/60">Color Psychology</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Psychology Explorer</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">What does your color say? Free.</span> Pick any color to see what it signals, which brands use it, and what it pairs with.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:px-12">
            {/* Color chip + picker */}
            <div className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07] lg:sticky lg:top-24">
              <div
                className="flex min-h-[15rem] flex-col justify-between p-5 transition-colors duration-150 sm:min-h-[20rem] sm:p-6"
                style={{ backgroundColor: isValidHex(hex) ? hex : "#3B82F6", color: fg }}
              >
                <span
                  className="w-fit rounded-full px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: muted, backgroundColor: light ? "rgba(28,23,18,0.07)" : "rgba(255,255,255,0.16)", border: `1px solid ${light ? "rgba(28,23,18,0.16)" : "rgba(255,255,255,0.3)"}` }}
                >
                  {descriptor?.hueLabel ?? "Color"}
                </span>
                <div>
                  <p className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{descriptor?.displayName ?? "Pick a color"}</p>
                  <button
                    onClick={() => copy(hex.toUpperCase())}
                    className="mt-2 font-mono text-xl font-semibold tracking-[0.08em] transition hover:opacity-80"
                    style={{ color: muted }}
                    aria-label={`Copy ${hex.toUpperCase()}`}
                  >
                    {hex.toUpperCase()}
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <label htmlFor="psy-hex" className={label}>Your color</label>
                  <div className="mt-2.5 flex items-center gap-3">
                    <label className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30" title="Open your system color picker">
                      <input
                        type="color"
                        value={isValidHex(hex) ? hex.toLowerCase() : "#3b82f6"}
                        onChange={(e) => pickColor(e.target.value.toUpperCase())}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        aria-label="Pick a color"
                      />
                      <span className="block h-full w-full" style={{ backgroundColor: isValidHex(hex) ? hex : "#ddd" }} />
                    </label>
                    <input
                      id="psy-hex"
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexInput(e.target.value)}
                      maxLength={7}
                      spellCheck={false}
                      placeholder="#3B82F6"
                      className={`h-11 min-w-0 flex-1 rounded-xl px-4 font-mono text-[14px] font-semibold outline-none ring-1 transition focus:ring-2 ${
                        !isValidHex(hexInput) && hexInput.length > 1 ? "text-red-600 ring-red-300 focus:ring-red-500" : "text-[#1c1712] ring-black/[0.12] focus:ring-[#1c1712]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <p className={label}>Quick picks</p>
                  <div className="mt-2.5 grid grid-cols-8 gap-2">
                    {QUICK_PICKS.map((c) => {
                      const on = hex.toUpperCase() === c.hex;
                      return (
                        <button
                          key={c.hex}
                          onClick={() => pickColor(c.hex)}
                          aria-label={`Use ${c.name} ${c.hex}`}
                          aria-pressed={on}
                          title={c.name}
                          className={`aspect-square rounded-xl transition hover:scale-105 ${on ? "ring-2 ring-[#1c1712] ring-offset-2" : "ring-1 ring-black/10"}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* What it signals */}
            {descriptor ? (
              <div className="min-w-0 divide-y divide-black/[0.06] rounded-2xl ring-1 ring-black/[0.07]">
                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">What it signals</p>
                  <p className="mt-3 text-[1.15rem] font-medium leading-8 tracking-[-0.01em]">
                    {descriptor.displayName} signals {descriptor.psychology}.
                  </p>
                  {words && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {words.map((w) => (
                        <span key={w} className="rounded-full bg-[#1c1712]/[0.05] px-3 py-1 text-[13px] font-semibold text-[#1c1712]/70">{w}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Best for</p>
                  <p className="mt-3 text-[15px] leading-7 text-[#1c1712]/70">
                    Commonly used in <span className="font-semibold text-[#1c1712]">{descriptor.branding}</span>.
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Use cases</p>
                  <ul className="mt-3 space-y-2.5">
                    {descriptor.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#1c1712]/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c2410c]" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 sm:p-6">
                  <p className={label}>Pairs well with</p>
                  <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/[0.07]">
                    <SwatchStrip colors={pairing} height="h-16" copied={copied} onCopy={copy} className="" />
                  </div>
                  <p className="mt-2 text-[13px] text-[#1c1712]/50">Complementary colors from the color wheel. Click one to copy it.</p>
                </div>

                <div className="flex flex-wrap gap-2 p-5 sm:p-6">
                  {hasGuide && (
                    <Link href={`/colors/${descriptor.canonicalSlug}`} className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                      Full {descriptor.displayName} guide →
                    </Link>
                  )}
                  <Link href={`/shades-of-${family}`} className={ghostBtn}>Shades of {familyName}</Link>
                  <Link href={`/color-palettes/${family}`} className={ghostBtn}>{familyName} palettes</Link>
                </div>
              </div>
            ) : (
              <p role="alert" className="h-fit rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700">
                Enter a valid HEX color (like #3B82F6) to explore what it signals.
              </p>
            )}
          </div>
        </section>

        <ToolPageSections config={toolPageContent["color-psychology-explorer"]} variant="new" />
      </main>
    </div>
  );
}
