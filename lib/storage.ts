import type { Palette } from "./types";

const STORAGE_KEY = "hueflow-saved-palettes";

export type SavedPalette = Palette & {
  id: string;
  savedAt: number;
};

export function getSavedPalettes(): SavedPalette[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePalette(palette: Palette): SavedPalette {
  const saved: SavedPalette = {
    ...palette,
    id: crypto.randomUUID(),
    savedAt: Date.now(),
  };
  const all = getSavedPalettes();
  all.unshift(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return saved;
}

export function deletePalette(id: string): void {
  const all = getSavedPalettes().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
