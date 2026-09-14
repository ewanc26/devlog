---
title: cv landing page moved into the site design system
description: The standalone HTML landing page for the terminal CV didn't match the site — replaced with a real SvelteKit page at /about/cv using shared primitives, with /cv redirecting browsers there.
date: 2026-09-14T21:55:00Z
tags: [website, cv, design-system, sveltekit]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvj3v3zuhk2y"
---

## website

### /about/cv — landing page joins the design system

The first version of the CV landing page was a standalone HTML string with its own hardcoded green-on-dark styling. It looked fine in isolation but didn't match the site — the real design system uses oklch tokens, `light-dark()` mode switching, and sabbat theming, none of which the standalone page inherited.

Changes:

- `/about/cv` is now a real SvelteKit page using shared primitives: `spec-header`, `panel` (with `panel-head` showing the `ewan@ewancroft.uk:~$` prompt), `meta-tags`, `copy-btn`, `bare-list`, `meta-list`. It inherits theme and colour mode automatically.
- `/cv` content-negotiation updated: browsers get a 302 to `/about/cv`, curl/wget still get the bash script unchanged.
- Deleted the standalone landing module (`src/lib/server/cv/landing.ts`).

The page shows the curl command with a copy button, the interactive menu structure, and an at-a-glance summary (name, headline, location, skill count, project count, languages) generated from the same `gatherCvData()` as the script — browser page and terminal output can't drift apart.
