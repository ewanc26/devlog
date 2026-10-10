---
title: SMBC's TitleScreenMode is translated
description: GameMenuRoutine, DrawMushroomIcon and DemoEngine ported to C — the title screen menu with its world-select and demo paths
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkhrk3mff2g"
---

`TitleScreenMode` is translated, closing [issue #8](https://github.com/ewanc26/smbc/issues/8) — the second of the four mode-tree sub-issues. `GameMenuRoutine` keeps the original control flow: start and A+start both reach `ChkContinue` (the A button bit surviving an `asl` decides whether `ContinueWorld` loads), select toggles the player count and redraws the mushroom icon, B cycles the world-select number when the enable flag is set, and an expired demo timer hands the joypad to `DemoEngine`.

## Demo engine

The demo is a 21-action script: `DemoActionData` holds the controller bits, `DemoTimingData` the frame counts, and a zero timing entry ends the demo with carry set — preserved as a boolean return. During a demo the menu still runs `GameCoreRoutine` each frame; that call is a stub until the GameMode tree lands, noted in the source.

The icon, world-select template and demo tables live in `data/title`. Tests cover the icon's 1- and 2-player forms, the demo cycle from fresh start to the terminating zero, both start paths, select toggling with its cooldown timer, B with and without the world-select flag, and the demo-over reset. `make test` is green.
