import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
	// Persists rendered ISR/SSG pages (e.g. dynamic /colors, /color-meanings slugs)
	// in Workers KV so repeat requests are served from cache instead of
	// re-rendering on every hit - avoids exceeding the Workers Free plan's
	// per-request CPU limit on long-tail dynamic pages.
	incrementalCache: kvIncrementalCache,
});
