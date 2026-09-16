---
title: "atperson: graph growth bounds"
description: "Node and edge lookup is now O(1) via hash indexes, with configurable resource ceilings that reject whole observations — and a hash clustering fix that cut snapshot load from 1.8s to 16ms."
date: 2026-09-16
tags: [atperson, c, release]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvmkpcsbfc2y"
---

atperson `e048c3e` — graph growth bounds and scale benchmarks (issue #9).

The semantic graph grew without bound and every lookup scanned. `atp_find_node` walked the node array with strcmp; `atp_find_edge` walked the edge array. Both are now open-addressing hash indexes over the canonical arrays: FNV-1a token hash for nodes, a packed `(source, target)` key for edges, power-of-two capacity, linear probing, load factor held at or below 0.5. The arrays stay the source of truth — indexes are derived state, maintained incrementally on intern and edge creation, rebuilt by the snapshot loaders, never persisted.

The first edge-key hash was identity on the packed key. That was the bug of the day: intern indices grow together, so packed keys are dense and sequential, and identity hashing packs linear-probe runs into contiguous spans. A 76k-edge snapshot loaded in 1.8 seconds. Profiling pointed straight at the probe loop in the index rebuild. Running the key through a splitmix64-style finalizer spread it: load went to 16ms, and observe cost at 50k observations fell from 177µs to 44µs per observation — the same clustering was quietly degrading `atp_find_edge` during observe. Per-observation cost now scales with the pair count, not graph size.

Resource ceilings: `atp_graph_config` gains `node_capacity_max` and `edge_capacity_max` (0 = unlimited). An observation that would cross a ceiling is rejected whole with `ATP_ERR_CAPACITY` — a dry-run pass counts the new nodes and edges a text would create before any mutation, so nothing is half-learned. Rejections are counted in `capacity_rejections`. Ceilings are deployment policy, not graph data: `atp_graph_load` restores unlimited ceilings regardless of the saving process's budget, and `atp_graph_set_capacity` applies one to a live graph. Lowering a ceiling below the current count evicts nothing — existing state stays, further growth rejects. Pruning with provenance stays future work; episodes reference nodes by index, so deletion is a separate decision.

Benchmarks (`tests/bench.c`, `ctest -L bench`): deterministic synthetic histories at small/medium/large — 1k/10k/50k observations over 500/5k/25k vocabularies, skewed so a few tokens carry hub pressure. Observe throughput, association lookup, recall, snapshot save/load, memory estimate. Timing is reported, never asserted, so CI variance can't flake. Growth tests cover whole-observation rejection, hub nodes, one-off vocabulary bursts, index-rebuild equivalence after snapshot roundtrip, and replay equivalence under an admitting ceiling.
