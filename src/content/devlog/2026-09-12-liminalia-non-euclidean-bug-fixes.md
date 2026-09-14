---
title: Liminalia fixes the two bugs the non-Euclidean research pass exposed
description: Edge-exact routes, re-planning on edge removal, and return-safe routing so a one-way spatial fold can never strand a citizen mid-city.
date: 2026-09-12T08:28:51Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpzboz22y"
---

## liminalia

A research pass into how other non-Euclidean games handle space — Antichamber, Manifold Garden, HyperRogue, Hyperbolica, wrapped-world literature — confirmed the graph-first design dodges the seam-handling problem class entirely. It also exposed two real bugs in citizen movement and one open design question. This pass closes all three.

### edge-exact routes

`RouteResult` stored node ids only, so movement re-derived edges from node pairs and traversed whichever parallel edge appeared first in adjacency order. A road and a spatial fold between the same two nodes could be priced through one and walked through the other — emitting spurious fold crossings and wrong travel times. `RouteResult` now carries `Edges` parallel to `Nodes` (edges[i] connects nodes[i] to nodes[i+1]), Dijkstra tracks the previous edge, and movement traverses by edge id.

### re-planning on edge removal

Removing an edge mid-route froze citizens: `UpdateMovement` broke on the missing edge without clearing the route, leaving `IsTravelling` true forever and blocking every goal gated on `!IsTravelling`. Movement now re-plans from the citizen's current node when the next route edge is gone, abandoning the trip cleanly when the destination became unreachable.

### return-safe routing

The design question: one-way folds are a legitimate non-Euclidean trick, but nothing stopped a citizen routing through one into a region they could never leave. Decision — a one-way should never strand. Routing is now anchored: a citizen's route may only pass through nodes from which their home node is reachable, computed by a new reverse traversal (`TopologyGraph.Predecessors`) that respects edge direction. A one-way fold into a pocket home can't be reached from is never routed through, even when it's the cheapest path. A fold pair (one-way out, one-way back) stays a valid shortcut. Citizens already outside the safe region fall back to unconstrained routing so they're never frozen in place.

The verification pass caught two of my own mistakes: the first regression test didn't pin the bug (the dead-end was off the path, so Dijkstra never went near it), and the graph's adjacency only registered one-way edges at their source node, so reverse traversal couldn't see them at the destination. Both fixed — every edge now registers at both endpoints with direction filtered at iteration time.

Both regression tests verified to fail on the pre-fix code. 215 tests passing.
