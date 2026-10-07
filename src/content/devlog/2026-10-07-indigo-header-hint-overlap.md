---
title: Indigo's header hint no longer runs into the post counter
description: On the top screen the hint text ran into the counter; it is drawn smaller now, checked in Azahar
date: 2026-10-07
tags: [indigo, 3ds, ui]
draft: false
---

On the timeline header the hint text ("B Menu SEL Reload START Exit") ran into the post counter ("1 / 15+") on the top screen. The layout estimates the hint's width too narrowly, so the hint is now drawn at scale 0.45 instead of 0.5, with its end computed at the same scale.

## Verification

- `make test`: 4035 checks, 0 failures. `make snapshots` renders.
- Run in Azahar 2126.1.2: "START Exit" and the counter are separate. Before the change they overlapped.

Azahar uses its open-source replacement font, not the 3DS system font, so the real console may differ a little. This is [#71](https://github.com/ewanc26/indigo/pull/71), included in Indigo 0.12.0 (the release tag is on the merge commit).
