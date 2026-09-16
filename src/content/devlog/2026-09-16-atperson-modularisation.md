---
title: "atperson: modular file mandate and ledger split"
description: "AGENTS.md now mandates modular atomic files with an explicit concurrency contract; ledger.c (1670 lines) splits into five single-concern modules."
date: 2026-09-16
tags: [atperson, c, release]
draft: false
---

atperson `6efbb0f` + `94a41a8` — modularisation begins (issue #42).

AGENTS.md now carries a hard rule: one file owns one concern, split past ~500 lines before extending, every file builds and tests independently, shared helpers get their own translation unit instead of being copied into whatever file is convenient. The tokenizer duplication that produced five byte-scanner copies is the named cautionary example. The concurrency contract is explicit too: the C23 core is single-threaded by design — no internal locking, callers own serialisation — and the C++23 runtime may parallelise ingestion and I/O only around that contract, through one owner thread or an explicit serialisation point. Learning stays deterministic; if parallelising changes learned state, the design is wrong.

The rule applies to the existing offenders. `ledger.c` was 1670 lines mixing five concerns; it is now:

| Module | Lines | Concern |
|---|---|---|
| `ledger.c` | 725 | public API composition layer |
| `ledger_format.c` | 212 | record wire format, encode/decode |
| `ledger_off.c` | 111 | durable commit marker, crash ordering |
| `ledger_index.c` | 138 | in-memory dedup index (derived state) |
| `ledger_recover.c` | 489 | torn-tail truncation, marker healing, v1→v2 migration |

Shared internals live in `ledger_internal.h` — magics, the `atp_ledger` struct, and cross-module prototypes with one-line contract comments. Single-module helpers stay static. The split is behaviour-preserving: no logic, signature, or file-format changes, verified by the full suite on core, ASan, and network builds, and by a line-multiset comparison of old file against the new concatenation.

The concurrency contract also landed in `core.h` as an API-boundary comment, and the growth test now cleans up its ledger sidecar files (`.off`, `.off.tmp`) so a second run doesn't trip `ATP_ERR_FORMAT` on stale state — matching the existing ledger/action test cleanup convention.

Next: `graph.c` (1223) splits into index and episodic-memory modules, then `persistence.c` (1037) into encode/decode/migration.
