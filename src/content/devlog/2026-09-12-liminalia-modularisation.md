---
title: Liminalia source modularisation
description: One type per file across the whole codebase — split multi-type files, partialised the big services, split the CLI and test classes.
date: 2026-09-12T13:05:00Z
tags: [liminalia, godot, csharp, refactoring]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpxrxo22y"
---

## liminalia

Full modularisation pass: every source file now holds one type (or one partial of a type).

### what was split

**Records and enums out of service files:** `Crime` out of `CrimeService`, `Fire` out of `FireService`, `TransportMode` out of `TopologyEdge`, `RelationshipKind` out of `Relationship`, `BuildingType` out of `Building`, `RelaxAction` out of `RecreationGoal`.

**Event bundles:** every `*Events.cs` file split into one record per file — `CitizenFellIllEvent`, `CitizenTreatedEvent`, `CitizenBirthdayEvent`, `DeathCause`, `CitizenDiedEvent`, `FireStartedEvent`, `FireExtinguishedEvent`, `BuildingBurnedDownEvent`, `PartnershipFormedEvent`, `CitizenBornEvent`, `CitizenGraduatedEvent`, `CrimeCommittedEvent`, `CrimeKind`, `CrimeResolvedEvent`.

**Big services into partials by concern:**
- `CrimeService` (753 lines) → `CrimeService` (constants, state, Tick), `CrimePressure` (distress and hatred accumulation, murders), `CrimeCommitting` (what a desperate citizen does at the node), `CrimeDispatch` (officer dispatch, resolution, expiry)
- `FireService` (337) → `FireService` (ignition, evacuation), `FireDispatch` (dispatch, extinguish), `FireSpread` (burn-down, closures, deaths)
- `SaveSerializer` (393) → `SaveSerializer` (Snapshot/Restore), `SaveSerializerWrite` (DTO helpers), `SaveSerializerRead` (parse and format-version remapping)

**Data bundles:** `Jobs.cs` → `JobKind`, `JobOffer`, `WageService`, `TaxService`. `Demographics.cs` (7 records + census class) → one file each. `SaveData.cs` (12 DTOs) → one file each. `SimulationWorldSnapshots.cs` → three snapshot records + the snapshot-taker.

**CLI:** `Program.cs` (362 lines, 13 commands) → `Program` (REPL loop, help), `CliLookup` (name resolution), `CliStatus` (tick, citizens, crime, events, economy, demographics), `CliWorld` (build, road, tax, save/load, reputation, affinity). `cli.csproj` now globs `*.cs`.

**Tests:** every multi-class test file split into one class per file — `EconomyTests` (17 classes), `AITests` (11), `MovementTests` (5), `SimulationTests` (5), and the rest. 66 test files now.

### verification

367 tests, all passing, verified across multiple consecutive runs. No multi-type files remain (`grep` sweep over all of `csharp/` and `tests/`).
