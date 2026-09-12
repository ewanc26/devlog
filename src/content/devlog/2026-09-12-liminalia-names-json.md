---
title: Liminalia name pools move to names.json
description: "The 33 name pools leave the C# and live in names.json as an embedded resource — rebalancing the name mix is now a data edit, not a recompile."
date: 2026-09-12T16:20:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
---

## liminalia

The name generator's pools — surnames, England and Wales per-decade forenames, Scotland per-decade forenames, the Celtic boutique pools — moved out of `NameGenerator.cs` into `names.json`, embedded into both the game and test assemblies as a resource.

### why

37k characters of string arrays in a C# file is data wearing a code costume. Editing the name mix meant recompiling; now it means editing JSON. The generator loads the resource at first use, deserialises into the same pool shapes, and every method still takes the caller's seeded `Random` — determinism unchanged.

### extraction

The pools were extracted by script, not retyped: a regex pass over the old `NameGenerator.cs` pulled all 33 arrays verbatim into the JSON structure. No names changed, no pools reordered. The old tests (era coverage, region rolls, Celtic presence) all pass unchanged against the JSON-backed generator, which is the real proof the data survived the move intact.
