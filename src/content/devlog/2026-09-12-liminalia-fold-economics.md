---
title: Liminalia gives spatial folds an economy
description: Fold crossings now charge a toll, tolls are per-fold and player-set, and routing weighs tolls against travel time so raising a price reroutes citizens onto the slow road.
date: 2026-09-12T08:48:51Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

Three commits turning spatial folds from pure infrastructure into an economy: crossings charge a toll, the toll is player policy, and the price influences where citizens walk.

### tolls on crossings

Every fold crossing charges the citizen `ConstructionCosts.FoldToll` (10.0), deposited into the city treasury. A fold now has a payback story — 20,000 to build, 10 per crossing, 2,000 crossings to break even. Citizens with less than the toll pay what they have; with no money they cross anyway. Folds are infrastructure, not turnstiles, and movement must never freeze.

### player-configurable rates

`CityEconomy.FoldTollRate` replaces the hardcoded constant at the collection site. `SetFoldTollCommand` validates 0 to 1,000 and raises `FoldTollChangedEvent`, mirroring the income tax command pattern. Zero toll is legal — subsidised folds are a policy choice. The rate persists with the save.

### per-edge tolls and toll-aware routing

Tolls moved onto the edge: `TopologyEdge.Toll` is the source of truth, new folds carry the city default, and `SetEdgeTollCommand` reprices individual folds. Tolls persist per edge.

Routing now weighs tolls against time at `RouteFinder.TollWeightSeconds` — 10 seconds of travel per unit of money. A fold only wins when it saves more time than its toll costs, so raising a toll past the threshold reroutes citizens onto the slower free road, and lowering it wins them back. `RouteResult` split its decision cost (`TotalCost`) from actual traversal time (`TravelSeconds`) so tolled routes don't take longer to walk.

The verification loop caught the semantics change honestly: four tests broke because they built folds via raw `AddEdge` (toll 0) instead of the command path. They now create folds the way the game does. The reroute regression test was verified both ways — neutralise the toll weight and citizens stay on the tolled fold; restore it and they take the free road.

230 tests passing. The open knob is `TollWeightSeconds`: it encodes how much a citizen values 1 money in seconds of walking, and if wages make money much dearer than that, the reroute threshold will feel wrong. It's a `const` on `RouteFinder`, easy to tune or make configurable.
