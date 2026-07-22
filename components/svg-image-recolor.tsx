"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText } from "@/lib/color-utils";
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

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.includes("svg") && !file.name.toLowerCase().endsWith(".svg")) return;
      const reader = new FileReader();
      reader.onload = (e) => loadSvgText(e.target?.result as string, file.name.replace(/\.svg$/i, ""));
      reader.readAsText(file);
    },
    [loadSvgText],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const loadDemo = useCallback(async () => {
    const res = await fetch("/demo-icon.svg");
    const text = await res.text();
    loadSvgText(text, "demo-icon");
  }, [loadSvgText]);

  useEffect(() => {
    const loadDefaultDemo = async () => {
      const res = await fetch("/demo-icon.svg");
      const text = await res.text();
      loadSvgText(text, "demo-icon");
    };
    loadDefaultDemo();
  }, [loadSvgText]);

  function setReplacement(originalHex: string, newHex: string) {
    setColorMap((prev) => ({ ...prev, [originalHex]: newHex }));
  }

  function resetColor(originalHex: string) {
    setColorMap((prev) => {
      const next = { ...prev };
      delete next[originalHex];
      return next;
    });
  }

  function resetAll() {
    setColorMap({});
  }

  function handleDownload() {
    if (!recoloredSvg) return;
    const blob = new Blob([recoloredSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}-recolored.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasChanges = Object.keys(colorMap).length > 0;

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">SVG Image Recolor</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Upload an SVG, swap any color in it, and export your recolored version.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex max-h-[calc(100vh-140px)] flex-col rounded-2xl border border-white/10 bg-white/5 p-5 lg:sticky lg:top-24"
          >
            <div className="mb-3 flex shrink-0 items-center justify-between">
              <p className="text-sm font-medium text-white/70">Colors found {originalColors.length > 0 && `(${originalColors.length})`}</p>
              {hasChanges && (
                <button onClick={resetAll} className="text-xs text-white/40 transition-colors hover:text-white/70">
                  Reset all
                </button>
              )}
            </div>

            {originalColors.length === 0 ? (
              <p className="text-xs leading-5 text-white/30">Upload an SVG to see its colors here.</p>
            ) : (
              <>
                <div className="-mr-2 grid grid-cols-6 gap-2 overflow-y-auto pr-2">
                  {originalColors.map((hex) => {
                    const current = colorMap[hex] ?? hex;
                    return (
                      <button
                        key={hex}
                        onClick={() => setSelectedColor(hex)}
                        className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-transform hover:scale-105 ${
                          selectedColor === hex ? "border-white" : "border-white/10"
                        }`}
                        style={{ backgroundColor: current }}
                        title={`${findClosestColorName(current)} ${current}`}
                        aria-label={`Select ${findClosestColorName(current)} ${current}`}
                      >
                        {colorMap[hex] && (
                          <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedColor && (
                  <div className="mt-4 flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-3 py-2.5">
                    <div
                      className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/15"
                      style={{ backgroundColor: colorMap[selectedColor] ?? selectedColor }}
                    >
                      <input
                        type="color"
                        aria-label="Replacement color"
                        value={colorMap[selectedColor] ?? selectedColor}
                        onChange={(e) => setReplacement(selectedColor, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white/70">
                        {findClosestColorName(colorMap[selectedColor] ?? selectedColor)}
                      </p>
                      <p className="font-mono text-[10px] uppercase text-white/30">
                        {selectedColor}
                        {colorMap[selectedColor] ? ` → ${colorMap[selectedColor]}` : ""}
                      </p>
                    </div>
                    {colorMap[selectedColor] && (
                      <button
                        onClick={() => resetColor(selectedColor)}
                        className="shrink-0 text-[10px] font-medium text-white/40 transition-colors hover:text-white/70"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="mt-5 shrink-0 space-y-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
              >
                Browse SVG
              </button>
              <button
                onClick={loadDemo}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
              >
                Or try a demo SVG
              </button>
              <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" onChange={handleFileChange} className="hidden" />

              {recoloredSvg && (
                <button
                  onClick={handleDownload}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Download recolored SVG
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-2"
          >
            {recoloredSvg ? (
              <div
                className="flex min-h-105 items-center justify-center overflow-hidden rounded-xl bg-white/95 p-8 [&_svg]:h-auto [&_svg]:max-h-[420px] [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: recoloredSvg }}
              />
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex min-h-105 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-all ${
                  dragging ? "border-white/40 bg-white/8" : "border-white/15 bg-white/3 hover:border-white/25 hover:bg-white/5"
                }`}
              >
                <svg className="mx-auto mb-4 h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-base text-white/50">Drop an SVG here or click to upload</p>
                <p className="mt-2 text-sm text-white/30">SVG files only</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    loadDemo();
                  }}
                  className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10"
                >
                  Try a demo SVG instead
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <ToolPageSections config={toolPageContent["image-recolor"]} />
      </div>
    </main>
  );
}
