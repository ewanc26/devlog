---
title: cobalt adds actor search, custom feeds, curated lists, and reply-gating
description: A C AT Protocol client gained actor search with typeahead, custom feeds sourced through the timeline's own storage, browse-only curated list browsing, and reply-gate composition for new posts. 8 commits, ~1800 lines added.
date: 2026-08-19T02:29:46Z
tags: [cobalt, atproto, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35hcivc2a"
---

## cobalt

### actor search

`d8f2d45` added actor search (`feat(app,atproto): actor search`) — a new search tab with search-actors and search-typeahead queries, displaying results with handle, display name, and avatar. At +551 lines, it's the largest feature commit in this window.

### custom feeds

`49aca67` added custom feed browsing (`feat(app,atproto): custom feeds, sourced through the timeline's own storage`), fetching feed generators and rendering them through the timeline's existing storage and display infrastructure. At +265 lines, feeds appear as a browsable list alongside the main timeline.

### curated lists

`b271aed` added browse-only curated list support (`feat(app,atproto): browse-only curated lists`), the largest feature commit at +909 lines. Lists are fetched, rendered, and navigable, but editing is intentionally left out — read-only browsing matches the client's current scope.

### reply-gating

`bf089ca` added reply-gate composition for new top-level posts (`feat(app,atproto): reply-gate a new top-level post at compose time`), letting users restrict who can reply at publish time. At +87 lines, it's a focused addition to the compose flow.

### build and docs

`5d16f31` renamed `atproto/profile.c` to avoid a basename collision with `app/profile.c` that was breaking the build. `4a8f229` documented Cemu as an acceptable iteration target alongside real hardware.
