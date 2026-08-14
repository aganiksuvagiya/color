"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { PromoBanner } from "./promo-banner";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/generator" || pathname === "/admin") return null;
  return (
    <>
      <Footer />
      <PromoBanner />
    </>
  );
}
