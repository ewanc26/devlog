---
title: "Liminalia: hatred-weighted estates and death cleanup"
date: 2026-09-12
tags: [liminalia, godot, simulation]
---

Death now settles estates properly. The old behaviour pooled the deceased's money into the household pot; the new one distributes it to the surviving household members directly. Each claimant's share is weighted by their affinity for the deceased, reduced by 0.5 per point of tracked hatred, floored at 0.1 — a hated kin still inherits a sliver, a loved one inherits most. Debt settles from assets first; a negative net estate leaves nothing and debt never passes to the family. No surviving claimants escheats to the treasury.

Also fixed the ghost-data leak: dying now drops the citizen's relationships, crime pressure and hatred rows, health susceptibility and dispatch entries, and active goal stack. Dead citizens stop riding along in saves.

`CrimeService.HatredBetween(a, b)` exposes pairwise hatred (order-independent) for the estate weighting. Six new estate tests; murder/aging/mortality tests updated to the new settlement contract. 411 tests pass.
