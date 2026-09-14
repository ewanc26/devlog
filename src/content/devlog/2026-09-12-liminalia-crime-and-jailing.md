---
title: Liminalia crime, policing, and jailing
description: Distress drives crime — debt, unemployment, hunger and poverty accumulate pressure past a threshold into theft; police stations deter, officers respond, and perpetrators serve 24 simulated hours.
date: 2026-09-12T10:10:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyvfhc2y"
---

## liminalia

`eb08568` — the city gets a crime problem and a justice system.

### pressure and theft

Crime pressure accumulates from debt, unemployment, hunger and poverty, at 100 to the threshold. Past it, a citizen commits theft against a co-located shop or citizen — 10 percent of the take, minimum 1. Nodes within routing reach of a staffed police station accumulate at a quarter rate: station placement is real deterrence policy, not decoration.

### response and sentence

On a crime, the nearest on-duty officer is dispatched. On arrival the perpetrator is fined 25 (via debt if broke), the stolen money is returned, and they are jailed for 24 simulated hours — `Citizen.JailedUntil`. Jailed citizens do not act, travel, work, get paid, get hired, or accrue pressure; the sentence is served in place. Unresolved crimes expire after 12 hours with the thief keeping the loot.

`CrimeService` raises `CrimeCommittedEvent` and `CrimeResolvedEvent`; `JailedUntil` persists with the save. 281 tests.

The tests caught three of their own bugs before they caught the code's: a police station building in the officer test caused the labour pass to hire the poor citizen mid-scenario; exact-money assertions broke on meals eaten during fast-forwards; and the jailed-wage test needed a 48-hour sentence because the clock advances before the business cycle in fast-forward.
