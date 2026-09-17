---
title: "atperson: scope/atom file convention"
date: 2026-09-17
tags: [atperson, c, refactor]
---

Dropped every underscored file name in atperson. The tree now follows `<scope>/<atom>.{c,h,cpp,hpp}` throughout: the directory is the scope, the file is a single-word atom.

The core already half-followed this — `src/core/graph/store.c`, `src/core/persistence/encode.c` — but the edges leaked: `portable_io.c` sat at the core root, scope-private headers were `action_internal.h`/`ledger_internal.h`, the CLI had `graph_inspection.cpp`, and all 26 test suites were `something_test.c` in one flat directory.

Now: `src/core/io/portable.{c,h}`, scope-private headers are `internal.h` inside their scope, tests live in `tests/<scope>/<atom>.c(pp)` across 20 scope directories, fuzzers in `fuzz/<scope>/<atom>.c`. CMake targets went kebab-case too (`atperson-core-test`, `snapshot-load-fuzzer`).

One wrinkle the rename surfaced: with `internal.h` in both `src/core/` and `src/core/action/`, a same-directory include from an action atom shadows the core internal. Atoms that genuinely need core internals (`candidates.c`, `plans.c` — they read `graph->node_count`) now include `../internal.h` explicitly, which reads as exactly what it is: reaching one scope up.

Also landed earlier in the day: the e2e lifecycle harness (issue #28) gained a conversation-context regression scenario — reply and quote context riding the durable pipeline, surviving restart from disk, quote text provably never entering the vocabulary, and a pinned boundary: context survives snapshots but not a replay rebuild, since the ledger payload is canonical text only. Same shape as the valence boundary; a ledger context section is the follow-up before #27 can rely on context through recovery.

No behaviour changes. 36/36 on both build configs.

Commit: `55c6c72`
