---
title: Profiles, skins and server cards from inside the game
description: Player-facing Bluesky identity arrives first, then a typed server-card protocol, achievement posts and a v0.5.0 release.
date: 2026-11-25
tags: [atmospheric-horizon, minecraft, atproto, releases]
draft: false
---

By mid-November the player could edit a Bluesky profile from the game. By the end of the month the server had a card it could publish about itself.

### identity and media

- Bluesky profile editing from the game, with avatar and banner uploads.
- Skins published from the browser, and player aspects captured with RPG item discovery.
- Documentation shipped alongside the profile and image-upload work.

### server cards

- Typed server-card record model with packs and validation.
- A `PublishServerCard` command and the game-side publish/read commands.
- Card digest, liveness verdict and worker arms on the read side.
- The card advertises the pinned Horizon revision.
- Digest records validated and the source quote pinned after CI failures.
- Achievement announcements posted to Bluesky, and release v0.5.0.

The card is a good endpoint for the month's work: a record the server can make a claim about, signed and readable by the same tooling that handles everything else.
