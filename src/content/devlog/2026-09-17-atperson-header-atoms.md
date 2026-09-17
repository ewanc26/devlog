---
title: atperson — scoped private-header atom names
description: Shortened redundant scoped private-header names and closed the modularisation issue.
date: 2026-09-17
tags: [atperson, refactor, c23, cpp23]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvpri2svo22y"
---

Closed issue #42 (modularisation). The last two items:

- `main.cpp` thinning (`96a3c66`, devlog
  [2026-09-17-atperson-cli-atoms](https://devlog.croft.click)) — 500 → 231
  lines, command bodies in `src/app/cli/` atoms.
- Private-header atom-name shortening (`7a63463`) — headers that repeated
  their scope name now match their already-short implementation siblings:
  `ingestion/policy.hpp`, `ingestion/state.hpp`, `resource/budget.hpp`,
  `resource/runtime.hpp`, `resource/system.hpp`, `state/lock.hpp`,
  `sync/engine.hpp`, `action/inspection.hpp`, `atproto/client.hpp`,
  `cli/graph.hpp`, `cli/ledger.hpp`.

Header guards were already in the short form, so files now match their
guards. Core-side `ledger_internal.h` and `action_internal.h` keep their
names deliberately: renaming them to `internal.h` would shadow
`src/core/internal.h` in quoted-include lookup. The audit scope was
already short-named.

Include-only change; both configurations build and pass 33/33.
