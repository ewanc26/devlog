---
title: SMBC gets its project skeleton
description: New C port of the Super Mario Bros. disassembly, seeded with the hardware model, RAM map and frame loop under the usual repo conventions
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

Started SMBC, a C port of doppelganger's Super Mario Bros. disassembly. The disassembly stays unmodified as the source of truth; the C is a faithful translation, with every ported routine citing the assembly label it came from.

## Skeleton

The repo follows the standard conventions: AGPL-3.0-only, root and src `AGENTS.md`, scoped/atomic paths (`src/<scope>/<atom>.c`), C23 with warnings-as-errors, and host tests mirroring the source scopes.

Seeded so far: an NES hardware model (`hw/ppu` with the $2005/$2006 write-pair latch, `hw/apu` register capture, `hw/joypad` strobe-and-shift), a flat 2KB RAM map with named offsets from the disassembly's defines, and a frame loop derived from the NMI joypad poll. `make` runs 60 headless frames; `make test` is green.
