---
title: "Liminalia source modularisation — round 2"
description: "Second pass splitting large files by concern — SimulationWorld tick engine, HealthService dispatch, LabourService civic staffing, CitizenMovement traversal, PartnershipService births, WorldCommands policy, CrimeCommitting acts, CrimePressure hatred, SaveSerializer restore"
date: 2026-09-12
tags:
  - liminalia
  - refactor
  - modularisation
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpzlqcc2y"
---

Continued the one-type-per-file and concern-based split pass on Liminalia. The first round handled the obvious multi-type files and the largest services. This round targeted every remaining file over ~170 lines, splitting by concern where the split was real.

## What was split

**SimulationWorld** (326 → 218 + 134): tick engine (accumulator, fixed-tick loop, service pipeline, difficulty watch) moved to `SimulationWorldTick.cs`. Core state (services, properties, collections, constructor, event raising) stays in `SimulationWorld.cs`.

**HealthService** (289 → 132 + 137 + 54): susceptibility accumulation and falling ill stay in `HealthService`. Doctor dispatch and on-scene treatment moved to `HealthDispatch`. Fatal untreated illness moved to `HealthFatality`.

**LabourService** (244 → 90 + 92 + 154): civic institution staffing (hospitals, fire stations, police stations, schools posting openings) moved to `LabourCivicStaffing`. The hiring pass (collecting openings, finding nearest qualified candidate, hiring) moved to `LabourHiring`.

**CitizenMovement** (243 → 109 + 174): route planning (RequestMove, return-safe routing, re-planning) stays in `CitizenMovement`. Traversal (walking routes edge by edge, tolls, fold crossings, arrival) moved to `CitizenTraversal`.

**PartnershipService** (217 → 153 + 97): cohabitation formalisation stays. Births (chance per simulated year, child creation, household registration) moved to `PartnershipBirths`.

**WorldCommands** (193 → deleted, split into two): construction commands (roads, buildings, demolitions, spatial folds) moved to `WorldConstruction`. Policy commands (income tax, fold tolls, edge tolls, UBI) moved to `WorldPolicy`.

**CrimeCommitting** (289 → 95 + 212): the CommitCrimes orchestration loop stays. Individual crime acts (theft, burglary, arson, vandalism, victim finding) moved to `CrimeActs`.

**CrimePressure** (178 → 81 + 97): economic pressure accumulation (debt, unemployment, hunger, poverty → crime pressure, deterrence) stays. Hatred accumulation between rivals and murder escalation moved to `CrimeHatred`.

**SaveSerializer** (255 → 67 + 228): the Restore method moved to `SaveSerializerRead`, leaving Snapshot as the sole entry point in `SaveSerializer`.

## What was not split

Files left intact because the split would be artificial:

- `WorldBuilder.cs` (196) — linear test fixture, one method
- `RouteFinder.cs` (179) — single Dijkstra implementation, methods tightly coupled
- `GoalManager.cs` (167) — Tick and EvaluateGoals share the same stack state
- `SimulationHost.cs` (159) — thin Godot bridge wrappers
- `EducationService.cs` (157) — cohesive Tick loop with supporting helpers
- `FireService.cs` (172) — ignition and evacuation are the same concern
- `CrimeDispatch.cs` (172) — dispatch and resolution are tightly coupled

## Results

162 source files (was ~90 before round 1), 63 test files. Largest file is 228 lines (was 753). All 367 tests pass across repeated runs.
