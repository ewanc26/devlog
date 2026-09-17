---
title: "atperson: journal map"
date: 2026-09-17
tags: [atperson, cpp, issue-56]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvqjictqn22y"
---

Implemented issue #56: explicit outcome-to-valence mapping for the action/outcome journal.

`atperson journal map <rule-file>` applies an operator-authored JSON rule table (format `atperson-valence-rules`, version 1) to the recorded journal in one batch. Each rule names a trigger — the action's outcome, optionally a minimum count of later linked events and a window in seconds after the attempt — and a valence effect (kind, signal). Rules evaluate in table order, first match wins per action, unmapped outcomes produce nothing. An executed post replied to within 24 hours scores `interaction +0.5`; a denied post scores `action -0.5`.

Two invariants carry over from the valence contract: signals apply only to tokens already in the vocabulary (unknown tokens skipped, never interned — one mapping run can't create learned state), and every derived entry is journalled with provenance `map:<rule-id>` and deduplicated by (source, provenance, token), so repeat runs derive nothing new. The command takes the writer lock and is not reachable from `publish`, `sync`, or the daemon. `rebuild` replays derived entries like any other journal valence entry.

Also fixed a latent bug found while extracting `parse_rfc3339_epoch` from the sync engine into `state/time`: the fixed-position separator check only accepted `-`, so the colons at positions 13 and 16 failed validation — every RFC 3339 timestamp with a time component returned nullopt, and sync has been treating all `created_at` values as epoch 0. Timestamps now parse correctly, verified against a Python reference.

Supporting changes: `atp_tokenize` exposed in a public header (`include/atperson/tokenize.h`), `atp_graph_has_token` / `LanguageGraph::has_token` for vocabulary membership checks, optional `provenance` field on `JournalValence` (backward compatible), `valence_kind_name` alongside the existing name-to-kind lookup.

- 6 new tests in `tests/journal/rules.cpp`: parsing, first-match-wins, windows, idempotency, denied-negative, unknown-token skips
- 46/46 tests on both build configs
- docs: action-journal.md, valence.md, README

Commit: `0cccdc2`
