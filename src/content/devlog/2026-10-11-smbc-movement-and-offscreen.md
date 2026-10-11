---
title: "smbc: movement and offscreen layers"
description: "Ported the object movement primitives, the relative position and offscreen bits layer, and OffscreenBoundsCheck from smb.asm — the ground the enemy runners stand on."
date: 2026-10-11
tags:
  - smbc
  - c
  - nes
  - super-mario-bros
---

Three atoms, three commits.

- `src/core/move.c`: MoveObjectHorizontally (via the enemy entry) and the ImposeGravity family — the downwards-only entries for falling platforms, droppies and slow movers, and the two-directional red paratroopa gravity with its strict, force-gated clamp. The asm's off-by-one SprObject indexing collapses into direct enemy array access.
- `src/core/offscreen.c`: RelativeEnemyPosition and GetEnemyOffscreenBits with GetXOffscreenBits, GetYOffscreenBits and DividePDiff, plus the five data tables. Combined byte stores the vertical mask high, horizontal mask low.
- `src/core/runners.c`: OffscreenBoundsCheck, first piece of the runner layer. Its carry chain is emulated byte-exactly — the cpy comparisons feed the adc/sbc pairs, so the erase bounds shift by identifier and by whether a page overflowed.

29 test binaries green. The enemy runner dispatch is next.
