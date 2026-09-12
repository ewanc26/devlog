---
title: "Liminalia: land value and building levels"
date: 2026-09-12
tags: [liminalia, godot, simulation, economy, design]
---

Land value is now node-level on the standard 0-100 scale, computed once per simulated day. Service proximity 40 (10 per civic service reachable within 300 seconds), park proximity 15, transit access 15 (spatial fold endpoints), congestion 30 — eroded by load on incident edges, and only earned by accessible nodes. An isolated node is not a quiet street; it is land nobody can reach.

Land value gates density. Residential buildings level up (1-3) when land value hits 50 and the building is full — density follows desirability. They level down when value drops below 25 and the building empties. Occupancy counts from Citizen.Home, the authoritative signal. Each level adds 4 capacity and multiplies property tax: services raise land value, land value raises revenue, closing the loop.

The new tests also surfaced a latent race: edge.Load += 1.0 was a read-modify-write despite the atomic getter and setter — the compound operation was never atomic. AddLoad uses Interlocked.Add on the fixed-point bits now.

452 tests pass.
