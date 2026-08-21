"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { extractColorsFromImageData } from "@/lib/image-colors";
import type { Palette } from "@/lib/types";

type Props = { onExtract: (palette: Palette) => void };

export function ImageUpload({ onExtract }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setPreview(src);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 100;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const palette = extractColorsFromImageData(imageData);
        onExtract(palette);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) processImage(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1712]/[0.05]">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#1c1712]/45">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#1c1712]/65">Extract from Image</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
          dragging
            ? "border-[#e8531f]/40 bg-[#e8531f]/5"
            : "border-black/[0.10] hover:border-black/[0.18] hover:bg-[#faf7f2]"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Uploaded" className="mb-3 h-20 w-20 rounded-xl object-cover shadow-md" />
        ) : (
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1c1712]/[0.05]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#1c1712]/30">
              <path d="M3 16l4-4a3 3 0 014.243 0L15 16m-2-2l1.586-1.586a2 2 0 012.828 0L21 16M3 6h18a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
          </div>
        )}
        <p className="text-xs font-medium text-[#1c1712]/40">Drop image or click to upload</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.div>
  );
}
