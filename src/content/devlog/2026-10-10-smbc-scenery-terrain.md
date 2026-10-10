---
title: SMBC grows scenery — RenderSceneryTerrain and its tables
description: Background and foreground scenery, terrain render bits, and the block buffer store
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

The parser's columns have content now. `RenderSceneryTerrain` clears the metatile buffer and lays in, in order: background scenery (clouds, mountains and bushes, trees and fences — one set chosen per area, cycled every third page), foreground scenery (water surfaces, castle walls, bridge rails), and the terrain ceiling/floor driven by the header's render bits. The special cases came along faithfully: world 8's water renders castle wall, underground areas override the bottom row with ground, and cloud levels keep only the floor edge of their terrain.

Each finished column stores into the block buffer — the collision world's copy of the level — dropping metatiles under their per-attribute bound so decorative tiles don't become solid. `AreaParserCore` itself is wired: backloading runs the object decoder once to skip ahead, then falls into the render exactly as the original's fall-through does.

One data atom remains in the parser: the area object data itself, then `ProcessAreaData` can decode it. That's the level layouts — the last big extraction before World 1-1 can actually be drawn.
