---
title: Liminalia citizens ride transit and pay fares
description: Citizens route through public transport when it beats walking, and transit edges charge fares through the existing toll machinery — collected by the treasury.
date: 2026-09-12T09:30:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`525b821` — transit lines become something citizens actually use.

### routing through transit

`RouteFinder.Find` accepts a `TransportMode` filter; citizens now plan routes as `Pedestrian | PublicTransport`, so the pathfinder will use transit edges when they shorten the trip. Walking-only routing is unchanged for the cases that want it.

### fares as tolls

New transit edges carry `ConstructionCosts.TransitFare` (4.0) as their toll. Fares charge through the same per-edge toll machinery as fold tolls — `SetEdgeTollCommand` can reprice individual lines, and the treasury collects what riders pay. Citizens without money ride anyway: same principle as folds, transit is infrastructure, not a turnstile.

251 tests after this one.
