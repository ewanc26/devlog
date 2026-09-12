---
title: Liminalia era-appropriate names
description: "Citizens now draw forenames from real ONS England and Wales birth-name statistics keyed by birth year — Pauls and Susans at one end of the city, Muhammads and Olivias at the other."
date: 2026-09-12T15:50:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
---

## liminalia

The hardcoded 50-name list is gone. Citizens now get forenames from real ONS England and Wales data — the top 100 boys' and girls' names per decade from 1954 to 2024, gathered from behindthename.com — keyed by their birth year. A citizen born in 1974 gets a 1974 name.

### NameGenerator

Static class in `csharp/Simulation/Citizens/`. Seven decade pools per gender (1954, 1964, 1974, 1984, 1994, 2004, 2024 — the last two top-60), a shared 17-surname multicultural pool carried over from the old list, and dedup against taken names. Fully deterministic: every method takes the caller's seeded `Random`, so world generation and births reproduce from a single seed.

Era mapping: birth year ≤1959 → 1954 pool, each subsequent decade → its own, 2010+ → 2024. The founding population is 20-69 years old, so birth years span 1957-2006 and the founding names already vary by cohort.

### Gender

New `CitizenGender` enum (Male/Female) on `Citizen`. WorldBuilder assigns coin-flip gender per citizen; newborns get coin-flip gender at birth with a current-era forename and the first parent's surname — replacing `"{a} {b}'s child"`.

### Save format v4

`SaveCitizenData` gains a `Gender` field. Format 3 saves carry no gender and restore with citizens defaulting to Male. Version-gated in `SaveSerializerRead` like the education-points migration before it.

### tests

7 new tests: era pool distinctness, boundary mapping across 1940-2060, seed determinism, name dedup, WorldBuilder integration (name shape, surname pool, both genders present), save roundtrip, and the format 3 restore default. 392 tests pass.
