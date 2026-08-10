"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import {
  addPaletteToCollection,
  createCollection,
  deleteCollection,
  deleteGradient,
  deletePalette,
  getCollections,
  getSavedGradients,
  getSavedPalettes,
  removePaletteFromCollection,
  type Collection,
  type SavedGradient,
  type SavedPalette,
} from "@/lib/storage";

type Tab = "palettes" | "collections" | "gradients";

export function ProfilePage() {
  const [tab, setTab] = useState<Tab>("palettes");
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [gradients, setGradients] = useState<SavedGradient[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collectionNameError, setCollectionNameError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = () => {
      setPalettes(getSavedPalettes());
      setCollections(getCollections());
      setGradients(getSavedGradients());
      setMounted(true);
    };
    loadProfile();
  }, []);

  function handleDeletePalette(id: string) {
    deletePalette(id);
    setPalettes(getSavedPalettes());
  }

  function handleDeleteGradient(id: string) {
    deleteGradient(id);
    setGradients(getSavedGradients());
  }

  function handleCreateCollection() {
    const name = newCollectionName.trim();
    if (!name) {
      setCollectionNameError("Enter a name before creating a collection.");
      return;
    }
    setCollectionNameError(null);
    createCollection(name);
    setCollections(getCollections());
    setNewCollectionName("");
  }

  function handleDeleteCollection(id: string) {
    deleteCollection(id);
    setCollections(getCollections());
    if (activeCollectionId === id) setActiveCollectionId(null);
  }

  function handleAddToCollection(collectionId: string, paletteId: string) {
    addPaletteToCollection(collectionId, paletteId);
    setCollections(getCollections());
  }

  function handleRemoveFromCollection(collectionId: string, paletteId: string) {
    removePaletteFromCollection(collectionId, paletteId);
    setCollections(getCollections());
  }

  const activeCollection = collections.find((c) => c.id === activeCollectionId) ?? null;
  const collectionPalettes = activeCollection
    ? palettes.filter((p) => activeCollection.paletteIds.includes(p.id))
    : [];

  const cardClass = "rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl";

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your Profile</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Everything you&apos;ve saved, stored locally in this browser.
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center gap-2">
          {([
            { key: "palettes", label: `Palettes (${palettes.length})` },
            { key: "collections", label: `Collections (${collections.length})` },
            { key: "gradients", label: `Gradients (${gradients.length})` },
          ] as { key: Tab; label: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {!mounted ? null : tab === "palettes" ? (
          palettes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex gap-2">
                {["#C94B1A","#7FBE6B","#F4B93F","#F15B2A","#241008"].map((c) => (
                  <div key={c} className="h-10 w-10 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-base font-medium text-white/40">No saved palettes yet</p>
              <p className="mt-1 text-sm text-white/25">Save one from the generator to see it here.</p>
              <Link href="/generator" className="mt-5 rounded-xl bg-[#F15B2A]/80 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#F15B2A] transition-colors">
                Open Generator →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {palettes.map((p) => (
                <div key={p.id} className="group rounded-2xl border border-white/10 bg-white/4 overflow-hidden transition-all hover:border-white/18 hover:bg-white/6">
                  {/* Color showcase strip */}
                  <div className="flex h-28">
                    {p.colors.map((c, i) => (
                      <div
                        key={i}
                        className="relative flex-1 flex flex-col justify-end pb-2 px-1 overflow-hidden transition-all group/swatch"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span
                          className="text-[9px] font-mono leading-tight truncate opacity-0 group-hover/swatch:opacity-100 transition-opacity"
                          style={{ color: c.text === "light" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)" }}
                        >
                          {c.hex.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info + actions */}
                  <div className="p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-white leading-tight">{p.label}</p>
                      <p className="shrink-0 text-[10px] text-white/25 mt-0.5">{new Date(p.savedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Color name pills */}
                    <div className="mb-3 flex flex-wrap gap-1">
                      {p.colors.map((c, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] text-white/45">
                          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
                          {c.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/generator${encodePalette(p)}`}
                        className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        Open in Generator
                      </Link>
                      <button
                        onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/generator${encodePalette(p)}`); }}
                        className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
                      >
                        Copy link
                      </button>
                      {collections.length > 0 && (
                        <select
                          onChange={(e) => { if (e.target.value) handleAddToCollection(e.target.value, p.id); e.target.value = ""; }}
                          defaultValue=""
                          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white/50"
                        >
                          <option value="" disabled>Add to collection</option>
                          {collections.map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#160b05]">{c.name}</option>
                          ))}
                        </select>
                      )}
                      <button
                        onClick={() => handleDeletePalette(p.id)}
                        className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-red-400/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : tab === "collections" ? (
          <div>
            <div className="mb-2 flex gap-2">
              <input
                value={newCollectionName}
                onChange={(e) => { setNewCollectionName(e.target.value); if (collectionNameError) setCollectionNameError(null); }}
                onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                placeholder="New collection name"
                className={`flex-1 rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white outline-none ${
                  collectionNameError ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-white/30"
                }`}
              />
              <button
                onClick={handleCreateCollection}
                className="rounded-xl bg-white/8 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/15"
              >
                Create
              </button>
            </div>
            <p className="mb-4 h-4 text-xs text-red-400">{collectionNameError}</p>

            {collections.length === 0 ? (
              <div className={`${cardClass} text-center text-white/30`}>No collections yet. Create one above.</div>
            ) : activeCollection ? (
              <div>
                <button onClick={() => setActiveCollectionId(null)} className="mb-4 text-xs text-white/40 hover:text-white/70">← Back to collections</button>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-lg font-semibold">{activeCollection.name}</p>
                  <button onClick={() => handleDeleteCollection(activeCollection.id)} className="text-xs text-red-400/60 hover:text-red-400">Delete collection</button>
                </div>
                {collectionPalettes.length === 0 ? (
                  <div className={`${cardClass} text-center text-white/30`}>No palettes in this collection yet. Add some from the Palettes tab.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {collectionPalettes.map((p) => (
                      <div key={p.id} className={cardClass}>
                        <p className="mb-3 text-sm font-medium text-white/70">{p.label}</p>
                        <div className="mb-3 flex h-12 gap-1 overflow-hidden rounded-lg">
                          {p.colors.map((c, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/generator${encodePalette(p)}`} className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 hover:bg-white/14">
                            Open
                          </Link>
                          <button
                            onClick={() => handleRemoveFromCollection(activeCollection.id, p.id)}
                            className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/10"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {collections.map((c) => (
                  <button key={c.id} onClick={() => setActiveCollectionId(c.id)} className={`${cardClass} text-left transition-colors hover:border-white/20`}>
                    <p className="text-sm font-semibold text-white/80">{c.name}</p>
                    <p className="mt-1 text-xs text-white/40">{c.paletteIds.length} palette{c.paletteIds.length === 1 ? "" : "s"}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : gradients.length === 0 ? (
          <div className={`${cardClass} text-center text-white/30`}>No saved gradients yet. Save one from the gradient generator.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gradients.map((g) => (
              <div key={g.id} className={cardClass}>
                <div className="mb-3 h-20 w-full rounded-xl" style={{ background: g.preview }} />
                <p className="mb-3 text-sm font-medium text-white/70">{g.name}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(g.css)}
                    className="flex-1 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 hover:bg-white/14"
                  >
                    Copy CSS
                  </button>
                  <button
                    onClick={() => handleDeleteGradient(g.id)}
                    className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-red-400/50 hover:bg-red-500/10 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
