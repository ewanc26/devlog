---
title: docsite ships real SEO and 17 new project pages in one pass
description: A sitemap, favicon, and layout-owned metadata replaced per-page duplication that was advertising the homepage's description to every crawler, alongside 17 new or updated documentation pages.
date: 2026-07-28T09:31:00Z
tags: [docsite, seo, documentation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubfvw42f"
---

## docsite

### seo

Every page previously emitted its own `<svelte:head>` metadata independently, and it was broken — every page was advertising the homepage's OG description and URL to crawlers regardless of which document was actually open. Metadata is now layout-owned, driven from `$page.data`/pathname in one place. A sitemap route, a favicon, and `robots.txt` referencing the sitemap all shipped for the first time. A duplicate-heading bug in the table of contents was fixed by sharing the same stateful slugger instance `rehype-slug` uses, instead of re-deriving anchor IDs from heading text.

### 17 documentation pages

Added or updated docs for Chronicler, DayAnnouncer, MetalBear, StandardBooks, bsky-to-gem, channel-blue, ewanc26, hasharium, letta-coding-agent, minefetch, pds-dash-tophhie, pds-status-tophhie, scripts, socialsync, and wolfram, plus version bumps to the atpkt and pkgs pages — in a single batch.

### tooling

Fixed the same `pnpm-workspace.yaml` placeholder-boolean install failure seen across the fleet this month, pinned the Vercel adapter to `nodejs22.x`, and fixed `.prettierrc` (had an invalid `//` comment in what's parsed as JSON) while excluding `src/content/` from formatting so authored Markdown frontmatter doesn't get reformatted on every run.
