---
title: Deploying the croft.click monorepo to Vercel
description: Got all 7 croft.click suite apps deploying on Vercel's free tier from a pnpm monorepo. Required fighting SIGKILLs, rate limits, and a missing barrel export.
date: 2026-06-22T17:00:00Z
tags: [infra, croft.click]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov5e2gois2k"
---

## vercel monorepo deploy

Today was deployment day. The croft.click suite — seven SvelteKit apps in a pnpm monorepo — needed to go live on Vercel with proper subdomain routing.

### the setup

Six of the seven apps live in `ewanc26/pkgs` under `packages/*-web`, plus a central landing page at `packages/croft-click`. The seventh, `devlog`, is its own repo. Each app uses `@sveltejs/adapter-vercel` and depends on internal workspace packages.

### the sigkill gauntlet

The first wave of deploys hit immediate SIGKILLs during `pnpm install`. The free tier gives you 8 GB RAM, and pnpm loading the full workspace graph — even with `--filter` — was enough to trigger the OOM killer. The fix was threefold:

- `--filter @ewanc26/<app>...` with the trailing dots to target only transitive dependencies
- `--frozen-lockfile` to prevent pnpm from re-resolving the full lockfile
- Setting `shamefully-hoist=true` in `.npmrc`, which flattens node_modules at the cost of disk I/O — trading RAM for build time

The hoisting approach worked but pushed build times close to the 45-minute free tier timeout. After the initial panic, the simpler filter-only approach ended up working: jasper-web deployed in 8 seconds on a subsequent git-push trigger.

### the rate limit

By this point we'd triggered over 100 deployments in a single 24-hour window. Vercel's hobby tier rate limit kicked in — no more builds for 24 hours. The prebuilt deploy trick (`vercel deploy --prebuilt`) would theoretically bypass the build step entirely, but the rate limit blocks all deployments regardless. Lesson: on free tier, pace your deploys.

### dns

Seven subdomains on a Cloudflare-managed apex pointing to Vercel. A few had legacy CNAME records to `vercel-dns-017.com`; others were missing entirely. The fix was adding A records to Vercel's edge IP (`76.76.21.21`) with DNS-only (grey cloud) mode so Vercel can provision TLS certificates directly.

### the bugs

- **Tourmaline** refused to build on Node 26 — `@sveltejs/adapter-vercel` needs an explicit `runtime: 'nodejs22.x'` in its config when the default runtime check fails.
- **Malachite** had two missing barrel exports: `parseAppleMusicCsvContent` and `parseYouTubeMusicJsonContent` existed in the source files (`src/core/apple-music.ts`, `src/core/youtube-music.ts`) but were never re-exported from `src/core/index.ts`, so the web frontend couldn't find them.

### result

All seven sites live, HTTP 200, real content:

- [croft.click](https://croft.click) — directory landing page
- [jasper.croft.click](https://jasper.croft.click) — Instagram → ATProto
- [malachite.croft.click](https://malachite.croft.click) — music scrobbles → Teal
- [bismuth.croft.click](https://bismuth.croft.click) — richtext → Markdown
- [opal.croft.click](https://opal.croft.click) — microblog → Bluesky
- [tourmaline.croft.click](https://tourmaline.croft.click) — Teal.fm analyser
- [devlog.croft.click](https://devlog.croft.click) — this changelog
