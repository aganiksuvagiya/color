"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

const QUICK_COLORS = [
  "#e8531f", "#1c1712", "#6366f1", "#10b981", "#f59e0b", "#ec4899",
  "#3b82f6", "#ffffff", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16",
];

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

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const ghostBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#1c1712]/70 disabled:hover:ring-black/[0.12]";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function HexField({ value, onCommit }: { value: string; onCommit: (hex: string) => void }) {
  // While the user types a half-finished value we show their draft; a valid HEX is committed at once.
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      type="text"
      value={draft ?? value.toUpperCase()}
      maxLength={7}
      spellCheck={false}
      aria-label="New HEX color"
      onChange={(e) => {
        let v = e.target.value.toUpperCase();
        if (!v.startsWith("#")) v = `#${v}`;
        const ok = /^#[0-9A-F]{6}$/.test(v);
        setDraft(ok ? null : v);
        if (ok) onCommit(v.toLowerCase());
      }}
      onBlur={() => setDraft(null)}
      className="h-10 w-full min-w-0 rounded-xl px-3 font-mono text-[13px] font-semibold text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]"
    />
  );
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
    e.target.value = "";
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

  const changedCount = Object.keys(colorMap).length;
  const hasChanges = changedCount > 0;
  const currentOf = (hex: string) => colorMap[hex] ?? hex;
  const dots = (originalColors.length ? originalColors.map(currentOf) : ["#6366f1", "#10b981", "#f59e0b"]).slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ SVG code copied
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
            <span className="text-[#1c1712]/60">SVG Recolor</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">SVG Image Recolor</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Free, and your file never leaves the browser.</span> Upload an SVG, swap any of its colors, then copy the code or download it.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-12">
            {/* Preview */}
            <div
              className={`min-w-0 overflow-hidden rounded-2xl transition ${dragging ? "ring-2 ring-[#1c1712]" : "ring-1 ring-black/[0.07]"}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              {recoloredSvg ? (
                <div
                  className="flex min-h-[18rem] items-center justify-center p-6 sm:min-h-[26rem] sm:p-10 [&_svg]:h-auto [&_svg]:max-h-[22rem] [&_svg]:max-w-full"
                  style={{
                    backgroundColor: "#ffffff",
                    backgroundImage: "linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%), linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 10px 10px",
                  }}
                  dangerouslySetInnerHTML={{ __html: recoloredSvg }}
                />
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 px-6 py-20 text-center transition hover:bg-[#fafafa]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.12]">
                    <Svg><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></Svg>
                  </span>
                  <span className="text-[15px] font-semibold">Drop an SVG here, or click to upload</span>
                  <span className="text-[13px] text-[#1c1712]/50">SVG files only</span>
                </button>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.06] bg-white px-4 py-3">
                <button onClick={() => fileInputRef.current?.click()} className={ghostBtn}>
                  <Svg><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></Svg>
                  Upload SVG
                </button>
                <button onClick={loadDemo} className={ghostBtn}>Try demo</button>
                {recoloredSvg && <span className="hidden truncate font-mono text-[12px] text-[#1c1712]/45 sm:inline">{fileName}.svg</span>}
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <button onClick={copySvgCode} disabled={!recoloredSvg} className={ghostBtn}>Copy SVG</button>
                  <button
                    onClick={handleDownload}
                    disabled={!recoloredSvg}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Svg><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></Svg>
                    Download
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            {/* Colors */}
            <div className="min-w-0 rounded-2xl ring-1 ring-black/[0.07]">
              <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5 sm:px-6">
                <div>
                  <p className={label}>Colors in this image</p>
                  <p className="mt-1 text-[13px] text-[#1c1712]/50">
                    {originalColors.length} found{hasChanges ? ` · ${changedCount} changed` : ""}
                  </p>
                </div>
                {hasChanges && (
                  <button onClick={resetAll} className={ghostBtn.replace("px-4 py-2", "px-3.5 py-1.5")}>
                    <Svg><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></Svg>
                    Reset all
                  </button>
                )}
              </div>

              {originalColors.length === 0 ? (
                <p className="border-t border-black/[0.06] px-5 py-5 text-[14px] leading-6 text-[#1c1712]/55 sm:px-6">
                  {originalSvg
                    ? "No HEX colors found in this file. This tool swaps #RRGGBB and #RGB values, so named colors like \"red\" are left as they are."
                    : "Upload an SVG to see its colors here."}
                </p>
              ) : (
                <ul className="max-h-[22rem] space-y-2 overflow-y-auto border-t border-black/[0.06] px-5 py-4 sm:px-6">
                  {originalColors.map((hex) => {
                    const current = currentOf(hex);
                    const changed = colorMap[hex] !== undefined;
                    const selected = selectedColor === hex;
                    return (
                      <li key={hex}>
                        <button
                          onClick={() => setSelectedColor(hex)}
                          aria-pressed={selected}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            selected ? "bg-[#1c1712]/[0.04] ring-2 ring-[#1c1712]" : "ring-1 ring-black/[0.08] hover:ring-black/25"
                          }`}
                        >
                          <span className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: hex }} title={`Original ${hex.toUpperCase()}`} />
                          <span className="text-[#1c1712]/30" aria-hidden="true">→</span>
                          <span className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: current }} title={`Now ${current.toUpperCase()}`} />
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[13px] font-semibold uppercase">{current}</span>
                            <span className="block truncate text-[12px] text-[#1c1712]/45">{findClosestColorName(current)}</span>
                          </span>
                          {changed && <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">Changed</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selectedColor && originalColors.includes(selectedColor) && (
                <div className="border-t border-black/[0.06] px-5 py-5 sm:px-6">
                  <p className={label}>Change {selectedColor.toUpperCase()} to</p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <label className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30" style={{ backgroundColor: currentOf(selectedColor) }} title="Open your system color picker">
                      <input
                        type="color"
                        value={currentOf(selectedColor).toLowerCase()}
                        onChange={(e) => setReplacement(selectedColor, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        aria-label="Pick a new color"
                      />
                    </label>
                    <HexField value={currentOf(selectedColor)} onCommit={(hex) => setReplacement(selectedColor, hex)} />
                    {colorMap[selectedColor] !== undefined && (
                      <button onClick={() => resetColor(selectedColor)} className={ghostBtn.replace("px-4 py-2", "px-3.5 py-2.5")}>Reset</button>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-12 lg:grid-cols-6 xl:grid-cols-12">
                    {QUICK_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setReplacement(selectedColor, c)}
                        title={c}
                        aria-label={`Use ${c}`}
                        className={`h-8 rounded-lg ring-1 transition hover:scale-110 ${currentOf(selectedColor).toLowerCase() === c ? "ring-2 ring-[#1c1712]" : "ring-black/15"}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["image-recolor"]} variant="new" />
      </main>
    </div>
  );
}
