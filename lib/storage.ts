import type { Palette } from "./types";

const STORAGE_KEY = "hueflow-saved-palettes";
const COLLECTIONS_KEY = "hueflow-collections";
const GRADIENTS_KEY = "hueflow-saved-gradients";

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

export type Collection = {
  id: string;
  name: string;
  paletteIds: string[];
  createdAt: number;
};

export function getCollections(): Collection[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCollections(collections: Collection[]): void {
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
}

export function createCollection(name: string): Collection {
  const collection: Collection = { id: crypto.randomUUID(), name, paletteIds: [], createdAt: Date.now() };
  const all = getCollections();
  all.unshift(collection);
  writeCollections(all);
  return collection;
}

export function deleteCollection(id: string): void {
  writeCollections(getCollections().filter((c) => c.id !== id));
}

export function addPaletteToCollection(collectionId: string, paletteId: string): void {
  const all = getCollections();
  const collection = all.find((c) => c.id === collectionId);
  if (collection && !collection.paletteIds.includes(paletteId)) {
    collection.paletteIds.push(paletteId);
    writeCollections(all);
  }
}

export function removePaletteFromCollection(collectionId: string, paletteId: string): void {
  const all = getCollections();
  const collection = all.find((c) => c.id === collectionId);
  if (collection) {
    collection.paletteIds = collection.paletteIds.filter((id) => id !== paletteId);
    writeCollections(all);
  }
}

export type SavedGradient = {
  id: string;
  name: string;
  css: string;
  preview: string;
  savedAt: number;
};

export function getSavedGradients(): SavedGradient[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GRADIENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveGradient(gradient: Omit<SavedGradient, "id" | "savedAt">): SavedGradient {
  const saved: SavedGradient = { ...gradient, id: crypto.randomUUID(), savedAt: Date.now() };
  const all = getSavedGradients();
  all.unshift(saved);
  localStorage.setItem(GRADIENTS_KEY, JSON.stringify(all));
  return saved;
}

export function deleteGradient(id: string): void {
  const all = getSavedGradients().filter((g) => g.id !== id);
  localStorage.setItem(GRADIENTS_KEY, JSON.stringify(all));
}
