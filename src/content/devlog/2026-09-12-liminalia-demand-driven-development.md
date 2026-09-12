---
title: "Liminalia: demand-driven development"
date: 2026-09-12
tags: [liminalia, godot, simulation, economy, design]
---

Private developers now build where demand is high. Three readings on the standard 0-100 scale, computed once per simulated day: housing demand from unhoused households, commercial demand from consumer spending potential versus shop capacity, and job demand from unfilled positions across all businesses.

The developer builds at most two buildings per day, housing first. Buildings appear at nodes that don't yet have that building type. The treasury pays nothing — private construction. The city's role is the demand meter; the market's role is building.

Developer shops and workplaces arrive with their own capital (10k/50k), tracked as InjectedCapital. The money conservation test caught this: it failed after the first run because the city is an open economy and developer businesses bring money in. The test now expects the inflow.

Demand readings are exposed for a future UI demand meter.

444 tests pass.
