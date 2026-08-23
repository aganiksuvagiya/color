"use client";

import { useEffect, useRef } from "react";

export function EffectiveCpmAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.childElementCount > 0) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = "https://pl30867283.effectivecpmnetwork.com/6d475ff6d3bd6e40dfd40a5f2f616def/invoke.js";
    el.appendChild(script);
  }, []);

  return (
    <>
      {/* The ad network's widget sometimes positions itself absolute/fixed, escaping this
          container's layout flow. Force it to stay put and fill the container instead. */}
      <style>{`
        #container-6d475ff6d3bd6e40dfd40a5f2f616def {
          position: static !important;
          inset: auto !important;
          width: 100% !important;
        }
        #container-6d475ff6d3bd6e40dfd40a5f2f616def > *,
        .container-6d475ff6d3bd6e40dfd40a5f2f616def__bn-container {
          position: static !important;
          inset: auto !important;
          width: 100% !important;
          padding: 2px !important;
          margin: 0 !important;
        }
        #container-6d475ff6d3bd6e40dfd40a5f2f616def img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          border-radius: 0 !important;
        }
        #container-6d475ff6d3bd6e40dfd40a5f2f616def a,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def div {
          border-radius: 0 !important;
        }
        #container-6d475ff6d3bd6e40dfd40a5f2f616def a {
          display: block !important;
          width: 100% !important;
        }
        #container-6d475ff6d3bd6e40dfd40a5f2f616def p,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def span,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def h1,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def h2,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def h3,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def h4,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def b,
        #container-6d475ff6d3bd6e40dfd40a5f2f616def strong,
        .container-6d475ff6d3bd6e40dfd40a5f2f616def__title {
          display: none !important;
        }
      `}</style>
      <div id="container-6d475ff6d3bd6e40dfd40a5f2f616def" ref={ref} className="w-full" />
    </>
  );
}
