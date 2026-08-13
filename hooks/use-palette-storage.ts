"use client";

import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";
import {
  getSavedPalettes,
  savePalette as saveLocal,
  deletePalette as deleteLocal,
  type SavedPalette,
} from "@/lib/storage";
import type { Palette } from "@/lib/types";

export function usePaletteStorage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;

  // On login: migrate localStorage palettes to Supabase
  useEffect(() => {
    if (!isLoggedIn) return;
    const local = getSavedPalettes();
    if (local.length === 0) return;

    (async () => {
      for (const p of local) {
        await fetch("/api/palettes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: p.label, colors: p.colors }),
        });
      }
      // Clear localStorage after migration
      localStorage.removeItem("hueflow-saved-palettes");
    })();
  }, [isLoggedIn]);

  const savePalette = useCallback(
    async (palette: Palette): Promise<SavedPalette> => {
      if (isLoggedIn) {
        const res = await fetch("/api/palettes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: palette.label, colors: palette.colors }),
        });
        const { palette: saved } = await res.json();
        return { ...palette, id: saved.id, savedAt: Date.now() };
      }
      return saveLocal(palette);
    },
    [isLoggedIn]
  );

  const getPalettes = useCallback(async (): Promise<SavedPalette[]> => {
    if (isLoggedIn) {
      const res = await fetch("/api/palettes");
      const { palettes } = await res.json();
      return (palettes ?? []).map((p: { id: string; name: string; colors: Palette["colors"]; created_at: string }) => ({
        id: p.id,
        label: p.name,
        colors: p.colors,
        savedAt: new Date(p.created_at).getTime(),
      }));
    }
    return getSavedPalettes();
  }, [isLoggedIn]);

  const deletePalette = useCallback(
    async (id: string): Promise<void> => {
      if (isLoggedIn) {
        await fetch("/api/palettes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      } else {
        deleteLocal(id);
      }
    },
    [isLoggedIn]
  );

  return { savePalette, getPalettes, deletePalette, isLoggedIn };
}
