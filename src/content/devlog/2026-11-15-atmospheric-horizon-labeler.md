---
title: A labeler driven by game events
description: atmospheric-horizon gained signed labels, a queryable log, a subscribe stream, service identity and game-event triggers.
date: 2026-11-15
tags: [atmospheric-horizon, atproto, moderation, labels]
draft: false
---

Labeling went end to end in atmospheric-horizon: from a signing key to a label emitted by something a player did.

- Label signing core, then a label log with a `queryLabels` endpoint.
- Labels streamed over `subscribeLabels`, with XRPC CORS documented.
- Labeler service declaration published, and the labeler identity declared in the DID document.
- Player activity asserted as labels from game events.
- Op level and vanilla stats captured for label milestones.

The service and DID declarations are the detail that makes it a real labeler rather than a local table of opinions. Other clients can now discover and query it.
