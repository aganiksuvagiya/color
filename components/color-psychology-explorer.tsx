"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText, isValidHex } from "@/lib/color-utils";
import { getProgrammaticColorDescriptor } from "@/lib/seo/programmatic";
import { toolPageContent } from "@/lib/seo/tool-pages";

const QUICK_PICKS = [
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899",
];

export function ColorPsychologyExplorer() {
  const [hex, setHex]         = useState("#3B82F6");
  const [hexInput, setHexInput] = useState("#3B82F6");

  const descriptor = useMemo(() => {
    if (!isValidHex(hex)) return null;
    return getProgrammaticColorDescriptor(hex.slice(1).toLowerCase());
  }, [hex]);

  const textColor = descriptor ? getContrastText(descriptor.hex) : "light";
  const onLight   = textColor === "dark";
  const textHi    = onLight ? "rgba(0,0,0,0.82)"  : "rgba(255,255,255,0.92)";
  const textLo    = onLight ? "rgba(0,0,0,0.42)"  : "rgba(255,255,255,0.50)";

  function handleHexInput(val: string) {
    setHexInput(val);
    if (isValidHex(val)) setHex(val);
  }

  function pickColor(c: string) {
    setHex(c);
    setHexInput(c);
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Psychology
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              Color Psychology
            </h1>
          </div>
          <p className="hidden text-[13px] text-[#1c1712]/40 sm:block sm:text-right sm:max-w-[220px]">
            Pick any color and see what it signals — psychologically and for branding.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
          className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row lg:min-h-[520px]">

            {/* ═══ LEFT — Color display + picker ═══ */}
            <div className="flex flex-col lg:w-[280px] lg:shrink-0">

              {/* Large color swatch */}
              <AnimatePresence mode="wait">
                <motion.label key={descriptor?.hex ?? hex}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  transition={{ duration:0.2 }}
                  className="group relative block min-h-[180px] cursor-pointer lg:flex-1"
                  style={{ backgroundColor: isValidHex(hex) ? hex : "#3B82F6" }}>

                  {/* Overlay info */}
                  {descriptor && (
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: textLo }}>
                        {descriptor.hueLabel}
                      </p>
                      <p className="text-[22px] font-black leading-tight tracking-[-0.02em]" style={{ color: textHi }}>
                        {descriptor.displayName}
                      </p>
                      <p className="font-mono text-[11px]" style={{ color: textLo }}>
                        {descriptor.hex.toUpperCase()}
                      </p>
                    </div>
                  )}

                  {/* Pick hint */}
                  <div className="absolute right-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-semibold opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: onLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)", color: textHi }}>
                    Click to pick
                  </div>

                  <input type="color" value={isValidHex(hex) ? hex : "#3B82F6"}
                    onChange={e => pickColor(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                </motion.label>
              </AnimatePresence>

              {/* Hex input */}
              <div className="border-t border-black/[0.06] px-4 py-3">
                <input type="text" value={hexInput} onChange={e => handleHexInput(e.target.value)}
                  maxLength={7} placeholder="#3B82F6"
                  className={`w-full rounded-xl border px-3 py-2 font-mono text-[12px] outline-none transition-colors ${
                    !isValidHex(hexInput) && hexInput.length > 1
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-black/[0.08] bg-[#faf7f2] text-[#1c1712] focus:border-[#e8531f]/30"
                  }`}/>
              </div>

              {/* Quick picks */}
              <div className="border-t border-black/[0.06] px-4 pb-4 pt-3">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Quick picks</p>
                <div className="grid grid-cols-8 gap-1.5 lg:grid-cols-4">
                  {QUICK_PICKS.map(c => (
                    <button key={c} onClick={() => pickColor(c)}
                      className={`aspect-square rounded-xl border-2 transition-all hover:scale-110 hover:shadow-md ${
                        hex.toUpperCase() === c.toUpperCase()
                          ? "border-[#e8531f] shadow-[0_0_0_2px_rgba(232,83,31,0.2)]"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}/>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ RIGHT — Psychology info ═══ */}
            <div className="flex min-w-0 flex-1 flex-col border-t border-black/[0.06] lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                {descriptor ? (
                  <motion.div key={descriptor.hex}
                    initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-8 }}
                    transition={{ duration:0.22 }}
                    className="flex flex-1 flex-col divide-y divide-black/[0.05] p-0">

                    {/* Psychology */}
                    <div className="px-6 py-5">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8531f]/70">Psychology</p>
                      <p className="text-[14px] leading-relaxed text-[#1c1712]/70">
                        This color signals <span className="font-semibold text-[#1c1712]">{descriptor.psychology}</span>.
                      </p>
                    </div>

                    {/* Best for */}
                    <div className="px-6 py-5">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8531f]/70">Best for</p>
                      <p className="text-[14px] leading-relaxed text-[#1c1712]/70">
                        Commonly used in <span className="font-semibold text-[#1c1712]">{descriptor.branding}</span>.
                      </p>
                    </div>

                    {/* Use cases */}
                    <div className="flex-1 px-6 py-5">
                      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8531f]/70">Use cases</p>
                      <ul className="space-y-2">
                        {descriptor.useCases.map(useCase => (
                          <li key={useCase} className="flex items-start gap-2.5 text-[13px] text-[#1c1712]/65">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8531f]/40"/>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link */}
                    <div className="px-6 py-4">
                      <Link href={`/colors/${descriptor.canonicalSlug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-black/[0.08] bg-[#faf7f2] px-4 py-2.5 text-[12px] font-semibold text-[#1c1712]/60 transition hover:bg-[#f0ede8] hover:text-[#1c1712]">
                        Full {descriptor.displayName} color guide
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                      </Link>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                    className="flex flex-1 items-center justify-center p-12 text-center">
                    <div>
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf7f2]">
                        <svg className="h-6 w-6 text-[#1c1712]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <p className="text-[13px] text-[#1c1712]/35">Enter a valid hex color to explore its psychology</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

        <ToolPageSections config={toolPageContent["color-psychology-explorer"]}/>
      </main>
    </div>
  );
}
