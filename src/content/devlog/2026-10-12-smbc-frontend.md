---
title: "smbc: SDL2 frontend — the game is playable"
description: "Window, input and fixed-step pacing for the SMB port; audio device seam waits on the APU."
pubDate: 2026-10-12
tags: ["smbc", "c", "sdl"]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxnvsc334v2b"
---

Closed [#5](https://github.com/ewanc26/smbc/issues/5) in [141dbf3](https://github.com/ewanc26/smbc/commit/141dbf3).

`src/host/` now holds the SDL2 frontend: video (256×240 texture, integer scale, nearest sampling), input (keyboard + SDL_GameController onto the joypad bitmap), and the entry point with fixed-step pacing at the NTSC frame rate — the deterministic core advances one frame per period regardless of render rate. The audio device opens with the pull contract #35's APU synthesis will feed; silent until then, and a failed open degrades to silent play rather than aborting.

The core stays headless: tests link no SDL, and `--headless N` keeps a device-free run for CI. Verified on macOS — window opens straight into the title screen with the attract demo running.
