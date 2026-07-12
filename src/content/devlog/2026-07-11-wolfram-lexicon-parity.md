---
title: wolfram reaches broad AT Protocol lexicon parity
description: The C11 AT Protocol SDK gained near-complete typed wrappers, an XRPC server, OAuth/DPoP verification, language bindings, and console-platform ports.
date: 2026-07-11T17:00:00Z
tags: [wolfram, atproto, c, sdk]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzqbt22e"
---

## wolfram: a C11 AT Protocol SDK

A focused push to bring `wolfram` — a client-side, low-RAM AT Protocol SDK written in C11 — to broad wire-level parity with the lexicon. Most of the work landed across 5–11 July.

### typed agent surface

The generated-client layer now covers almost the entire lexicon: `com.atproto.*` (repo, server, sync, identity, admin, temp, label, notification v2), `app.bsky.*` (actor, feed, graph, notification, chat, video, embed, draft, bookmark, ageassurance, contact, moderation, unspecced), and `tools.ozone.*` (moderation ops, report/queue/signature, admin). The high-level `wf_bsky_agent` wrapper gained record create/read, repo sync with verified diff apply, cursor pagination, preferences, and push-notification APIs.

### server, crypto, and verification

- Optional XRPC server module (libmicrohttpd) with per-route rate limiting, streaming SSE, and a WebSocket subscription relay.
- OAuth resource-server DPoP/Bearer verification plus service-JWT issuance, with offline field tests.
- End-to-end record commit-signature verification and an injectable DID-key resolver.
- A durable, writable PDS repo store (`listRecords`, `getLatestCommit`, blob persistence/serving) and `subscribeRepos`/`subscribeLabels` firehose frame production.

### codegen, bindings, and platforms

`lexgen` now emits typed union value structs, portable C/C++ identifiers, and `_call` defs for parameterless procedures, validated against atproto reference vectors. Companion C++ RAII and C# (`Wolfram.Interop`) bindings are auto-generated from the C headers. Platform support extended to Nintendo Wii U, 3DS, and Windows, with cross-compilation docs and a GitHub Actions workflow building default + full-feature variants on Node 24.

The README was reworked to clarify that wolfram is a client-side protocol SDK rather than a backend port, and now includes a "Why C, not Rust?" rationale.
