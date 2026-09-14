---
title: Liminalia progression loop research
description: Analysis of existing systems and proposed core gameplay progression cycle.
date: 2026-09-12T12:30:00Z
tags: [liminalia, godot, csharp, game, design]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpy4td22y"
---

## liminalia

Research on implementing the core progression loop.

### existing systems that form the loop

Every piece is already in the codebase — what's missing is the **connection** between them into a single cycle:

| System | What it produces | Progression role |
|--------|-----------------|-----------------|
| `AgingService` | Birthdays, retirements, deaths | Population turnover |
| `EducationService` | Educated citizens (level 1-3) | Skilled workforce pipeline |
| `LabourService` | Employed citizens at businesses | Economic production |
| `BusinessService` | Revenue, daily operations | Economic growth |
| `CrimeService` | Crime pressure from distress | Challenge escalation |
| `HealthService` | Illness from hunger/exhaustion | Challenge escalation |
| `FireService` | Random building fires | Challenge escalation |
| `Economy` | Treasury, UBI, taxes | City resources |

### proposed progression loop

```
founding (5 households, 48 citizens)
    ↓
simulate (citizens age, work, study, spend)
    ↓
economic growth (revenue → tax → treasury)
    ↓
challenge emergence (crime, illness, fire scale with population)
    ↓
player response (build police, hospital, fire station, school)
    ↓
maturation (population 30+, skilled workforce, stable)
    ↓
flourishing (complex economy, high tax base, sophisticated challenges)
    ↓
(cycle continues, difficulty scales with population)
```

### citizen lifecycle

The loop is driven by citizen lifecycles:

1. **Child (0-6)**: depends on household, no productivity
2. **Student (7-18)**: attends school, gains education, no income
3. **Worker (18-65)**: employed, earns wages, spends, pays taxes
4. **Retiree (65+)**: depends on household, no labour market value
5. **Death (age 90 or illness)**: estate settled, household vacancy

Education gates job quality: Engineers/Doctors/Teachers require secondary+ education.
This creates a **feedback loop**: school investment → educated workers → better jobs → more tax revenue → more school investment.

### challenge scaling

Crime pressure, illness rate, and fire risk all scale with:
- Population density (more citizens = more problems)
- Economic distress (poverty, debt, unemployment)
- Lack of civic infrastructure (no police = crime thrives)

This creates the player's core engagement: **build the right institutions before problems overwhelm the city.**

### implementation direction

1. **Population counter**: track total citizens (`world.Citizens.Count`).
2. **Difficulty multiplier** in CrimeService, HealthService, FireService, tied to population milestones:
   - 0-30: founding (1x)
   - 31-60: growth (1.5x)
   - 61-100: maturation (2x)
   - 100+: flourishing (3x)
3. Multiplier applies to:
   - Crime pressure rate (`CrimeService.AccumulatePressure`)
   - Illness onset rate (`HealthService.Accumulate`)
   - Fire ignition chance (`FireService.StartFires`)
4. **Treasury as progress metric**: treasury balance shows city health. Below 0 = city deficit (emergency).
5. **Day cycle**: each simulated day = one full service tick. Player reviews city state daily and issues commands.

### data model for progression

Add to `SimulationWorld`:

```csharp
public int Population => Citizens.Count;
public double CityDifficulty => Population switch
{
    <= 30 => 1.0,
    <= 60 => 1.5,
    <= 100 => 2.0,
    _ => 3.0
};
```

The difficulty multiplier applies to:
- Crime pressure rate (`CrimeService.AccumulatePressure`)
- Illness onset rate (`HealthService`)
- Fire ignition rate (`FireService`)

This creates a natural difficulty curve: the bigger the city, the harder it is to maintain.

### vertical slice test

A single test that validates the full progression cycle:

1. Seed world with 48 citizens and treasury
2. Fast-forward 30 simulated days
3. Assert: citizens aged (some birthdays), educated (school-age attended), employed (labour hired)
4. Assert: crime occurred (pressure crossed threshold), some resolved (police response)
5. Assert: treasury changed (taxes collected, UBI paid, business revenue)
6. Assert: population adjusted (deaths from aging/illness, retirements)

### what to build first

1. **Population milestone display** (trivial — count citizens)
2. **Difficulty multiplier** in CrimeService, HealthService, FireService
3. **Progression milestone events** (founding → growth → maturation → flourishing)
4. **Vertical slice test**

### what NOT to build yet

- Tech tree / era progression (out of scope — the citizen-driven progression IS the progression)
- City rating / score (treasury + population are sufficient metrics)
- Migration / immigration (citizens only enter via birth, leave via death/retirement)
