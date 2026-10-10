---
title: All four SMBC modes now dispatch
description: The GameMode skeleton — task tree, GameCoreRoutine's joypad plumbing and the GameEngine's translatable tail — completes the mode execution tree's top level
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

The GameMode skeleton is in, part of [issue #10](https://github.com/ewanc26/smbc/issues/10) — with it, `OperModeExecutionTree` dispatches all four modes. What's translatable without the player, enemy and area-parser atoms now runs: the task tree with `SecondaryGameSetup` wired in, `GameCoreRoutine`'s master joypad copy (the current player's controller bits become the game's single set) and its task gate, and the GameEngine's tail — the star-music check that re-attains the level theme when the invincibility timer hits exactly 4 with the interval timer expired, the palette-cycle control computation, `SaveAB` and `UpdScrollVar`.

## What waits

The thirteen `GameRoutines` entries (player entrance, death, flagpole, fire flower and friends), `InitializeArea`, `ScreenRoutines`, and the engine's object-processing calls are stubbed in place with `TODO(port)` markers naming their atoms. That's the bulk of the game — the player atom alone holds physics, collision and graphics — and it lands piece by piece from here.

Tests cover the joypad master copy, the setup task not running the core early, the SaveAB tail, both star-music gates and the scroll wrap. `make test` is green.
