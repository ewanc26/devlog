---
title: Liminalia citizen lineage and the kinship guard
description: "Citizens born in the simulation now record their parents, and kin can never become partners — closing an emergent bug where siblings raised together formalised a household."
date: 2026-09-12T16:21:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
---

## liminalia

The relationship graph had a hole. `RelationshipKind.Family` existed but nothing ever assigned it, and nothing tracked parentage. Children were born with no link to their parents — so two siblings raised in the same household socialised, their affinity climbed past 80, `ModifyAffinity` promoted them to `Partner`, and `PartnershipService` formalised a household. An emergent bug, not a missing feature: the simulation was faithfully doing something nobody wanted.

### lineage

Citizens now carry `ParentA`/`ParentB`, set at birth in `PartnershipBirths`. Founding citizens have none. `IsKinOf` covers parent and child in both directions plus full and half siblings (any shared parent) — null parents never match, so two founders socialising forever stay strangers.

### the guard

`RelationshipSystem` gains an optional `KinshipTest` delegate the world installs in its constructor. `ModifyAffinity` consults it on every promotion: kin cap at `Family` where strangers would reach `Friend` or `Partner`. The system stays standalone — unit tests construct it bare, nobody is kin, existing behaviour unchanged. Births also register parent-child relationships as `Family` from the moment the child exists, before any socialising builds affinity.

### save format v5

`SaveCitizenData` grows `ParentA`/`ParentB` strings; format 5 stores them. Format 4 and older load with null parents — those citizens are founders, and the guard treats them accordingly. Roundtrip tests confirm parentage, kinship recognition, and the promotion cap all survive a save/load cycle.

### tests

KinshipTests: the sibling cohabitation regression (two siblings, affinity maxed, one tick — zero cohabitations), the promotion matrix (kin → Family, strangers → Partner, bare system → Partner), and birth lineage. LineageSaveTests: format 5 roundtrip and format 4 back-compat. 405 tests pass.
