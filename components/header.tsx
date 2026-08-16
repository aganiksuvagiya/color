"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { awardPointsClient } from "@/lib/award-points-client";

const MAIN_LINKS = [
  { href: "/explore", label: "Colors" },
  { href: "/palettes", label: "Palettes" },
  { href: "/trends", label: "Trends" },
  { href: "/community", label: "Community" },
];

const TOOL_LINKS = [
  { href: "/tools/picker", label: "Color Picker" },
  { href: "/tools/gradient", label: "Gradient Generator" },
  { href: "/tools/contrast", label: "Contrast Checker" },
  { href: "/tools/tailwind", label: "Tailwind Colors" },
  { href: "/tools/brand-analyzer", label: "Brand Analyzer" },
  { href: "/tools/design-tokens", label: "Design Tokens" },
  { href: "/tools/contrast-fixer", label: "Contrast Fixer" },
  { href: "/tools/animation", label: "Animation Generator" },
  { href: "/tools/image-colors", label: "Image Colors" },
  { href: "/tools/image-recolor", label: "Image Recolor" },
  { href: "/tools/palette-visualizer", label: "Palette Visualizer" },
  { href: "/tools/color-harmony", label: "Color Harmony" },
  { href: "/tools/color-mixer", label: "Color Mixer" },
  { href: "/tools/colorblind-simulator", label: "Color Blind Simulator" },
  { href: "/tools/tailwind-scale", label: "Tailwind Scale Generator" },
  { href: "/tools/color-psychology-explorer", label: "Color Psychology Explorer" },
  { href: "/tools/collage", label: "Collage Creator" },
];

