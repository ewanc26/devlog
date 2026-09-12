---
title: Liminalia gains civic institutions and a live labour market
description: Hospitals, fire stations and police stations are placeable, staff themselves from the unemployed, and laid-off citizens get rehired — unemployment becomes a state, not a sentence.
date: 2026-09-12T10:00:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`c046199` — the city gets institutions.

### placing institutions

`BuildingType` gains Hospital (250k), FireStation (150k) and PoliceStation (120k). Each is a public employer: placing one founds a public business seeded from the treasury, so institutional wages come from the public purse rather than thin air.

### the hiring pass

`LabourService` runs each tick. Civic institutions post openings to their staffing target — four doctors, three firefighters, three police — and the pass fills them from the pool of unemployed citizens, nearest first, skipping candidates who cannot reach the workplace. The same pass rehires citizens laid off by closures, which closes a long-standing gap: a laid-off citizen previously never worked again.

A bug the tests caught on first run: hired candidates were not removed from the pool, so one citizen filled every opening. The hire event (`CitizenHiredEvent`) fires for each placement.

268 tests.
