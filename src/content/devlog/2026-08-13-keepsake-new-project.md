---
title: New project — keepsake, a text RPG whose save file is your AT Protocol DID
description: A C++23 text adventure where signing in makes your own PDS the save file — character sheet, quest progress, verifiable achievements, and a firehose-fed shared world, built in under a day.
date: 2026-08-13T00:49:27Z
tags: [keepsake, atproto, cpp, wolfram, bluesky]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg245ooc2l"
---

## keepsake

A new project, built in under a day (2026-08-12 to 2026-08-13, 30 commits): a small text-based RPG in C++23 — a keep with a handful of rooms, one NPC, one boss, one short quest — playable fully offline. Signed in with an AT Protocol account, the same character sheet and quest progress live as `click.croft.rpg.*` records in the player's own PDS instead of a local file, and no Keepsake server ever needs to exist.

### one identity, everything keyed off it

`identity::key()` is the single root value every persistent thing derives from: the save file's location, the character's `worldSeed`, and — once signed in — the AT Protocol DID a save syncs to. Signed out, `key()` returns a locally generated stand-in of the form `local:<16 hex chars>`, persisted at `.../keepsake/identity` and never sent anywhere; signed in, it reads the DID straight out of the OAuth session with no network call needed. The point of routing everything through one function rather than letting each module invent its own naming scheme: swapping from local play to signed-in play was a change contained to `identity::key()`, not a rewrite of every place that used to compute its own name.

### local play, then a PDS-backed one

`sync::RecordStore` is the interface both backends implement — `LocalRecordStore` (a JSON file) and `WolframRecordStore` (the player's PDS), with the game playing identically either way. `WolframRecordStore` uses `com.atproto.repo.createRecord`/`putRecord` against `click.croft.rpg.character` and `.progress`, going through [wolfram](https://github.com/ewanc26/wolfram), the C AT Protocol SDK also used elsewhere in this account. OAuth login (`keepsake login <handle-or-did>`) resolves the handle or DID to its live PDS, runs the native-app loopback flow, opens the system browser, and blocks a local HTTP listener for the redirect.

Getting discovery working needed a workaround, not just a call to wolfram: `wf_oauth_json_array` rejects a _present but empty_ JSON array even on optional fields, and a real Bluesky-hosted PDS returns exactly that shape (`"scopes_supported":[]`), which broke every discovery attempt. `discoverMetadata()` fetches and parses both discovery documents itself and populates the wolfram structs by hand rather than patching wolfram. Verified live up through a real PAR request and a valid `bsky.social/oauth/authorize` URL — the token exchange and everything after it needs a human clicking "Authorize," so that part is implemented and reasoned through rather than proven end to end yet.

### achievements and events as records other people can check

Defeating the keep's boss (the Hollow Knight) writes two append-only records on the not-complete-to-complete transition: a `click.croft.rpg.achievement` (`keep_cleared`) and a `click.croft.rpg.event` (`enemyDefeated`). Both go through `createRecord` with no `rkey`, letting the PDS assign a TID — the right key strategy for a `"key": "tid"` lexicon, versus the fixed-rkey `putRecord` upsert used for character/progress. The broadcast is best-effort and fire-and-forget: a failure never blocks or corrupts the save.

`keepsake events` is a standalone firehose watcher for other players' `click.croft.rpg.event` records. Its connect/retry/Ctrl+C-stop lifecycle is confirmed against the real firehose, but the CAR/CBOR record-decode path couldn't be verified against live data in the development sandbox — WebSocket connections to `wss://bsky.network` failed there even though plain HTTPS worked fine for OAuth, pointing at a sandbox network-egress restriction rather than a code defect. A synthetic CAR/CBOR round-trip test (`firehose_decode_test`) covers the decode path directly, encoding a real record with wolfram's own `wf_record_encode_json`, computing its real CID, and wrapping it in a real CAR block, so the logic is exercised even without live data to point it at.

That same firehose reader now feeds the live game loop, not just the standalone command: `sync::EventBridge` runs the subscription on a background thread and queues decoded events behind a mutex, and `ui::run` polls it once per turn, printing whatever arrives as `(Elsewhere) ...` text between turns. It's deliberately display-only — nothing off the firehose ever reaches `World` or `Progress` — which sidesteps the thread-safety redesign a world-mutating version would need. `main.cpp` only starts a bridge when signed in, so offline play still has zero network activity.

### small, honest touches of identity-seeded flavor

Two modest, flavor-only features round out the "identity-seeded world" idea from the design roadmap, both built on public, unauthenticated `public.api.bsky.app` lookups that need no session. A brand-new character created under a DID whose account was registered this calendar year sees the keep's gatehouse described as freshly forced open, rather than the default worn, rusted one — `fetchAccountCreatedAt()`, verified live against a real handle. And `keepsake npcs on` turns the signed-in player's follows into display-only mentions in the Courtyard's `look` output (public handle and display name only, no DMs, not interactive — no dialogue tree, no `talk` target), re-checked every run so toggling it off takes effect immediately.

### tests and what's still unverified

`quest`, `combat`, `save`/JSON, `dialogue`, and `identity` — the modules deliberately built with no dependency on `sync/`, so they're unit-testable without a save file or a PDS in the loop — got their first test suite in this window, registered unconditionally in CMake so they run even with `-DKEEPSAKE_WITH_WOLFRAM=OFF`. `AGENTS.md` keeps an explicit "current reality and risks" section rather than letting the README overstate things: the save format has no versioning yet, `world/world.cpp`'s `createDefault()` is still the only way to add content, and everything gated behind a human's browser approval or live WebSocket egress is marked reasoned-through rather than proven. The last commit of the window was a docs cleanup — dropping a Wii/3DS stretch goal from the roadmap that wasn't a real target.
