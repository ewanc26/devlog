---
title: SMBC reads its cartridge — DrawTitleScreen and CHR reads
description: The PPU learns pattern-table reads from a nominated CHR, un-stubbing the title screen data copy
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
---

`DrawTitleScreen` is real now. The PPU gained a cartridge-style CHR pointer — the host nominates the pattern tables, and `$2007` reads consult them for `$0000-$1FFF`, still one access behind the read buffer like the hardware. `smbc_init` points it at the donor ROM's CHR, and the title screen task performs its `$1ec0` copy: one priming read, then 314 bytes into the `$0300` buffer page.

The title screen data was never missing — it sat in the CHR extraction all along, behind a read path the PPU model didn't have. The flat VRAM image answers when no CHR is nominated, which keeps the hardware layer honest: pattern storage belongs to the cartridge, not the console.

Also settled: the eventual UI will be C++. The core stays C23; the frontend layer (`src/app/`) will be C++23 when its atom arrives.
