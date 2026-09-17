---
title: atperson — deterministic e2e lifecycle harness
description: Scripted-feed scenario harness for multi-run lifecycles, crash recovery, withdrawal, and cross-run determinism.
date: 2026-09-17
tags: [atperson, testing, c23, cpp23]
---

Added `tests/e2e_harness.cpp` (issue #28): a deterministic end-to-end
scenario harness that exercises the real durable pipeline — ledger files,
graph snapshots, ingestion state — without network access. The only
fixture is the page fetcher; everything else is the production code path.

Scenarios:

- **Multi-run catch-up** — three scripted pages, one page per run, two
  restarts from disk; asserts resumed cursors, accumulated checkpoints,
  and the final snapshot.
- **Crash recovery** — a run dies between ledger commits and the snapshot
  save; the ledger is authoritative, and a replay rebuild recovers the
  full learned state.
- **Transient failure** — a transport throw leaves the persisted cursor
  and snapshot untouched; retry resumes from the checkpoint.
- **Duplicate suppression** — a replayed timeline is fully deduplicated by
  the ledger across restarts.
- **Withdrawal flows** — deleted-post and blocked-author withdrawals,
  rebuild, and a pinned invariant: WITHDRAWN is a committed outcome, so a
  withdrawn observation reappearing in the feed stays a duplicate and is
  never re-learned.
- **Planning abstention** — empty and unknown contexts abstain with the
  documented reasons on recovered state; learned contexts decide
  deterministically.
- **Cross-run determinism** — equivalent scenario runs produce
  byte-identical final learned state.

Both build configurations (network off/on) pass 33/33 tests. Commit
`1eecf4e`.
