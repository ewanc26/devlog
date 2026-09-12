---
title: Liminalia citizens fall into debt and work it off
description: Charges citizens cannot pay become debt; wages are garnished toward it and volunteering at service buildings clears it — with a stipend, because volunteering is still work.
date: 2026-09-12T09:45:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`4560f66` — debt as a first-class citizen state.

### TryCharge

`Citizen.TryCharge` pays what it can from money and books the remainder as debt. Meals, tolls and fares all charge through it: a broke citizen still eats and still crosses, and the city remembers what it is owed. Debt is never negative and persists with the save.

### garnishment and volunteering

Indebted citizens have half their net wage garnished toward the debt until it clears — the garnished portion goes to the treasury, the creditor of unpaid tolls, fares and uncollected meals. The other way out is `VolunteerGoal`: citizens with debt volunteer at service buildings, clearing 10 debt per session for a 2-credit stipend and 10 energy drain. Volunteering is work; it just pays badly.

261 tests.
