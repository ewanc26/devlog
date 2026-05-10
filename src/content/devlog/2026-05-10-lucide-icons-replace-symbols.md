---
title: "Replaced inline symbolic characters with Lucide icons"
description: "Swapped unicode symbols for Lucide icon components across malachite, opal, jasper, bismuth, tourmaline, landing-ui, and croft-click"
date: 2026-05-10T12:35:00Z
tags: [atproto, pkgs, tooling, typescript]
draft: false
---

Replaced all inline symbolic characters in Svelte components with their Lucide icon equivalents:

- `↗` → `ExternalLink` (external links)
- `←` → `ArrowLeft` (back buttons)
- `→` → `ArrowRight` (forward/continue buttons)
- `♥` → `Heart` (support links)
- `✓` → `Check` (completion indicators)
- `☰` → `Menu` (hamburger menu references)

Also removed redundant `✓`/`✗` from pds-landing StatusGrid (the status styling handles it) and replaced the CSS `::before` arrow in LinkList with `›`.

Left instructional `→` in prose (e.g. "Tap menu → Settings → Accounts") unchanged — those are navigation breadcrumbs in text, not UI elements.
