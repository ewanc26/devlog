---
title: SMBC's VRAM buffer writer is translated
description: UpdateScreen and WriteBufferToScreen ported to C, with the PPU model gaining a flat VRAM image and the $2006/$2007 data path
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxieafp36k2r"
---

`UpdateScreen` and `WriteBufferToScreen` are translated. Each frame the NMI loads a pointer from `VRAM_AddrTable` (indexed by `VRAM_Buffer_AddrCtrl`) into the zero-page indirect, and the writer walks update sets: an address pair, then a header byte packing increment-by-32 (d7), repeat (d6) and length (d5–d0), then the data, until a zero high byte — falling through to `InitScroll` either way, as the original does.

## PPU model

The PPU gained a flat 16KB VRAM image, the 14-bit $2006 address pair, and the $2007 data path with increment-by-1/32 selected by d2 of $2000 and reads buffered one access behind. Name table mirroring and the palette-region immediate read are still pending, noted in the source.

ROM-backed table entries (palettes, thank-you messages) are zero until their data tables land — an empty update set, which the writer already handles. Tests cover the header modes, the indirect advance and the address table; `make test` is green.
