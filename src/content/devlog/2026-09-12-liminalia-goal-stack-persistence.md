---
title: Liminalia goal stack persistence
description: Active goal stacks, fold crossing counters and the tick counter now survive save/load — completing the format version 3 persistence pass.
date: 2026-09-12T15:25:00Z
tags: [liminalia, godot, csharp, saves]
draft: false
---

## liminalia

The service-state pass left three pieces of in-memory state still dropped on load: citizen goal stacks, fold crossing counters, and the tick counter. All three persist now, closing out the version 3 format.

### Goal stacks

`GoalManager` keeps a per-citizen `Stack<Goal>` — what each citizen is currently doing and the parent goals beneath it. Losing it meant every citizen re-evaluated from scratch on load: mid-errand citizens teleported into idleness, mid-socialise pairs forgot each other.

Each frame encodes as (kind, payload): `NavigateGoal` carries its target node and description, `SocializeAction` its partner citizen. Root goals and terminal actions are stateless, so their frames are just a kind name. Stacks save bottom-first so restore pushes back in order.

Unknown goal kinds are skipped on restore instead of crashing — a save written by a newer version degrades to the goals it can decode.

### Fold crossings and tick count

`FoldCrossings` (per-edge spatial fold usage counters) and `TickCount` round-trip as plain fields. `TickCount` moved to `internal set` behind the serializer, same pattern as `CityEconomy.Treasury`.

### tests

Six new tests in `WorldStateSaveTests`: goal stack round-trip, socialise partner round-trip, unknown-kind skip, fold crossing round-trip, tick count round-trip, and empty-state round-trip.

380 tests pass. Two commits today, each independently revertable.
