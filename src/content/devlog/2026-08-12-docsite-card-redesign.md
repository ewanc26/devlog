---
title: docsite moves to a card-based layout and puts GitHub Sponsors in the sidebar
description: The sidebar no longer tries to list all 77+ docs, the homepage and projects index became searchable card grids, and GitHub Sponsors got promoted from a footer link to a sidebar button. Eight previously-undocumented repos were added.
date: 2026-08-12T12:22:07Z
tags: [docsite, svelte, documentation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24mq4k2l"
---

## docsite

### card-based redesign

The sidebar used to list every published doc — with 77+ docs that had stopped being usable, so it's now trimmed to static nav (`home`, `all projects`) plus a "recently added" list capped at five entries; full browsing moved to `/projects`. That page replaced its flat link list with a searchable, tag-filterable card grid: a search box matches against title, description, and tags, and clicking a tag chip filters to it. The homepage got a gradient hero, stat badges, and a card grid of recent projects instead of a plain link list. Detail pages gained a reading-time estimate and a scroll-spy table of contents. Underneath, the design tokens changed too — a deeper colour palette, new shadow/glow/radius/motion tokens, a fixed CSS grid-and-glow backdrop, and refined prose styling, all landing in `src/routes/+layout.svelte`, `+page.svelte`, `layout.css`, `projects/+page.svelte`, and `projects/[slug]/+page.svelte`.

### GitHub Sponsors sidebar button

GitHub Sponsors was previously just a text link in the footer. It's now a sidebar button next to the website and Ko-fi links, using the `Heart` icon from `@lucide/svelte`. The footer also picked up a direct GitHub Sponsors link alongside the existing ewancroft.uk/github/sequoia links. The `README.md` support section got the same treatment a few days earlier, replacing a single Ko-fi callout with badge links to both Ko-fi and GitHub Sponsors.

### new and corrected docs

Eight previously undocumented repos got docs pages: `auto-sponsor-links`, `bluesky-dadaist`, `cobalt`, `experai`, `isolith`, `plainspeak`, `rpg`, and `willow`. A standalone doc for `ECCL` was also added — a .NET 8 VB.NET Windows Forms prototype simulating a PC-component ordering and checkout flow for a fictional retailer, with hard-coded demo accounts and no real persistence or payment processing. Separately, the `wolfram` and `ewanc26` doc pages were corrected: wolfram's SDK is generated against C23, not C11, as previously stated.

### agent skill tooling

Unrelated to the site itself but in the same repo: `.claude/skills` was converted into a symlink to a new `.agents/skills` directory, and `.factory/skills`, `.opencode/skills`, `.qwen/skills`, and `.rovodev/skills` were symlinked the same way, so skill content is shared across every agent-specific config directory instead of being duplicated. A `desloppify` skill was added as the first tenant of that shared directory.
