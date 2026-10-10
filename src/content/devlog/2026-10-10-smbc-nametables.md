---
title: SMBC clears its name tables
description: InitializeNameTables ported and verified against the donor ROM, plus a proper issue tracker for everything left to translate
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxielk5sf22v"
---

`InitializeNameTables` is translated: pattern table select in the $2000 mirror, then both name tables cleared — exactly 768 blank-tile writes plus 64 trailing zero bytes each, with the VRAM buffer header and scroll reset. The 768+64 count looked like a bug, so I verified it against the donor ROM's own bytes: `a2 04 a0 c0` — the cartridge really does that. Ported as-is.

## Housekeeping

The remaining work is now tracked as GitHub issues on the repo: the sound engine, the mode execution tree (title/game/victory/game over), the ROM-backed VRAM address table entries, PPU mirroring and palette-region reads, the renderer frontend, and the boot-adjacent routines (`PrintStatusBarNumbers`, `SecondaryGameSetup`, friends). Boot's mirror test caught the one observable change from this work: it now ends at `$90`, the pattern table select bit surviving.
