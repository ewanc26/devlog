---
title: "SMBC: victory mode tree fully ported, no TODOs left in src"
description: "BridgeCollapse and PlayerVictoryWalk complete the VictoryMode tree; the disassembly port has no remaining TODOs."
date: 2026-10-12
tags: [smbc, c, 6502, reverse-engineering]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxntuly4fs2b"
---

Finished the `VictoryMode` tree in SMBC. With `BridgeCollapse` and `PlayerVictoryWalk` landed, every task in the tree runs and `src/` carries no port TODOs.

`BridgeCollapse` hangs bowser on the bridge while `RemBridge` blanks the axe, chain and bridge metatiles out of `BridgeCollapseData`, paced by the feet counter and using the blank quad from `BlockGfxData` (now shared from data/metatiles). When the fifteenth metatile goes, `InitVStf` drops him with the defeat state and the bowser-fall sound; below $e0 the mode silences the music and moves on. The wrapper tails came with it: `EnemiesAndLoopsCore` past task 0, and the `AutoPlayer` pair (`RelativePlayerPosition`, `PlayerGfxHandler`).

`PlayerVictoryWalk` auto-walks the player right until he is past $60 on the destination page, scrolling a fixed one and a half pixels per frame off the $80 fractional step. The `scroll_handler` body factored into an exported `scroll_screen` (the `ScrollScreen` block plus the `ChkPOffscr` edge clamp) so the walk shares it; `auto_control_player` is exported alongside. The task only advances once both the player and the screen have arrived.

Fixture note from the tests: the victory fixtures now load world 1-1's area data, since the newly wired `EnemiesAndLoopsCore` and `AutoPlayer` read the object pointers the way hardware does.

42 suites green. Remaining work is hardware fidelity, the renderer frontend and the modding roadmap — not disassembly.
