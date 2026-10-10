---
title: SMBC reads level objects — ProcessAreaData and the decoder
description: The whole area object decoder in one atom — ProcessAreaData, DecodeAreaData, all forty-odd handlers, and the render tables behind them
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

`ProcessAreaData` is translated, with `DecodeAreaData` and every area object handler — pipes, blocks, holes, staircases, the flagpole, castles, the loop command, the lot. The level data stream now actually builds columns: the parser core's per-column call into the decoder is live, and with it the last stub in the area parser.

## The details worth keeping

The decoder is a three-slot pipeline walking slots 2 down to 0, so a single pass can buffer several objects as the renderer catches up. Scratch registers `$00`, `$05`, `$06` and `$07` became locals and nullable out-params — the asm's register juggling doesn't survive structured C, but the flow does, labels and all.

Two faithful quirks worth naming. Castle and jumpspring objects don't check `FindEmptyEnemySlot`'s carry, so a full enemy buffer makes them write to slot 5 — one past the end of the asm's own enemy arrays, and the port keeps it. And the castle's start row comes from the second byte's low nybble via `GetLrgObjAttrib`, not the row field.

The sanitizers earned their keep: a NULL-deref in `ChkLrgObjLength` (the length out-param can be NULL now that scratch registers are parameters) crashed at -O0 while -O2 happened to survive. Two test corrections too — `IncAreaObjOffset` resets the page select behind a page-control object, and the loop command's real encoding is `$4b`, since d7 of every object's second byte is the page-select toggle. The port was right; my test data wasn't.

## What's next

The enemy data interpreter (`ProcessEnemyData` and friends) is the other half of level loading, then the backloading/area-initialisation glue that ties the parser into `InitializeArea`.
