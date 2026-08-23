"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

function normalizeHex(hex: string): string {
  if (hex.length === 4) {
    const [, r, g, b] = hex;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return hex.toLowerCase();
}

function sanitizeSvg(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/(href|xlink:href|src)\s*=\s*"javascript:[^"]*"/gi, "");
}

function extractColors(svg: string): string[] {
  const found = svg.match(HEX_PATTERN) ?? [];
  return Array.from(new Set(found.map(normalizeHex)));
}

function applyRecolor(svg: string, colorMap: Record<string, string>): string {
  let result = svg;
  for (const [from, to] of Object.entries(colorMap)) {
    if (from.toLowerCase() === to.toLowerCase()) continue;
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(escaped, "gi"), to);
  }
  return result;
}

export function SvgImageRecolor() {
  const [originalSvg, setOriginalSvg] = useState<string | null>(null);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalColors = useMemo(() => (originalSvg ? extractColors(originalSvg) : []), [originalSvg]);

  const recoloredSvg = useMemo(() => {
    if (!originalSvg) return null;
    return applyRecolor(originalSvg, colorMap);
  }, [originalSvg, colorMap]);

  const loadSvgText = useCallback((text: string, name: string) => {
    const clean = sanitizeSvg(text);
    setOriginalSvg(clean);
    setColorMap({});
    setFileName(name);
    const colors = extractColors(clean);
    setSelectedColor(colors[0] ?? null);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.includes("svg") && !file.name.toLowerCase().endsWith(".svg")) return;
    const reader = new FileReader();
    reader.onload = (e) => loadSvgText(e.target?.result as string, file.name.replace(/\.svg$/i, ""));
    reader.readAsText(file);
  }, [loadSvgText]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0]; if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (file) processFile(file);
  };

  const loadDemo = useCallback(async () => {
    const res = await fetch("/demo-icon.svg");
    const text = await res.text();
    loadSvgText(text, "demo-icon");
  }, [loadSvgText]);

  useEffect(() => {
    void loadDemo();
  }, [loadDemo]);

  function setReplacement(originalHex: string, newHex: string) {
    setColorMap(prev => ({ ...prev, [originalHex]: newHex }));
  }

  function resetColor(originalHex: string) {
    setColorMap(prev => { const next = { ...prev }; delete next[originalHex]; return next; });
  }

  function resetAll() { setColorMap({}); }

  function handleDownload() {
    if (!recoloredSvg) return;
    const blob = new Blob([recoloredSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${fileName}-recolored.svg`; a.click();
    URL.revokeObjectURL(url);
  }

  function copySvgCode() {
    if (!recoloredSvg) return;
    navigator.clipboard.writeText(recoloredSvg).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  const hasChanges = Object.keys(colorMap).length > 0;
  const changedCount = Object.keys(colorMap).length;

  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[1040px] px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
          className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>SVG Tool
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              Image Recolor
            </h1>
          </div>
          <p className="hidden text-[13px] text-[#1c1712]/40 sm:block sm:text-right sm:max-w-[200px]">
            Upload an SVG and swap any color with one click
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}>

          {/* ── Single unified card: sidebar + preview ── */}
          <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm lg:h-[580px]">
            <div className="flex flex-col lg:flex-row lg:h-full">

              {/* ═══ LEFT SIDEBAR ═══ */}
              <div className="flex flex-col border-b border-black/[0.06] lg:w-[260px] lg:shrink-0 lg:border-b-0 lg:border-r">

                {/* Sidebar header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#1c1712]">Image Colors</p>
                    {originalColors.length > 0 && (
                      <p className="text-[10px] text-[#1c1712]/35">{originalColors.length} colors found</p>
                    )}
                  </div>
                  {hasChanges && (
                    <button onClick={resetAll}
                      className="rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2.5 py-1 text-[10px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                      Reset
                    </button>
                  )}
                </div>

                {/* Scrollable: swatch grid + edit color */}
                <div className="px-4 py-3 lg:flex-1 lg:overflow-y-auto">
                  {originalColors.length === 0 ? (
                    <p className="mt-4 text-center text-[11px] text-[#1c1712]/30">Upload an SVG to see its colors</p>
                  ) : (
                    <>
                      <p className="mb-2 text-[10px] text-[#1c1712]/30">Click a color to edit</p>
                      <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-5">
                        {originalColors.map(hex => {
                          const current = colorMap[hex] ?? hex;
                          const isSelected = selectedColor === hex;
                          return (
                            <button key={hex} onClick={() => setSelectedColor(hex)}
                              title={`${findClosestColorName(current)} ${current}`}
                              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-150 hover:scale-105 ${
                                isSelected ? "border-[#e8531f] shadow-[0_0_0_2px_rgba(232,83,31,0.2)]" : "border-transparent hover:border-black/10"
                              }`}
                              style={{ backgroundColor: current }}>
                              {colorMap[hex] && (
                                <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"/>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Edit color — inline below swatches */}
                  <AnimatePresence>
                    {selectedColor && originalColors.length > 0 && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                        exit={{ opacity:0, height:0 }} className="mt-4 overflow-hidden">
                        <div className="rounded-2xl border border-black/[0.07] bg-[#faf7f2] p-3">
                          {/* before → after row */}
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 shrink-0 rounded-xl border border-black/[0.10] shadow-sm" style={{ backgroundColor: selectedColor }}/>
                            <div className="flex flex-col">
                              <span className="font-mono text-[9px] text-[#1c1712]/35">{selectedColor.toUpperCase()}</span>
                              <span className="text-[9px] text-[#1c1712]/25">original</span>
                            </div>
                            <svg className="mx-1 h-3 w-3 shrink-0 text-[#1c1712]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                            {/* Clickable new color */}
                            <label className="group relative cursor-pointer">
                              <div className="h-8 w-8 rounded-xl border-2 border-[#e8531f]/30 shadow-sm transition group-hover:brightness-90"
                                style={{ backgroundColor: colorMap[selectedColor] ?? selectedColor }}/>
                              <input type="color" value={colorMap[selectedColor] ?? selectedColor}
                                onChange={e => setReplacement(selectedColor, e.target.value)}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                            </label>
                            <div className="flex flex-col">
                              <span className="font-mono text-[9px] font-semibold text-[#1c1712]/60">{(colorMap[selectedColor] ?? selectedColor).toUpperCase()}</span>
                              <span className="text-[9px] text-[#1c1712]/25">new</span>
                            </div>
                            {colorMap[selectedColor] && (
                              <button onClick={() => resetColor(selectedColor)}
                                className="ml-auto shrink-0 text-[9px] text-[#1c1712]/30 transition hover:text-[#e8531f]">✕</button>
                            )}
                          </div>

                          {/* Color name */}
                          <p className="mt-2 text-[10px] font-semibold text-[#1c1712]/50">
                            {findClosestColorName(colorMap[selectedColor] ?? selectedColor)}
                          </p>

                          {/* Quick palette */}
                          <div className="mt-2 grid grid-cols-6 gap-1">
                            {["#e8531f","#1c1712","#6366f1","#10b981","#f59e0b","#ec4899",
                              "#3b82f6","#ffffff","#ef4444","#8b5cf6","#06b6d4","#84cc16"].map(c => (
                              <button key={c} onClick={() => setReplacement(selectedColor, c)}
                                className={`h-6 rounded-md border transition-all hover:scale-110 ${
                                  (colorMap[selectedColor] ?? selectedColor) === c
                                    ? "border-[#e8531f]/60 shadow-[0_0_0_1.5px_rgba(232,83,31,0.25)]"
                                    : c === "#ffffff" ? "border-black/[0.15]" : "border-transparent"
                                }`}
                                style={{ backgroundColor: c }} title={c}/>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sidebar bottom actions */}
                <div className="flex flex-col gap-2 border-t border-black/[0.06] p-3">
                  <button onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1c1712] py-2.5 text-[12px] font-bold text-white transition hover:bg-[#1c1712]/80">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    Upload SVG
                  </button>
                  <button onClick={loadDemo}
                    className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-black/[0.08] bg-[#f7f4ef] py-2 text-[11px] font-semibold text-[#1c1712]/50 transition hover:bg-[#f0ede8] hover:text-[#1c1712]/70">
                    Try demo SVG
                  </button>
                  <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" onChange={handleFileChange} className="hidden"/>
                </div>
              </div>

              {/* ═══ RIGHT — Preview + toolbar ═══ */}
              <div className="flex flex-1 flex-col min-w-0">

                {/* Preview area */}
                {recoloredSvg ? (
                  <div className="flex min-h-[260px] flex-1 items-center justify-center overflow-hidden bg-white p-6 sm:p-8 [&_svg]:h-auto [&_svg]:max-h-full [&_svg]:max-w-full"
                    dangerouslySetInnerHTML={{ __html: recoloredSvg }}/>
                ) : (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex min-h-[260px] flex-1 cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-all ${
                      dragging ? "border-[#e8531f]/40 bg-[#e8531f]/[0.02]" : "border-transparent hover:border-black/[0.08]"
                    }`}>
                    <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all ${
                      dragging ? "border-[#e8531f]/20 bg-[#e8531f]/10" : "border-black/[0.08] bg-[#f7f4ef]"
                    }`}>
                      <svg className={`h-7 w-7 transition-colors ${dragging ? "text-[#e8531f]" : "text-[#1c1712]/20"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p className="text-[13px] font-semibold text-[#1c1712]/35">Drop SVG here or click to upload</p>
                    <p className="mt-1 text-[11px] text-[#1c1712]/20">SVG files only</p>
                  </div>
                )}

                {/* Bottom toolbar */}
                <div className="flex items-center justify-between border-t border-black/[0.06] bg-[#faf7f2] px-4 py-2.5">
                  {/* Left: file info + reset */}
                  <div className="flex items-center gap-2">
                    {hasChanges && (
                      <button onClick={resetAll} title="Reset all changes"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/[0.07] bg-white text-[#1c1712]/40 transition hover:bg-[#f0ede8] hover:text-[#1c1712]/70">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                      </button>
                    )}
                    <button onClick={() => fileInputRef.current?.click()}
                      className="flex h-7 items-center gap-1.5 rounded-lg border border-black/[0.07] bg-white px-3 text-[11px] font-semibold text-[#1c1712]/50 transition hover:bg-[#f0ede8]">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                      Open file
                    </button>
                    {recoloredSvg && (
                      <span className="hidden font-mono text-[10px] text-[#1c1712]/25 sm:inline">{fileName}.svg</span>
                    )}
                  </div>

                  {/* Right: copy + download */}
                  <div className="flex items-center gap-2">
                    <button onClick={copySvgCode} disabled={!recoloredSvg}
                      className={`flex h-7 items-center gap-1.5 rounded-lg border px-3 text-[11px] font-semibold transition disabled:opacity-30 ${
                        copied ? "border-green-200 bg-green-50 text-green-600" : "border-black/[0.07] bg-white text-[#1c1712]/45 hover:bg-[#f0ede8]"
                      }`}>
                      {copied
                        ? <><svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Copied!</>
                        : "Copy SVG"
                      }
                    </button>
                    <button onClick={handleDownload} disabled={!recoloredSvg}
                      className="flex h-7 items-center gap-1.5 rounded-lg bg-[#e8531f] px-4 text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(232,83,31,0.30)] transition hover:bg-[#c94518] disabled:opacity-30">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        <ToolPageSections config={toolPageContent["image-recolor"]}/>
      </main>
    </div>
  );
}
