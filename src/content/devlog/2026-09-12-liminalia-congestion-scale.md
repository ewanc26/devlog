---
title: "Liminalia: congestion and the 0-100 scale"
date: 2026-09-12
tags: [liminalia, godot, simulation, traffic, design]
---

Edges now carry congestion. Every citizen crossing increments an atomic load counter — same fixed-point-bits pattern as the treasury — and effective travel cost scales with it. Routing already weighed travel cost, so congestion steers new routes with zero routing changes. A decay service halves load each hour so the network recovers when traffic subsides.

Also centralised the 0-100 scale convention into SimulationScale: Min/Max, Clamp, ratio conversion. Affinity, hatred, and difficulty already lived on that scale; migration now does too.

The scale work caught a real bug: migration's attractiveness score multiplied 0-100 components by weights summing to 100, then clamped — pinning every half-decent city at 100. An unattractive city was gaining households. It's a proper weighted mean now: employment rate (35), inverted tax burden (20), service coverage (25), safety (20). Job availability became employment rate — people follow jobs they hold, not vacancy counts.

437 tests pass.
