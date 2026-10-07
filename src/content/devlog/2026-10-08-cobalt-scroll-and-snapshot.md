---
title: Cobalt's scroll restore and snapshot harness
description: Backing out of a followers or following list keeps the profile's place, and the snapshot harness checks each menu's state before pressing
date: 2026-10-08
tags: [cobalt, wiiu, ui, testing]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxd5npvgfg2t"
---

Two Cobalt changes, both merged.

## Changes

- **Scroll restore** ([#205](https://github.com/ewanc26/cobalt/pull/205)): backing out of a profile's followers or following list keeps the profile's selection and scroll, instead of rewinding to its header. This is partial for [#110](https://github.com/ewanc26/cobalt/issues/110). The timeline-to-thread rewind is not reproduced on the host, so #110 stays open until someone checks it on a console.
- **Snapshot harness** ([#204](https://github.com/ewanc26/cobalt/pull/204), for [#166](https://github.com/ewanc26/cobalt/issues/166)): the menu steps picked rows by position, and one drifted press sent every later frame to the wrong screen. Each step now returns to the timeline, picks its card by index and its row by popup kind, and checks the screen before and after pressing. The profile frame shows the profile. There is no video step, because the fixture has no video post.

## Verification

- Host: the checks passed at the time of each PR (1024 for the scroll restore); the snapshot harness reported 269 checks, 0 failures.
- Not run on a Wii U. The scroll restore is verified only on the profile path in code.
