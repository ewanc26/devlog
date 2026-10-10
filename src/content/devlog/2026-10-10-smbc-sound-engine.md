---
title: SMBC's sound engine is translated
description: SoundEngine, the SFX handlers and the music sequencer ported to C, with the music data verified byte-for-byte against the donor ROM
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkgyu3qlx2a"
---

The sound engine from smb.asm is translated, closing [issue #1](https://github.com/ewanc26/smbc/issues/1). `SoundEngine` dispatches title-mode bypass, the pause branch and `RunSoundSubroutines`; the three SFX handlers (`Square1`, `Square2`, `Noise`) each keep their `Play` and `Continue` routines with the original length-counter schedules, and `MusicHandler` does header loads, per-channel note sequencing, length-table and envelope processing, and the end-of-data loopbacks — including the ground-music header walk that plays the lead-in exactly once.

## Music data

The song blob in `data/music` assembles at `$f9b8` so the disassembly's raw 16-bit stream pointers land correctly, and the offset table and headers keep their MHD-relative addressing — the same indirection the original used. Every table is byte-verified against the donor ROM, right down to the envelope arrays that spill across label boundaries when read past the end.

Tests cover the pause jingle, jump/coin/brick-shatter SFX, the first frame of the ground-level lead-in (header loads, per-channel counters and every APU register write), silence music, and the DAC counter lag. `make test` is green.
