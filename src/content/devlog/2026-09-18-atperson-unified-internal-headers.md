---
title: atperson unified internal headers
description: Scope-private internal.h headers for persistence, graph, and action scopes, superseding per-atom headers
date: 2026-09-18
tags: [atperson, refactor, headers, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvteitbxje2y"
---

Following the persistence modularisation, consolidate each core scope behind a single unified internal header that all of the scope's atoms include.

## Changes

- **`persistence/persistence_internal.h`**: single scope-private header consolidating includes and all internal type definitions (`atp_buffer`, `atp_section_writer`, `atp_reader`, `atp_section`) and function declarations. All 8 persistence atoms include only this header.
- **`graph/graph_internal.h`**: same pattern for the 7 graph atoms (lifecycle, index, groups, store, observe, query, valence).
- **`action/action_internal.h`**: same pattern for the 4 action atoms (candidates, plans, ordering, guard).
- **Deleted** the superseded per-atom persistence headers (format.h, reader.h, wire.h, sections.h, v5.h, v6.h, migration.h) after folding the wire-format identifiers into the unified header.

## Verification

All three CI configs (network ON/OFF, ASan) 49/49 green.

Commits: `ae92c81`, `060ca7b`, `d9484f5`
