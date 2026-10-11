---
title: "smbc: frenzy generators"
description: "Ported InitEnemyFrenzy and its five generators from smb.asm — lakitu and spinys, flying cheep-cheeps, bowser's flame, fireworks, and bullet bills."
date: 2026-10-11
tags:
  - smbc
  - c
  - nes
  - super-mario-bros
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkqx3lfoa2h"
---

Ported InitEnemyFrenzy into `src/core/enemyinit.c`. The init jump table is now complete: ids $12 and $14–$17 no longer behave as NoInitCode.

- All five generators: LakituAndSpinyHandler (respawn after seven reappearance counts, or hatch a spiny in the frenzy object's own slot), InitFlyingCheepCheep, InitBowserFlame (both the SpawnFromMouth and right-extent paths), InitFireworks, and BulletBillCheepCheep (swimming cheep-cheep in water, bullet bill with the blast sound elsewhere)
- Shared helpers as statics: PlayerEnemyDiff, PlayerLakituDiff (with its lakitu speed side effects), PutAtRightExtent, FinishFlame, SetFlameTimer
- The BitMFilter vertical-position filter for the bullet bill / cheep-cheep generator, including the $ff reset and the bit scan
- CheckpointEnemyID exported from the interpreter — the generator's tail jumps there so the new enemy gets its own init
- Twelve data tables in `src/data/enemies` (the Bitmasks table already lived in data/scenery)
- Documented deviations: the star-flag scan leaves instead of the asm's deliberate infinite loop, and the fireworks table index is masked
- Nine new test scenarios in `tests/core/enemyinit.c`; full suite green (26 binaries)

Two commits: `8796458` (tables), `f8979ed` (generators). Next: RunEnemyObjectsCore and the per-frame enemy runners.
