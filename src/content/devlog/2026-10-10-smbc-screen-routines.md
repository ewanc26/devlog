---
title: SMBC's screen task tree runs
description: ScreenRoutines — the fourteen tasks behind mode task 1 — with the palette subroutines, status line writers and intermediate displays
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkjjfnsfr2a"
---

ScreenRoutines is translated — the fourteen-task tree that every mode runs as its task 1. With it wired into TitleScreenMode, GameOverMode and GameMode, the port can now initialise the screen, write the status lines and walk the palette setup on its own.

## What runs

The palette cluster is the heart of it: `GetPlayerColors` appends the player's palette set to the VRAM buffer — background colour first (from `BackgroundColorCtrl` when set, else the area type), then the three player colours, with fiery overriding luigi. `SetupIntermediate` does its one odd thing — the only time the background colour control drops below 4 — saving and restoring player status around the write. The status lines print score and coins through `GetSBNybbles`/`UpdateNumber` with zero suppression, then the world-area block ("1-3" and the dash) lands right after.

`DisplayIntermediate` carries the port's first residual-behaviour note of the session: the castle branch (`AreaType == 3`) that shows the lives display anyway, marked as possibly residual in the original. `AreaParserTaskControl` loops the (stubbed) parser over its column sets, decrementing until the count goes negative. `DrawTitleScreen`'s CHR copy waits on PPU CPU reads; its control flow is in.

## What's next

`WriteGameText` and the GameText tables — status bar, lives display, time up, game over, warp zone — are the obvious next atom: three tasks stub for it, and the messages are pure table work.
