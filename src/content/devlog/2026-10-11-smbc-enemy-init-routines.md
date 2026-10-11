---
title: "smbc: enemy init routines"
description: "Ported the InitEnemyRoutines jump table from smb.asm — every enemy initialiser from goombas to bowser, plus Setup_Vine and EndFrenzy."
date: 2026-10-11
tags:
  - smbc
  - c
  - nes
  - super-mario-bros
---

Ported the InitEnemyRoutines jump table into `src/core/enemyinit.c`. This is the routine set the enemy data interpreter calls for every newly loaded object.

- All per-identifier initialisers: the normal enemy group (goomba, koopas, hammer bro, blooper, bullet bill, cheep-cheeps, podoboo, piranha plant, jumping troopa, red paratroopa), lakitu and its frenzy-buffer kill, the short and long firebars (with DuplicateEnemyObj), every platform (balance, vertical, horizontal, drop, and the four lifts), bowser, the power-up jump point, Setup_Vine and EndFrenzy
- Shared helpers ported as statics: DuplicateEnemyObj (bounded to the six slots), the SetBBox/TallBBox/SmallBBox/SetBBox2 bounding-box variants, PosPlatform's signed sixteen-bit offset, SPBBox and the common platform and lift code
- Six init tables in `src/data/enemies` (speed, hammer bro timers, firebar spin speed/direction, platform positions)
- Dispatch is a switch on the identifier; the frenzy generator entries ($12, $14–$17) stay pending until the frenzy atom and behave as NoInitCode
- The interpreter's placeholder stub is replaced with a call through to the table
- Twenty-five test scenarios in `tests/core/enemyinit.c` — one per routine family, plus an integration scenario through the interpreter; full suite green (26 binaries)
- Fixed one bug found by the tests: the balance platform alignment chain condition was inverted (bpl branches on a *positive* old alignment, keeping $ff; only a negative old alignment chains to the previous slot)

Two commits: `2c21856` (tables), `36e9619` (routines). Next: the frenzy generators.
