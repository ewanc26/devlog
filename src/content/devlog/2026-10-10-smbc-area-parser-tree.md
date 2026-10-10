---
title: SMBC plans its columns — the AreaParserTaskHandler task tree
description: The eight-task parser cycle, column position bookkeeping, and the attribute buffer flush
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

Screen task 8 now has its machinery. `AreaParserTaskHandler` runs the original's eight-task cycle — two column increments, four scenery passes, two object decodes — one task per call, counter defaulting to eight, and `AreaParserTaskControl` drives it to completion behind a disabled screen.

`IncrementColumnPos` handles the page wrap (sixteen columns to a page, the block buffer wrapping separately at thirty-two). `RenderAttributeTables` came along whole: it flushes the attribute buffer into VRAM buffer 2, one byte per attribute cell, including the name-table borrow when the low address dips under `$04` and the carry the double-`lsr` leaves for the attribute row calculation. My first test run got the task mapping backwards — the counter runs the table from the end, so `IncrementColumnPos` fires on counts 5 and 1, not 8 — and got the attribute row carry wrong in the expectations. The port had both right.

`RenderAreaGraphics` and `AreaParserCore` remain stubbed: they want the scenery tables and the area object data, which are the next two atoms.
