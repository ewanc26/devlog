---
title: "smbc: deterministic input recording and replay"
description: "Frame-indexed recordings with per-frame state hashes, replayable from a fresh reset; CI catches two gcc portability fixes."
date: 2026-10-12
tags: ["smbc", "c"]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxnwfyidnp2v"
---

Closed [#37](https://github.com/ewanc26/smbc/issues/37) in [bad3164](https://github.com/ewanc26/smbc/commit/bad3164).

`src/core/replay.c` records frame-indexed joypad bitmaps plus a post-frame state hash (FNV-1a over RAM, PPU registers/VRAM/OAM/scroll state, APU registers, joypads). The versioned format rejects bad magic, unsupported versions and truncated files with clear messages; `replay_run` replays from a fresh reset and reports the first divergent frame with both hashes. Frontend gains `--record`/`--play`. Verified: a 1200-frame recording (title → Start → running through 1-1) replays hash-identically.

This is the input layer for #36's reference comparison harness — fixed input sequences are now expressible as files.

Bonus: the first CI run earned its keep. gcc-14 rejects a missing-parens expression in `gamemode.c` that clang silently accepted, and ubuntu-24.04's default cc is too old for `-std=c23`.
