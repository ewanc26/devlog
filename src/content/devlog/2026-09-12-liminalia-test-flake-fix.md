---
title: Liminalia test flake fix
description: Deterministic seeding for random city events — fixed a 1-in-10 suite flake where unseeded fires killed the test population.
date: 2026-09-12T13:00:00Z
tags: [liminalia, godot, csharp, testing]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpxufs22y"
---

## liminalia

`ProgressionTests.DifficultyChange_RaisesEvent` failed roughly one run in ten with `captured.Population == 0` (expected 29).

### root cause

The unseeded `Random` in `FireService` could ignite a fire during the 10-hour bulk tick. Bulk steps ≥ `BurnDownHours` always burn the building down before firefighters can move, and a burn-down kills every citizen on the node — population hit 0 before the end-of-tick difficulty event fired.

### fix

`SimulationWorld` now takes an optional seed, passed to `FireService` and `PartnershipService` (the two services with real randomness). The dead `_rng` in `CrimeService` is removed. Progression tests build their worlds with `seed: 42`.

Verified: 60 consecutive full-suite runs, zero failures.
