"use client";

import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";
import {
  getSavedGradients,
  saveGradient as saveLocal,
  deleteGradient as deleteLocal,
  type SavedGradient,
} from "@/lib/storage";

type NewGradient = { name: string; css: string; preview: string };

export function useGradientStorage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;

  // On login: migrate localStorage gradients to Supabase
  useEffect(() => {
    if (!isLoggedIn) return;
    const local = getSavedGradients();
    if (local.length === 0) return;

    (async () => {
      for (const g of local) {
        await fetch("/api/saved-gradients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: g.name, css: g.css, preview: g.preview }),
        });
      }
      localStorage.removeItem("hueflow-saved-gradients");
    })();
  }, [isLoggedIn]);

  const saveGradient = useCallback(
    async (gradient: NewGradient): Promise<SavedGradient> => {
      if (isLoggedIn) {
        const res = await fetch("/api/saved-gradients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gradient),
        });
        const { gradient: saved } = await res.json();
        return { ...gradient, id: saved.id, savedAt: Date.now() };
      }
      return saveLocal(gradient);
    },
    [isLoggedIn]
  );

  const getGradients = useCallback(async (): Promise<SavedGradient[]> => {
    if (isLoggedIn) {
      const res = await fetch("/api/saved-gradients");
      const { gradients } = await res.json();
      return (gradients ?? []).map((g: { id: string; name: string; css: string; preview: string; created_at: string }) => ({
        id: g.id,
        name: g.name,
        css: g.css,
        preview: g.preview,
        savedAt: new Date(g.created_at).getTime(),
      }));
    }
    return getSavedGradients();
  }, [isLoggedIn]);

  const deleteGradient = useCallback(
    async (id: string): Promise<void> => {
      if (isLoggedIn) {
        await fetch("/api/saved-gradients", {
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

  return { saveGradient, getGradients, deleteGradient, isLoggedIn };
}
