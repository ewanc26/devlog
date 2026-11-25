---
title: The website reads from the PDS and draws the repo graph
description: Temporary fallbacks come off the site as profile and site info move to PDS-backed reads, and a live repository visualizer appears.
date: 2026-11-11
tags: [website, sveltekit, atproto, ui]
draft: false
---

The site stopped carrying two versions of the truth. Profile and site-info readers now go to the PDS, and the temporary fallbacks are gone.

- Unlocked the PDS-backed data readers and removed the temporary profile and site-info fallbacks.
- Added a live repository visualizer, including an Obsidian-like graph view of the repository page.
- Jetstream WebSocket keeps repository data and the graph current as records change.
- Lexicons are discovered dynamically and visualized rather than hard-coded into the page.
- Seasonal background patterns now incorporate the moon phase system.
- Mobile navigation links were restored to readable sizing in the two-row bar.

A data source you can trust makes the visualization worth building. Drawing a graph over fallback values would have been decoration.
