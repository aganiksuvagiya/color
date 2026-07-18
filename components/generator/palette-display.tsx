"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ColorCard } from "./color-card";
import type { Palette } from "@/lib/types";

type Props = {
  palette: Palette;
  lockedIndices: Set<number>;
  onColorChange: (index: number, hex: string) => void;
  onToggleLock: (index: number) => void;
  onReorder: (from: number, to: number) => void;
};

export function PaletteDisplay({ palette, lockedIndices, onColorChange, onToggleLock, onReorder }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const overIndexRef = useRef<number | null>(null);

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
            dragging={dragIndex === i}
            dragOver={overIndex === i && dragIndex !== null && dragIndex !== i}
            onColorChange={(hex) => onColorChange(i, hex)}
            onToggleLock={() => onToggleLock(i)}
            onDragStart={() => {
              dragIndexRef.current = i;
              setDragIndex(i);
            }}
            onDragOverIndex={(idx) => {
              overIndexRef.current = idx;
              setOverIndex(idx);
            }}
            onDragEnd={() => {
              const from = dragIndexRef.current;
              const to = overIndexRef.current;
              if (from !== null && to !== null && from !== to) {
                onReorder(from, to);
              }
              dragIndexRef.current = null;
              overIndexRef.current = null;
              setDragIndex(null);
              setOverIndex(null);
            }}
          />
        ))}
      </motion.div>

      <p className="mt-3 text-center text-xs text-white/25">Drag to reorder · Click any color to adjust · Lock to keep during randomize</p>
    </div>
  );
}
