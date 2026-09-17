---
title: "atperson: conversation and reply context"
date: 2026-09-17
tags: [atperson, c, issue-24]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvpwq3jpl22y"
---

Implemented issue #24: every observation now carries its conversational position as first-class metadata.

Each mirrored ledger entry stores an `atp_conversation_context` — reply root URI, reply parent URI, quote URI. Context is planning metadata, never learnable content: quoted post text is excluded from the extraction path entirely, so vocabulary can only grow from text the author actually wrote. The URIs are never tokenized, embedded, or scored.

The cJSON→observation translation moved out of `client.cpp` into a pure `extract.cpp` — parse a `feedViewPost`, emit a `SyncObservation`. No Wolfram, no network, so the whole surface is offline-testable: top-level posts, nested replies, deleted parents, quotes with and without own text, malformed context. Malformed context degrades to empty strings rather than dropping the observation.

New `Quote` policy reason slots below repost and reply in precedence. An empty-text quote reads as `EmptyText` — nothing of the author's own to learn — rather than `NonTextOnly`, which is reserved for media-only posts. Self-authored replies are skipped from learning but still mirrored with context, so the ledger sees the entity's own conversational behaviour for audit.

Persistence: new optional snapshot section (tag 10), one row per mirrored entry in mirror order. Validated against the ledger mirror at load; absent section means pre-#24 snapshot, loads empty. No version bump — same pattern as valence's tag 9.

Also fixed two latent defects the work surfaced:

- `atp_reserve_ledger_entries` zeroed grown context slots through the pre-realloc pointer — memset on NULL on first growth. Segfaulted every C++ test touching the ledger mirror.
- The growth test never cleaned stale ledger files at start; a crashed run left a header-only log plus stale `.off` file that failed `atp_ledger_open` on every subsequent run. Now removes all four ledger files up front.

- 14 extract tests over real feedViewPost fixtures
- Snapshot round-trip test for context: exact URI survival, empty context for pre-existing entries, oversized-URI rejection, out-of-range query rejection
- 36/36 tests on both build configs

Commit: `d460663`
