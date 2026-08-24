"use client";

import { useEffect, useRef } from "react";

const AD_SRC = "https://pl30867283.effectivecpmnetwork.com/6d475ff6d3bd6e40dfd40a5f2f616def/invoke.js";

const AD_IFRAME_HTML = `<!DOCTYPE html>
<html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:transparent;overflow:hidden;}
#container-6d475ff6d3bd6e40dfd40a5f2f616def{position:static!important;inset:auto!important;width:100%!important;}
#container-6d475ff6d3bd6e40dfd40a5f2f616def>*,.container-6d475ff6d3bd6e40dfd40a5f2f616def__bn-container{position:static!important;inset:auto!important;width:100%!important;padding:2px!important;margin:0!important;}
#container-6d475ff6d3bd6e40dfd40a5f2f616def img{width:100%!important;height:auto!important;display:block!important;border-radius:0!important;}
#container-6d475ff6d3bd6e40dfd40a5f2f616def a{display:block!important;width:100%!important;border-radius:0!important;}
#container-6d475ff6d3bd6e40dfd40a5f2f616def p,#container-6d475ff6d3bd6e40dfd40a5f2f616def span,#container-6d475ff6d3bd6e40dfd40a5f2f616def h1,#container-6d475ff6d3bd6e40dfd40a5f2f616def h2,#container-6d475ff6d3bd6e40dfd40a5f2f616def h3,#container-6d475ff6d3bd6e40dfd40a5f2f616def h4,#container-6d475ff6d3bd6e40dfd40a5f2f616def b,#container-6d475ff6d3bd6e40dfd40a5f2f616def strong,.container-6d475ff6d3bd6e40dfd40a5f2f616def__title{display:none!important;}
</style></head><body>
<div id="container-6d475ff6d3bd6e40dfd40a5f2f616def"></div>
<script async data-cfasync="false" src="${AD_SRC}"></script>
</body></html>`;

export function EffectiveCpmAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.childElementCount > 0) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = AD_SRC;
    el.appendChild(script);
  }, []);

  return (
    <>
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

export function FooterInlineAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.childElementCount > 0) return;
    const cfg = document.createElement("script");
    cfg.text = `atOptions = { 'key': '7032323ef83f13c8d75b1c1095b73ebc', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {} };`;
    el.appendChild(cfg);
    const invoke = document.createElement("script");
    invoke.async = true;
    invoke.src = "https://www.highrevenueformat.com/7032323ef83f13c8d75b1c1095b73ebc/invoke.js";
    el.appendChild(invoke);
  }, []);

  return <div ref={ref} style={{ width: 300, minHeight: 250 }} />;
}

export function FooterAdRow() {
  return (
    <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl border border-black/8 bg-[#f0ede8] p-1">
      {[0, 1, 2, 3].map((i) => (
        <iframe
          key={i}
          srcDoc={AD_IFRAME_HTML}
          scrolling="no"
          frameBorder="0"
          className="h-[120px] w-full rounded-lg"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      ))}
    </div>
  );
}