export function Header({ isHome = false }: { isHome?: boolean } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [signOutConfirm, setSignOutConfirm] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { data: session } = useSession();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then((d) => setStreak(d.streak ?? 0))
      .catch(() => {});
    // Server dedupes this to once per calendar day, so it's safe to call on every mount.
    awardPointsClient("DAILY_VISIT");
    // No-op once already claimed (or no referral cookie present) — safe to call every mount.
    fetch("/api/referral/claim", { method: "POST" }).catch(() => {});
  }, [session?.user]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleToolsEnter() {
    clearTimeout(timeoutRef.current);
    setToolsOpen(true);
  }

  function handleToolsLeave() {
    timeoutRef.current = setTimeout(() => setToolsOpen(false), 200);
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 sm:py-3 ${
          scrolled
            ? "border-black/8 bg-white/85 shadow-[0_8px_30px_rgba(28,23,18,0.06)] backdrop-blur-xl"
            : "border-black/[0.06] bg-white/60 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="HueFlow home">
          <Image src="/hueflow.svg" alt="HueFlow" width={104} height={22} priority className="[filter:brightness(0)_saturate(100%)]" />
        </Link>

        <nav className="hidden items-center gap-6 text-[15px] font-medium text-[#1c1712]/65 md:flex">
          {MAIN_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[#1c1712]">
              {link.label}
            </Link>
          ))}

          {/* Tools Dropdown */}
          <div className="relative" onMouseEnter={handleToolsEnter} onMouseLeave={handleToolsLeave}>
            <button className="flex items-center gap-1 transition-colors hover:text-[#1c1712]">
              Tools
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full mt-3 grid w-96 -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-black/8 bg-white/98 p-2 shadow-[0_20px_60px_rgba(28,23,18,0.12)] backdrop-blur-xl"
                >
                  {TOOL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setToolsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-[#1c1712]/65 transition-colors hover:bg-[#e8531f]/8 hover:text-[#1c1712]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blog" className="transition-colors hover:text-[#1c1712]">Resources</Link>
          <Link href="/profile" className="transition-colors hover:text-[#1c1712]">Profile</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/generator"
            className={`hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex ${
              isHome ? "" : ""
            }`}
            style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
          >
            Generate palette
          </Link>
          {session ? (
            <>
              <Link href="/profile" className="flex items-center gap-1 sm:hidden" aria-label="Profile">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="avatar" width={28} height={28} className="rounded-full" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8531f] text-xs font-bold text-white">
                    {session.user?.name?.[0] ?? "U"}
                  </span>
                )}
                {streak > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-[#e8531f]/10 px-1.5 py-0.5 text-[11px] font-semibold text-[#e8531f]">
                    🔥 {streak}
                  </span>
                )}
              </Link>
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setSignOutConfirm((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-black/8 px-3 py-1.5 text-sm text-[#1c1712]/70 transition-colors hover:bg-black/[0.03]"
                >
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={22} height={22} className="rounded-full" />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8531f] text-xs font-bold text-white">
                      {session.user?.name?.[0] ?? "U"}
                    </span>
                  )}
                  <span className="max-w-[80px] truncate">{session.user?.name?.split(" ")[0]}</span>
                  {streak > 0 && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e8531f]/10 px-2 py-0.5 text-xs font-semibold text-[#e8531f]">
                      🔥 {streak}
                    </span>
                  )}
                </button>
                {signOutConfirm && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-black/8 bg-white p-1.5 shadow-xl">
                    <Link
                      href="/profile"
                      onClick={() => setSignOutConfirm(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1c1712]/70 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={() => { setSignOutConfirm(false); setSignOutModal(true); }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600/80 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("google")}
                className="hidden rounded-full border border-black/8 px-4 py-2 text-sm font-medium text-[#1c1712]/70 transition-colors hover:bg-black/[0.03] sm:block"
              >
                Sign in
              </button>
              <button
                onClick={() => signIn("google")}
                className="rounded-full border border-black/8 px-3 py-1.5 text-xs font-medium text-[#1c1712]/70 transition-colors hover:bg-black/[0.03] sm:hidden"
              >
                Sign in
              </button>
            </>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 text-[#1c1712]/60 transition-colors hover:bg-black/[0.03] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-h-[70vh] max-w-[1400px] overflow-y-auto rounded-2xl border border-black/8 bg-white/98 p-3 shadow-[0_20px_60px_rgba(28,23,18,0.12)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-0.5">
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#1c1712]/75 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 border-t border-black/8" />
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1c1712]/35">Tools</p>

              {TOOL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 pl-6 text-sm text-[#1c1712]/60 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 border-t border-black/8" />
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#1c1712]/75 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
              >
                Resources
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#1c1712]/75 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
              >
                Profile
              </Link>

              <Link
                href="/generator"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white sm:hidden"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                Generate palette
              </Link>

              <div className="my-1 border-t border-black/8" />
              {session ? (
                <button
                  onClick={() => { setMenuOpen(false); setSignOutModal(true); }}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#1c1712]/75 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
                >
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={20} height={20} className="rounded-full" />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8531f] text-xs font-bold text-white">
                      {session.user?.name?.[0] ?? "U"}
                    </span>
                  )}
                  {session.user?.name?.split(" ")[0]}
                  {streak > 0 && (
                    <span className="rounded-full bg-[#e8531f]/10 px-2 py-0.5 text-xs font-semibold text-[#e8531f]">🔥 {streak}</span>
                  )}
                  <span className="ml-auto text-[#1c1712]/40">Sign out</span>
                </button>
              ) : (
                <button
                  onClick={() => { signIn("google"); setMenuOpen(false); }}
                  className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-[#1c1712]/75 transition-colors hover:bg-black/[0.04] hover:text-[#1c1712]"
                >
                  Sign in with Google
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm rounded-2xl border border-black/8 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-1 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </div>
              <h3 className="mt-3 text-center text-base font-semibold text-[#1c1712]">Sign out?</h3>
              <p className="mt-1.5 text-center text-sm text-[#1c1712]/50">Are you sure you want to sign out of your account?</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSignOutModal(false)}
                  className="flex-1 rounded-xl border border-black/8 py-2.5 text-sm font-medium text-[#1c1712]/60 hover:text-[#1c1712] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setSignOutModal(false); signOut(); }}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                >
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
