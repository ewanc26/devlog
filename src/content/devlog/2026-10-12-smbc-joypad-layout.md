---
title: "SMBC: frontend controls and reference scenarios used the wrong button layout"
description: "input.c and the compare scenarios fed in-game SavedJoypadBits bitmaps to the serial joypad layer; every control was scrambled."
date: 2026-10-12
tags: [smbc, c, nes, bugfix]
draft: false
---

Found while smoke-testing audio (#40): the hw joypad layer consumes the $4016 serial order — A=0x01, B=0x02, Select=0x04, Start=0x08, Up=0x10 … Right=0x80 — but `host/input.c` built SDL state in the *in-game* smb.asm layout (A=0x80 … Right=0x01, the SavedJoypadBits order after ReadPortBits) and the frontend passed it through untranslated. Every control was scrambled: Start arrived as Up, A as Right.

`tests/reference/compare.c` had the same mix-up. The start and walk scenarios pressed Up and held A, so their baselines recorded the attract-mode demo rather than scripted gameplay — Mario walking in `walk.ppm` was the demo, not input. Both producers now use the `SMBC_BUTTON_*` enum from `hw/joypad.h`; the start/walk/jump recordings and baselines are regenerated and show real gameplay (mode transitions, input-driven movement).
