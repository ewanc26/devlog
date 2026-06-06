---
title: Recent Infrastructure and Feature Updates
date: 2026-06-06
description: A summary of significant infrastructure improvements and feature updates made between June 3 and June 6, 2026.
tags: [website, infra, features]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnmvqjm5432g"
---

## quick catch-up (june 3-6)

Been hyperfocused on the site again. Since June 3rd, it’s been a whirlwind of stability fixes and aesthetic tweaks.

## infra wins
- **504 Mitigation:** Biggest win. Switched to a concurrency-limited fetch pattern and moved heavy loading to the client-side. The site feels responsive, and the timeouts are gone.

## features & polish
- **Typography:** Finally locked in global font-face loading for Inter and JetBrains Mono. Fonts are crucial, and the site finally feels *consistent*.
- **Visuals:** OG images now embed local fonts properly. Swapped out literal text arrows for actual Lucide icons.
- **Design:** Massive overhaul to the Sabbat colour systems—it’s now multi-hue, type-safe, and modular. Everything maps correctly now.
- **Iconography:** Dynamic Sabbat icons are loaded from raw SVG and synced to the theme.
- **Testing:** Added a dev-only testing suite. Being able to simulate dates/Sabbat states without actually waiting for the real world is a game changer.

Stability is the goal, but the polish makes it *mine*.
