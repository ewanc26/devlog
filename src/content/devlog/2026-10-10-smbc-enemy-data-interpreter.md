---
title: 'SMBC: enemy data interpreter'
description: 'EnemiesAndLoopsCore, ProcLoopCommand, ProcessEnemyData and HandleGroupEnemies ported; the init jump table is a pending stub.'
date: 2026-10-10T23:28:00Z
tags: ['smbc', 'c', 'reverse-engineering']
draft: false
---

Ported the enemy data interpreter to SMBC, the atom that walks the enemy object stream and loads new enemies as the screen scrolls.

`EnemiesAndLoopsCore` handles an idle slot: `ProcLoopCommand` (world 7's three-part loop counts passes and correct positions separately), the frenzy queue, then `ProcessEnemyData` — page control rows, the page-select bit in d7 of the second byte, the right-boundary window (objects spawn between the right edge and 48 pixels beyond, wait further out, skip behind), hard mode gating on d6, goomba-to-buzzy mutation, group enemies spawning 24 pixels apart, row $0e area jumps, and the residual sixth-slot check. `KillAllEnemies` and `ExecGameLoopback` came along for the loop command path.

Deferred to later atoms: `RunEnemyObjectsCore` and the `InitEnemyRoutines` jump table — the dispatch stands, every entry currently behaves as `NoInitCode`.

23 test scenarios against smb.asm behaviour. Commits `b936448` and `15710ba`; full suite green.
