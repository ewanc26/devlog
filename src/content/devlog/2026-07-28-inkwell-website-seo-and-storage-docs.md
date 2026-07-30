---
title: inkwell-website fixes its sitemap, focus handling, and token-storage claim
description: Corrected a robots.txt still pointing at the old domain, fixed mobile-drawer focus loss, restored stripped list markers, and corrected the privacy policy to mention Android's storage alongside iOS Keychain.
date: 2026-07-28T10:37:00Z
tags: [inkwell-website, seo, accessibility]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjualzs42f"
---

## inkwell-website

### fixes

- `robots.txt` still advertised the old `inkwell.app` domain and falsely claimed SvelteKit auto-generates a sitemap — corrected to the real origin, and an actual `sitemap.xml` route was added. Per-route canonical/`og:url` was previously always the site root; now derived per page.
- Tailwind's preflight had stripped list markers on the legal pages' prose — disc/decimal markers restored. Dropped dangling `@font-face` rules pointing at font files that don't exist in `static/`, which fired two 404s on every page load before falling back to system fonts anyway.
- Mobile-drawer focus handling: dismissing via Escape or the backdrop dropped focus onto `<body>` instead of returning it to the toggle, and the drawer stayed open across route changes. Both fixed.

### docs

The homepage and privacy policy both said tokens are stored in Apple's Keychain — true only for iOS. Both now also name the Android port's encrypted shared-preferences storage.

### dependencies

Every dependency was pinned literally to `"latest"`, with no lockfile protection against a new major landing silently — this already bit the project once, when a type package pulled in TypeScript 7 and broke a sibling repo's `svelte-check`. Everything is now pinned to a caret range on the currently-installed version.
