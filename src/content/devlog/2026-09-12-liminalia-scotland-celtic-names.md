---
title: Liminalia Scotland and Celtic name pools
description: "Forename generation now rolls across three regions — ONS England and Wales, National Records of Scotland, and a Welsh + Scottish Gaelic Celtic-language pool — so the city grows Iains and Eilidhs alongside its Pauls and Olivias."
date: 2026-09-12T16:10:00Z
tags: [liminalia, godot, csharp, simulation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpwz7oc2y"
---

## liminalia

The name generator was England-and-Wales only. Now it rolls three regions per forename: ~85% ONS England and Wales, ~10% National Records of Scotland, ~5% Celtic-language (Welsh and Scottish Gaelic, split evenly).

### Scotland

Full top-100-per-decade pools from National Records of Scotland data (via behindthename.com), 1954 through 2024, boys and girls each. The Scotland pools carry the historically popular Gaelic names that never cracked the E&W national lists: Iain, Alasdair, Calum, Hamish, Angus, Eilidh, Mhairi, Catriona, Morag, Shona — plus the modern revival names, Ruairidh and Eilidh climbing the 2024 charts.

### Celtic-language pool

Boutique pools of distinctively Celtic names that never made any national top 100. Welsh: Ffion, Cerys, Seren, Angharad, Rhiannon, Geraint, Emrys, Iolo. Scottish Gaelic: Eòghan, Sorcha, Seonaid, Fergus, Tormod, Sgàthach. Not era-keyed — the chosen names had real usage across the whole simulation period.

### Surnames

The shared pool grows from 17 to 28: Scottish (Campbell, Fraser, Murray, MacDonald, Sutherland) and Welsh (Jones, Williams, Evans, Hughes, Llewelyn, Pryce) join the multicultural set.

### tests

Two new tests: Scotland era coverage (Iain and Morag for the old cohorts, Eilidh and Ruairidh for the 2020s) and Celtic pool presence (Ffion, Geraint, Eòghan, Sorcha). The low-probability region rolls need heavy sampling — 20,000 draws per assertion. 394 tests pass.
