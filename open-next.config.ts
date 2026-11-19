import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// Serves prerendered pages from Workers static assets - no KV or R2 reads or
	// writes, so deploys and crawl bursts can't hit the KV free-tier write quota.
	// Every route uses `revalidate = false` and nothing calls revalidateTag, so a
	// read-only cache is enough. Pages that aren't prerendered (named-color hex
	// duplicates, 404 slugs) still render on demand; the stock cache logs an
	// error for each of those writes, so set/delete are no-ops here instead.
	// `name` must stay the same: the deploy step matches it to copy the cache
	// files into assets. If ISR/revalidation is ever added, move to R2 instead.
	incrementalCache: {
		name: staticAssetsIncrementalCache.name,
		get: (key, cacheType) => staticAssetsIncrementalCache.get(key, cacheType),
		set: async () => {},
		delete: async () => {},
	},
	// Answer prerendered pages (HTML, RSC and segment prefetches) straight from that cache in
	// the small routing layer, before the ~10 MB Next server bundle is loaded. On the Workers
	// free plan (10 ms CPU per request) loading the server on a cold isolate is what failed:
	// "Worker exceeded CPU time limit" on `_rsc` prefetches of static pages, and ~6% 5xx in
	// Search Console's crawl stats. Must be false if Partial Prerendering is ever turned on.
	enableCacheInterception: true,
});
