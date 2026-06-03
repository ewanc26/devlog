---
title: Malachite v0.9.0 — Performance & Rate Limiting Overhaul
date: 2026-02-07
description: Implementing adaptive rate limiting, dynamic batching, and SHA-512 credential security.
tags: [malachite, atproto, performance, security]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55d6p4d2z"
---

### Adaptive Pacing
I've completely redesigned the rate limiting and batching logic in Malachite to maximize throughput while respecting PDS quotas.

- **Dynamic Batching:** The tool now uses server-learned rate limits to dynamically adjust batch sizes and pacing in real-time.
- **Recovery Mode:** Added a "recovery mode" with adaptive wait times for when quotas are critically low.
- **Credential Security:** Implemented SHA-512 based auto-saving for credentials and standardized all local storage paths to `~/.malachite/`.
- **Validation:** Added unit tests for Spotify imports, CSV parsing, and sync utilities to ensure reliability during high-speed operations.
