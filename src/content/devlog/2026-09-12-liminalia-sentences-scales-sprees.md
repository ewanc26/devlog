---
title: Liminalia sentences, scales, and sprees
description: Per-crime sentences replace the flat fine, affinity and education move onto the central 0-100 scale with save migration, opportunity criminals can go on sprees, crimes affect standing via a reputation system, and city events are logged.
date: 2026-09-12T11:30:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyjxak2y"
---

## liminalia

`5c8946d` `3205131` — the justice system gets a sentencing table, every stat lands on one scale, and desperate criminals strike more than once. Crimes now cost a citizen's standing in society, and the city keeps a log.

### per-crime sentences

`CrimeService.SentenceFor(CrimeKind)` replaces the flat fine-and-jail pair. Each crime maps to its own sentence, escalating with weight: vandalism 15/12h, theft 25/24h, burglary 40/36h, arson 80/48h, murder 100/72h. The old constants (`Fine`, `JailHours`, `MurderFine`, `MurderJailHours`) are gone — `Resolve` reads the table, and the murder special case folded into it.

### one scale to rule the stats

Affinity moved from -1..+1 to the central 0-100 scale: 50 neutral, Partner at 80+, Friend at 60+, Rival at 40 or below. The socialise gain rescaled to match — 10 points at neutral, decaying as the bond strengthens. Education points moved from 0..1500 to 0-100, a third of the scale per level, same hours per level as before.

Save format version 2. Format-1 saves remap on load: affinity `v*50+50`, education points `/15`. Old saves load clean.

### reputation

 Every citizen has a standing in society (0-100, 50 neutral).
  Getting caught and convicted costs it: petty offences
  -15, burglary -25, arson -40, murder -60. Honest living
  recovers it slowly. The police force requires a standing
  of 30 or more — a citizen with no reputation cannot wear
  the badge.

### city event log

 Crimes committed and resolved, deaths, births,
  partnerships, graduations, hires and policy changes are
  recorded in the city event log, a chronological ledger of
  the most recent 500 events, persisted with the save.

### sprees

Theft, burglary and vandalism retain half their pressure after committing. A desperate burglar with opportunity still in front of them strikes again — a spree, instead of cooling to zero after one crime.   (arson and murder fully — one fire, one body). 349
  tests.
