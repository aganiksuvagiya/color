"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import { awardPointsClient } from "@/lib/award-points-client";
import {
  type SavedGradient,
  type SavedPalette,
  type Collection,
  getCollections,
  createCollection,
  deleteCollection,
  addPaletteToCollection,
  removePaletteFromCollection,
} from "@/lib/storage";
import { usePaletteStorage } from "@/hooks/use-palette-storage";
import { useGradientStorage } from "@/hooks/use-gradient-storage";

type Tab = "palettes" | "gradients" | "collections";

type Sort = "newest" | "oldest" | "name";

export function ProfilePage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>("palettes");
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [gradients, setGradients] = useState<SavedGradient[]>([]);
  const [mounted, setMounted] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [addToCollectionMenuId, setAddToCollectionMenuId] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const { getPalettes, deletePalette, setPalettePublic } = usePaletteStorage();
  const { getGradients, deleteGradient } = useGradientStorage();

  useEffect(() => {
    getPalettes().then(setPalettes);
    getGradients().then(setGradients);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only localStorage read on mount
    setCollections(getCollections());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, avoids SSR hydration mismatch
    setMounted(true);
  }, [getPalettes, getGradients]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/points")
      .then((r) => r.json())
      .then((d) => setPoints(d.total ?? 0))
      .catch(() => {});
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then((d) => setStreak(d.streak ?? 0))
      .catch(() => {});
  }, [session?.user]);

  async function handleDeletePalette(id: string) {
    await deletePalette(id);
    setPalettes(await getPalettes());
  }

  async function handleTogglePublic(p: SavedPalette) {
    const next = !p.isPublic;
    setPalettes((prev) => prev.map((x) => (x.id === p.id ? { ...x, isPublic: next } : x)));
    await setPalettePublic(p.id, next);
  }

  function handleCreateCollection() {
    const name = newCollectionName.trim();
    if (!name) return;
    createCollection(name);
    setCollections(getCollections());
    setNewCollectionName("");
  }

  function handleDeleteCollection(id: string) {
    deleteCollection(id);
    setCollections(getCollections());
    setActiveCollectionId((cur) => (cur === id ? null : cur));
  }

  function toggleCollectionMembership(collectionId: string, paletteId: string, inCollection: boolean) {
    if (inCollection) removePaletteFromCollection(collectionId, paletteId);
    else addPaletteToCollection(collectionId, paletteId);
    setCollections(getCollections());
  }

  async function handleDeleteGradient(id: string) {
    await deleteGradient(id);
    setGradients(await getGradients());
  }

  function handleCopyLink(p: SavedPalette) {
    navigator.clipboard.writeText(`${window.location.origin}/generator${encodePalette(p)}`);
    setCopiedId(p.id);
    awardPointsClient("SHARE_PALETTE");
    setTimeout(() => setCopiedId(null), 2000);
  }

  const user = session?.user;
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "?";
  const referralLink = mounted && user?.id ? `${window.location.origin}/?ref=${user.id}` : "";

  function handleCopyReferral() {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  }

  const q = query.trim().toLowerCase();
  const visiblePalettes = useMemo(() => {
    const filtered = palettes.filter((p) => p.label.toLowerCase().includes(q));
    if (sort === "newest") return filtered.sort((a, b) => b.savedAt - a.savedAt);
    if (sort === "oldest") return filtered.sort((a, b) => a.savedAt - b.savedAt);
    return filtered.sort((a, b) => a.label.localeCompare(b.label));
  }, [palettes, q, sort]);
  const visibleGradients = useMemo(() => {
    const filtered = gradients.filter((g) => g.name.toLowerCase().includes(q));
    if (sort === "newest") return filtered.sort((a, b) => b.savedAt - a.savedAt);
    if (sort === "oldest") return filtered.sort((a, b) => a.savedAt - b.savedAt);
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [gradients, q, sort]);
  const paletteById = useMemo(() => new Map(palettes.map((p) => [p.id, p])), [palettes]);
  const activeCollection = collections.find((c) => c.id === activeCollectionId) ?? null;
  const activeCollectionPalettes = useMemo(
    () => (activeCollection ? activeCollection.paletteIds.map((id) => paletteById.get(id)).filter((p): p is SavedPalette => !!p) : []),
    [activeCollection, paletteById]
  );

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_-10%,rgba(249,115,22,0.18),transparent_55%)]" />
      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── Sidebar ── */}
          <aside className="w-full shrink-0 lg:sticky lg:top-32 lg:w-56 lg:self-start xl:w-64">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/80 backdrop-blur-xl">

              {/* Avatar header */}
              <div className="relative px-5 pb-4 pt-6 text-center">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-orange-500/10 to-transparent" />
                <div className="relative mx-auto mb-3 inline-block">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="avatar"
                      width={72}
                      height={72}
                      className="rounded-full ring-2 ring-orange-500/30 ring-offset-2 ring-offset-[#1c0d06]"
                    />
                  ) : (
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-2xl font-bold text-white ring-2 ring-orange-500/30 ring-offset-2 ring-offset-[#1c0d06]">
                      {initials}
                    </div>
                  )}
                  <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#1c0d06] bg-green-400" />
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{user?.name ?? "Guest"}</p>
                <p className="mt-0.5 break-all text-[11px] leading-tight text-white/35">
                  {user?.email ?? "Not signed in"}
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                  <span className="h-1 w-1 rounded-full bg-orange-400" />
                  Free Member
                </span>
              </div>

              {/* Stats */}
              <div className="mx-4 mb-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/4 px-3 py-2.5 text-center">
                  <p className="text-lg font-bold tabular-nums text-white">
                    {mounted ? palettes.length : "–"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/35">Palettes</p>
                </div>
                <div className="rounded-xl bg-white/4 px-3 py-2.5 text-center">
                  <p className="text-lg font-bold tabular-nums text-white">
                    {mounted ? gradients.length : "–"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/35">Gradients</p>
                </div>
                {user && (
                  <>
                    <div className="rounded-xl bg-orange-500/8 px-3 py-2.5 text-center">
                      <p className="text-lg font-bold tabular-nums text-orange-300">{mounted ? points : "–"}</p>
                      <p className="mt-0.5 text-[10px] text-white/35">Score</p>
                    </div>
                    <div className="rounded-xl bg-orange-500/8 px-3 py-2.5 text-center">
                      <p className="text-lg font-bold tabular-nums text-orange-300">
                        {mounted ? (streak > 0 ? `🔥 ${streak}` : streak) : "–"}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/35">Day Streak</p>
                    </div>
                  </>
                )}
              </div>

              {user && referralLink && (
                <div className="mx-4 mb-4 rounded-xl bg-white/4 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-white/35">
                    Invite friends · +50 pts each
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <input
                      readOnly
                      value={referralLink}
                      onFocus={(e) => e.target.select()}
                      className="min-w-0 flex-1 truncate rounded-lg border border-white/8 bg-white/5 px-2 py-1.5 text-[11px] text-white/50 outline-none"
                    />
                    <button
                      onClick={handleCopyReferral}
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                        copiedReferral ? "bg-green-500/15 text-green-400" : "bg-orange-500/15 text-orange-300 hover:bg-orange-500/25"
                      }`}
                    >
                      {copiedReferral ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              <div className="mx-4 border-t border-white/8" />

              {/* Nav */}
              <nav className="flex flex-col gap-0.5 p-2">
                {(
                  [
                    { key: "palettes", label: "Saved Palettes", count: palettes.length },
                    { key: "gradients", label: "Saved Gradients", count: gradients.length },
                    { key: "collections", label: "Collections", count: collections.length },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setTab(item.key);
                      setActiveCollectionId(null);
                    }}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      tab === item.key
                        ? "bg-orange-500/15 text-orange-300"
                        : "text-white/45 hover:bg-white/5 hover:text-white/75"
                    }`}
                  >
                    {item.key === "palettes" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    ) : item.key === "gradients" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a10 10 0 010 20" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      </svg>
                    )}
                    {item.label}
                    <span className={`ml-auto text-[11px] font-semibold tabular-nums ${tab === item.key ? "text-orange-400" : "text-white/20"}`}>
                      {mounted ? item.count : ""}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mx-4 border-t border-white/8" />

              {/* Actions */}
              <div className="flex flex-col gap-2 p-3">
                <Link
                  href="/generator"
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Generate Palette
                </Link>
                {user ? (
                  <button
                    onClick={() => setSignOutModal(true)}
                    className="rounded-xl border border-white/8 px-4 py-2.5 text-sm font-medium text-white/35 transition-colors hover:border-red-500/25 hover:text-red-400/80"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="rounded-xl border border-white/8 px-4 py-2.5 text-sm font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Sign in with Google
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="min-w-0 flex-1">

            {/* Header */}
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-orange-400/60">
                  My Library
                </p>
                <h1 className="text-2xl font-bold text-white">
                  {tab === "palettes"
                    ? "Saved Palettes"
                    : tab === "gradients"
                    ? "Saved Gradients"
                    : activeCollection
                    ? activeCollection.name
                    : "Collections"}
                  <span className="ml-2 align-middle text-sm font-normal text-white/30">
                    {tab === "palettes"
                      ? visiblePalettes.length
                      : tab === "gradients"
                      ? visibleGradients.length
                      : activeCollection
                      ? activeCollectionPalettes.length
                      : collections.length}
                  </span>
                </h1>
              </div>

              {tab !== "collections" && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-white/25">
                      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-36 rounded-lg border border-white/8 bg-white/4 py-1.5 pl-8 pr-2.5 text-xs text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/20 sm:w-44"
                    />
                  </div>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="rounded-lg border border-white/8 bg-white/4 px-2.5 py-1.5 text-xs text-white/60 outline-none transition-colors focus:border-white/20"
                  >
                    <option value="newest" className="bg-[#1c0d06]">Newest</option>
                    <option value="oldest" className="bg-[#1c0d06]">Oldest</option>
                    <option value="name" className="bg-[#1c0d06]">Name</option>
                  </select>
                </div>
              )}
            </div>

            {/* Tab switcher */}
            <div className="mb-5 flex w-fit items-center gap-1 rounded-xl border border-white/8 bg-white/3 p-1">
              {(["palettes", "gradients", "collections"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setQuery("");
                    setActiveCollectionId(null);
                  }}
                  className={`relative rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    tab === t ? "text-white" : "text-white/40 hover:text-white/65"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>

            {/* Content with animated transitions */}
            <AnimatePresence mode="wait">
              {!mounted ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-24 text-sm text-white/20"
                >
                  Loading...
                </motion.div>
              ) : tab === "palettes" ? (
                <motion.div
                  key="palettes"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {palettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <div className="mb-4 flex gap-2">
                        {["#C94B1A", "#7FBE6B", "#F4B93F", "#F15B2A", "#241008"].map((c) => (
                          <div key={c} className="h-8 w-8 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-white/40">No saved palettes yet</p>
                      <p className="mt-1 text-xs text-white/22">Save one from the generator to see it here.</p>
                      <Link
                        href="/generator"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                      >
                        Open Generator
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  ) : visiblePalettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <p className="text-sm font-medium text-white/40">No palettes match &quot;{query}&quot;</p>
                      <button onClick={() => setQuery("")} className="mt-3 text-xs text-orange-400 hover:text-orange-300">
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {visiblePalettes.map((p) => (
                        <motion.div
                          key={p.id}
                          layout
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="group rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                        >
                          {/* Color swatch strip — click individual color to copy hex */}
                          <div className="flex h-28 overflow-hidden rounded-t-2xl">
                            {p.colors.map((c, i) => (
                              <div
                                key={i}
                                className="relative flex-1 cursor-pointer overflow-hidden"
                                style={{ backgroundColor: c.hex }}
                                title={`Click to copy ${c.hex}`}
                                onClick={() => navigator.clipboard.writeText(c.hex)}
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                  <span
                                    className="text-[8px] font-mono font-bold"
                                    style={{ color: c.text === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
                                  >
                                    {c.hex.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Card footer */}
                          <div className="px-4 py-3.5">
                            <div className="mb-3 flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-semibold leading-tight text-white">{p.label}</p>
                              <p className="shrink-0 tabular-nums text-[10px] text-white/22">
                                {new Date(p.savedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/generator${encodePalette(p)}`}
                                className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/65 transition-colors hover:bg-white/13 hover:text-white"
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                                Open
                              </Link>
                              <button
                                onClick={() => handleCopyLink(p)}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                  copiedId === p.id
                                    ? "bg-green-500/15 text-green-400"
                                    : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70"
                                }`}
                              >
                                {copiedId === p.id ? (
                                  <>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                      <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                      <rect x="9" y="9" width="13" height="13" rx="2" />
                                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                    </svg>
                                    Copy link
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleTogglePublic(p)}
                                className={`ml-auto rounded-lg p-1.5 transition-colors ${
                                  p.isPublic ? "text-orange-400 hover:bg-orange-500/10" : "text-white/25 hover:bg-white/10 hover:text-white/70"
                                }`}
                                title={p.isPublic ? "Public — visible in Community gallery" : "Make public"}
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="9" />
                                  <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                                </svg>
                              </button>
                              <div className="relative">
                                <button
                                  onClick={() => setAddToCollectionMenuId((cur) => (cur === p.id ? null : p.id))}
                                  className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-white/10 hover:text-white/70"
                                  title="Add to collection"
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                                    <path d="M12 11v4M10 13h4" />
                                  </svg>
                                </button>
                                {addToCollectionMenuId === p.id && (
                                  <div className="absolute right-0 top-full z-10 mt-1.5 w-48 rounded-xl border border-white/15 bg-[#1a0e06]/98 p-1.5 shadow-xl backdrop-blur-md">
                                    {collections.length === 0 ? (
                                      <p className="px-2.5 py-2 text-xs text-white/35">No collections yet. Create one from the Collections tab.</p>
                                    ) : (
                                      collections.map((c) => {
                                        const inCollection = c.paletteIds.includes(p.id);
                                        return (
                                          <button
                                            key={c.id}
                                            onClick={() => toggleCollectionMembership(c.id, p.id, inCollection)}
                                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                                          >
                                            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${inCollection ? "border-orange-400 bg-orange-500/20" : "border-white/20"}`}>
                                              {inCollection && (
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                  <path d="M20 6L9 17l-5-5" className="text-orange-400" />
                                                </svg>
                                              )}
                                            </span>
                                            <span className="truncate">{c.name}</span>
                                          </button>
                                        );
                                      })
                                    )}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeletePalette(p.id)}
                                className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                title="Delete"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : tab === "gradients" ? (
                <motion.div
                  key="gradients"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {gradients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <div className="mb-4 h-12 w-32 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-50" />
                      <p className="text-sm font-medium text-white/40">No saved gradients yet</p>
                      <p className="mt-1 text-xs text-white/22">Save one from the gradient generator.</p>
                      <Link
                        href="/tools/gradient"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                      >
                        Gradient Generator
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  ) : visibleGradients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                      <p className="text-sm font-medium text-white/40">No gradients match &quot;{query}&quot;</p>
                      <button onClick={() => setQuery("")} className="mt-3 text-xs text-orange-400 hover:text-orange-300">
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {visibleGradients.map((g) => (
                        <div
                          key={g.id}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                        >
                          <div className="h-24 w-full" style={{ background: g.preview }} />
                          <div className="p-3.5">
                            <p className="mb-3 truncate text-sm font-medium text-white/70">{g.name}</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigator.clipboard.writeText(g.css)}
                                className="flex-1 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/55 transition-colors hover:bg-white/13 hover:text-white"
                              >
                                Copy CSS
                              </button>
                              <button
                                onClick={() => handleDeleteGradient(g.id)}
                                className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                title="Delete"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="collections"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {activeCollection ? (
                    <>
                      <button
                        onClick={() => setActiveCollectionId(null)}
                        className="mb-4 flex items-center gap-1.5 text-xs text-white/50 hover:text-white"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M15 6l-6 6 6 6" />
                        </svg>
                        All collections
                      </button>
                      {activeCollectionPalettes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                          <p className="text-sm font-medium text-white/40">No palettes in this collection yet</p>
                          <p className="mt-1 text-xs text-white/22">Add palettes from the Saved Palettes tab.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {activeCollectionPalettes.map((p) => (
                            <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60">
                              <div className="flex h-28">
                                {p.colors.map((c, i) => (
                                  <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                                ))}
                              </div>
                              <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                                <p className="truncate text-sm font-semibold text-white">{p.label}</p>
                                <button
                                  onClick={() => activeCollectionId && toggleCollectionMembership(activeCollectionId, p.id, true)}
                                  className="shrink-0 rounded-lg p-1.5 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                  title="Remove from collection"
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="mb-5 flex gap-2">
                        <input
                          value={newCollectionName}
                          onChange={(e) => setNewCollectionName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                          placeholder="New collection name…"
                          className="flex-1 rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/20"
                        />
                        <button
                          onClick={handleCreateCollection}
                          disabled={!newCollectionName.trim()}
                          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40"
                        >
                          Create
                        </button>
                      </div>
                      {collections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
                          <p className="text-sm font-medium text-white/40">No collections yet</p>
                          <p className="mt-1 text-xs text-white/22">Group your saved palettes into collections.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {collections.map((c) => {
                            const preview = c.paletteIds.map((id) => paletteById.get(id)).filter((p): p is SavedPalette => !!p);
                            return (
                              <div
                                key={c.id}
                                onClick={() => setActiveCollectionId(c.id)}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1c0d06]/60 transition-all duration-200 hover:border-white/16"
                              >
                                <div className="flex h-20">
                                  {preview.length === 0 ? (
                                    <div className="flex-1 bg-white/5" />
                                  ) : (
                                    preview.slice(0, 5).flatMap((p) => p.colors.slice(0, 1)).map((c2, i) => (
                                      <div key={i} className="flex-1" style={{ backgroundColor: c2.hex }} />
                                    ))
                                  )}
                                </div>
                                <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">{c.name}</p>
                                    <p className="text-[11px] text-white/35">{c.paletteIds.length} palettes</p>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCollection(c.id);
                                    }}
                                    className="shrink-0 rounded-lg p-1.5 text-white/25 opacity-0 transition-opacity hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                                    title="Delete collection"
                                  >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Centered sign-out confirmation modal */}
      <AnimatePresence>
        {signOutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setSignOutModal(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#1a0e06]/98 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </div>
              <h3 className="mt-3 text-center text-base font-semibold text-white">Sign out?</h3>
              <p className="mt-1.5 text-center text-sm text-white/45">
                Are you sure you want to sign out of your account?
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSignOutModal(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/50 transition-colors hover:text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setSignOutModal(false); signOut(); }}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Sign out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
