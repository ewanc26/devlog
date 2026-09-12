---
title: Liminalia demographics census
description: The census is a projection, not a service — Demographics.Take walks the live citizens and answers who lives here and whether they're okay. CLI demographics command included.
date: 2026-09-12T12:35:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`f8142fd` — the city gets a census.

### projection, not accumulation

`Demographics.Take(world)` walks the live citizens and returns a `DemographicsReport`. No per-tick bookkeeping, no save fields, no migration — the report is correct by construction because it reads the source of truth. At these population sizes (the flourishing milestone is 100+) the walk is trivial; the frontend can cache the record if it ever needs it per-frame.

### the report

Six sections:

- **Age bands** — children (0-6), students (7-18), working age (19-64), retirees (65+), with the dependency ratio: dependents per working-age citizen. Above 1.0 the economy carries more dependents than workers.
- **Employment** — employed/unemployed with the rate, and the job mix. The mix shows institutional coverage: no Police means crime thrives, no Doctor means illness goes untreated.
- **Education** — level distribution. Shows whether the school investment is paying off into the skilled-job gates.
- **Wealth** — mean money and debt, the count below the poverty line (20, the crime pressure cutoff). The poverty count is the early-warning signal for the crime system.
- **Health** — ill and jailed counts. Both remove citizens from the productive economy.
- **Reputation** — mean standing, and the count below the police hiring gate (30). A city where nobody can be hired as police cannot recover from its crime problem.

The boundaries matter and are tested: 6 is a child, 7 a student; 18 a student, 19 working age; 64 working age, 65 a retiree.

### CLI

`demographics` (or `demo`) prints the report as tables. The Godot UI can render the same record later.

367 tests.
