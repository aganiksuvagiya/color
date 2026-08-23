"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function AdInner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clear previous ad
    el.innerHTML = "";

    const cfg = document.createElement("script");
    cfg.text = `atOptions = { 'key': '8088a24abbdec8236353a6de87b05086', 'format': 'iframe', 'height': 200, 'width': 100, 'params': {} };`;
    el.appendChild(cfg);

    const invoke = document.createElement("script");
    invoke.async = true;
    invoke.src = "https://www.highrevenueformat.com/8088a24abbdec8236353a6de87b05086/invoke.js";
    el.appendChild(invoke);
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: 100, minHeight: 200 }}
    />
  );
}

export function SidebarAd() {
  const pathname = usePathname();

  return (
    <div className="fixed right-0 top-[60%] z-40 hidden -translate-y-1/2 xl:block">
      <AdInner key={pathname} />
    </div>
  );
}
