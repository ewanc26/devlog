---
title: uncramped /about/cv layout
description: The CV landing page was too cramped — moved from the narrow shell to the wide shell with the same two-column grid pattern as the about page.
date: 2026-09-14T21:58:00Z
tags: [website, cv, layout]
draft: false
---

## website

### /about/cv — layout fix

The CV landing page used `shell-narrow` (48rem) with everything stacked in one column and `space-lg` gaps — cramped compared to other content pages.

- `shell-narrow` → `shell-wide`
- Menu and "at a glance" now sit side by side in an `about-grid`-shaped two-column layout (`1fr 320px`, collapses to one column under 900px)
- Section gaps up to `space-xl`/`space-2xl`, roomier row padding in the menu and facts lists
