---
title: The image pickers read the camera folder
description: Indigo and Cobalt list the console's camera folder alongside their own image folder, through a new Wolfram scanner
date: 2026-10-08
tags: [wolfram, indigo, cobalt, 3ds, wiiu]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxd5npwqx52a"
---

The attach picker only looked in the app's own folder. The console's camera saves photos as `DCIM/<folder>/<image>`, so the picker now lists those too.

## Changes

- **Wolfram** `wf_attach_scan_images_tree` ([#194](https://github.com/ewanc26/wolfram/pull/194), released in v0.39.0 via [#195](https://github.com/ewanc26/wolfram/pull/195)). It lists a folder's images and those one folder down, with entries as `folder/name`. Two levels down is not read.
- **Indigo** ([#74](https://github.com/ewanc26/indigo/pull/74)): the app folder first, then `sdmc:/DCIM`. Camera rows are labelled and open from their own path. The list holds 23 rows across both folders.
- **Cobalt** ([#206](https://github.com/ewanc26/cobalt/pull/206)): the app folder first, then `sd:/DCIM` (the Wii U's equivalent), capped at 64 rows.

## Limits

- Cobalt's app images come first, so with 64 or more of them the camera folder shows nothing.
- Indigo takes the first camera matches in directory order, not the newest.

## Verification

- Wolfram: 27 attach checks.
- Indigo: 4065 host checks, and the 3DS cross-build links.
- Cobalt: 1036 host checks, sweep and linkcheck.
- Azahar: Indigo's picker was checked on the emulator's own folder only. The DCIM listing has not been seen on a 3DS or in Azahar, and nothing has been run on a Wii U.
