import type { ReactNode } from "react";

import { Header } from "./header";

export function StaticPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 sm:pt-40">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {updated ? (
          <p className="mt-3 text-sm text-white/40">Last updated: {updated}</p>
        ) : null}
        <div className="prose-static mt-10 space-y-5 text-[15px] leading-relaxed text-white/70 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white">
          {children}
        </div>
      </article>
    </main>
  );
}
