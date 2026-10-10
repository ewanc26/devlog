---
title: SMBC's VictoryMode is translated
description: The victory task tree with SetupVictoryMode, PrintVictoryMessages and PlayerEndWorld — three of the four modes now dispatch in C
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

`VictoryMode` is translated, closing [issue #9](https://github.com/ewanc26/smbc/issues/9). Three of its five tasks are self-contained and now run in C: `SetupVictoryMode` (destination page from the screen's right edge, end-of-castle music), `PrintVictoryMessages` and `PlayerEndWorld`.

## The message counter is stranger than it looks

`PrintVictoryMessages` drives the end-of-castle text from two counters: a secondary that takes +4 per frame, whose carry increments the primary. Which message prints depends on the primary, the world and the player — `$0c`/`$0d` for "THANK YOU MARIO/LUIGI!", `$0e` for the princess line in worlds 1-7, and `$0f`–`$12` for world 8's longer sequence, with the victory music queued exactly once at primary 3. Worlds 1-7 end the sequence at primary 4 via a direct branch to `SetEndTimer` that skips the counters entirely; world 8 rides the counter up to 7. The `$09` comparison is residual code, preserved with a note.

`PlayerEndWorld` reuses `TerminateGame` for the world-8 B-button unlock, so that routine moved out of `run_game_over` into an export `core/gameover` shares. `BridgeCollapse`, `PlayerVictoryWalk` and the wrapper's enemy/player/gfx calls are stubbed pending the player, scroll and enemy atoms. Tests cover every message index, both counter-carry paths, the world advance and the B-button termination. `make test` is green.
