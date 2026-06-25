"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";

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
];

export function Header({ isHome = false }: { isHome?: boolean } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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
        className="mx-auto flex max-w-[1560px] items-center justify-between rounded-full border border-white/18 bg-[#160b05]/60 px-4 py-2.5 backdrop-blur-xl sm:px-5 sm:py-3"
      >
        <Link href="/" className="flex items-center">
          <img src="/hueflow.svg" alt="HueFlow" width={100} height={20} />
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
                  className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/15 bg-[#160b05]/95 p-2 backdrop-blur-xl"
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
            className="mx-auto mt-2 max-h-[70vh] max-w-[1560px] overflow-y-auto rounded-2xl border border-white/18 bg-[#160b05]/95 p-3 backdrop-blur-xl md:hidden"
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
                href={isHome ? "/generator" : "/"}
                onClick={() => setMenuOpen(false)}
                className={`mt-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors sm:hidden ${isHome ? "bg-white text-[#22130d]" : "border border-white/10 text-white/60 hover:bg-white/8"}`}
              >
                {isHome ? "Try Demo" : "← Home"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
