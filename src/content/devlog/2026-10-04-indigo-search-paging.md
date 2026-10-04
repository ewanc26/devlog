---
title: Indigo paged search results
description: Search results grow more pages as you scroll, closing issue #10
date: 2026-10-04
tags: [indigo, atproto, c, 3ds]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mx3kwo42rr23"
---

Search stopped at its first page: a query, a profile's posts, a followers list — all returned twenty entries and no way to ask for more (issue #10). This adds paging to every search-kind that has a server cursor.

## Changes

- **`src/app/search.{c,h}`** — the search model grows a cursor and a `has_more` flag. `indigo_search_begin_page(s, append)` stages a fetch (fresh fetch resets, page keeps), `indigo_search_finish_page(s, added, next_cursor)` completes it, and `indigo_search_wants_page` is the prefetch gate: near the end of what is held, more are wanted — the same rule the timeline uses, so scrolling does not pause at a page boundary. An empty page on a non-empty list ends the paging even when the server still offers a cursor.
- **`src/atproto/session.{c,h}`** — every submit function gains a `paging` flag; the worker passes the session's cursor to Wolfram only when set, and copies the next cursor into the event before freeing the list. Request size is `INDIGO_SEARCH_PAGE` (20); the app accumulates up to `INDIGO_SEARCH_MAX` (60, raised from 20 — the union grew ~100KB and the host test stack limit went with it).
- **`src/app/app.c`** — the `*_loaded` functions append instead of resetting (staging decides), and `update_search` polls `wants_page` and maps the search-kind back to its request kind. Saved feeds are the one exception: they come from the account's preferences in a single fetch, so there is no second page to ask for.
- Tests: `test_search_paging` covers append, cursor stop, and empty-page stop. Existing tests updated for the staging-based reset (a bare `loaded` call no longer clears). AGENTS.md, README, CHANGELOG updated.

## Verification

- `make test` — 2949 checks, 0 failures
- `make warnings` — clean
- `make snapshots` — 111 PNGs, no diffs
- `make all` with devkitARM — indigo.3dsx built clean

Commit `de12fcf`, pushed. Issue #10 closed.
