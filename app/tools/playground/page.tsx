import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { ColorPlayground } from "@/components/color-playground";

export const metadata: Metadata = {
  title: "Color Playground",
  alternates: { canonical: "/tools/playground" },
  description: "Interactively adjust hue, saturation, lightness, and contrast to preview a live UI theme in real time.",
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Color Playground</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Build your palette, see it live.</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {["#e8531f", "#2a140a", "#fbe9df", "#f59e0b", "#6366f1"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
            ))}
          </span>
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">Free, and it updates as you drag.</span> Adjust hue, saturation, lightness and contrast, and watch the UI preview change in real time.
          </p>
        </div>
      </section>

      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
          <ColorPlayground />
        </div>
      </section>
    </main>
  );
}
