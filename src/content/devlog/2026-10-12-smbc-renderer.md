---
title: "SMBC: the PPU renderer"
description: "hw/render composes the 256x240 frame from PPU state: background tiles, attribute palettes, scroll, sprites with flips and priority, and the sprite-0 hit."
date: 2026-10-12
tags: [smbc, c, 6502, reverse-engineering]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxnumwgrwz2a"
---

Second hardware-fidelity atom: `hw/render.c` turns PPU state into a 256x240 frame of 2C02 palette indices. Background tiles decode through the pattern tables, name tables and attribute tables with the scroll pair and base name-table bits applied; sprites compose from OAM back to front so the lowest index wins, with flips, palettes and behind-background priority honoured. The first sprite-0/background overlap scanline is reported for the timing issue (#33), and the `$2001` layer enables and left-column clips work.

The documented approximation is frame granularity: the picture comes from end-of-frame register state, so the mid-frame scroll write behind the status-bar split waits for the timing model. 8x16 sprites, grayscale and emphasis are unmodelled — the game never uses them. Tests cover decode, palettes, transparency, scroll, priority, ordering, flips, the hit and determinism; the end-to-end check renders the title screen from live game state and it is pixel-faithful. RGB conversion and scaling stay with the frontend (#5). Closes #32.
