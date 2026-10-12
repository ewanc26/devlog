---
title: "SMBC: attribute table and bumped-block address fixes"
description: "Pixel comparison against NES reference footage found three rendering bugs: palette RAM mirroring, an off-by-one in the attribute writer, and a missing Block_BBuf_Low store."
date: 2026-10-12
tags: [smbc, c, nes, ppu, fidelity]
draft: false
---

Sat down with reference footage and re-rendered frames side by side (#31). Three bugs fell out, all in how the port talks to the nametables:

- Palette RAM mirroring: $3F10/$14/$18/$1C now alias to $3F00/$04/$08/$0C as on hardware. The sky was sampling a sprite palette entry instead of the universal background colour (108937a).
- Attribute writer: the asm's DrawMTLoop reads the attribute row *before* NextMTRow increments it, so a metatile's lower half ORs into the same cell as its upper half. The port incremented first, pushing every odd row's palette bits up one cell — cloud tops went green (a26774f).
- Bumped blocks: PlayerHeadCollision never saved $06 to Block_BBuf_Low, so the replacement metatile write always computed NT0 column 0 and the write-back corrupted the collision map. Any block hit on an odd page left a phantom green empty block floating mid-air (f1c0955).

Also confirmed two things are faithful hardware behaviour, not bugs: the demo's title strip scrolling off the left edge (RunDemo enters GameCoreRoutine with no reinit), and the first-run demo desync after the mushroom.

Baselines regenerated; the demo replay hash now covers the corrected RAM writes. `make test` green.
