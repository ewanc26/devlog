---
title: The Great Astro Rewrite
description: Porting the entire site from SvelteKit to Astro for ultimate static performance and a terminal-inspired layout.
date: 2026-05-02
tags: [astro, migration, webdev, nix]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsj3qwt22"
---
SvelteKit served me well, but my needs have shifted. I've just merged a massive rewrite porting `ewancroft.uk` over to Astro. The goal here was minimizing client-side JavaScript while keeping our interactive islands (like the Theme Toggles and the Decimal Clock) functional via React/Preact components.

This update also introduces a new `TerminalLayout`, shifting the aesthetic significantly. To keep the development environment reproducible across machines, I've finally added a Nix flake to the repository. Request timeouts and stale routes that were throwing 500s on Vercel have also been patched up.
