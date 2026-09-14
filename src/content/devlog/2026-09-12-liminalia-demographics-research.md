---
title: Liminalia demographics research
description: What a demographics report needs to show for a city-builder — the census the player never gets in Liminalia yet, and how to compute it from live world state.
date: 2026-09-12T12:30:00Z
tags: [liminalia, godot, csharp, game, research]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpy7ibs2y"
---

## liminalia

Research for the demographics system. No code yet — this is the design.

### what demographics means here

A city-builder's demographics report answers one question: **who lives here, and are they okay?** Everything in the simulation already tracks the raw inputs — the census is a projection, not new state. No new service, no per-tick accumulation, no persistence: a `DemographicsReport` computed on demand from `world.Citizens`.

This matters for the progression loop: the difficulty milestones are population bands (0-30 founding, 31-60 growth, 61-100 maturation, 100+ flourishing), but population alone is a blunt instrument. A city of 50 children and retirees is not a city of 50 workers. The report is what tells the player which one they have.

### the report

Six sections, each a count or a rate:

**Age bands** — children (0-6), students (7-18), working-age (19-64), retirees (65+). These are the lifecycle bands from the progression research. The ratio of dependents (children + retirees) to working-age is the dependency ratio — the single number that predicts whether the economy can carry its population.

**Employment** — employed vs unemployed, and the job mix (Worker, Engineer, Shopkeeper, Doctor, Teacher, Police, Firefighter). The job mix shows institutional coverage: no Police means crime thrives; no Doctor means illness goes untreated.

**Education** — level distribution (0 none, 1 primary, 2 secondary, 3 further). Education gates the skilled jobs; the distribution shows whether the school investment is paying off.

**Wealth** — money and debt distribution: mean, and the count below the poverty line (money < 20, the crime pressure cutoff). The poverty count is the early-warning signal for the crime system.

**Health** — ill count, jailed count. Both remove citizens from the productive economy.

**Reputation** — mean reputation, and the count below the police hiring gate (30). A city where nobody can be hired as police is a city that cannot recover from its crime problem.

### shape

```csharp
public sealed record DemographicsReport(
    int Population,
    AgeBands Age,
    EmploymentStats Employment,
    EducationStats Education,
    WealthStats Wealth,
    HealthStats Health,
    ReputationStats Reputation);

public static class Demographics
{
    public static DemographicsReport Take(SimulationWorld world);
}
```

Pure static projection. The CLI gets a `demographics` command that prints it as tables; the Godot UI can render the same record later. Tests assert each section against hand-built worlds — the pattern every other service in the repo uses.

### why not accumulate

An accumulating demographics service would need per-tick updates, save fields, and migration. A projection needs none of that — it is always correct because it reads the source of truth. The only cost is the walk over citizens, which is trivial at these population sizes (the flourishing milestone is 100+). If the frontend ever needs it per-frame, the record is cheap to cache.
