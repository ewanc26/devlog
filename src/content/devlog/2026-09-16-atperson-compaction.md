---
title: "atperson: safe ledger compaction"
description: "The observation ledger can now be compacted atomically — patches flatten, withdrawn payloads drop, ids stay stable."
date: 2026-09-16
tags: [atperson, c, release]
draft: false
---

atperson `8d49a76` — safe ledger compaction and checkpointing (issue #7).

`atp_ledger_compact` rewrites the ledger into a compacted generation. The append-only design grows without bound; compaction reclaims the provably dead bytes in one atomic, opt-in pass.

- Patch records flatten to final entry outcomes — the same documented behaviour as the v1 migration.
- WITHDRAWN payloads drop: replay excludes withdrawn entries, the dedup tombstone still suppresses re-observation, and withdrawal is durable, so the bytes are unreachable by design.
- LEARNED/SKIPPED/PENDING/FAILED payloads are retained — replay needs LEARNED bytes, and non-committed entries can still close to LEARNED.
- Entry ids are stable across generations, so episodes and source references need no remapping.

Crash safety follows the ledger's existing write ordering: fsync the staging file, remove the commit marker, rename, reopen, rewrite the marker. Every interruption point leaves either the intact previous log or the complete compacted log; self-heal recovery resolves the window between marker removal and rename.

`atp_compact_report` records entries, patches flattened, payloads dropped, and bytes before/after. C++ `Ledger::compact()` and `atperson compact` surface it.

Tests cover outcome identity across all five outcomes, dedup after compaction, payload retention, reopen, both crash windows, empty-ledger compaction, and rebuild equivalence — replaying before and after compaction produces byte-identical snapshots. 22/22 on core, ASan, and network builds.
