---
title: Indigo muted words and hide-reposts
description: Port Cobalt's muted-word and hide-reposts feed filtering to Indigo, closing the last feature parity gap
date: 2026-10-04
tags: [indigo, atproto, c, 3ds]
draft: false
---

The last Cobalt parity gap was feed filtering: Cobalt honours the account's saved muted words and the home timeline's hide-reposts preference (commit `d4c1686`, issue #106); Indigo did not. This ports the whole module.

## Changes

- **`src/atproto/prefs.{c,h}`** — pure, host-testable muted-word matching, matching Cobalt's rules exactly: case-insensitive; a single alphanumeric word matches whole words only (muting "cat" does not hide "category"); a phrase or punctuated word matches as a substring; tag mutes match facets with or without the leading `#`; a word with no targets is content-only. `indigo_prefs_filter_page` compacts a session page in place and returns how many posts were dropped.
- **`src/atproto/prefs_wolfram.c`** — the Wolfram conversion, kept out of `prefs.c` so the host build never sees Wolfram headers. Skips expired mutes (the server keeps the records), reads `hide_reposts` off the `home` feed view, maps `content`/`tag` targets.
- **`src/util/timefmt.c`** — `indigo_time_parse_rfc3339` and `indigo_time_now`. The parser is Howard Hinnant's `days_from_civil` arithmetic rather than `timegm`, which devkitARM lacks; it accepts only the UTC form ATProto requires (fractional seconds tolerated, numeric offsets rejected). The epoch is `long long` because the 3DS's `long` is 32 bits and a far-future expiry would not fit.
- **`src/atproto/session.c`** — `ensure_prefs()` fetches preferences once per sign-in via `wf_agent_get_actor_prefs_typed`, non-fatal on failure (feed shown unfiltered, retried next page). `do_timeline` filters with `home=true`, `do_feed` with `home=false` — hide-reposts is a home-timeline preference only. `drop_agent()` resets the loaded flag.
- Tests: `test_prefs` and parser cases in `test_time_rfc3339` ported from Cobalt's suite. AGENTS.md §28, README, and CHANGELOG updated.

## Verification

- `make test`: 2940 checks, 0 failures (was 2845).
- `make warnings` clean, `make snapshots` unchanged.
- Clean `make` cross-build with devkitARM: `indigo.3dsx` builds. Cross-build verified only, not run on hardware.

Empty-after-filter pages keep the cursor and the app auto-requests the next page, terminating at feed end — same behaviour as Cobalt. Indigo commit `fb46dea`.
