"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Header } from "./header";
import { extractColorsFromImageData } from "@/lib/image-colors";
import type { Palette } from "@/lib/types";

export function ImageColorExtractor() {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colorCount, setColorCount] = useState(5);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageUrl(dataUrl);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const maxW = 300;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setPalette(extractColorsFromImageData(imageData, colorCount));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [colorCount]);

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

  const reExtract = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPalette(extractColorsFromImageData(imageData, colorCount));
    };
    img.src = imageUrl;
  };

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  }

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Image Color Extractor</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Upload any image to extract its dominant colors using AI-powered analysis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <label className="text-sm text-white/50">Colors to extract:</label>
            <input
              type="range"
              min={3}
              max={10}
              value={colorCount}
              onChange={(e) => setColorCount(Number(e.target.value))}
              className="w-32 accent-white"
            />
            <span className="w-6 text-center text-sm font-medium text-white">{colorCount}</span>
            {imageUrl && (
              <button
                onClick={reExtract}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10"
              >
                Re-extract
              </button>
            )}
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
              dragging ? "border-white/40 bg-white/8" : "border-white/15 bg-white/3 hover:border-white/25 hover:bg-white/5"
            }`}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded" className="mx-auto max-h-64 rounded-xl object-contain" />
            ) : (
              <div>
                <svg className="mx-auto mb-4 h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-base text-white/50">Drop an image here or click to upload</p>
                <p className="mt-2 text-sm text-white/30">PNG, JPG, WebP supported</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </motion.div>

        {palette && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex h-20 overflow-hidden rounded-xl">
              {palette.colors.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex-1 origin-left"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {palette.colors.map((color, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => handleCopy(color.hex)}
                  className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="mb-3 aspect-square w-full rounded-xl" style={{ backgroundColor: color.hex }} />
                  <p className="truncate text-sm font-medium text-white">{color.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-white/40 uppercase">{color.hex}</p>
                  <p className="mt-1 text-xs text-white/30 capitalize">{color.role}</p>

                  {copiedHex === color.hex && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm"
                    >
                      <span className="text-sm font-semibold text-white">Copied!</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
