"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { ExportPanel } from "@/components/generator/export-panel";
import { getContrastText } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import type { Palette, PaletteColor, SemanticRole } from "@/lib/types";
import { toolPageContent } from "@/lib/seo/tool-pages";

const MAX_POINTS = 8;
const MIN_POINTS = 1;
const DEFAULT_POINTS = 5;
const ROLES: SemanticRole[] = ["neutral", "primary", "success", "warning", "accent"];

type Point = { id: number; x: number; y: number; hex: string };

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function defaultPosition(index: number): { x: number; y: number } {
  const angle = index * 2.399963; // golden angle spiral, keeps points spread apart
  const radius = 0.14 + (index / Math.max(1, MAX_POINTS - 1)) * 0.3;
  return {
    x: clamp01(0.5 + radius * Math.cos(angle)),
    y: clamp01(0.5 + radius * Math.sin(angle)),
  };
}

function sampleColorAt(canvas: HTMLCanvasElement, xPct: number, yPct: number): string {
  const ctx = canvas.getContext("2d")!;
  const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(xPct * canvas.width)));
  const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(yPct * canvas.height)));
  const [r, g, b] = ctx.getImageData(px, py, 1, 1).data;
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function pointsToPalette(points: Point[]): Palette {
  const colors: PaletteColor[] = points.map((p, i) => ({
    name: findClosestColorName(p.hex),
    hex: p.hex,
    role: ROLES[i % ROLES.length],
    text: getContrastText(p.hex),
  }));
  return { label: "Extracted from image", colors };
}

export function ImageColorExtractor() {
  const [imageUrl, setImageUrl] = useState<string | null>("/demo-photo.svg");
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const nextId = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const seedPoints = useCallback((canvas: HTMLCanvasElement) => {
    nextId.current = 0;
    const seeded: Point[] = Array.from({ length: DEFAULT_POINTS }, () => {
      const id = nextId.current++;
      const { x, y } = defaultPosition(id);
      return { id, x, y, hex: sampleColorAt(canvas, x, y) };
    });
    setPoints(seeded);
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
    if (selectedId === null || !canvasRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp01((e.clientX - rect.left) / rect.width);
    const y = clamp01((e.clientY - rect.top) / rect.height);
    const hex = sampleColorAt(canvasRef.current, x, y);
    setPoints((prev) => prev.map((p) => (p.id === selectedId ? { ...p, x, y, hex } : p)));
  }

  function addPoint() {
    if (points.length >= MAX_POINTS || !canvasRef.current) return;
    const id = nextId.current++;
    const { x, y } = defaultPosition(points.length);
    const hex = sampleColorAt(canvasRef.current, x, y);
    setPoints((prev) => [...prev, { id, x, y, hex }]);
    setSelectedId(id);
  }

  function removePoint() {
    if (points.length <= MIN_POINTS) return;
    setPoints((prev) => {
      const next = prev.filter((p) => p.id !== (selectedId ?? prev[prev.length - 1].id));
      const removed = next.length === prev.length ? prev.slice(0, -1) : next;
      if (selectedId !== null && !removed.some((p) => p.id === selectedId)) {
        setSelectedId(removed[removed.length - 1]?.id ?? null);
      }
      return removed;
    });
  }

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
  }

  const palette = points.length > 0 ? pointsToPalette(points) : null;
  const selectedPoint = points.find((p) => p.id === selectedId) ?? null;

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Image Color Extractor</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Click anywhere on your photo to pick exact colors, like an eyedropper.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">Palette</p>
              <span className="text-xs text-white/30">{points.length} / {MAX_POINTS}</span>
            </div>

            <div className="flex items-stretch gap-2">
              <div className="flex h-14 flex-1 overflow-hidden rounded-xl border border-white/10">
                {points.length === 0 ? (
                  <div className="flex-1 bg-white/5" />
                ) : (
                  points.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className="group relative flex-1 transition-transform hover:scale-[1.03]"
                      style={{ backgroundColor: p.hex }}
                      title={`${findClosestColorName(p.hex)} ${p.hex}`}
                    >
                      {selectedId === p.id && (
                        <span
                          className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            getContrastText(p.hex) === "light" ? "bg-white" : "bg-black"
                          }`}
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-white/10">
                <button
                  onClick={addPoint}
                  disabled={points.length >= MAX_POINTS}
                  className="flex h-7 w-9 items-center justify-center bg-white/8 text-white/70 transition-colors hover:bg-white/15 disabled:opacity-30"
                >
                  +
                </button>
                <button
                  onClick={removePoint}
                  disabled={points.length <= MIN_POINTS}
                  className="flex h-7 w-9 items-center justify-center border-t border-white/10 bg-white/8 text-white/70 transition-colors hover:bg-white/15 disabled:opacity-30"
                >
                  −
                </button>
              </div>
            </div>

            {selectedPoint && (
              <button
                onClick={() => handleCopy(selectedPoint.hex)}
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-medium text-white">{findClosestColorName(selectedPoint.hex)}</p>
                  <p className="mt-0.5 font-mono text-xs uppercase text-white/40">{selectedPoint.hex}</p>
                </div>
                <span className="text-xs text-white/40">Copy</span>
              </button>
            )}

            <p className="mt-3 text-xs leading-5 text-white/30">
              {imageUrl ? "Select a swatch, then click the photo to resample its color." : "Upload a photo to get started."}
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
            >
              Browse image
            </button>
            <button
              onClick={loadDemoPhoto}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
            >
              Or try a demo photo
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-2"
          >
            {imageUrl ? (
              <div className="relative overflow-hidden rounded-xl">
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt="Uploaded"
                  onClick={handleImageClick}
                  className={`block w-full ${selectedId !== null ? "cursor-crosshair" : "cursor-default"}`}
                />
                {points.map((p) => (
                  <button
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(p.id);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all ${
                      selectedId === p.id ? "h-14 w-14 border-white shadow-[0_0_0_3px_rgba(0,0,0,0.35)]" : "h-6 w-6 border-white/80"
                    }`}
                    style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
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
                className={`flex min-h-105 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-all ${
                  dragging ? "border-white/40 bg-white/8" : "border-white/15 bg-white/3 hover:border-white/25 hover:bg-white/5"
                }`}
              >
                <svg className="mx-auto mb-4 h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-base text-white/50">Drop an image here or click to upload</p>
                <p className="mt-2 text-sm text-white/30">PNG, JPG, WebP supported</p>
                <button
                  onClick={(e) => { e.stopPropagation(); loadDemoPhoto(); }}
                  className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10"
                >
                  Try a demo photo instead
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {palette && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6">
            <ExportPanel palette={palette} />
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["image-colors"]} />
      </div>
    </main>
  );
}
