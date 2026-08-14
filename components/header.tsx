"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const MAIN_LINKS = [
  { href: "/generator", label: "Generator" },
  { href: "/explore", label: "Explore" },
  { href: "/trends", label: "Trends" },
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { data: session } = useSession();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then((d) => setStreak(d.streak ?? 0))
      .catch(() => {});
  }, [session?.user]);

  function handleToolsEnter() {
    clearTimeout(timeoutRef.current);
    setToolsOpen(true);
  }

  function handleToolsLeave() {
    timeoutRef.current = setTimeout(() => setToolsOpen(false), 200);
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-[1560px] items-center justify-between rounded-full border border-white/18 bg-[#160b05]/80 px-4 py-2.5 backdrop-blur-md sm:px-5 sm:py-3"
      >
        <Link href="/" className="flex items-center">
          <Image src="/hueflow.svg" alt="HueFlow" width={100} height={20} priority />
        </Link>
        <nav className="hidden items-center gap-5 text-base text-white/70 md:flex">
          {MAIN_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleToolsEnter}
            onMouseLeave={handleToolsLeave}
          >
            <button className="flex items-center gap-1 transition-colors hover:text-white">
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
                  className="absolute left-1/2 top-full mt-3 grid w-96 -translate-x-1/2 grid-cols-2 gap-1 rounded-xl border border-white/15 bg-[#160b05]/95 p-2"
                >
                  {TOOL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setToolsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/8 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
          <Link href="/profile" className="transition-colors hover:text-white">Profile</Link>
        </nav>
        <div className="flex items-center gap-3">
          {isHome ? (
            <Link
              href="/generator"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#22130d] transition-opacity hover:opacity-90 sm:block"
            >
              Try Demo
            </Link>
          ) : (
            <Link
              href="/"
              className="hidden rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/8 sm:block"
            >
              ← Home
            </Link>
          )}
          {session ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSignOutConfirm((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/8"
              >
                {session.user?.image ? (
                  <Image src={session.user.image} alt="avatar" width={22} height={22} className="rounded-full" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {session.user?.name?.[0] ?? "U"}
                  </span>
                )}
                <span className="max-w-[80px] truncate">{session.user?.name?.split(" ")[0]}</span>
                {streak > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-300">
                    🔥 {streak}
                  </span>
                )}
              </button>
              {signOutConfirm && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/15 bg-[#1a0e06]/95 p-1.5 shadow-xl backdrop-blur-md">
                  <Link
                    href="/profile"
                    onClick={() => setSignOutConfirm(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={() => { setSignOutConfirm(false); setSignOutModal(true); }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 sm:block"
            >
              Sign in
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/8 md:hidden"
            aria-label="Toggle menu"
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
            className="mx-auto mt-2 max-h-[70vh] max-w-[1560px] overflow-y-auto rounded-2xl border border-white/18 bg-[#160b05]/95 p-3 md:hidden"
          >
            <nav className="flex flex-col gap-0.5">
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 border-t border-white/8" />
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">Tools</p>

              {TOOL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 pl-6 text-sm text-white/60 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 border-t border-white/8" />
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              >
                Profile
              </Link>

              <Link
                href={isHome ? "/generator" : "/"}
                onClick={() => setMenuOpen(false)}
                className={`mt-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors sm:hidden ${isHome ? "bg-white text-[#22130d]" : "border border-white/10 text-white/60 hover:bg-white/8"}`}
              >
                {isHome ? "Try Demo" : "← Home"}
              </Link>

              <div className="my-1 border-t border-white/8" />
              {session ? (
                  <button
                    onClick={() => { setMenuOpen(false); setSignOutModal(true); }}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    {session.user?.image ? (
                      <Image src={session.user.image} alt="avatar" width={20} height={20} className="rounded-full" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                        {session.user?.name?.[0] ?? "U"}
                      </span>
                    )}
                    {session.user?.name?.split(" ")[0]}
                    {streak > 0 && (
                      <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-300">🔥 {streak}</span>
                    )}
                    <span className="ml-auto text-white/40">Sign out</span>
                  </button>
              ) : (
                <button
                  onClick={() => { signIn("google"); setMenuOpen(false); }}
                  className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#1a0e06]/98 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 mx-auto">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </div>
              <h3 className="mt-3 text-center text-base font-semibold text-white">Sign out?</h3>
              <p className="mt-1.5 text-center text-sm text-white/45">Are you sure you want to sign out of your account?</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSignOutModal(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
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
