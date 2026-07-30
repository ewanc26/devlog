---
title: New project — cobalt, a native Bluesky client for Wii U
description: A native SDL2 Bluesky/AT Protocol client for the Wii U's Aroma homebrew environment, an alternative to the console's WebKit browser and a spiritual successor to the stalled Wii client.
date: 2026-07-25T22:59:00Z
tags: [cobalt, wiiu, bluesky, homebrew]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubtta42f"
---

## cobalt

A new project: a native, responsive Bluesky/AT Protocol client for Wii U owners running Aroma homebrew — an alternative to the console's WebKit-based Internet Browser, and a parallel effort to `channel-blue` (the Wii client), built because the Wii U's development flow is much friendlier than the Wii's.

### the shape of it

C (with limited C++ for RAII where it helps), built with devkitPro/WUT, rendering via SDL2 rather than raw GX2. Networking goes through curl and mbedTLS. `wolfram` — the C AT Protocol SDK also used by MetalBear and channel-blue — handles XRPC/session/record logic as an optional sibling checkout. Development happens directly against real Wii U hardware with Aroma installed, with no emulator in the loop.

Two screens are first-class from the start rather than one derived from the other: a paired TV+GamePad mode, and a fully self-sufficient GamePad-only ("Off-TV Play") mode with its own FWVGA (854×480) layout and type scale. Auth goes through the Wii U's software keyboard for app passwords — full OAuth was ruled out as impractical on hardware with no good redirect-target hosting.

### the entropy problem

The Wii U has no usable hardware CSPRNG — mbedTLS's `mbedtls_hardware_poll` is just a tick-seeded `rand()`. wolfram's signing code fails closed on Wii U, the same as it already did on Wii, until a 64-byte external entropy seed is provisioned from the SD card. The seed is generated at bundle time and rotated on every boot with a load→set→rotate→save→commit sequence. Read-only use and app-password login are unaffected — only local signing is gated. curl/mbedTLS's own transport-layer randomness isn't covered by this fix and is flagged as a known remaining risk.

### status

Early scaffold: the app lifecycle, networking, and input modules are wired up (~2,600 lines of C across four commits), but there's no timeline or compose UI yet. That's the next stretch of work.
