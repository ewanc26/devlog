---
title: Liminalia arson, and a fire-aging bug the tests caught
description: Desperate citizens with nothing to steal now burn buildings instead. The arson tests exposed that mid-step fires aged the whole bulk step — a fire started at hour 9 of 10 burned down instantly.
date: 2026-09-12T11:35:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyhpxc2y"
---

## liminalia

`3e3e3b7` — crime finds a target even when there is nothing to steal.

### arson

A citizen past the crime threshold used to find no victim at their node — no shop, no richer citizen — and simply wait, pressure staying high forever. Now they ignite a building there through the fire service's deterministic `StartFire`. The arsonist is tracked like any criminal: officer dispatched, fine in money or debt, 24 simulated hours in jail. `Crime.Victim` is now nullable — arson has no person to make whole; the building is the fire service's problem. Policing a district is fire prevention too.

### the bug the tests caught

The first arson test failed in an interesting way: the crime committed, but no fire was active. A fire ignited mid-bulk-step aged the whole step's hours — a fire started at hour 9.1 of a 10-hour fast-forward was treated as 9.1 hours old at the step's end and burned down inside the same tick. Fires now record the hours elapsed at ignition (`AgeAtIgnition`) and age only the remainder of the step. Random ignitions pass their step position through the same path.

Four new tests: arson fires the building, the caught arsonist is fined and jailed (15 in money, 10 onto debt — the first draft of the test gave the arsonist 100 credits, which lifted them out of poverty pressure and under the crime threshold entirely), no building means no crime, and theft is still preferred when a victim exists. 309 tests.
