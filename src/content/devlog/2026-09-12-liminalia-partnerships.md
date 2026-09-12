---
title: Liminalia partnerships and births
description: Partner relationships now form households, and cohabiting partners of child-bearing age can have children. The population is no longer a fixed set of 50.
date: 2026-09-12T12:20:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`ccfb638` — relationships have consequences.

The relationship graph already promoted pairs to Partner at 0.8 affinity, but partnerships were cosmetic. Nothing followed from them, and the population was a fixed set of 50 that could only drain through old age.

### cohabitation

`PartnershipService` formalises a Partner relationship between two adults who do not already share a household: one partner's household is reused, the other leaves their old household and joins it, and the shared home anchors the household.

### births

Cohabiting partners of child-bearing age (18–45) have a chance each simulated year of a birth — a new citizen, age 0, birthday anchored a year out, homed and householded with the parents. The child then flows through the same life course as anyone else: school at 7, work at 18, retirement at 65, death at 90.

The birth chance is per-year and prorated by the step's fraction of a year using 1 − (1 − p)^years — the same correct-at-any-step-size form as the fire ignition fix. The naive rate × years form would have guaranteed births on long fast-forwards.

Five new tests, 320 total.
