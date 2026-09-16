---
title: atperson writer lock and first-run bootstrap
description: atperson mutating commands now take an exclusive writer lock on the data directory with automatic stale-lock reclamation (dead pid and reboot detection), and a C23 first-run bootstrap creates ~/.ewanc26/atperson plus a documented .env template (0700/0600) when either is missing. Read-only commands run lock-free with an explicit consistency model. Issue #26 closed.
date: 2026-09-16T04:35:00+01:00
tags: [atperson, c23, cpp23, ci]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvm7apq7222y"
---

## atperson

### #26: single-writer state-directory ownership

The snapshot, ledger, commit marker, and ingestion cursor form one logical state set, but nothing stopped two processes mutating them concurrently. Every mutating command (`ingest`, `ingest-file`, `sync`, `cursor reset`) now acquires an exclusive lock on the data directory before touching durable state: a `.writer-lock` file created with `O_CREAT|O_EXCL`, recording the owner pid, a boot marker, and the acquisition time. RAII releases on exit, exception, or unwind.

Stale detection is the interesting part. A lockfile whose owner pid is dead (`kill(pid, 0)` probe, EPERM counts as alive) or whose boot marker differs from the current boot (sysctl `kern.boottime` on macOS, `/proc/stat` `btime` on Linux — the machine rebooted, so no live process can still hold it) is provably stale and reclaimed automatically. A live owner is respected and acquisition fails with a diagnostic naming the holder. An empty lockfile — the microsecond window between `O_EXCL` create and the metadata write — gets a ~50ms grace retry before being treated as abandoned, so a competitor never misreads a just-created lock as stale. That last case surfaced in the first CLI smoke test: the second concurrent writer read the lockfile before the first had written its metadata and got "unparseable lock file" instead of a clean refusal.

Read-only commands run without the lock and observe state as of their own read; a concurrent writer may commit after the reader started. That trade-off is now documented in the architecture doc rather than left implicit.

Tests include a real competing-process case: a forked child holds the lock and blocks the parent's acquire; a SIGKILLed child's leftover lockfile is reclaimed via dead-pid detection. Issue #26 closed; roadmap #29 ticked.

### First-run bootstrap (C23)

When the data directory or `.env` file doesn't exist, `atp_bootstrap_home` — plain C23 in the core layer, no learning logic, no network — creates both before any command runs: the directory at mode `0700`, and a `.env` template at mode `0600` documenting every environment variable atperson reads, with a suggested `set -a; . ~/.ewanc26/atperson/.env; set +a` invocation. atperson never parses `.env` itself; it reads the environment, the file is operator convenience. Idempotent: existing files are never touched, and a run that creates nothing prints nothing.

Two CI follow-ups: the lock module initially missed its commit (CMake referenced files that didn't exist on the remote — caught by configure-time failure on all five jobs), and `setenv`/`unsetenv` in the bootstrap test are POSIX, not C23, so the test target needed the same `_POSIX_C_SOURCE=200809L` define the core library already uses. All 5 CI jobs green; 12/12 tests in both core-only and network builds.
