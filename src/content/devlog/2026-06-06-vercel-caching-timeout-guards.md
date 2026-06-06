---
title: "Vercel 504s: CDN Caching, Timeout Guards, DID Caching"
date: 2026-06-06
description: A second pass at the 504 problem — Cache-Control headers for Vercel's edge CDN, AbortController timeouts on external fetches, and a DID document cache.
tags: [website, infrastructure, performance, atproto]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlen2qhzrt2s"
---

Second pass at the 504 problem.

The earlier fix — `mapWithConcurrency` and client-side offloading of the home page — helped with the index. Blog post pages and the subscriptions/recommendations endpoints were still timing out. The underlying cause was obvious in hindsight: the in-memory `Map` in `cache.ts` is cold on every Vercel function invocation. Module scope resets between serverless calls. The cache has never actually done anything on production.

Without any CDN caching headers, every visitor triggers a full network fan-out to the AT Protocol ecosystem regardless of how recently someone else hit the same route. No request was ever cheap.

### what changed

**`maxDuration` config exports.** Added `export const config: Config = { maxDuration: 60 }` to each route file using the Vercel adapter — the correct per-route mechanism for SvelteKit. Also set a global `"**": { "maxDuration": 60 }` in `vercel.json` as a backstop.

**CDN `Cache-Control` headers.** `setHeaders` with `s-maxage` in all page `load` functions; `Cache-Control` on all API responses. Blog posts get an hour — they don't change once published. The home page gets sixty seconds. Subscriptions and recommendations get five minutes. Vercel's edge now caches these; the cold function only runs once per TTL window per edge node rather than on every request.

**`AbortController` timeouts.** Added a `withTimeout` wrapper applied at the entry point of `fetchSubscriptions`, `fetchRecommendations`, and `fetchComments`. Every individual external fetch — PDS record lookups, profile fetches — now aborts after 8 seconds. Previously a single unresponsive PDS could stall the entire `Promise.allSettled` fan-out indefinitely. Now it fails that one record and the settled results still return.

**DID document cache.** Module-level `Map` in `resolveDid` with a one-hour TTL. Within a single request resolving multiple records from the same author — which is the common case for subscriptions and recommendations — this skips redundant `plc.directory` round-trips. Also compounds on warm Vercel instances.

**`about/+page.server.ts`.** Was calling every ATProto function without threading `fetch` through — falling back to bare global fetch. Fixed, and added `setHeaders` for CDN caching while I was in there.

The `.catch()` fallbacks that were already on every external call ensure graceful degradation if the AT Protocol network is genuinely unavailable. The timeout guards just make sure "unavailable" resolves in 8 seconds rather than never.
