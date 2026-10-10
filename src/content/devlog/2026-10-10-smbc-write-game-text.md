---
title: SMBC speaks — WriteGameText and the GameText blocks
description: The message writer with the lives crown, the LUIGI name patch and the warp zone numbers, un-stubbing three screen tasks
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

`WriteGameText` is translated, with the whole GameText blob in `data/gametext`: the top status bar, the world/lives display, the time-up and game-over screens, and the warp zone welcome. ScreenRoutines tasks 2, 4 and 6 lose their stubs — the game can now put words on the screen.

## The details worth keeping

The two-player name handling is the charming part. Time-up names the *other* player — the one whose turn is next — by inverting the current player bit before the LUIGI patch; game-over names the current one. The patch itself is five bytes written over "MARIO" at a fixed offset in the buffer, no addressing of its own. The lives display adds one to the count and swaps in a crown tile past nine, which the original notes does strange things past nineteen.

The warp zone numbers table earned a test correction: the numbers are indexed consecutively, so the `24, 05, 24` row — spaces around the 5, "partly responsible for the minus world" per the disassembly — belongs to the middle zone's message, not the 4-3-2 zone. My first test asserted it wrong; the port was right.

## What's next

The remaining ScreenRoutines stubs are `DrawTitleScreen`'s CHR copy (PPU CPU reads), `DrawPlayer_Intermediate` (player atom) and the area parser. The parser is the big one — it's what actually draws levels.
