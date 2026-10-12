---
title: "smbc: raster clock, scroll log, and the sprite-0 hit"
description: "PPU timing model for the SMB port — vblank flag, sprite-zero status bit, and a scanline scroll log that survives the name-table flip."
pubDate: 2026-10-12
tags: ["smbc", "c", "emulation"]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxnvhmrdzl2l"
---

Closed [#33](https://github.com/ewanc26/smbc/issues/33) in [6e89b2b](https://github.com/ewanc26/smbc/commit/6e89b2b).

The PPU now has a virtual raster clock (0-261, vblank at 241) and logs every scroll-affecting write against it — the `$2005` pair, the `$2000` name-table bits, and completed `$2006` pairs. The renderer resolves scroll per scanline from the log, and `ppu_sprite0_hit_scanline` evaluates the OAM[0]/background overlap so the NMI's split-scroll wait works.

The bug that took the longest: the status bar vanished once gameplay scrolled past 256 pixels. `write_ppu_reg1` mid-vblank leaves the gameplay name table selected, and my log used `ctrl1`'s table bits — but t's table bits are a separate register on hardware. The original's VRAM-buffer sequence ends with `$2006` writes down to `$0000`, resetting t to the first table before `InitScroll`. Modelling that (plus same-scanline coalescing and the horizontal-reload off-by-one — a write during line N takes effect at line N+1) fixed it. Verified end-to-end: scrolling gameplay at hscroll=42 with the status bar fixed, split at line 30.
