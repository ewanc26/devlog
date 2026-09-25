---
title: ATperson supervisor health surface
description: The daemon beats a heartbeat every cycle and autonomy health gives a supervisor machine-readable liveness with exit-code semantics
date: 2026-09-24
tags: [atperson, autonomy, ops, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwcjc64vhf2y"
---

The first slice of persistent hosting: a watchdog can now tell a live daemon from a hung one, without a shell.

## Changes

- **Heartbeat** — the daemon writes `autonomy-heartbeat.json` atomically (temp file + rename) at the end of every cycle: run id, cycle number, RFC 3339 beat time, phase. Advisory liveness evidence only — a stale heartbeat authorises nothing.
- **`atperson autonomy health`** — supervisor-pollable liveness with machine-readable JSON and exit codes: 0 healthy, 1 stale, 2 unreadable. A systemd unit or compose healthcheck restarts on non-zero. Staleness threshold defaults to 15 minutes, overridable via `ATPERSON_HEALTH_MAX_AGE_SECONDS`.
- **Fail-closed verdicts** — missing heartbeat (never started), corrupt heartbeat, and non-RFC-3339 timestamp are all unreadable. The check distinguishes "never started" from "running but writing garbage".

## Notes

- The heartbeat is local runtime metadata in the central data directory; it never touches the PDS or learned state.
- Seven offline tests in the new `atperson-heartbeat-test`: round-trip, atomic save with no temp residue, and each verdict path.
- Remaining persistent-hosting work: remote operator channel over AT Protocol, NixOS/compose deployment, recovery runbook, resource policy.
