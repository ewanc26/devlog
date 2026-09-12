---
title: Liminalia Irish name pools
description: "The Celtic-language roll now splits four ways — Welsh, Gàidhlig, Irish English and Gaeilge — and ten Irish surnames join the shared pool."
date: 2026-09-12T16:25:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
---

## liminalia

The Celtic-language forename roll splits four ways now instead of two: Welsh, Scottish Gaelic, Irish English and Gaeilge, each pool drawn evenly. The `gaelic` key in names.json became `gaidhlig` — the data now names the language it holds.

### the pools

- **irishEnglish** — Hiberno-English forms in common use across Ireland, north and south: Declan, Ronan, Cian, Niall, Eamon; Sinead, Niamh, Aoife, Saoirse, Maeve
- **gaeilge** — Irish-language spellings, distinct from both the Hiberno-English pool and the Scottish Gaelic one: Daithi, Conchur, Lorcán, Tadhg; Blathnaid, Eilis, Maighread, Eithne

The Gàidhlig pool keeps its own spellings (Eòghan, Sileas, Oighrig) — Gaeilge and Gàidhlig share roots but the orthographies diverge, and the pools respect that.

### surnames

Ten Irish surnames join the shared pool: Murphy, Kelly, Byrne, Ryan, O'Connor, Walsh, O'Neill, Gallagher, Quinn, Kavanagh. 38 total.

The Celtic pool test now samples 40,000 draws (a 5% roll split four ways needs it) and asserts a name from each of the four pools appears. 405 tests pass.
