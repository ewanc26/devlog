---
title: atpkt — full XRPC client, Jetstream, and OAuth session management
description: Expanded the AT Protocol Kotlin library with a comprehensive XRPC client, Jetstream firehose support, OAuth session management, and a modular test suite.
date: 2026-06-13T12:00:00Z
tags: [atproto, kotlin, library, atpkt]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3movapvg77y2n"
---

## atpkt expansion

The atpkt library — a Kotlin AT Protocol client for the JVM — grew from an OAuth-focused library with basic API coverage into a comprehensive AT Protocol toolkit. The June 13 merge train nearly doubled the library's scope.

### full xrpc client

The new XRPC client provides complete coverage of the AT Protocol's XRPC API surface. It handles request serialisation, response deserialisation, error mapping, and pagination for all lexicon methods. The client is structured around an `atproto.blue`-inspired Agent pattern that centralises authentication, rate limiting, and retry logic.

### jetstream consumer

A Jetstream client connects to the AT Protocol firehose, streaming real-time repository events. The client handles reconnection with exponential backoff, cursor management for resuming from the last processed event, and configurable filters for specific collections or DIDs.

### oauth session manager

The OAuth session manager provides automatic token refresh, DPoP proof generation, and secure storage of session state. It implements the full AT Protocol OAuth flow — PAR, authorisation code exchange, token refresh — and surfaces session lifecycle events so calling code can react to expiration or revocation.

### modular dependency audit

As part of the expansion, the library's dependencies were audited and refactored into modular components. The lexicon subsystem (type generation from AT Protocol lexicon schemas) was decoupled from the network layer, making it possible to use the type system without pulling in the HTTP client. A `LexiconGenerator` produces Kotlin data classes from lexicon JSON, supporting custom lexicon extensions beyond the standard AT Protocol lexicons.

### test suite

The test suite now covers XRPC request/response cycles, session management state transitions, and Jetstream event parsing. Tests are organised by subsystem with shared fixtures for DID documents, OAuth tokens, and sample repository events.
