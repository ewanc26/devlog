---
title: "Liminalia: allocation-free neural goal AI"
date: 2026-09-12
tags: [liminalia, godot, simulation, ai, performance]
---

The neural goal AI allocated on every evaluation: fresh arrays per forward pass, three candidate lists per goal selection, a pending record per completed goal. At city scale that is steady GC pressure in the per-citizen tick loop, exactly where a simulation can least afford it.

Fixed. The tick loop is single-threaded and evaluates citizens one at a time, so all of that is reusable scratch: forward-pass and backprop intermediates live in per-brain buffers, the goal manager reuses one candidate list set and score buffer across the whole city, and pending evaluation records are pooled per citizen. Steady-state ticking now allocates nothing on this path.

The rewrite also surfaced a latent argmax bug: the best-goal loop bounded by the fixed-size score buffer instead of the candidate count, so a stale score from the previous citizen's evaluation could win. Bounds now match the candidate list. 419 tests pass.
