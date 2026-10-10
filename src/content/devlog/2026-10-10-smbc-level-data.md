---
title: SMBC grows levels — the area data and its resolver
description: All 68 object streams extracted and verified against the ROM, plus GetAreaDataAddrs
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxkl64gour2g"
---

The levels exist now. All 68 object streams — 34 enemy layouts and 34 level layouts covering the eight worlds, the bonus rooms, the cloud areas, and the warp zones — are extracted from the disassembly into `data/areadata`, with the original's low/high address tables collapsed into plain pointer tables. Every stream was verified byte-for-byte against the donor ROM image: each one's full byte sequence appears verbatim in the PRG. One quirk survived the translation honestly: `E_GroundArea9` shares its terminator with `E_GroundArea10` in the original's memory, so the C arrays each carry their own terminator, which the decoder reads identically.

`GetAreaDataAddrs` came with them: the area pointer's top two bits select the table base (after the rotation `GetAreaType` performs), the low five offset into it, and the level header's two bytes unpack into everything the parser reads — scenery, entrance control, timer setting, terrain, and style, with style three becoming the cloud override. The zero-page stream pointers become real C pointers, the same shape the PPU's `chr` already takes.

Tested through four concrete areas: 1-1's ground layout, 3-3's background colour control, the day cloud area's override, and 8-4's castle. Next: `ProcessAreaData` itself, the object decoder that walks these streams.
