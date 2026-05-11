---
title: "colorTheme: Wheel of the Year seasonal themes"
description: "Replaced astronomical season detection with traditional Wheel of the Year sabbat dates, added midnight auto-update and reset-to-seasonal"
date: 2026-05-11T05:00:00Z
tags: [pkgs, tooling, paganism, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlkvmvviaa2k"
---

Replaced astronomical season detection with the **traditional Wheel of the Year** sabbat dates. Eight sabbats: Samhain, Yule, Imbolc, Ostara, Beltane, Litha, Lughnasadh, Mabon. Each sabbat triggers a theme transition (e.g. Samhain → dark purple, Yule → deep blue, Beltane → bright green).

The theme store tracks `isSeasonal` state and exposes `resetToSeasonal()`. Auto-updates at midnight to catch date-based sabbat transitions without requiring a page reload. Expanded seasonal themes from 4 (astronomical seasons) to 8 (full Wheel of the Year coverage with fixed calendar dates).
