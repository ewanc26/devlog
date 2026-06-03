---
title: Performance audit and fixes across all three sites
description: Docsite client bundle dropped from 1.3MB to 12KB, devlog layout data optimised, website duplicate fetches eliminated
date: 2026-05-09T17:10:00Z
tags: [website, tooling, atproto, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55anjpq2v"
---

Ran performance audits on all three SvelteKit sites and implemented fixes for the major bottlenecks found.

## Docsite — 99% client bundle reduction

The docsite was shipping a 1,287KB client bundle. Root cause: `src/lib/format.ts` mixed client-safe `formatDate` with server-only markdown parsing (unified/remark/rehype), pulling the entire markdown pipeline into the browser.

Fix: split `formatDate` into `src/lib/date.ts` (client-safe), rewrote `src/lib/format.ts` as server-only. Also removed `@ewanc26/ui` as a runtime dependency — it was re-exporting `createSiteMeta` which pulled in `@atproto/api` and `hls.js` transitively. Defined `SiteMetadata` interface locally instead.

Result: client bundle 1,287KB → 12KB. Total immutable assets: 172KB (down from 1.5MB).

## Devlog — layout data and caching

The root layout was serialising the full post list (~64KB JSON) into every prerendered page, but the layout component never used `data.posts`. Only the home page needs it (and already loads it from its own `+page.server.ts`).

Fix: removed `listPosts()` from the layout server load. Added module-level caching for `listPosts()` to avoid repeated filesystem reads. Merged `renderMarkdown` and `extractToc` into a single parse pass — the AST is parsed once, TOC extracted, then the rehype pipeline runs.

Result: homepage HTML 156KB → 127KB. `__data.json` 64KB → 32KB.

## Website — duplicate fetches and polling

The Footer was re-fetching profile and site info on mount even though the layout already loads them. BlueskyPostCard was polling every 2 minutes regardless of tab visibility.

Fix: pass profile and siteInfo from layout to Footer as props. Gate BlueskyPostCard polling to visible tabs via `visibilitychange` API, using recursive `setTimeout` instead of `setInterval`.

Also filtered the recent posts card to only show blog posts (devlog publication), not documentation.

## Self-hosted fonts

All three sites now self-host Inter and JetBrains Mono instead of loading from Google Fonts. Removes the extra DNS/TLS connection, render-blocking CSS, and third-party dependency. Font files are 31-85KB each with `unicode-range` splitting for efficient loading.
