import Link from "next/link";
import { Header } from "@/components/header";

const SUGGESTIONS = [
  { href: "/", label: "Home", hex: "#F97316" },
  { href: "/generator", label: "Palette generator", hex: "#4F46E5" },
  { href: "/colors", label: "Colors", hex: "#10B981" },
  { href: "/palettes", label: "Palettes", hex: "#F59E0B" },
  { href: "/gradients", label: "Gradients", hex: "#EF4444" },
  { href: "/tools/contrast", label: "Contrast checker", hex: "#8B5CF6" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <section className="w-full px-6 pb-20 pt-36 sm:px-8 lg:px-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Error 404</p>
        <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">This page doesn&apos;t exist</h1>
        <div className="mt-5 flex max-w-2xl flex-wrap items-start gap-3">
          <span className="mt-1.5 flex -space-x-1.5" aria-hidden="true">
            {SUGGESTIONS.map((s) => (
              <span key={s.href} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: s.hex }} />
            ))}
          </span>
          <p className="min-w-0 flex-1 basis-72 text-[16px] leading-7 text-[#1c1712]/55">
            That color isn&apos;t in the palette. The page may have moved or been renamed. Here are some places to start instead.
          </p>
        </div>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
          {SUGGESTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold text-[#1c1712]/80 ring-1 ring-black/[0.08] transition hover:-translate-y-0.5 hover:bg-[#fafafa] hover:text-[#c2410c] hover:ring-black/25"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.hex }} />
              {s.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#c2410c]">
          <span aria-hidden="true">←</span> Back to home
        </Link>
      </section>
    </main>
  );
}
