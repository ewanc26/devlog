---
title: Liminalia illness and fires
description: Hunger, exhaustion and age make citizens ill; doctors dispatch from staffed hospitals and bill through debt if needed. Fires ignite rarely, evacuate their building, and burn it down in six hours without a firefighter.
date: 2026-09-12T10:25:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpytgxc2y"
---

## liminalia

`a159ca1` — hospitals and fire stations do their jobs.

### illness

Susceptibility accumulates from hunger, exhaustion and age; past the threshold the citizen falls ill. Ill citizens tire faster and cannot work. A doctor from a staffed hospital is dispatched to treat them where they stand — treatment costs 30, charged through debt when broke: healthcare is never denied, but it is not free. The bill goes to the hospital's business, so civic payroll is partly self-sustaining.

A gap the doctor test exposed: dispatch only happened at the moment of falling ill, so a citizen already ill — restored from a save mid-illness, or sick before any hospital existed — never got a doctor. The service now dispatches to any untreated ill citizen each tick. Untreated illness does not clear on its own. `IsIll` persists with the save.

### fires

Fires start rarely in buildings. A burning building is evacuated immediately — residents lose their home and 30 Comfort — and the nearest firefighter is dispatched. On arrival the fire is extinguished and the building survives. An unattended fire burns the building down after six simulated hours: the building is destroyed and any business operating in it closes, laying off its employees. Burn-down follows the canonical `business.Building` link, matching `BusinessClosureService` — the first draft used the reverse link and the layoff test caught it.

`FireService.StartFire` is the deterministic entry point for tests and future arson mechanics. 292 tests.
