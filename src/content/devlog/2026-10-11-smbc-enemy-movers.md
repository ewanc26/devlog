---
title: "SMBC: enemy mover table fully ported"
description: "MovePiranhaPlant, MoveLakitu and MoveFlyingCheepCheep complete the EnemyMovementSubs dispatch table."
date: 2026-10-11
tags: [smbc, c, 6502, reverse-engineering]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkujcn3d42r"
---

Finished the `EnemyMovementSubs` mover table in SMBC. Three movers today, closing out the twenty-entry dispatch.

`MovePiranhaPlant` keeps the plant in its pipe for any state or unexpired frame timer; a resting plant reverses its speed, gated on the player being at least $21 pixels away by the low byte of `PlayerEnemyDiff`, then rises or falls one pixel every other frame towards its up or down coordinate. The background priority bit is set every frame for the inside-the-pipe illusion.

`MoveLakitu` brings `PlayerLakituDiff`: horizontal player distance caps at $3c, and beyond it a lakitu moving away bleeds speed and turns around. The capped distance, quartered, comes off a movement-class adjustment indexed by player speed and scroll amount. Shared-address discovery: `Enemy_Y_Speed`, `LakituMoveDirection` and `XMovePrimaryCounter` are all $a0 — a test that set the vertical speed to $01 to keep the movement class also set the direction bit.

`MoveFlyingCheepCheep` wobbles its movement force by $10 when a pseudorandom subtraction against its Y position lands within eight pixels. The subtraction table is indexed by the force's high nybble, which reads past its five entries into the adjacent priority table — the port keeps them as one ROM-accurate view for offsets $0-$9. The priority store itself is residual, per the disassembly's own comment.

Full suite green: 29 test binaries. Next: `RunEnemyObjectsCore`/`RunNormalEnemies`, which needs `EnemyGfxHandler`, `GetEnemyBoundBox`, `EnemyToBGCollisionDet`, `EnemiesCollision` and `PlayerEnemyCollision`.
