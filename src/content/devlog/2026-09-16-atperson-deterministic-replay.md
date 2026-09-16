---
title: atperson deterministic replay
description: "atperson gains atp_replay_ledger and an atperson rebuild command — learned state reconstructs from the observation ledger alone, in ledger id order, through the same observe path sync uses. Explicit outcome semantics, atomic snapshot replacement, byte-identical rebuilds. Issue #3 closed."
date: 2026-09-16T05:15:00+01:00
tags: [atperson, c23, persistence]
draft: false
---

## atperson

### #3: deterministic rebuild/replay from the observation ledger

With #2 retaining canonical payloads, the ledger could in principle rebuild learned state — but nothing actually did it. #3 closes that gap.

`atp_replay_ledger(ledger, graph, report)` re-applies committed observations in ledger id order — the order they were originally observed in — through the same observe path sync uses (`atp_graph_observe_with_memory` + ledger mirror). Same config seed, same PRNG stream, same training decisions: a rebuilt graph is what the original run would have produced from the same bytes, not an approximation.

Outcome semantics are explicit rather than inferred. LEARNED entries re-train from their retained payloads and mirror into the snapshot. SKIPPED entries mirror only — observed but deliberately not learned, exactly as the original run decided. PENDING and FAILED are excluded entirely: retryable reservations, not committed experience, and a rebuild must never train on them. The report counts every class so callers can audit what happened.

Refusal is honest. A LEARNED entry without a retained payload (a v1-migrated ledger — the training input is gone) fails the whole rebuild with `ATP_ERR_FORMAT` and `failed_at_id` set, rather than silently producing a graph that never saw those bytes. Unimplemented schema versions fail the same way instead of being reinterpreted.

The CLI surfaces this as `atperson rebuild`: writer lock, replay into a fresh graph, atomic save (tmp + fsync + rename). A failure at any point leaves the previous snapshot untouched; the rebuilt snapshot replaces it only on success. Two rebuilds of the same ledger produce byte-identical snapshots — verified end-to-end through the CLI, not just in-process.

ASan caught a real bug before it shipped: the replay buffer was allocated at exactly `payload_len` while the observe path reads it as a NUL-terminated C string — a one-byte heap overflow on every replayed entry. The fix allocates `payload_len + 1` and NUL-terminates explicitly. The same pass fixed a latent leak on the early-return paths.

Tests: outcome semantics across all four classes, double-replay equivalence (stats, familiarity, associations), snapshot roundtrip of rebuilt state (mirror/episodes/neural/PRNG all persist), schema mismatch refusal, payload-less LEARNED refusal, and rebuild safety (a failing rebuild leaves the old snapshot intact). 18/18 tests in both build configs, clean under ASan/UBSan. Issue #3 closed; roadmap #29 ticked. Next: #4, source withdrawal/deletion/unlearning semantics — the rebuild machinery just built is the foundation for it.
