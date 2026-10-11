"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { SwatchStrip } from "@/components/seo/swatch-strip";
import { generateTailwindScale, isValidHex } from "@/lib/color-utils";
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

  const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
  const stripColors = scale.map(({ hex }) => hex.toUpperCase());

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
            <span className="text-[#1c1712]/60">Tailwind Scale Generator</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Tailwind Scale Generator</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {[scale[1], scale[3], scale[5], scale[7], scale[9]].filter(Boolean).map(({ step, hex }) => (
                <span key={step} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Generate a full 50 to 950 Tailwind shade scale from any color.</span> Copy it as a Tailwind config, CSS variables or JSON.
            </p>
          </div>
        </section>

        {/* ── Generator ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <label className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:scale-105" style={{ backgroundColor: valid ? baseColor : "#ddd" }}>
                  <input
                    type="color"
                    value={valid ? baseColor : "#4F46E5"}
                    onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Pick base color"
                  />
                </label>
                <div>
                  <label htmlFor="tw-base" className={label}>Base color</label>
                  <input
                    id="tw-base"
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                    maxLength={7}
                    spellCheck={false}
                    placeholder="#4F46E5"
                    className="mt-1.5 block w-36 rounded-xl px-3 py-2 font-mono text-[13px] font-semibold outline-none ring-1 ring-black/[0.12] transition focus:ring-black/30"
                  />
                  <p className="mt-1.5 text-[12px] text-[#1c1712]/45">{valid ? findClosestColorName(baseColor) : "Enter a valid HEX"}</p>
                </div>
              </div>

              {scale.length > 0 && (
                <div className="flex items-center gap-3">
                  <p className="text-right text-[13px] text-[#1c1712]/55">
                    <span className="block font-semibold text-[#1c1712]/80">{scale.length} shades</span>
                    50 → 950
                  </p>
                  <button onClick={() => copy(exportCode)} className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                    {copied === exportCode ? "✓ Copied" : "Copy config"}
                  </button>
                </div>
              )}
            </div>

            {scale.length > 0 && (
              <div className="mt-8">
                <SwatchStrip colors={stripColors} height="h-36" copied={copied} onCopy={copy} className="rounded-2xl ring-1 ring-black/[0.07]" />
                <div className="mt-2 flex">
                  {scale.map(({ step }) => (
                    <span key={step} className="flex-1 text-center font-mono text-[11px] font-semibold text-[#1c1712]/40">{step}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Every step ── */}
        {scale.length > 0 && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                All {scale.length} steps
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {scale.map(({ step, hex }) => (
                  <button
                    key={step}
                    onClick={() => copy(hex.toUpperCase())}
                    className="overflow-hidden rounded-2xl text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]"
                  >
                    <div className="h-20 w-full" style={{ backgroundColor: hex }} />
                    <div className="p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{step}</p>
                      <p className="mt-1 font-mono text-[13px] font-semibold uppercase">{copied === hex.toUpperCase() ? "✓ Copied" : hex}</p>
                      <p className="mt-0.5 truncate text-[12px] text-[#1c1712]/45">{findClosestColorName(hex)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Export ── */}
        {scale.length > 0 && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Export</p>
                  <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Use it in your project</h2>
                </div>
                <div role="tablist" aria-label="Export format" className="flex gap-2">
                  {(["tailwind", "css", "json"] as const).map((t) => {
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
                <pre className="max-h-72 overflow-auto px-5 py-5 font-mono text-[12px] leading-relaxed text-[#1c1712]/75">{exportCode}</pre>
                <button onClick={() => copy(exportCode)} className="absolute right-4 top-4 rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                  {copied === exportCode ? "✓ Copied" : "Copy all"}
                </button>
              </div>
            </div>
          </section>
        )}

        <ToolPageSections config={toolPageContent["tailwind-scale"]} variant="new" />
      </main>
    </div>
  );
}
