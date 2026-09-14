---
title: Liminalia progression loop implemented
description: Population-based difficulty multiplier across crime, health, and fire services.
date: 2026-09-12T13:00:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpxwec22y"
---

## liminalia

`6c3299c` — the progression loop is now in the simulation.

### what was added

- `SimulationWorld.CityDifficulty` — computed multiplier: 1.0 (≤30 citizens), 1.5 (≤60), 2.0 (≤100), 3.0 (100+).
- `SimulationWorld.Population` — live citizen count.
- Three services now multiply their rates by difficulty:
  - CrimeService: pressure accumulation per citizen.
  - HealthService: susceptibility gain per tick.
  - FireService: base ignition chance per building.

### result

A city of 15 (founding) accumulates distress at 1×. The same citizen in a city of 50 (growth) accumulates at 1.5×. The bigger the city, the harder it is to maintain — crises outpace infrastructure, and the player must build civic institutions before problems overwhelm the city.

### tests

354 passing (5 new ProgressionTests: population matches difficulty, difficulty scales, difficulty affects crime pressure, treasury changes over time, citizens age).
