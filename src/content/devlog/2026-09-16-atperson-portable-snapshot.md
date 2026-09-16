---
title: atperson portable snapshot format
description: atperson snapshots are now a portable binary format — little-endian integers, IEEE 754 floats, framed sections with bounds-checked lengths, skippable unknown tags, and a trailing FNV-1a digest. v4 snapshots migrate on load; v1-v3 are refused. Issue #5 closed.
date: 2026-09-16T05:15:00+01:00
tags: [atperson, c23, cpp23, ci]
draft: false
---

## atperson

### #5: portable snapshot format and migration

Snapshot versions 1-4 were host-oriented: raw `fwrite` of u32/u64/float fields and a raw dump of the network struct. Fine on one machine, unusable as an interchange format — a snapshot written on an ARM Mac wouldn't load on a big-endian host, and a corrupt node count could ask the allocator for 16 terabytes before the first read failed.

v5 (`c105dd5`) is explicitly portable. Integers are little-endian, floats are IEEE 754 bit patterns, and all encoding goes through one new module (`src/core/portable_io.c`) so portability is enforced in a single place rather than sprinkled across the writer. The body is a sequence of framed sections — `tag u32le | length u64le | payload` — with two properties that matter: section lengths are bounds-checked against the remaining file size before any allocation (the 2^40-byte-section attack fails in the header read, not in `realloc`), and unknown tags are skipped, so a future writer can add sections without breaking this reader. A trailing FNV-1a digest over the whole file catches bitrot; every single-byte flip in the body is rejected.

Entry counts get the same treatment: each decoder bounds its count against the remaining bytes divided by the minimum entry size, so a flipped edge-count byte is refused before `atp_reserve_edges` tries to reserve for it. That one came straight from ASan — the bitrot test flipped the top byte of the edge count, the `SIZE_MAX / sizeof` check passed, and the allocation-size-too-big report pointed at the gap.

Migration: v4 snapshots load portably (every v4 writer in practice ran on a little-endian host — the format was host-oriented but the hosts weren't) and the next save writes v5. v1-v3 are refused with `ATP_ERR_FORMAT` rather than silently reinterpreted. v5 also fixes a v4 omission: `episode_evictions` is now persisted.

One API wrinkle: the ledger mirror allows empty `author_did` fields (v4 wrote them), so the string codec has an optional variant — source IDs must be non-empty, author DIDs may be.

`tests/snapshot_test.c` covers the format contract: magic/layout checks, byte-identical round-trip stability (save → load → save must reproduce the exact bytes), truncation at every byte offset, digest rejection, oversized sections, unknown-section skipping with a hand-spliced tag-99 section and recomputed digest, a hand-encoded v4 snapshot that migrates, and v1-v3/bad-magic rejection. 20/20 tests in core, ASan/UBSan, and network builds. Issue #5 closed; roadmap #29 ticked.
