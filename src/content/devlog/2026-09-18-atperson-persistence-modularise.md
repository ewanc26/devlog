---
title: atperson persistence layer modularisation
description: Consolidate v5/v6 snapshot codecs into scoped atoms, removing underscored compound files
date: 2026-09-18
tags: [atperson, refactor, persistence, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvsa2jsefe2y"
---

Following the v6 persistence feature (#72) and a dead/duplicate logic cleanup pass, modularise the persistence layer to satisfy the atperson naming convention and eliminate duplicated section-walk scaffolding.

## Changes

- **New atoms**: `persistence/sections.{c,h}` (shared section codecs), `persistence/v5.{c,h}` (legacy format), `persistence/v6.{c,h}` (explicit architecture format), `persistence/save.c` (public save dispatch)
- **Reader helpers**: `atp_reader_next_section` and `atp_load_finish` in `reader.c` shared by both loaders
- **Deleted**: `encode_common.c`, `encode_v6.c`, `encode.c`, `decode_common.c`, `decode_v6.c`, `decode.c` — all violated the "no underscored file names, ever" rule
- **Required-section masks**: Fixed bit positions (bit N-1 for tag N): v5 = `0x3F` (tags 1–6), v6 = `0x43F` (+ ARCH bit 10)

## Verification

All three CI configs (network ON/OFF, ASan) 49/49 green.

Commit: `71a3605`
