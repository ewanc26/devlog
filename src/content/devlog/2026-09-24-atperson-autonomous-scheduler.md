---
title: ATperson autonomous scheduler
description: Bounded decision-to-execution cycles after perception, composing the existing gate chain without a privileged write path
date: 2026-09-24
tags: [atperson, scheduler, autonomy, atproto, cpp]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwbdrgtffn2y"
---

The daemon ran only the perception half of the agent loop. Issue #140 adds the scheduling half: after each bounded perception cycle, the runtime can now decide, propose and execute — through the same gates, never around them.

## Changes

- **`src/app/scheduler/cycle`** — one bounded cycle: recent committed ledger payloads become decision contexts (the ledger stays the sole observation authority), the guarded C23 decision layer accepts or abstains, and accepted plans are frozen as `atperson-outbound-action` v1 proposal documents under `scheduler/proposals/<digest>.json`. Abstention is a first-class counted outcome.
- **Shared attempt atom** — publish's gate-load → execute → budget → audit → journal sequence is extracted into `outbound/attempt`. The publish CLI and the scheduler now call literally the same code, so there is still exactly one write path.
- **Approved execution** — proposals execute only when the operator has approved their exact digest (`atperson control approve`), oldest first, gates reloaded from disk per attempt. A pause or revocation between cycles always wins. Executed proposals are consumed; refused ones stay for the operator.
- **Daemon wiring** — the scheduler runs in the daemon's `on_cycle` hook, off by default (`ATPERSON_SCHEDULER=1`), with per-cycle bounds on contexts, proposals, executions and wall clock.
- **`autonomy status`** — now reports pending proposal count alongside phase and run detail.

## Safety

- Proposal files are written atomically (temp + rename); an interrupted cycle leaves no partial state.
- Execution remains the atomic idempotent unit it was: frozen rkey, putRecord retry semantics.
- No new write kinds, no C23 decision changes, no gate weakening. The scheduler composes.

## Verification

- New offline `atperson-scheduler` test: fake writer, injected clock, real ledger and gate files. Six scenarios including disabled inertness, unapproved freeze, approved execution, pause refusal, no-rewrite and abstention.
- Core-only build 53/53, network build 59/59, no new warnings.
- PR #145.
