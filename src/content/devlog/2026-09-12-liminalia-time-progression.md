---
title: Liminalia time progression
description: "A full day is now exactly 2000 fixed ticks — 100 real seconds at TimeScale 1 — with the clock anchored to today at 08:00, and a new AdvanceSim API for exact simulated time travel."
date: 2026-09-12T15:30:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
---

## liminalia

The old engine ran simulated time 1:1 with real time: one tick was 50ms of sim time, so a full day took 1.7 million ticks. Day/night was invisible in practice. The redesign makes a day a first-class unit of the tick grid.

### The new contract

- `TicksPerDay = 2000` — a full day/night cycle is exactly 2000 fixed ticks.
- `SimSecondsPerTick = 43.2` — 86400 sim seconds spread over the day.
- Real cadence unchanged: 20 ticks per real second, so a day takes 100 real seconds at TimeScale 1.
- New worlds start at **today 08:00 local** — the city begins in the morning of the day you launched it.

### AdvanceSim

`Tick(realDelta)` still drives real-time play — whole fixed ticks at `SimTickInterval × TimeScale`, with the existing bulk fast-forward for large deltas. The new `AdvanceSim(span)` advances an exact simulated span, ignoring pause and TimeScale: "simulate the next N hours", not "run N real seconds". It runs the full pipeline per tick, lands the clock exactly on the target (the remainder is computed against the target time, not accumulated floats), and takes the bulk path for spans beyond 10,000 ticks.

### Fine-grained ticking changed the game

This was the big surprise. The old bulk steps ran the goal manager once per span, so a desperate citizen's hunger stayed at 100 for the whole step. Under 43.2-second ticks, citizens actually manage their needs — they eat about twice a day, sleep when exhausted, volunteer to clear debt. Crime pressure accumulates more slowly because eating relieves hunger distress promptly. The elderly only fall ill from age, near the 50-hour mark. Arson fines land fully on debt because meals drained the cash first. These are correct emergent dynamics, not regressions; the tests now assert them.

### Counter semantics

Service event counters (`Crime.Committed`, `Fires.BurnedDown`, `Health.FellIll`, `Ubi.Paid`, etc.) were per-tick snapshots — meaningful only when a whole span ran in one bulk step. All are now cumulative totals since world creation. `UbiService.Shortfall` also had a per-tick bug where owed-minus-paid could subtract payouts made in earlier ticks.

### tests

The suite migrated from `TimeScale = N; Tick(span)` pairs to `AdvanceSim(span × N)` — the old idiom meant "N sim hours" and the migration initially dropped the multiplier, which the failures caught. Money assertions now use a relative tolerance (`MoneyAssertions`): economy services prorate per tick, so a day of 1000 accumulations drifts ~1e-11 from the single-pass figure.

385 tests pass.
