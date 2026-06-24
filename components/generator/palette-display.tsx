"use client";

import { motion } from "framer-motion";
import { ColorCard } from "./color-card";
import type { Palette } from "@/lib/types";

type Props = {
  palette: Palette;
  lockedIndices: Set<number>;
  onColorChange: (index: number, hex: string) => void;
  onToggleLock: (index: number) => void;
};

export function PaletteDisplay({ palette, lockedIndices, onColorChange, onToggleLock }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-white/60">{palette.label}</p>
        <p className="text-xs text-white/30">{palette.colors.length} colors</p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-3 lg:grid-cols-5"
      >
        {palette.colors.map((color, i) => (
          <ColorCard
            key={`${color.role}-${i}`}
            color={color}
            index={i}
            total={palette.colors.length}
            locked={lockedIndices.has(i)}
            onColorChange={(hex) => onColorChange(i, hex)}
            onToggleLock={() => onToggleLock(i)}
          />
        ))}
      </motion.div>

      <p className="mt-3 text-center text-xs text-white/25">Click any color to adjust · Lock to keep during randomize</p>
    </div>
  );
}
