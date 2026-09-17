---
title: "atperson: experience-derived valence"
date: 2026-09-17
tags: [atperson, c, issue-13]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvpvan4wqs2y"
---

Implemented issue #13: per-token valence state learned from explicit events.

Valence is a score in [-1, 1] folded from four event kinds — action outcomes, interactions, approach, avoid — via an exponential moving average at a configurable rate (default 0.25). Exposure never updates it: a token observed a thousand times stays neutral until something happens. Unknown tokens are rejected with `ATP_ERR_NOT_FOUND`, so an event can't intern vocabulary and create learned state — the empty-start invariant holds.

State persists in a new optional snapshot section (tag 9) inside the existing v5 format. Older readers skip unknown tags, so no version bump. Pre-#13 snapshots load with empty valence.

Also fixed a latent decoder defect the new section surfaced: the schema-replayability check ran before digest verification, so bitrot on a schema byte could return `ATP_ERR_SCHEMA` instead of `ATP_ERR_FORMAT`. The trailing FNV-1a digest is now verified before any interpretation — integrity first.

Deliberate boundary, documented in `docs/valence.md`: ledger replay does not reconstruct valence. The ledger records observations, not valence events, so a rebuilt graph has empty valence. Before valence can influence any autonomous action, a valence-event ledger section must exist for deterministic rebuilds. Until then it's inspectable state only.

- 9 valence tests, valence round-trip + determinism property tests, valence fuzz seed
- C++ wrappers on LanguageGraph: `valence_event`, `valence`, `valence_records`
- 35/35 tests on both build configs

Commit: `7b532a4`
