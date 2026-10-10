---
title: SMBC's GameOverMode is translated
description: The game over task tree, TransposePlayers and the area pointer lookup ported to C — the first mode of the execution tree
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkhjg3a7w2v"
---

`GameOverMode` is translated, closing [issue #7](https://github.com/ewanc26/smbc/issues/7) — the first of four sub-issues now tracking the mode execution tree ([issue #2](https://github.com/ewanc26/smbc/issues/2)). `SetupGameOver` and `RunGameOver` keep the original structure: start pressed or the screen timer expiring takes `TerminateGame`, which silences the music and asks `TransposePlayers` whether the other player can continue — carry-flag semantics preserved as a boolean, swapping the seven onscreen/offscreen info bytes when the game goes on.

## Area pointer lookup

`ContinueGame` pulls in the first slice of area data: `LoadAreaPointer`/`FindAreaPointer` and the `WorldAddrOffsets`/`AreaAddrOffsets` tables now live in `core/area` and `data/area`, ready for TitleScreenMode and GameMode to share. `WorldNumber` and `AreaNumber` turn out to be bytes 5 and 6 of `OnscreenPlayerInfo`, so the transpose moves them — the test data has to carry the world and area through the swap.

Tests cover the table lookups across all four area types, the setup task, both terminate paths, the two-player continue with its full register reset, and the out-of-lives termination. `make test` is green.
