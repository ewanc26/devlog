---
title: channel-blue adds avatar rendering to the profile screen
description: The host-side UI for wolfram drew the user's avatar on the profile screen, fixed the wolfram build path for cross-compilation, and marked avatar milestones as done on the roadmap.
date: 2026-08-18T08:48:26Z
tags: [channel-blue, wolfram, atproto, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35hgqn22a"
---

## channel-blue

`a43cff6` drew the avatar on the profile screen (`feat(profile): draw the avatar on the profile screen`), fetching the user's avatar blob from the PDS and rendering it in the profile view. `ce8b0ec` fixed the `HOST_WOLFRAM_BUILD` path to point at wolfram's actual host build directory, resolving a cross-compilation break. `eb78d16` updated the roadmap to mark avatar fetch and thumbnail rendering as done.
