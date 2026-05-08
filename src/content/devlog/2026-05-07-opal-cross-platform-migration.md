---
title: Opal — Cross-Platform Bluesky Migration
description: New package for converting Twitter, Mastodon, Threads, and Nostr posts to Bluesky with thread splitting, TID-based rkeys, and web OAuth.
date: 2026-05-07
tags: [atproto, feature, oauth]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleepz4kqw2v"
---

## @ewanc26/opal

Built a cross-platform Bluesky migration tool supporting Twitter, Mastodon, Threads, and Nostr as sources. The core library (`@ewanc26/opal`) handles parsing each platform's export format, thread splitting for long posts, and TID-based rkey generation via `@ewanc26/tid`.

### Parsers

Rewrote all parsers based on export format research. Each platform's export structure is handled separately — Twitter archives, Mastodon ActivityPub outboxes, Threads data downloads, and Nostr event dumps.

### Web UI

`@ewanc26/opal-web` provides a browser-based OAuth import flow. The landing page is deployed at opal.croft.click with the same design language as the other croft.click subdomains.

### Key details

- Thread splitting: long posts are split into Bluesky threads instead of truncating
- TID-based rkeys: uses `@ewanc26/tid` for deterministic, sort-key-compatible record keys
- Rate limiting: publisher handles PDS rate limits gracefully
- Request timeouts: added to prevent serverless function timeouts on Vercel
