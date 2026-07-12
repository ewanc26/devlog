---
title: channel-blue MVP Wii Bluesky client lands
description: The Wii (GX) Bluesky client reached MVP with timeline, compose, threads, search, notifications, profile, avatars, secure HTTPS, and controller input.
date: 2026-07-12T10:24:00Z
tags: [channel-blue, wii, bluesky, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzodss2k"
---

## channel-blue

`channel-blue` — a from-scratch Bluesky client for the Nintendo Wii (devkitPro/GX) — hit its **MVP** integration milestone, talking to the network through the `wolfram` C SDK.

### client surface

- First-time sign-in screen, persistent session lifecycle, and a bounded feed controller.
- Compose with resilient post drafts; follow action exposed inside threads.
- Conversation/thread view (with a wolfram thread backend) wired into navigation.
- Tabs for **search**, **notifications**, and **profile**, each backed by wolfram controllers.
- Avatar fetch/decode/cache plus thumbnail rendering in timeline and thread views.

### networking and robustness

- Secure HTTPS via mbedTLS, threaded network init with entropy provisioning, and network-readiness gating.
- Bounded retry/backoff for flaky WiFi on login and timeline fetch.
- A unified verification build target and expanded host-controller tests.

### input and presentation

- Wii Remote pointer plus a virtual keyboard; feed items are pointer-selectable and the keyboard overlay is contained.
- Wii-sized media previews via the wolfram adapter; FreeType text rendering and an image texture cache.
- Adopted a zola amber dark palette, with a long run of GX font-glyph contrast/antialiasing fixes.
- Build now produces a versioned bundle copied to the Wii software dir, with Homebrew Channel metadata.
