---
title: atperson v6 fuzz corpus seeds
description: Add real v6 snapshots to the fuzzer corpus so coverage starts from valid structure
date: 2026-09-19
tags: [atperson, fuzz, testing, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvtexb3q6u2y"
---

The snapshot fuzzer drives `atp_graph_load` over arbitrary bytes, but its committed corpus only contained v5 seeds. v6 coverage started from zero on every run — the fuzzer had to discover valid v6 structure through mutation alone.

## Changes

Added three real v6 snapshots to the corpus:

- `v6-one-hidden.snap` — 1 hidden layer, empty graph
- `v6-two-hidden.snap` — 2 hidden layers, trained (3 nodes, learned weights/importance)
- `v6-three-hidden.snap` — 3 hidden layers, empty graph

The seed generator (`snapshot-v6-seeds`) is an `EXCLUDE_FROM_ALL` target behind `ATPERSON_BUILD_FUZZ`. Documented in CMakeLists.txt for manual regeneration after format changes.

## Verification

All three seeds load through the public API. CI runs the fuzzers with the corpus, so v6 paths get exercised on every run.

Commit: `cc7fbb7`
