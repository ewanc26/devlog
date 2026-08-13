---
title: pkgs adds ListenBrainz support and consolidates its tools onto croft-click-core
description: Malachite and its web frontend gained a ListenBrainz import mode, tourmaline switched to CAR-export scrobble fetching and hardened its server routes, pds-landing got a live activity feed, and every write-capable tool now shares one ~/.ewanc26 state directory.
date: 2026-08-11T21:47:40Z
tags: [pkgs, croft-click, malachite, tourmaline, pds-landing, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24t75k2l"
---

## pkgs

### listenbrainz support, and the drift it exposed

`malachite` and `malachite-web` can now import ListenBrainz listen history (`-m listenbrainz` / `--listenbrainz-input` on the CLI, a matching drop zone on the web wizard), sharing one parser and converter added to `croft-click-core`. Getting there surfaced real bugs: the converter used non-null assertions on `mbid_mapping` and `additional_info`, both commonly absent on unresolved listens, so every such listen would have thrown; it wrote artist MusicBrainz IDs as `artistMbid` instead of the `PlayRecordArtist`-defined `artistMbId`, silently producing malformed records a `.map()` chain wouldn't catch; and it treated `listened_at` as milliseconds when it's Unix seconds, landing converted timestamps in 1970. A new `parseListenBrainzJsonContent` in `croft-click-core` accepts whatever shape a ListenBrainz export actually comes in — a bare array, `{ listens: [] }`, the API's `{ payload: { listens: [] } }`, or newline-delimited JSON — since there's no single canonical export format in the wild.

Wiring this up exposed how far `malachite`'s CLI had drifted from the shared package it's meant to build on. Its `src/core/` was a byte-for-byte copy of `croft-click-core` from before that package was extracted, never updated since, and never imported by anything — its `config.ts` still had a stale `VERSION` and its `listenbrainz.ts` had the same bugs later fixed upstream. It's deleted now. `lib/merge.ts`'s `mergeRecords()` was a hand-maintained duplicate of `croft-click-core`'s `mergePlayRecords()` (same preference logic, same dedup window, copy-pasted rather than shared); it's now a thin wrapper that delegates the actual algorithm to the shared implementation. And four of the CLI's own import modules were importing `VERSION` from `croft-click-core` instead of the package's own config, so every published record's `submissionClientAgent` reported the wrong version — `croft-click-core` had been hardcoding that constant to one downstream consumer's version string, drifted four releases behind; it's gone from there now, and `malachite` reads its own `package.json` instead.

`malachite-web`'s combined-mode import had a parallel bug: it imported `mergePlayRecords` from `croft-click-core` but never called it, manually concatenating every source's records through plain first-occurrence-wins dedup instead — none of the "prefer the record with a real MusicBrainz ID" logic the CLI's combined mode has always had. It now actually calls `mergePlayRecords`, so web and CLI merge behavior match.

### tourmaline: CAR export, and hardening against untrusted input

`tourmaline` fetched Teal scrobbles via `listRecords` pagination — up to 25 AppView-rate-limited requests per 2,500 records. That's now a single `com.atproto.sync.getRepo` CAR download, parsed locally via `croft-click-core`'s MST walker, same approach `malachite` already used. The scrobbles endpoint is one-shot now; cursor handling and the now-unused `rate-limit.ts` are gone.

A same-week pass hardened tourmaline's server routes and rendering against untrusted input: every DID, handle, PDS endpoint, and cursor is now validated before being fetched or interpolated (new `lib/server/validate.ts` — DID/handle regexes, `safeEndpoint` rejecting non-https, credentialed, or private/loopback hosts, a bounded `safeCursor`). Blob-CID extraction now requires a syntactically valid CID before it can reach a CDN URL. `listRecords`/scrobble responses and personality-card `sessionStorage` data are coerced rather than cast, SVG text and attributes are escaped, and color lookups use `Object.hasOwn` to avoid prototype-polluted keys. API errors now log upstream detail server-side but return generic messages (plus 429s) instead of leaking them, and queue/enrichment/artist sizes are bounded. `robots.txt` now disallows `/api/` and `/share`.

### pds-landing: a live activity feed

A new `JetstreamFeed` component connects to the public Jetstream WebSocket, filtered to a landing page's hosted DIDs, and renders a terminal-style live feed of writes across the network with deterministic NSID-hash-based colors per collection. A follow-up extended the rendering heuristics to cover records without a resolvable lexicon — falling back to `plaintext`/`message`/`trackName`/`headline`/`note`/`reason` fields, nested `body`/`message`/`content`/`caption` text, numeric score-like fields, and a handful of common target-URI fields — plus blob-derived media metadata, and now shows each collection's reverse-DNS domain alongside its short name (`app.bsky`/`post`, `sh.tangled`/`comment`).

### one state directory instead of one per tool

Every write-capable pkgs tool kept its own dotfile directly under the home directory — `~/.malachite`, `~/.jasper`, and so on. `croft-click-core` now exports a Node-only `getToolStateDir()` (under a `./paths` subpath, kept out of the browser-safe `index.ts`) that resolves `~/.ewanc26/<tool>` and auto-migrates a tool's legacy directory into place on first use. `malachite` and `jasper` have both switched over; credentials, OAuth sessions, and logs for both now land under `~/.ewanc26/malachite` and `~/.ewanc26/jasper` respectively, migrated automatically from the old locations, with `EWANC26_STATE_DIR` available to override the shared root.

### smaller fixes

`bismuth-web` lost its typed-in handle across the OAuth redirect, since the OAuth agent only exposes a DID — it's now stashed in `sessionStorage` and restored for display, falling back to the DID. `opal`'s CLI login used bare `Agent` from `@atproto/api`, which has no `login()` — the same class of bug fixed earlier in `malachite-web`/`opal-web`'s `agent.session.did` issues — swapped for `AtpAgent`. `opal-web` gained a dry-run toggle to match every sibling web importer. `opal` dropped verbatim copies of `croft-click-core`'s rate-limiter files that had drifted to miss two doc comments.

Two longstanding bugs in shared logic got fixed together: `@ewanc26/tid`'s `seedTidClock()` was documented as making all subsequent TID generation deterministic, but `generateNextTID()` never consulted the seeded state at all — it always called `Date.now()`, and the monotonic-floor logic happened to mask this for any seed in the past relative to real time, which was every seed the test suite used. A `deterministic` flag now makes seeded generation actually tick forward from the seed instead of silently falling back to the wall clock. And `croft-click-core`'s `calculateAdaptiveScale()` had its check ordering backwards in two ways: the "insufficient history" gate ran before the consecutive-failures check, so two failed batches alone could never trigger a scale-down; and the five-consecutive-successes scale-up check ran before the duration-trend check, so a run of successful-but-measurably-slowing batches got scaled up instead of down — backwards for a rate-limit-avoidance tool. Both are reordered now, verified against the previously-failing test suite (which had its own bugs: two tests asserted mutually exclusive outcomes from identical setup, and one used input that could never satisfy its own assertion).

`malachite`'s CLI stopped advertising `--batch-size`/`--batch-delay`/`--aggressive` flags as though they did anything — `publishRecordsWithApplyWrites` has ignored them for a while in favor of the adaptive batch pipeline, but the CLI still printed a fabricated "Batch Configuration" report from them. The flags are still accepted for backwards compatibility but now print a deprecation warning instead. `jasper` now reads its `VERSION` from `package.json` instead of a hardcoded constant.

### housekeeping

`.claude/skills` moved to the `.agents/skills` convention repo-wide, with `droid`/`opencode`/`qwen`/`rovodev` skill directories symlinked to match. Ko-fi and GitHub Sponsors links were added to the monorepo's support links and to malachite specifically. `robots.txt` was standardized across the static sites. A workspace-wide pass fixed test and typecheck failures and added a missing `jsdom` dev dependency for `svelte-standard-site`'s vitest suite.
