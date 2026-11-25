---
title: Balla names places and fixes group chat
description: A configurable places provider and composer picker land with usable group conversations, a full participant list and a 0.62.0 release.
date: 2026-11-25
tags: [balla, atproto, places, chat]
draft: false
---

Balla's latest work is small on paper and noticeable in use: posts can name a place, and group conversations finally work properly.

- Configurable places provider for typed search.
- Typed place-name picker in the composer, with an honest map link-out by name.
- A reversible places off switch, and the configured places host named in the picker.
- Group conversations made usable, and the full participant list shown.
- Canonical Bluesky links and `did:web` document URLs each got one shared builder.
- A local-only native plist assertion is guarded by a test, and the group-chat fix folded into 0.62.0.

Naming the configured host in the picker is the detail I like. If a feature depends on a third-party service, the interface should say which one.
