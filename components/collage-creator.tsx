"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Header } from "./header";

const MAX_SLOTS = 6;
const CANVAS_SIZE = 1200;

type Slot = { id: number; url: string | null };

function gridColumns(count: number): number {
  if (count <= 1) return 1;
  if (count <= 4) return 2;
  return 3;
}

export function CollageCreator() {
  const [slotCount, setSlotCount] = useState(4);
  const [slots, setSlots] = useState<Slot[]>(
    Array.from({ length: 4 }, (_, i) => ({ id: i, url: null }))
  );
  const [gap, setGap] = useState(8);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function handleSlotCountChange(n: number) {
    setSlotCount(n);
    setSlots((prev) => {
      const next = Array.from({ length: n }, (_, i) => prev[i] ?? { id: i, url: null });
      return next;
    });
  }

  function handleFileChange(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, url } : s)));
    };
    reader.readAsDataURL(file);
  }

  function handleRemove(id: number) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, url: null } : s)));
  }

  const filledCount = slots.filter((s) => s.url).length;
  const cols = gridColumns(slotCount);
  const rows = Math.ceil(slotCount / cols);

  const handleDownload = useCallback(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = Math.round((CANVAS_SIZE / cols) * rows);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#160b05";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellW = (canvas.width - gap * (cols + 1)) / cols;
    const cellH = (canvas.height - gap * (rows + 1)) / rows;

    await Promise.all(
      slots.map((slot, i) => {
        if (!slot.url) return Promise.resolve();
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gap + col * (cellW + gap);
        const y = gap + row * (cellH + gap);

        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const scale = Math.max(cellW / img.width, cellH / img.height);
            const drawW = img.width * scale;
            const drawH = img.height * scale;
            const offsetX = x - (drawW - cellW) / 2;
            const offsetY = y - (drawH - cellH) / 2;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, cellW, cellH);
            ctx.clip();
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
            ctx.restore();
            resolve();
          };
          img.src = slot.url as string;
        });
      })
    );

    const link = document.createElement("a");
    link.download = "hueflow-collage.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [slots, cols, rows, gap]);

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Collage Creator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Combine your images into a single collage and export it as a PNG.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Images:</span>
            {[2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => handleSlotCountChange(n)}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                  slotCount === n ? "bg-white text-[#160b05]" : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Gap:</span>
            <input
              type="range"
              min={0}
              max={32}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-24 accent-white"
            />
          </div>
        </div>

        <div
          className="mb-6 grid overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px` }}
        >
          {slots.slice(0, slotCount).map((slot) => (
            <div key={slot.id} className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
              {slot.url ? (
                <>
                  <img src={slot.url} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => handleRemove(slot.id)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white/80 hover:bg-black/80"
                  >
                    ×
                  </button>
                </>
              ) : (
                <button
                  onClick={() => fileInputRefs.current[slot.id]?.click()}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 text-white/30 hover:text-white/50"
                >
                  <span className="text-2xl">+</span>
                  <span className="text-[10px]">Add image</span>
                </button>
              )}
              <input
                ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(slot.id, e)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            disabled={filledCount === 0}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#160b05] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Download Collage
          </button>
        </div>
      </div>
    </main>
  );
}
