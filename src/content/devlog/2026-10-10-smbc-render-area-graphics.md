---
title: SMBC draws metatiles — RenderAreaGraphics
description: The metatile column renderer with its attribute-bit rotations and name table wrap
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

`RenderAreaGraphics` is translated. Thirteen metatiles from the buffer become 26 tile bytes in VRAM buffer 2, the task number's parity picking each metatile's left or right half (metatiles are four tiles: upper-left, lower-left, upper-right, lower-right).

The attribute bookkeeping is where the original earns its keep. Each metatile's top two bits are its palette, and the renderer ORs them into the attribute buffer in the right position for the quadrant being drawn: three `rol` through carry for the upper left, four `lsr` for the upper right, two for the lower left, none for the lower right. My first pass wrote the upper-left rotation as a plain shift left, which lands the bits two positions too high — the three-rol sequence through carry is really just `>> 6`. Caught before commit, fixed, and covered by tests for both attribute squares and the name table wrap.

Only `AreaParserCore` remains in the parser: the object decoder with the scenery tables and the area data itself — the biggest data atom in the port.
