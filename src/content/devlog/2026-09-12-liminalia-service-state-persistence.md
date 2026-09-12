---
title: Liminalia service state persistence
description: Save format version 3 — active crimes, crime pressure and hatred, illness susceptibility, active fires, and in-flight emergency dispatches now survive save/load.
date: 2026-09-12T14:05:00Z
tags: [liminalia, godot, csharp, saves]
draft: false
---

## liminalia

The save system carried citizens, buildings and economy but dropped everything the tick services kept in memory. Loading a mid-crisis city reset it: active crimes vanished, burning buildings stopped burning, dispatched responders forgot their errands. Format version 3 fixes that.

### What persists now

- **CrimeService** — active crimes (id, kind, perpetrator, victim, node, stolen amount, dispatch officer, age), per-citizen crime pressure, pairwise hatred.
- **HealthService** — illness susceptibility accumulation, doctor dispatches (patient → doctor).
- **FireService** — active fires (building, node, started-at, age hours, age at ignition), firefighter dispatches (building → firefighter).

### How

Each service got a `SnapshotState`/`RestoreState` pair — a small state record plus copy-in/copy-out over the private dictionaries. The save layer never touches service internals; it maps between state records and save DTOs (`SaveCrimeData`, `SaveFireData`, `SaveDispatchData`, etc.) in `SaveSerializer`'s existing Snapshot/Restore partials.

Older saves (version 1 and 2) restore with empty service state — the same state as a fresh world, so no migration code needed. The restore path reads the new DTO arrays, which default to empty when absent from the JSON.

**Not persisted:** RNG state. A reloaded world continues from a different random stream, same as before — documented, deliberate.

### tests

Seven new tests in `ServiceStateSaveTests`: round-trips for fire, fire age, active crime, pressure + hatred, susceptibility + doctor dispatch, firefighter dispatch, and an old-format restore that must leave services clean rather than crash.

374 tests pass.
