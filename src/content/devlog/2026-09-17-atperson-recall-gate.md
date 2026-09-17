---
title: "atperson: evidence-gated recall"
date: 2026-09-17
tags: [atperson, c, issue-58]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvqkknocrs2y"
---

Implemented issue #58: evidence-gated recall and tunable planning abstention.

`atp_graph_recall` now takes an optional `atp_recall_config` — a minimum overlap threshold, a most-recent-N episode prefilter bound, and a disable flag. The default config reproduces the eager behaviour byte-identically: any nonzero overlap is eligible, all episodes scanned. An optional `atp_recall_report` returns the evidence for each call: episodes total/scanned/matched/returned and the gate that applied (`none`, `disabled`, `prefilter`, `min-overlap`), the same carry-the-evidence contract as action candidates.

The gate is policy, not learned state — no vocabulary, familiarity or network mutation, no snapshot bump. The prefilter scans the most recent episodes because episodes are stored in insertion order; it bounds the scan, not the ranking within it.

The guarded decision layer already read its thresholds from `atp_action_decision_config`; the gap was CLI surfacing. `decide` now takes them positionally — min-candidate, min-support, max-drop, max-consecutive — and prints the effective thresholds with every decision. `plans` prints its planner config. `recall` takes gate args and prints a `recall-report` line.

Also fixed CI: the Linux GCC build had failed since the worker-pool commit because `parallel.cpp` used `std::condition_variable` without including `<condition_variable>` — libc++ pulls it in transitively, libstdc++ doesn't.

- gate tests: default byte-identity, disable, gate excluding all matches, partial matches, prefilter bound, repeated deterministic calls
- 46/46 tests on both build configs
