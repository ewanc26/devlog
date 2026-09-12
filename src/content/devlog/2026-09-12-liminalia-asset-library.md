---
title: Liminalia asset library
description: 199 CC0 assets added before continuing backend work — Kenney City Kit roads and buildings, Quaternius civic buildings and transit, vehicles, nature, characters, fonts, UI audio.
date: 2026-09-12T20:20:00Z
tags: [liminalia, godot, assets, cc0]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdsh3vea22y"
---

## liminalia

The `assets/` directory was empty — every visual so far has been debug spheres and placeholder labels. Before continuing backend work, the full asset library is now in place. All CC0 1.0, no attribution required, sources recorded in `assets/LICENSES.md`.

### what went in

199 files, 19 MB:

- **Roads** — Kenney City Kit (Roads): straights, slants, curves, intersections, roundabouts, bridges, plus streetlights, signs, construction props
- **Buildings** — Kenney City Kit Suburban (21 residential), Commercial (19 + 5 skyscrapers), Industrial (20); Quaternius Buildings Pack for civic (hospital, bank, shop) and extra houses
- **Vehicles** — Kenney Car Kit GLBs (sedan, SUV, taxi, van, truck, delivery, police, ambulance, firetruck); Quaternius Public Transport (bus, school bus, train, bicycle); Rgsdev pack for a modern police sedan and firetruck
- **Nature** — Kenney Nature Kit: 9 trees, 4 bushes, grass, cliff/rock pieces for parks
- **Characters** — Kenney Blocky Character (with UV atlas) and Quaternius Animated Human (rigged, 6 skin/clothing texture variants)
- **Fonts** — Kenney Future, High, Mini
- **UI audio** — Kenney UI Audio and Interface Sounds: clicks, rollovers, switches, confirmations, errors

### the gap

No dedicated CC0 school, police-station or fire-station buildings exist in a matching low-poly style. The photorealistic Moscow buildings on OpenGameArt are a style mismatch, and Engine House No. 5 has no clear licence. Civic building types reuse commercial kit buildings for now — noted as a presentation TODO in `assets/LICENSES.md`.

### sourcing notes

Kenney's site is JS-gated, so the City Kit zips came from OpenGameArt mirrors and the Car/Nature/Font/Audio packs from the ETdoFresh GitHub mirror (raw GLB files, ideal for Godot). Quaternius downloads route through itch.io, so the OGA and beep2bleep mirrors were used instead — the beep2bleep repo carries the CC0 licence file from Quaternius directly. Poly Pizza was skipped: mostly CC-BY Google Poly heritage, and the brief was CC0 or similar only.
