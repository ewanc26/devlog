---
title: Liminalia infrastructure wear
description: Unpaid maintenance now degrades roads and civic buildings on the 0-100 scale — worn edges slow travel, derelict services go dark, arrears pay for repairs. Save format 7.
date: 2026-09-12T19:05:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdricfvhk2y"
---

## liminalia

Maintenance shortfalls now have consequences. Previously unpaid upkeep just accumulated in a counter; now infrastructure decays.

### wear

`Building.Wear` and `TopologyEdge.Wear` hold structural condition on the standard 0-100 scale (100 = pristine). Each tick, condition falls proportional to the unpaid fraction of upkeep — ten days of total neglect takes pristine infrastructure to broken. Private buildings never wear: upkeep is not another tax on residents.

### effects

- Worn edges cost more to traverse — `EffectiveCost` gains a wear term; a ruined road doubles travel cost.
- Civic buildings below `WearBrokenThreshold` (20) stop delivering their service: derelict schools teach no one (`EducationService.IsStaffed`), derelict police stations deter no crime (`CrimePressure.IsPoliced`), and responders based at derelict stations do not dispatch (`ResponderFinder`).

### repairs

Shortfalls accumulate as `Arrears`. When the treasury next has money, it pays arrears first and condition recovers — at half the rate of decay. Neglect is cheaper than maintenance; recovery is slower than ruin.

### persistence

Save format 7. `SaveBuildingData` and `SaveEdgeData` gain `Wear` (default 100) and building `Level` is now persisted too — it was session-only since the land value work. Old saves restore at pristine condition via optional-parameter defaults.

9 new tests, 468 total, three consecutive green runs.
