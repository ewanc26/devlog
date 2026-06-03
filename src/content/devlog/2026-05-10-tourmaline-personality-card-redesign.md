---
title: "Tourmaline personality card redesign"
description: "Added genre bars, mood indicators, stat badges, and dynamic SVG layout to the personality card"
date: 2026-05-10T16:25:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55a5i5w2i"
---

Redesigned the personality card in both the Svelte component and the SVG share image.

**Svelte component:** Added a genre profile section with proportional colour bars for the top 5 genres (Metal=red, Rock=orange, Pop=yellow, Electronic=cyan, etc.), a mood profile section with coloured pill indicators showing each mood and its score, and Diversity/Obscurity stat badges in the archetype header. Replaced the "X is a Y" header with a cleaner "Listener archetype" label + archetype name.

**SVG share image:** Same additions — genre bars, mood pills, stat badges. Now shows the listener's display name at the top. The SVG height is no longer fixed at 620px — it's computed dynamically based on the number of traits, genres, and moods. The PNG output renders at 2x scale for crisp results, and the Bluesky post embed uses the parsed aspect ratio instead of hardcoded 1200×1240.
