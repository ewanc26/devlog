---
title: Liminalia central spine
description: Centralised the simulation's reused systems — service ownership and tick pipeline into SimulationServices, one shared RouteFinder, static wage/tax arithmetic, and a common emergency dispatch scan.
date: 2026-09-12T13:30:00Z
tags: [liminalia, godot, csharp, architecture]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpxpx7k2y"
---

## liminalia

The tick engine, economy services and emergency dispatch had grown four separate copies of the same wiring. This change puts each in one place.

### SimulationServices

A new `SimulationServices` class owns all 12 tick services: construction (including the shared seed for fires and births), the facade properties the world exposes, and `TickAll` — the pipeline order (economy, emergency response, life course) that previously lived inline in `SimulationWorldTick`. The world delegates to it; public API unchanged.

### Shared RouteFinder

`RouteFinder` is stateless Dijkstra but was instantiated six times: the world, fire/crime/health dispatch, labour hiring, and school routing. Now one instance, `world.Routes`.

### Static wage and tax arithmetic

`WageService` and `TaxService` are pure arithmetic, like the existing `ConstructionCosts` precedent. Both are static now. `BusinessService`, `ConsumptionService` and `PropertyTaxService` lost their private copies; `LabourCivicStaffing` lost an inline `new WageService()`. Also removed a dead `_wageCache` field in `BusinessService`.

### ResponderFinder

Fire, crime and health dispatch repeated the same scan verbatim: nearest citizen of a job kind, skipping jailed/travelling/unplaced, routed by pedestrian cost. `ResponderFinder.NearestOnDuty` is that loop; the three dispatch passes keep only their own bookkeeping.

### flake

`PartnershipTests.CohabitingPartners_ChildbearingAge_HaveChildrenOverYears` flaked once in 15 suite runs — same class as the earlier fire flake. The birth chance is 0.35/year and the test asserted on a decade of unseeded randomness (~3% tail of no child). Seeded with 42; verified deterministic across 10 filtered runs and the full suite.

367 tests pass. Five commits, each independently revertable.
