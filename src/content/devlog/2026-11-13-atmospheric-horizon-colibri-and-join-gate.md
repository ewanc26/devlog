---
title: Colibri links players to a server identity
description: A bridge, in-game link claims and server-side identity lead to a join gate for linked accounts.
date: 2026-11-13
tags: [atmospheric-horizon, minecraft, atproto, identity]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342aq5ivo2e"
---

Server identity stopped being a config string. Players now have a linked identity the server can check when they join.

- Colibri bridge core, followed by membership repair and token rotation.
- Server event notices relayed through the bridge, with a presence fallback and approval notice.
- Reconnect and send throttling, plus chat cleaning that matches atpcraft's behaviour.
- Server-side player identity service and in-game claims for server identity links.
- A join gate enforces linked accounts and checks linked players' Colibri profiles on entry.
- Bridge status reports the Colibri community.

The join gate is where the architecture becomes a rule rather than a feature. Identity work that never gates anything is just metadata.
