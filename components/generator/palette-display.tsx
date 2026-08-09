"use client";

import { useRef, useState } from "react";
import { ColorCard } from "./color-card";
import type { Palette } from "@/lib/types";

type Props = {
  palette: Palette;
  lockedIndices: Set<number>;
  displayFormat: "HEX" | "RGB" | "HSL";
  generationKey: number;
  onColorChange: (index: number, hex: string) => void;
  onToggleLock: (index: number) => void;
  onReorder: (from: number, to: number) => void;
  onDelete: (index: number) => void;
  onRename: (index: number, name: string) => void;
};

export function PaletteDisplay({ palette, lockedIndices, displayFormat, generationKey, onColorChange, onToggleLock, onReorder, onDelete, onRename }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const overIndexRef = useRef<number | null>(null);

  return (
    <div className="flex h-full w-full flex-col sm:flex-row">
      {palette.colors.map((color, i) => (
        <ColorCard
          key={`${i}`}
          color={color}
          index={i}
          total={palette.colors.length}
          locked={lockedIndices.has(i)}
          dragging={dragIndex === i}
          dragOver={overIndex === i && dragIndex !== null && dragIndex !== i}
          displayFormat={displayFormat}
          animDelay={i * 0.06}
          onColorChange={(hex) => onColorChange(i, hex)}
          onToggleLock={() => onToggleLock(i)}
          onDelete={() => onDelete(i)}
          onRename={(name) => onRename(i, name)}
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
    </div>
  );
}
