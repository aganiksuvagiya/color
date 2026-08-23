"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Header } from "./header";
import { encodePalette } from "@/lib/share-utils";
import { awardPointsClient } from "@/lib/award-points-client";
import { findClosestColorName } from "@/lib/color-names";
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

const DEFAULT_STRIP = ["#e8531f", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];
const LEVEL_SIZE = 100;

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
    setCollections(getCollections());
    setMounted(true);
  }, [getPalettes, getGradients]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/points").then((r) => r.json()).then((d) => setPoints(d.total ?? 0)).catch(() => {});
    fetch("/api/daily-challenge").then((r) => r.json()).then((d) => setStreak(d.streak ?? 0)).catch(() => {});
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
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "?";
  const referralLink = mounted && user?.id ? `${window.location.origin}/?ref=${user.id}` : "";
  const level = Math.floor(points / LEVEL_SIZE) + 1;
  const levelProgress = points % LEVEL_SIZE;

  // Strip colors: from latest palette or default
  const stripColors = mounted && palettes.length > 0
    ? palettes.sort((a, b) => b.savedAt - a.savedAt)[0].colors.map((c) => c.hex)
    : DEFAULT_STRIP;

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
    <div className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          100% { background-position: 200% 50% }
        }
      `}</style>
      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-24 lg:pt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── Sidebar ── */}
          <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-56 lg:self-start xl:w-64">
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm">

              {/* Color strip — from latest palette */}
              <div className="flex h-10 overflow-hidden">
                {stripColors.map((hex, i) => (
                  <div key={i} className="flex-1 transition-all duration-300" style={{ backgroundColor: hex }}/>
                ))}
              </div>

              {/* Avatar */}
              <div className="px-5 pb-4 pt-4 text-center">
                <div className="mx-auto mb-3 inline-block">
                  {user?.image ? (
                    <Image src={user.image} alt="avatar" width={64} height={64}
                      className="rounded-full ring-2 ring-[#e8531f]/30 ring-offset-2 ring-offset-white"/>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#e8531f] to-orange-600 text-xl font-bold text-white ring-2 ring-[#e8531f]/20 ring-offset-2 ring-offset-white">
                      {initials}
                    </div>
                  )}
                </div>
                <p className="text-[14px] font-bold leading-tight text-[#1c1712]">{user?.name ?? "Guest"}</p>
                <p className="mt-0.5 break-all text-[11px] leading-tight text-[#1c1712]/35">
                  {user?.email ?? "Not signed in"}
                </p>

                {/* Plan badge + Upgrade CTA */}
                <div className="mt-3 space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/[0.07] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e8531f]">
                    <span className="h-1 w-1 rounded-full bg-[#e8531f]"/>Free Member
                  </span>
                </div>
              </div>

              {/* Stats with icons */}
              <div className="mx-4 mb-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-[#faf7f2] px-3 py-2.5 text-center">
                  <div className="mb-1 flex justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1c1712]/30">
                      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </div>
                  <p className="text-[17px] font-bold tabular-nums text-[#1c1712]">{mounted ? palettes.length : "–"}</p>
                  <p className="text-[10px] text-[#1c1712]/35">Palettes</p>
                </div>
                <div className="rounded-xl bg-[#faf7f2] px-3 py-2.5 text-center">
                  <div className="mb-1 flex justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1c1712]/30">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 010 20"/>
                    </svg>
                  </div>
                  <p className="text-[17px] font-bold tabular-nums text-[#1c1712]">{mounted ? gradients.length : "–"}</p>
                  <p className="text-[10px] text-[#1c1712]/35">Gradients</p>
                </div>
                {user && (
                  <>
                    <div className="rounded-xl bg-[#e8531f]/[0.07] px-3 py-2.5 text-center">
                      <div className="mb-1 flex justify-center">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e8531f]/60">
                          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>
                      <p className="text-[17px] font-bold tabular-nums text-[#e8531f]">{mounted ? points : "–"}</p>
                      <p className="text-[10px] text-[#1c1712]/35">Score</p>
                    </div>
                    <div className="rounded-xl bg-[#e8531f]/[0.07] px-3 py-2.5 text-center">
                      <div className="mb-1 flex justify-center text-[13px]">🔥</div>
                      <p className="text-[17px] font-bold tabular-nums text-[#e8531f]">{mounted ? streak : "–"}</p>
                      <p className="text-[10px] text-[#1c1712]/35">Day Streak</p>
                    </div>
                  </>
                )}
              </div>

              {/* Points progress bar */}
              {user && mounted && (
                <div className="mx-4 mb-3">
                  <div className="mb-1.5 flex items-center justify-between text-[10px] text-[#1c1712]/35">
                    <span>Level {level}</span>
                    <span>{levelProgress}/{LEVEL_SIZE} pts to next</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#f0ede8]">
                    <div className="h-full rounded-full bg-[#e8531f] transition-all duration-700"
                      style={{ width: `${(levelProgress / LEVEL_SIZE) * 100}%` }}/>
                  </div>
                </div>
              )}

              {/* Search + Sort */}
              {tab !== "collections" && (
                <div className="mx-4 mb-3 space-y-2">
                  <div className="relative">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1c1712]/25">
                      <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
                      className="w-full rounded-xl border border-black/[0.07] bg-[#faf7f2] py-1.5 pl-8 pr-2.5 text-[12px] text-[#1c1712] placeholder:text-[#1c1712]/25 outline-none focus:border-[#e8531f]/30"/>
                  </div>
                  <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}
                    className="w-full rounded-xl border border-black/[0.07] bg-[#faf7f2] px-2.5 py-1.5 text-[12px] text-[#1c1712]/55 outline-none">
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </div>
              )}

              <div className="mx-4 border-t border-black/[0.06]"/>

              {/* Nav with counts */}
              <nav className="flex flex-col gap-0.5 p-2">
                {([
                  { key: "palettes" as Tab, label: "Palettes", count: palettes.length,
                    icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> },
                  { key: "gradients" as Tab, label: "Gradients", count: gradients.length,
                    icon: <><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 010 20"/></> },
                  { key: "collections" as Tab, label: "Collections", count: collections.length,
                    icon: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/> },
                ]).map((item) => (
                  <button key={item.key} onClick={() => { setTab(item.key); setActiveCollectionId(null); }}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                      tab === item.key ? "bg-[#e8531f]/[0.08] text-[#e8531f]" : "text-[#1c1712]/45 hover:bg-[#faf7f2] hover:text-[#1c1712]"
                    }`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                    {item.label}
                    <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                      tab === item.key ? "bg-[#e8531f]/10 text-[#e8531f]" : "bg-black/[0.05] text-[#1c1712]/30"
                    }`}>
                      {mounted ? item.count : "·"}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mx-4 border-t border-black/[0.06]"/>

              {/* Referral */}
              {user && referralLink && (
                <div className="mx-4 my-3 rounded-xl bg-[#faf7f2] p-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#1c1712]/35">
                    Invite friends · +50 pts each
                  </p>
                  <div className="mb-2 flex items-center gap-1.5">
                    <input readOnly value={referralLink} onFocus={(e) => e.target.select()}
                      className="min-w-0 flex-1 truncate rounded-lg border border-black/[0.07] bg-white px-2 py-1.5 text-[11px] text-[#1c1712]/45 outline-none"/>
                    <button onClick={handleCopyReferral}
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                        copiedReferral ? "bg-emerald-50 text-emerald-600" : "bg-[#e8531f]/10 text-[#e8531f] hover:bg-[#e8531f]/20"
                      }`}>
                      {copiedReferral ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  {/* Share buttons */}
                  <div className="flex gap-1.5">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`Join me on HueFlow — the best color palette tool! ${referralLink}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1.5 text-[11px] font-semibold text-emerald-600 transition hover:bg-emerald-100">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Creating beautiful color palettes with @HueFlow ✨")}&url=${encodeURIComponent(referralLink)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sky-50 px-2 py-1.5 text-[11px] font-semibold text-sky-600 transition hover:bg-sky-100">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </a>
                  </div>
                </div>
              )}

              <div className="mx-4 border-t border-black/[0.06]"/>

              {/* Actions */}
              <div className="flex flex-col gap-2 p-3">
                <Link href="/generator"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#e8531f] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Generate Palette
                </Link>
                <Link href="/tools/daily-challenge"
                  className="flex items-center justify-center gap-2 rounded-xl border border-black/[0.07] bg-[#faf7f2] px-4 py-2.5 text-[13px] font-medium text-[#1c1712]/55 transition hover:bg-[#f0ede8] hover:text-[#1c1712]">
                  🎯 Daily Challenge
                  {streak > 0 && (
                    <span className="ml-auto rounded-full bg-[#e8531f]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#e8531f]">
                      🔥{streak}
                    </span>
                  )}
                </Link>
                {user ? (
                  <button onClick={() => setSignOutModal(true)}
                    className="rounded-xl border border-black/[0.07] px-4 py-2.5 text-[13px] font-medium text-[#1c1712]/35 transition-colors hover:border-red-200 hover:text-red-500">
                    Sign out
                  </button>
                ) : (
                  <button onClick={() => signIn("google")}
                    className="rounded-xl border border-black/[0.07] px-4 py-2.5 text-[13px] font-medium text-[#1c1712]/45 transition-colors hover:bg-[#faf7f2] hover:text-[#1c1712]">
                    Sign in with Google
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="min-w-0 flex-1">

            {/* Header */}
            <div className="mb-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/30">My Library</p>
              <h1 className="text-[1.6rem] font-black tracking-[-0.02em] text-[#1c1712]">
                {tab === "palettes" ? "Saved Palettes" : tab === "gradients" ? "Saved Gradients" : activeCollection ? activeCollection.name : "Collections"}
                <span className="ml-2 align-middle text-[15px] font-normal text-[#1c1712]/25">
                  {tab === "palettes" ? visiblePalettes.length : tab === "gradients" ? visibleGradients.length : activeCollection ? activeCollectionPalettes.length : collections.length}
                </span>
              </h1>
            </div>

            {/* Tab switcher with counts */}
            <div className="mb-5 flex w-fit items-center gap-1 rounded-xl border border-black/[0.07] bg-[#faf7f2] p-1">
              {(["palettes", "gradients", "collections"] as Tab[]).map((t) => (
                <button key={t} onClick={() => { setTab(t); setQuery(""); setActiveCollectionId(null); }}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium capitalize transition-colors ${
                    tab === t ? "text-[#1c1712]" : "text-[#1c1712]/35 hover:text-[#1c1712]/60"
                  }`}>
                  {tab === t && (
                    <motion.span layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}/>
                  )}
                  <span className="relative">{t}</span>
                  <span className={`relative rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                    tab === t ? "bg-[#1c1712]/[0.07] text-[#1c1712]/60" : "text-[#1c1712]/25"
                  }`}>
                    {mounted ? (t === "palettes" ? palettes.length : t === "gradients" ? gradients.length : collections.length) : "·"}
                  </span>
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {!mounted ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-24 text-[13px] text-[#1c1712]/25">Loading...</motion.div>
              ) : tab === "palettes" ? (
                <motion.div key="palettes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                  {palettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white py-16 text-center shadow-sm">
                      {/* Animated gradient strip */}
                      <div className="mb-6 h-8 w-48 overflow-hidden rounded-xl" style={{
                        background: "linear-gradient(90deg, #e8531f, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #e8531f)",
                        backgroundSize: "200% 100%",
                        animation: "gradientShift 3s linear infinite",
                      }}/>
                      <p className="text-[15px] font-bold text-[#1c1712]">Hey {firstName}, start your first palette</p>
                      <p className="mt-1 text-[13px] text-[#1c1712]/35">Save a palette from the generator to see it here.</p>
                      <Link href="/generator"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e8531f] px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
                        Open Generator →
                      </Link>
                    </div>
                  ) : visiblePalettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-24 text-center shadow-sm">
                      <p className="text-[13px] font-medium text-[#1c1712]/40">No palettes match &quot;{query}&quot;</p>
                      <button onClick={() => setQuery("")} className="mt-3 text-[12px] text-[#e8531f] hover:opacity-80">Clear search</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {visiblePalettes.map((p) => (
                        <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.97 }}
                          className="group overflow-hidden rounded-2xl border-l-4 border border-black/[0.08] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                          style={{ borderLeftColor: p.colors[0]?.hex ?? "transparent" }}>
                          {/* Color strip — show name on hover */}
                          <div className="flex h-28 overflow-hidden">
                            {p.colors.map((c, i) => (
                              <div key={i} className="relative flex-1 cursor-pointer overflow-hidden"
                                style={{ backgroundColor: c.hex }} title={`Click to copy ${c.hex}`}
                                onClick={() => navigator.clipboard.writeText(c.hex)}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                                  <span className="text-[8px] font-bold" style={{ color: c.text === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.75)" }}>
                                    {findClosestColorName(c.hex)}
                                  </span>
                                  <span className="font-mono text-[7px]" style={{ color: c.text === "light" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
                                    {c.hex.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="px-4 py-3.5">
                            <div className="mb-3 flex items-center justify-between gap-2">
                              <p className="truncate text-[13px] font-bold text-[#1c1712]">{p.label}</p>
                              <p className="shrink-0 tabular-nums text-[10px] text-[#1c1712]/25">
                                {new Date(p.savedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href={`/generator${encodePalette(p)}`}
                                className="flex items-center gap-1.5 rounded-lg bg-[#faf7f2] px-3 py-1.5 text-[11px] font-medium text-[#1c1712]/55 transition-colors hover:bg-[#f0ede8] hover:text-[#1c1712]">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                                Open
                              </Link>
                              <button onClick={() => handleCopyLink(p)}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${
                                  copiedId === p.id ? "bg-emerald-50 text-emerald-600" : "bg-[#faf7f2] text-[#1c1712]/45 hover:bg-[#f0ede8] hover:text-[#1c1712]"
                                }`}>
                                {copiedId === p.id
                                  ? <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Copied</>
                                  : <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Share</>
                                }
                              </button>
                              <button onClick={() => handleTogglePublic(p)}
                                className={`ml-auto rounded-lg p-1.5 transition-colors ${p.isPublic ? "text-[#e8531f] hover:bg-[#e8531f]/10" : "text-[#1c1712]/20 hover:bg-[#faf7f2] hover:text-[#1c1712]/50"}`}
                                title={p.isPublic ? "Public" : "Make public"}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>
                                </svg>
                              </button>
                              <div className="relative">
                                <button onClick={() => setAddToCollectionMenuId((cur) => (cur === p.id ? null : p.id))}
                                  className="rounded-lg p-1.5 text-[#1c1712]/20 transition-colors hover:bg-[#faf7f2] hover:text-[#1c1712]/50" title="Add to collection">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                                    <path d="M12 11v4M10 13h4"/>
                                  </svg>
                                </button>
                                {addToCollectionMenuId === p.id && (
                                  <div className="absolute right-0 top-full z-10 mt-1.5 w-48 overflow-hidden rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-xl">
                                    {collections.length === 0 ? (
                                      <p className="px-2.5 py-2 text-[11px] text-[#1c1712]/35">No collections yet.</p>
                                    ) : (
                                      collections.map((c) => {
                                        const inCollection = c.paletteIds.includes(p.id);
                                        return (
                                          <button key={c.id} onClick={() => toggleCollectionMembership(c.id, p.id, inCollection)}
                                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-[#1c1712]/60 transition-colors hover:bg-[#faf7f2] hover:text-[#1c1712]">
                                            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${inCollection ? "border-[#e8531f] bg-[#e8531f]/10" : "border-black/[0.12]"}`}>
                                              {inCollection && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[#e8531f]"><path d="M20 6L9 17l-5-5"/></svg>}
                                            </span>
                                            <span className="truncate">{c.name}</span>
                                          </button>
                                        );
                                      })
                                    )}
                                  </div>
                                )}
                              </div>
                              <button onClick={() => handleDeletePalette(p.id)}
                                className="rounded-lg p-1.5 text-[#1c1712]/20 transition-colors hover:bg-red-50 hover:text-red-400" title="Delete">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
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
                <motion.div key="gradients" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                  {gradients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white py-16 text-center shadow-sm">
                      <div className="mb-6 h-8 w-48 overflow-hidden rounded-xl" style={{
                        background: "linear-gradient(90deg, #8b5cf6, #ec4899, #e8531f, #eab308, #8b5cf6)",
                        backgroundSize: "200% 100%",
                        animation: "gradientShift 3s linear infinite",
                      }}/>
                      <p className="text-[15px] font-bold text-[#1c1712]">Hey {firstName}, create your first gradient</p>
                      <p className="mt-1 text-[13px] text-[#1c1712]/35">Save a gradient from the generator to see it here.</p>
                      <Link href="/tools/gradient"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e8531f] px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
                        Gradient Generator →
                      </Link>
                    </div>
                  ) : visibleGradients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-24 text-center shadow-sm">
                      <p className="text-[13px] font-medium text-[#1c1712]/40">No gradients match &quot;{query}&quot;</p>
                      <button onClick={() => setQuery("")} className="mt-3 text-[12px] text-[#e8531f] hover:opacity-80">Clear search</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {visibleGradients.map((g) => (
                        <div key={g.id} className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                          <div className="h-24 w-full" style={{ background: g.preview }}/>
                          <div className="p-3.5">
                            <p className="mb-3 truncate text-[13px] font-medium text-[#1c1712]/70">{g.name}</p>
                            <div className="flex gap-2">
                              <button onClick={() => navigator.clipboard.writeText(g.css)}
                                className="flex-1 rounded-lg bg-[#faf7f2] px-3 py-1.5 text-[11px] font-medium text-[#1c1712]/55 transition-colors hover:bg-[#f0ede8] hover:text-[#1c1712]">
                                Copy CSS
                              </button>
                              <button onClick={() => handleDeleteGradient(g.id)}
                                className="rounded-lg p-1.5 text-[#1c1712]/20 transition-colors hover:bg-red-50 hover:text-red-400">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
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
                <motion.div key="collections" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                  {activeCollection ? (
                    <>
                      <button onClick={() => setActiveCollectionId(null)}
                        className="mb-4 flex items-center gap-1.5 text-[12px] text-[#1c1712]/40 hover:text-[#1c1712]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
                        All collections
                      </button>
                      {activeCollectionPalettes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-24 text-center shadow-sm">
                          <p className="text-[13px] font-medium text-[#1c1712]/40">No palettes in this collection yet</p>
                          <p className="mt-1 text-[12px] text-[#1c1712]/25">Add palettes from the Saved Palettes tab.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {activeCollectionPalettes.map((p) => (
                            <div key={p.id} className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm">
                              <div className="flex h-28">{p.colors.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c.hex }}/>)}</div>
                              <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                                <p className="truncate text-[13px] font-bold text-[#1c1712]">{p.label}</p>
                                <button onClick={() => activeCollectionId && toggleCollectionMembership(activeCollectionId, p.id, true)}
                                  className="shrink-0 rounded-lg p-1.5 text-[#1c1712]/20 transition-colors hover:bg-red-50 hover:text-red-400">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
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
                        <input value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                          placeholder="New collection name…"
                          className="flex-1 rounded-xl border border-black/[0.08] bg-white px-3 py-2 text-[13px] text-[#1c1712] placeholder:text-[#1c1712]/25 outline-none focus:border-[#e8531f]/30"/>
                        <button onClick={handleCreateCollection} disabled={!newCollectionName.trim()}
                          className="rounded-xl bg-[#e8531f] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
                          Create
                        </button>
                      </div>
                      {collections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-24 text-center shadow-sm">
                          <p className="text-[13px] font-medium text-[#1c1712]/40">No collections yet</p>
                          <p className="mt-1 text-[12px] text-[#1c1712]/25">Group your saved palettes into collections.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {collections.map((c) => {
                            const preview = c.paletteIds.map((id) => paletteById.get(id)).filter((p): p is SavedPalette => !!p);
                            return (
                              <div key={c.id} onClick={() => setActiveCollectionId(c.id)}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                                <div className="flex h-20">
                                  {preview.length === 0 ? <div className="flex-1 bg-[#faf7f2]"/> : preview.slice(0, 5).flatMap((p) => p.colors.slice(0, 1)).map((c2, i) => <div key={i} className="flex-1" style={{ backgroundColor: c2.hex }}/>)}
                                </div>
                                <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                                  <div className="min-w-0">
                                    <p className="truncate text-[13px] font-bold text-[#1c1712]">{c.name}</p>
                                    <p className="text-[11px] text-[#1c1712]/30">{c.paletteIds.length} palettes</p>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCollection(c.id); }}
                                    className="shrink-0 rounded-lg p-1.5 text-[#1c1712]/15 opacity-0 transition-all hover:bg-red-50 hover:text-red-400 group-hover:opacity-100">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
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

      {/* Sign-out modal */}
      <AnimatePresence>
        {signOutModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4" onClick={() => setSignOutModal(false)}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"/>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }} transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
              </div>
              <h3 className="mt-3 text-center text-[15px] font-bold text-[#1c1712]">Sign out?</h3>
              <p className="mt-1.5 text-center text-[13px] text-[#1c1712]/45">Are you sure you want to sign out?</p>
              <div className="mt-5 flex gap-3">
                <button onClick={() => setSignOutModal(false)}
                  className="flex-1 rounded-xl border border-black/[0.08] py-2.5 text-[13px] font-medium text-[#1c1712]/45 transition-colors hover:text-[#1c1712]">
                  Cancel
                </button>
                <button onClick={() => { setSignOutModal(false); signOut(); }}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-red-600">
                  Sign out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
