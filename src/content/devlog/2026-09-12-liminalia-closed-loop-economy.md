---
title: Liminalia closes the money loop
description: Actions carry economics — meals cost money and work is tiring — and a fiscally dynamic UBI pays citizens from the treasury, shrinking pro-rata when the city cannot afford it.
date: 2026-09-12T09:16:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

Two commits closing the economy's money loop. Before: wages flowed to citizens, consumption flowed to shops, tax and tolls flowed to the treasury — and the treasury was a dead end. Now the treasury feeds citizens back, and every action on the loop moves money.

### actions carry economics

Eating costs `EatNowAction.MealCost` (8.0), paid to a shop on the citizen's node, else any shop, else the treasury. Broke citizens eat free — need satisfaction never freezes the simulation, same principle as fold tolls. Working drains energy (`WorkAction.EnergyDrainPerActivation`) instead of restoring it; the old `WorkAction` was the only action in the game that simultaneously fed and refreshed the citizen.

Goals also stopped navigating to `TopologyNodeId.Empty` when their anchor is missing: a citizen with no resolvable home eats or sleeps where they stand, and the work goal deactivates when its workplace building no longer resolves. Previously those citizens re-issued impossible navigation every tick, forever.

Six economy tests updated because their 24-hour ticks now include one meal per citizen — the tests were measuring combined behaviour all along, they just never had a reason to notice eating before. All 7 new regression tests verified to fail on pre-fix code.

### universal basic income, fiscally dynamic

`UbiService` pays every citizen `CityEconomy.UbiPerDay`, prorated by simulated hours, funded from the treasury. The dynamic part: when the treasury cannot cover the full payout, every citizen takes the same pro-rata cut and the shortfall is recorded (`UbiService.Shortfall`). The treasury is never overdrafted — an unaffordable UBI shrinks visibly instead of silently bankrupting the city.

The rate is player policy: `SetUbiCommand` (0 to 1,000), `UbiChangedEvent`, persisted with the save. Default 0 — UBI is enacted, not assumed. `CityEconomy.Withdraw` joins `Spend` as the unconditional counterpart for entitlements: it clamps at the treasury balance and returns what it actually took.

The loop is now closed — treasury to citizens to shops to wages to income tax and tolls back to treasury — so policy can keep money circulating instead of pooling.

A bug the tests caught in the shortfall math: the first formula computed `owed − available × payFactor` instead of `owed − paid`, wrong by exactly the pro-rata factor in the case that mattered. The pro-rata test caught it on first run. Three of the eight new UBI tests also needed meal accounting: citizens get hungry over a 24-hour tick, eat, and the meal money flows back to the treasury in shopless test worlds. The economy tests now measure the whole circuit.

245 tests passing.
