"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { getContrastText } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const MAX_POINTS = 8;
const MIN_POINTS = 1;
const DEFAULT_POINTS = 5;

type Point = { id: number; x: number; y: number; hex: string };
type ToolMode = "eyedropper" | "grid";

const COLOR_MOODS = ["None", "Warm", "Cool", "Earthy", "Vivid", "Muted"];

const MOOD_FILTERS: Record<string, string> = {
  None: "none",
  Warm: "sepia(0.35) saturate(1.3) hue-rotate(-15deg)",
  Cool: "saturate(0.85) hue-rotate(20deg) brightness(1.08)",
  Earthy: "sepia(0.55) saturate(0.75) brightness(0.95)",
  Vivid: "saturate(1.6) contrast(1.08)",
  Muted: "saturate(0.35) brightness(1.08)",
};

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

function defaultPosition(index: number): { x: number; y: number } {
  const angle = index * 2.399963;
  const radius = 0.14 + (index / Math.max(1, MAX_POINTS - 1)) * 0.3;
  return { x: clamp01(0.5 + radius * Math.cos(angle)), y: clamp01(0.5 + radius * Math.sin(angle)) };
}

function sampleColorAt(canvas: HTMLCanvasElement, xPct: number, yPct: number): string {
  const ctx = canvas.getContext("2d")!;
  const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(xPct * canvas.width)));
  const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(yPct * canvas.height)));
  const [r, g, b] = ctx.getImageData(px, py, 1, 1).data;
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function ImageColorExtractor() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>("/demo-photo.svg");
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [paletteName, setPaletteName] = useState("My Color Theme");
  const [mood, setMood] = useState("None");
  const [toolMode, setToolMode] = useState<ToolMode>("eyedropper");
  const [showGrid, setShowGrid] = useState(false);

  // Undo/Redo history
  const [past, setPast] = useState<Point[][]>([]);
  const [future, setFuture] = useState<Point[][]>([]);

  const nextId = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Push current points to undo history before a mutating action
  const pushHistory = useCallback((current: Point[]) => {
    setPast((p) => [...p.slice(-30), current]);
    setFuture([]);
  }, []);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [points, ...f]);
    setPoints(prev);
    setSelectedId(prev[prev.length - 1]?.id ?? null);
  }, [past, points]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, points]);
    setPoints(next);
    setSelectedId(next[next.length - 1]?.id ?? null);
  }, [future, points]);

  const seedPoints = useCallback((canvas: HTMLCanvasElement) => {
    nextId.current = 0;
    const seeded: Point[] = Array.from({ length: DEFAULT_POINTS }, () => {
      const id = nextId.current++;
      const { x, y } = defaultPosition(id);
      return { id, x, y, hex: sampleColorAt(canvas, x, y) };
    });
    setPoints(seeded);
    setPast([]);
    setFuture([]);
    setSelectedId(seeded[0].id);
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const maxW = 800;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      seedPoints(canvas);
    };
    img.src = imageUrl;
  }, [imageUrl, seedPoints]);

  const processImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processImage(file);
  }, [processImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  const loadDemoPhoto = useCallback(() => setImageUrl("/demo-photo.svg"), []);

  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    if (toolMode !== "eyedropper" || selectedId === null || !canvasRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp01((e.clientX - rect.left) / rect.width);
    const y = clamp01((e.clientY - rect.top) / rect.height);
    const hex = sampleColorAt(canvasRef.current, x, y);
    pushHistory(points);
    setPoints((prev) => prev.map((p) => (p.id === selectedId ? { ...p, x, y, hex } : p)));
  }

  function addPoint() {
    if (points.length >= MAX_POINTS || !canvasRef.current) return;
    pushHistory(points);
    const id = nextId.current++;
    const { x, y } = defaultPosition(points.length);
    const hex = sampleColorAt(canvasRef.current, x, y);
    setPoints((prev) => [...prev, { id, x, y, hex }]);
    setSelectedId(id);
  }

  function removePointById(id: number) {
    if (points.length <= MIN_POINTS) return;
    pushHistory(points);
    setPoints((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (selectedId === id) setSelectedId(next[next.length - 1]?.id ?? null);
      return next;
    });
  }

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1600);
  }

  async function copyAll() {
    const text = points.map((p) => p.hex.toUpperCase()).join(", ");
    await navigator.clipboard.writeText(text);
    setCopied("__all__");
    setTimeout(() => setCopied(null), 1600);
  }

  async function sharePalette() {
    const hexes = points.map((p) => p.hex.slice(1)).join("-");
    const url = `${window.location.origin}/tools/image-colors?palette=${hexes}&name=${encodeURIComponent(paletteName)}`;
    await navigator.clipboard.writeText(url);
    setCopied("__share__");
    setTimeout(() => setCopied(null), 1600);
  }

  function downloadPalette() {
    const W = 480;
    const H = 100;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H * points.length;
    const ctx = canvas.getContext("2d")!;
    points.forEach((p, i) => {
      ctx.fillStyle = p.hex;
      ctx.fillRect(0, i * H, W, H);
      const textCol = getContrastText(p.hex) === "light" ? "#ffffff" : "#1c1712";
      ctx.fillStyle = textCol;
      ctx.font = "bold 15px monospace";
      ctx.fillText(p.hex.toUpperCase(), 22, i * H + H / 2 + 3);
      ctx.font = "13px sans-serif";
      ctx.globalAlpha = 0.6;
      ctx.fillText(findClosestColorName(p.hex), 22, i * H + H / 2 + 22);
      ctx.globalAlpha = 1;
    });
    const link = document.createElement("a");
    link.download = `${paletteName.replace(/\s+/g, "-").toLowerCase() || "palette"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function createWithPalette() {
    const hexes = points.map((p) => p.hex.slice(1)).join("-");
    router.push(`/?palette=${hexes}`);
  }

  const textColor = (hex: string) =>
    getContrastText(hex) === "light" ? "rgba(255,255,255,0.92)" : "rgba(28,23,18,0.80)";
  const iconColor = (hex: string) =>
    getContrastText(hex) === "light" ? "rgba(255,255,255,0.55)" : "rgba(28,23,18,0.35)";

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <canvas ref={canvasRef} className="hidden" />
      <Header />

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-5 py-2.5 text-sm font-semibold text-[#e8531f] shadow-[0_4px_20px_rgba(232,83,31,0.12)] whitespace-nowrap"
          >
            {copied === "__all__" ? "✓ All colors copied" : copied === "__share__" ? "✓ Link copied" : `✓ Copied ${copied.toUpperCase()}`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-3 pb-4 pt-20 sm:px-5 sm:pt-24 lg:pt-28">

        {/* ── MAIN SPLIT ── */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.08] shadow-[0_8px_40px_rgba(28,23,18,0.10)] lg:flex-row">

          {/* ── TOP/LEFT: Image panel ── */}
          <div className="flex flex-1 flex-col overflow-hidden">

            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b border-black/[0.07] bg-white px-3 py-2.5 sm:gap-3 sm:px-5">
              {/* Color mood */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden text-[11px] font-medium text-[#1c1712]/45 sm:block">Color mood</span>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="rounded-lg border border-black/[0.10] bg-[#faf7f2] px-2 py-1.5 text-[11px] font-medium text-[#1c1712]/65 outline-none transition hover:border-black/20 sm:px-3"
                >
                  {COLOR_MOODS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>

              {/* Tool buttons */}
              <div className="flex items-center gap-0.5">
                <button
                  title="Eyedropper — click image to move selected dot"
                  onClick={() => { setToolMode("eyedropper"); setShowGrid(false); }}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${toolMode === "eyedropper" ? "bg-[#1c1712]/[0.07] text-[#1c1712]/75" : "text-[#1c1712]/40 hover:bg-[#f0ebe4] hover:text-[#1c1712]/65"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </button>
                <button
                  title="Reseed — pick new random colors from image"
                  onClick={() => { if (canvasRef.current) { pushHistory(points); seedPoints(canvasRef.current); } }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#f0ebe4] hover:text-[#1c1712]/65"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                  </svg>
                </button>
                <button
                  title="Toggle grid overlay"
                  onClick={() => { setShowGrid((v) => !v); setToolMode("eyedropper"); }}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${showGrid ? "bg-[#1c1712]/[0.07] text-[#1c1712]/75" : "text-[#1c1712]/40 hover:bg-[#f0ebe4] hover:text-[#1c1712]/65"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>
              </div>

              <div className="flex-1" />

              {/* Undo / Redo */}
              <button title="Undo" onClick={undo} disabled={!canUndo}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#f0ebe4] disabled:cursor-not-allowed disabled:opacity-25"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/>
                </svg>
              </button>
              <button title="Redo" onClick={redo} disabled={!canRedo}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#f0ebe4] disabled:cursor-not-allowed disabled:opacity-25"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 014-4h12"/>
                </svg>
              </button>

              {/* Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="ml-1 flex items-center gap-1.5 rounded-lg border border-black/[0.10] bg-[#faf7f2] px-2.5 py-1.5 text-[11px] font-semibold text-[#1c1712]/55 transition hover:border-black/20 hover:text-[#1c1712]/80 sm:px-3"
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                <span className="hidden sm:inline">Upload</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {/* Image area */}
            {imageUrl ? (
              <div className="relative min-h-[260px] flex-1 overflow-hidden bg-[#f0ede8] sm:min-h-[340px]">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  onClick={handleImageClick}
                  style={{ filter: MOOD_FILTERS[mood] ?? "none" }}
                  className={`h-full w-full object-contain transition-[filter] duration-300 ${toolMode === "eyedropper" && selectedId !== null ? "cursor-crosshair" : "cursor-default"}`}
                />
                {showGrid && (
                  <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: "linear-gradient(rgba(28,23,18,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(28,23,18,0.10) 1px, transparent 1px)",
                    backgroundSize: "10% 10%",
                  }} />
                )}
                {points.map((p) => (
                  <button
                    key={p.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(p.id); }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-all ${
                      selectedId === p.id
                        ? "h-9 w-9 shadow-[0_0_0_3px_rgba(232,83,31,0.5),0_2px_12px_rgba(0,0,0,0.35)] sm:h-11 sm:w-11"
                        : "h-4 w-4 hover:h-7 hover:w-7 sm:h-5 sm:w-5 sm:hover:h-8 sm:hover:w-8"
                    }`}
                    style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, backgroundColor: p.hex }}
                    title={p.hex}
                  />
                ))}
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex min-h-[260px] flex-1 cursor-pointer flex-col items-center justify-center p-8 text-center transition-all sm:min-h-[340px] sm:p-12 ${
                  dragging ? "bg-[#e8531f]/5" : "bg-[#f5f2ee] hover:bg-[#ece9e4]"
                }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(28,23,18,0.06)] sm:mb-5 sm:h-16 sm:w-16">
                  <svg className="h-7 w-7 text-[#1c1712]/25 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#1c1712]/55 sm:text-base">Drop an image or click to upload</p>
                <p className="mt-1 text-xs text-[#1c1712]/30 sm:mt-1.5 sm:text-sm">PNG, JPG, WebP supported</p>
                <button
                  onClick={(e) => { e.stopPropagation(); loadDemoPhoto(); }}
                  className="mt-4 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-xs font-medium text-[#1c1712]/50 shadow-[0_1px_4px_rgba(28,23,18,0.05)] transition hover:text-[#1c1712]/80 sm:mt-5"
                >
                  Try a demo photo
                </button>
              </div>
            )}
          </div>

          {/* ── BOTTOM/RIGHT: Color swatches panel ── */}
          {/* Mobile: horizontal scroll row; Desktop: vertical stack column */}
          <div className="flex shrink-0 flex-row overflow-x-auto border-t border-black/[0.08] lg:w-[340px] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:border-l lg:border-t-0 xl:w-[380px]">
            {points.length === 0 ? (
              <div className="flex min-w-full items-center justify-center bg-white py-8 lg:flex-1 lg:min-w-0">
                <p className="text-sm text-[#1c1712]/30">No colors yet</p>
              </div>
            ) : (
              <>
                {points.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="group relative flex shrink-0 cursor-pointer items-end p-4 transition-[filter] hover:brightness-95 lg:flex-1 lg:p-5"
                    style={{
                      backgroundColor: p.hex,
                      minWidth: "110px",
                      minHeight: "90px",
                    }}
                    onClick={() => { setSelectedId(p.id); handleCopy(p.hex); }}
                  >
                    <span className="font-mono text-[11px] font-bold tracking-wider sm:text-[12px] lg:text-[13px]" style={{ color: textColor(p.hex) }}>
                      {p.hex.toUpperCase()}
                    </span>

                    {selectedId === p.id && (
                      <span className="absolute left-2.5 top-2.5 h-1.5 w-1.5 rounded-full ring-2 ring-white/60 lg:h-2 lg:w-2 lg:left-3 lg:top-3"
                        style={{ backgroundColor: textColor(p.hex) }} />
                    )}

                    {copied === p.hex && (
                      <span className="absolute right-2 top-2 text-[9px] font-semibold lg:right-4 lg:top-3 lg:text-[10px]" style={{ color: textColor(p.hex) }}>
                        ✓
                      </span>
                    )}

                    {/* Action icons — visible on hover (desktop) or always show small on mobile */}
                    <div
                      className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 lg:right-4 lg:flex-row lg:gap-2"
                      style={{ color: iconColor(p.hex) }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopy(p.hex); }}
                        title="Copy hex"
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:scale-110"
                        style={{ backgroundColor: getContrastText(p.hex) === "light" ? "rgba(255,255,255,0.15)" : "rgba(28,23,18,0.08)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removePointById(p.id); }}
                        title="Remove"
                        disabled={points.length <= MIN_POINTS}
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:scale-110 disabled:pointer-events-none disabled:opacity-30"
                        style={{ backgroundColor: getContrastText(p.hex) === "light" ? "rgba(255,255,255,0.15)" : "rgba(28,23,18,0.08)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}

                {points.length < MAX_POINTS && (
                  <button
                    onClick={addPoint}
                    className="flex shrink-0 items-center justify-center gap-1.5 border-l border-black/[0.07] bg-white px-5 text-[10px] font-semibold text-[#1c1712]/35 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/55 lg:min-h-[56px] lg:border-l-0 lg:border-t lg:px-0 lg:py-4 lg:text-[11px]"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span className="hidden lg:inline">Add color</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── BOTTOM: Palette bar ── */}
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-4 py-3 shadow-[0_1px_6px_rgba(28,23,18,0.06)] sm:gap-3 sm:px-5 sm:py-3.5">
          {/* Swatch strip */}
          <div className="flex items-center gap-1">
            {points.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`h-8 w-8 rounded-lg border-2 transition-all sm:h-9 sm:w-9 ${
                  selectedId === p.id ? "scale-110 border-[#1c1712]/25" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: p.hex }}
                title={p.hex}
              />
            ))}
          </div>

          {/* Edit image */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] text-[#1c1712]/40 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/65 sm:h-9 sm:w-9"
            title="Change image"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </button>

          <div className="hidden flex-1 sm:block" />

          {/* Action icons */}
          <div className="flex items-center gap-1">
            <button onClick={sharePalette} title="Share — copy link"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/65 sm:h-9 sm:w-9">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <button onClick={downloadPalette} title="Download palette PNG"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/65 sm:h-9 sm:w-9">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            <button onClick={copyAll} title="Copy all hex codes"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1c1712]/40 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/65 sm:h-9 sm:w-9">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            </button>
          </div>

          {/* Name + CTA — full width on mobile */}
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-black/[0.10] bg-[#faf7f2] px-3 py-2 text-[12px] font-medium text-[#1c1712]/60 outline-none placeholder:text-[#1c1712]/30 focus:border-black/20 focus:bg-white sm:w-36 sm:flex-none lg:w-44"
              placeholder="Palette name"
            />
            <button
              onClick={createWithPalette}
              className="shrink-0 rounded-xl bg-[#1E5CD9] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_2px_8px_rgba(30,92,217,0.30)] transition hover:bg-[#1a50c4] hover:shadow-[0_4px_16px_rgba(30,92,217,0.35)] active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              Create with my color palette
            </button>
          </div>
        </div>

        <div className="mt-8">
          <ToolPageSections config={toolPageContent["image-colors"]} />
        </div>
      </div>
    </div>
  );
}
