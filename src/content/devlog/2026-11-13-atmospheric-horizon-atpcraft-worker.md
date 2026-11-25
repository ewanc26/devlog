---
title: Atpcraft becomes a worker inside the game
description: A native mod scaffold grew into a JSON-lines sidecar with OAuth, typed records, graph reads and profile commands.
date: 2026-11-13
tags: [atmospheric-horizon, minecraft, atproto, rust]
draft: false
---

The atpcraft port moved through its milestones M2 to M24 in one pass: from a mod skeleton to something that can read a Bluesky profile from the game.

- Native mod scaffold: protocol crate, mixin layer, template pins and docs, with an in-game M2 build verification.
- The atmospheric-worker sidecar speaks JSON-lines over stdio, with a serde wire format for commands, events and session state.
- OAuth module: DPoP keys and proofs, PKCE, resolution, PAR, loopback redirect and token exchange.
- Screenshot posts, notification polling, chat records and player-state snapshot records across M3–M6.
- Graph module for public social-graph reads, followed by graph write actions and record helpers.
- Profile module and worker `FetchProfile` close out M24.

A sidecar speaking JSON-lines is a deliberately boring interface. It lets the mod remain a mod while the protocol work happens in a process you can test on its own.
