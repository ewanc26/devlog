---
title: wolfram grows a multi-tenant resolver, sheds storage, and builds for Wii U
description: wolfram added a per-request repo/blob resolver for multi-tenant PDS use, moved storage ownership to MetalBear, hardened did:plc against the real PLC directory, and cross-compiles its XRPC server for Wii U.
date: 2026-07-29T11:29:00Z
tags: [wolfram, atproto, c, sdk]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuaiua42f"
---

## wolfram

`wolfram` — the C11 AT Protocol SDK — picked up the pieces that let `MetalBear` become a real multi-tenant, federating PDS, while narrowing its own scope down to "just the SDK."

### multi-tenant and storage

A per-request repo/blob resolver was added so a server built on wolfram can serve more than one account per process — this is the piece MetalBear's account-context refactor consumes. In the same spirit, PDS repository storage was removed from wolfram's own build, and blob storage followed later: wolfram no longer owns storage at all, that responsibility now lives entirely in MetalBear.

### did:plc, for real

A long, iterative bug-fix chain hardened the `did:plc` implementation: base64url encoding replaced with a real library instead of a hand-rolled version, canonical DAG-CBOR encoding (minimal integers, deterministic map-key ordering), the genesis operation's `prev` field, and hex-decoded rotation keys. Several commits are literally titled `debug:` — this was live debugging against the real PLC directory, not speculative work, and it's what unblocked MetalBear's federation.

### sync, MST, and the websocket server

`subscribeLabels` (`#labels`) shipped end-to-end — typed wrapper, offline tests, agent-level wrapper, and a server round-trip. The Merkle Search Tree got correctness fixes for recursive deletes and subtree depth normalization. The WebSocket server had a cluster of concurrency and lifetime bugs fixed: writes through freed streams, MHD's invalid-socket sentinel, upgrades that never complete.

### a new platform: Wii U server

The XRPC **server** now cross-compiles for the **Wii U** via a bundled libmicrohttpd shim — the first console target where the server side (not just the client) builds. It's compile/link-verified only, not yet run on real hardware.

### releases

Nine point releases landed this window, 0.1.1 through 0.2.4, tracking the PLC/DID fixes and canonical-encoding work. Six more commits — the Wii U server, TLS handshake RNG injection, a per-finished-request observer hook — have landed since 0.2.4 without a version bump yet.
