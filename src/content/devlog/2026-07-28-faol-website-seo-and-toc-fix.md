---
title: faol-website fixes a broken table of contents and adds crawlability
description: The table of contents now reads anchor IDs off the rendered tree instead of recomputing them, the memory page distinguishes a failed fetch from an empty history, and robots.txt/sitemap.xml shipped for the first time.
date: 2026-07-28T09:32:00Z
tags: [faol-website, seo, accessibility]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubdnnm2f"
---

## faol-website

### fixes

- The table of contents recomputed slugs from raw Markdown text while `rehype-slug` generated its own IDs in the rendered HTML — these diverged for duplicate headings and non-ASCII text, producing dead ToC links. It now reads IDs from the processed tree instead.
- The `/memory` page's GitHub commit-history fetch swallowed every error (rate limit, network failure, bad payload) and returned an empty array, which rendered identically to a genuinely empty history. It now returns `null` on failure so the page can say "history unavailable" instead of silently claiming there's nothing there.
- `adapter-vercel` had no explicit runtime and was deriving one from the build machine's Node version, hard-failing outside 20/22/24 — now pinned.

### seo and crawlability

`robots.txt` and `sitemap.xml` didn't exist before this. Notes live under a `[...path]` catch-all a crawler can't enumerate on its own, so the sitemap lists every published note explicitly via the existing `listPosts()` (which already filters drafts). The site origin, previously duplicated separately in the OG-image builder and the RSS feed, is now a single exported constant so the two can't drift.

### accessibility

Added a skip link (there wasn't one), fixed the ToC skipping two heading levels, exposed the About page's QR code as a labeled image, made the tag filters real toggle buttons with `aria-pressed` instead of colour-only state, and fixed the About page's clipboard-copy to handle a missing `navigator.clipboard` or a denied permission instead of an unhandled rejection.
