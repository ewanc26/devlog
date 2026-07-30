---
title: devlog fixes its own toolchain and ships a sitemap
description: Unbroke pnpm install and type-checking, added robots.txt/sitemap.xml and canonical URLs, fixed the same duplicate-ToC-anchor bug as docsite, and pinned dependencies after a floating "latest" broke a sibling repo.
date: 2026-07-28T10:37:00Z
tags: [devlog, tooling, seo]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuas5442f"
---

## devlog

Fixing its own house. `pnpm-workspace.yaml` had the same placeholder-boolean issue breaking installs across the fleet this month; `tsconfig.json` was also missing `allowJs`/`checkJs`, which broke type-checking on script-less components, and was missing `@types/node`/`@types/mdast` entirely. TypeScript was pinned to the 6.x line, since svelte-check 4.x can't load 7.x. A tracked `.env.example` was added — `PUBLIC_SITE_URL` previously had no fallback for a fresh clone.

Shipped `robots.txt`, `sitemap.xml`, and canonical/`og:url` tags, all reading a single-sourced site URL shared with the RSS feed instead of each computing it separately. The OG image URL is now reactive instead of computed once at mount, fixing stale images when navigating client-side between posts. Fixed the same duplicate-heading table-of-contents bug that hit docsite this period — both shared the same root cause, a slug re-derivation path that's now removed as dead code.

Pinned every dependency to a caret range on the currently-installed version instead of floating on `"latest"`, after exactly that pattern let a sibling repo's `"latest"` type package pull in TypeScript 7 and break `svelte-check` there.

Also: 10 devlog entries were backfilled for work between 2026-07-03 and 2026-07-12 that hadn't been written up yet, and a prototype entry ("dorcha") was later pulled from the site — its file is gone, but since it had already been published, the underlying AT Protocol record wasn't deleted, only delisted.
