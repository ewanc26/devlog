---
title: Liminalia citizens grow old
description: Birthdays on each citizen's own simulated day, retirement at 65, death at 90 with the estate passing to the household. The aging tests caught a fire-probability bug that burned every building on long fast-forwards.
date: 2026-09-12T11:50:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyfnkc2y"
---

## liminalia

`9bd132f` — time passes for people, not just cities.

Age was a static number set at world build; nobody ever aged. With education age-gated at 7-18, an ageless population made the school system a set piece — nobody was ever young enough to attend.

### birthdays, retirement, death

`AgingService` advances each citizen's age on their own simulated birthday, anchored one year after world entry and persisted with the save; citizens restored from old saves without an anchor get a one-year grace rather than an instant birthday. At 65 citizens retire — released from employment, never rehired. At 90 they die of old age: removed from the world, home and workplace released, money to their household or, failing that, escheat to the treasury.

### the fire bug the tests caught

The death test kept failing in a strange way: the citizen died, but their home's occupant list still contained them. The cause was two floors down — over a simulated year of fast-forward, the fire service's random ignition chance, computed as rate × hours, exceeded 1 and burned every building in the world. The probability is now 1 − (1 − p)^hours, correct at any step size, and evacuation clears the building's occupant list instead of leaving stale ids.

A third catch in the retirement test: the fixture business went insolvent over the simulated year and laid the elder off before the birthday could retire them. Payroll is now funded for the year in the fixture. Six new tests, 315 total.
