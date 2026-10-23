// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver...) that pages changed, so they
// recrawl them without waiting. Run it after a deploy, never before (the pages must be live):
//
//   npm run indexnow -- /color-palettes/christmas /color-codes   (paths or full URLs)
//   npm run indexnow -- --sitemap                                  (every URL in the live sitemaps)
//
// The key is public by design: IndexNow checks that https://hueflow.site/<key>.txt holds it.

const HOST = "hueflow.site";
const ORIGIN = `https://${HOST}`;
const KEY = "ae005b44b3f7999141df5b8a7137d684";

async function sitemapUrls() {
  const locs = async (url) => {
    const xml = await (await fetch(url)).text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  };
  const children = await locs(`${ORIGIN}/sitemap.xml`);
  return (await Promise.all(children.map(locs))).flat();
}

const args = process.argv.slice(2);
const urls = args.includes("--sitemap")
  ? await sitemapUrls()
  : args.map((a) => (a.startsWith("http") ? a : `${ORIGIN}${a.startsWith("/") ? a : `/${a}`}`));

if (urls.length === 0) {
  console.error("Nothing to submit. Pass paths/URLs or --sitemap.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  // IndexNow accepts up to 10,000 URLs per request.
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});

// 200 = accepted, 202 = accepted and key check pending; anything else is an error.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${Math.min(urls.length, 10000)} URL(s)`);
if (!res.ok) process.exit(1);
