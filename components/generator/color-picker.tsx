"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";

type Props = {
  hex: string;
  onChange: (hex: string) => void;
  onClose: () => void;
};

export function ColorPicker({ hex, onChange, onClose }: Props) {
  const [hexInput, setHexInput] = useState(hex);
  const hsl = hexToHsl(hex);

  function updateFromHsl(h: number, s: number, l: number) {
    const newHex = hslToHex(h, s, l);
    setHexInput(newHex);
    onChange(newHex);
  }

  function handleHexChange(value: string) {
    setHexInput(value);
    if (isValidHex(value)) {
      onChange(value);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-white/10 bg-[#1c1c1e] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: hex }} />
        <button onClick={onClose} className="text-xs text-white/40 hover:text-white/70">Done</button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/30">Hue</label>
          <input
            type="range"
            min={0}
            max={360}
            value={hsl.h}
            onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{ background: `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))` }}
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/30">Saturation</label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.s}
            onChange={(e) => updateFromHsl(hsl.h, Number(e.target.value), hsl.l)}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{ background: `linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))` }}
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/30">Lightness</label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.l}
            onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{ background: `linear-gradient(to right, hsl(${hsl.h},${hsl.s}%,0%), hsl(${hsl.h},${hsl.s}%,50%), hsl(${hsl.h},${hsl.s}%,100%))` }}
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/30">Hex</label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-sm text-white outline-none focus:border-white/25"
            maxLength={7}
          />
        </div>
      </div>
    </motion.div>
  );
}
