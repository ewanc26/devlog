---
title: Liminalia city difficulty events
description: Population milestones raise events, logged in the city event log.
date: 2026-09-12T13:30:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`3dd77f4` — difficulty transitions are now observable.

### what changed

- `CityDifficultyChangedEvent` (`Core/Events/CityDifficultyChangedEvent.cs`): raised at the end of each simulation tick when `SimulationWorld.CityDifficulty` changes. Carries previous difficulty, new difficulty, and population.
- `CityEventLog` records difficulty changes as `CityEventKind.DifficultyChanged` entries.
- `CityEventKind.DifficultyChanged` added to the event kind enum.
- `SimulationWorld._previousDifficulty` now nullable — no spurious event on the first tick (baseline is established silently).

### difficulty milestones

| Population | Difficulty | Phase |
|------------|-----------|-------|
| ≤30 | 1.0 | Founding |
| ≤60 | 1.5 | Growth |
| ≤100 | 2.0 | Maturation |
| >100 | 3.0 | Flourishing |

Difficulty multiplies crime pressure, illness onset, and fire ignition. The big city is harder to maintain.

### tests

358 passing. 9 ProgressionTests cover difficulty matching population, scaling, affecting crime pressure, stability when population stable, event raising on milestone crossing, event logging, event type, treasury changes, and citizen aging.
