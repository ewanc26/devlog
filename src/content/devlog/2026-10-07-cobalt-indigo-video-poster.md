---
title: Video posters on Cobalt and Indigo
description: A video in a post shows its poster frame and a line saying the console cannot play it, decoded at the size it is drawn
date: 2026-10-07
tags: [cobalt, indigo, wiiu, 3ds, video]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatsto423"
---

Both clients showed a video as a bare note. They now draw its poster frame, sized to the console, with a line saying the video cannot be played there.

## Changes

- **Cobalt** ([#200](https://github.com/ewanc26/cobalt/pull/200)): the poster goes onto the link-card layout, decoded at the thumbnail cap of 320 px. Its title says "Video: can't play on the Wii U". Pinned to Wolfram v0.37.0. Shipped in Cobalt v0.9.0.
- **Indigo** ([#69](https://github.com/ewanc26/indigo/pull/69), released in 0.12.0): the poster is drawn in the post's picture band, 16:9 when the author declared it, and decoded at the size it is drawn (400 px at most). A line below says it cannot play on the 3DS.
- Indigo's snapshot harness gained a `timeline-video` scenario, so the layout can be rendered without a device.

## Downscale, and what is not verified

The 400 px figure is a cap, not a measurement. On the 3DS top screen the poster box is about 107 by 60 px, so that is the size the decode asks for. Nothing has been measured on a real 400 by 240 screen. Cobalt's cap of 320 px sits well under the GamePad's 854 by 480. The Wii U video check is still open: the emulator session was on the sign-in screen, and the video post was not on screen.

Video playback is not attempted and is not planned. The rendition ladder of Bluesky's HLS playlist is not documented in the tutorial, so the clients never read the playlist.
