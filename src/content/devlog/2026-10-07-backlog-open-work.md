---
title: Open work after the video and sign-in changes
description: What is still open, and why, as of the 2026-10-07 work
date: 2026-10-07
tags: [backlog, cobalt, indigo, wolfram, platinum]
draft: true
---

A running list of what has not shipped, with the reason. Draft until the items below are closed or move to their own entries.

## In review or blocked

- **Cobalt [#202](https://github.com/ewanc26/cobalt/pull/202) and Indigo [#72](https://github.com/ewanc26/indigo/pull/72)**: sign-in discovers the PDS. Blocked until the Wolfram v0.38.0 pin is updated and CI is green.
- **Wolfram v0.38.0**: release PR merged; publish waits for CI on the release commit.

## Needs hardware or the owner

- The Wii U video poster has not been seen: Cobalt is on its sign-in screen in Cemu, and the user has to sign in.
- The 400 by 240 downscale has not been measured on a real screen.
- The Azahar header check uses a replacement font; a real 3DS may differ.
- Platinum #42 (video poster on the Mac): the bridge only accepts `cdn.bsky.app` images, and the video thumbnail host is documented only in a third-party PR.

## Backlog issues

- Cobalt [#166](https://github.com/ewanc26/cobalt/issues/166): the snapshot harness's profile frame and link step drift between shots. The diagnosis is on the issue; the fix needs a fixture where each menu's rows are checked by kind.
- Cobalt [#107](https://github.com/ewanc26/cobalt/issues/107), [#110](https://github.com/ewanc26/cobalt/issues/110), [#111](https://github.com/ewanc26/cobalt/issues/111): direct messages, scroll restore, and TV layout. Feature-sized.
- Indigo [#13](https://github.com/ewanc26/indigo/issues/13) and [#19](https://github.com/ewanc26/indigo/issues/19): on-card cache, and attaching an image (#19 stays open until it runs on a device).
