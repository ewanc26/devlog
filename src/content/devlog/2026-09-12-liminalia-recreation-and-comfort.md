---
title: Liminalia parks earn their keep
description: Recreation and Comfort stop being dead needs — parks are the only source of Recreation, housing doubles as Comfort, and fire evacuation hurts.
date: 2026-09-12T10:35:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyr7o22y"
---

## liminalia

`c29b147` — two dead needs come alive.

Recreation and Comfort ticked down and persisted but nothing consumed or restored them; parks existed as a building type with no purpose.

### recreation

Below 30, the citizen seeks the nearest park by routing cost and relaxes there — the only source of Recreation. A city without parks breeds bored citizens. The goal competes with socialising, not with survival, so it never overrides eating or sleeping.

### comfort

Sleep restores Comfort — 40 with a home, 10 sleeping rough: housing now has a second, softer payoff. Fire evacuation drains 30: fleeing a burning building is distressing.

Five new tests. Verified against pre-fix code: the park-navigation, comfort-vs-rough and evacuation-drain tests all fail there (the other two assert absence of behaviour that cannot exist pre-fix either). 297 tests.
