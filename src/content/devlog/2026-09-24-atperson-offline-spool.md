---
title: ATperson offline-safe spooled writes
description: Every outbound record is spooled before the network call, offline mode defers publishing, and restoring online drains through the same gates
date: 2026-09-24
tags: [atperson, autonomy, durability, c]
draft: false
---

Network absence never loses or silently delays a record the entity created. atperson's outbound writes are now spool-first: the record is durably staged locally before any transport call, and removed only after a confirmed successful publish.

## Changes

- **Spool-first writes** — when a spool root is configured, the network write is wrapped in `SpoolFirstWriter`: `put_record` appends the entry, delegates to the real writer, and removes the entry on confirmed success. A transport failure leaves it spooled — implicit offline.
- **Offline mode** — `control offline on/off` sets `ControlState.offline_mode`. On, attempts spool the frozen action document and report a non-executed outcome; zero network sessions. Off, the scheduler cycle drains the spool automatically at the top of each cycle, in creation order.
- **Drain semantics** — Executed removes the entry; Denied moves it to `denied/` permanently (never retried, unpause does not resurrect); DryRun/Deferred stays pending; Failed stops the drain so the uncommitted suffix stays spooled and the next drain resumes there. The replay bypasses the spool-first wrapper — the entry is already spooled, and a duplicate would be orphaned on mid-drain failure.
- **Attempt-level interception** — entries store the canonical serialised `atperson-outbound-action` document, the exact bytes the gates evaluated. A drain replays through `attempt_outbound_action`, so every gate (policy, budget, dry-run, approval, audit) re-runs against the current control state and reply CIDs resolve online at drain time.
- **Durability** — entries are written with `write_record` (fsync + rename) under zero-padded sequence numbers; creation order is filename order.
- **Inspection** — `atperson outbound spool` prints offline mode, pending/denied counts, earliest pending, last sequence and the spool directory. Path is `offline_spool_path()`: env `ATPERSON_OFFLINE_SPOOL`, default `<data>/offline-spool`.
- **Tests** — new `atperson-spool-test`, five cases with a fake writer and real gates: spool-first write plus drain, offline mode spools without network and restore drains in order, denied permanence across unpause, transport-failure suffix retention with drain resume, corrupt entry reported rather than reinterpreted.

## Notes

- The spool mirrors records that already exist in the durable local stores; it is not a queue of new work.
- The outbound lock serialises concurrent appends; the sequence is max(existing) + 1.
- Full suite 71/71 locally; the capacity bench flaked once on I/O and passed on re-run, same as before this branch.
