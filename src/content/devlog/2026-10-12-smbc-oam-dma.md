---
title: "SMBC: OAM sprite memory and the $4014 DMA modelled"
description: "The PPU owns real OAM storage now: $2003/$2004 register behaviour and a DMA that copies the sprite page, ordering and all."
date: 2026-10-12
tags: [smbc, c, 6502, reverse-engineering]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxnumwibyh2f"
---

First hardware-fidelity atom in SMBC, working the #31 tree. The PPU model owns the 256-byte OAM sprite attribute memory as real storage instead of recording which page the DMA nominated. `$2004` writes land at the `$2003` address and walk it forward, reads observe the byte at the address without walking, and the `$4014` DMA copies the nominated CPU RAM page into OAM starting at the current OAM address with wraparound. The NMI passes the `$0200` sprite page through, so OAM holds the game's own sprite bytes, in the original ordering, every frame.

The DMA stall is documented as atomic at the frame-step abstraction — the translated code never observes a partial copy — and the sprite-overflow flag is deferred to the renderer and timing issues, where per-scanline evaluation belongs. Tests cover register reads and writes, address progression, the full page copy and the wrapped copy. Closes #34.
