---
title: atperson jetstream full-speed ingestion
description: Drain readable frames in one batch, account max-events across batches, add kinds filter and zstd dictionary compression
date: 2026-09-23
tags: [atperson, jetstream, atproto, performance, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mw7no5erm52y"
---

Live Jetstream ingestion ran at a fraction of the achievable rate: a 200k-event catch-up session observed 5 frames in 60 seconds. Three transport changes close that gap.

## Changes

- **Drain inside `fetch_batch`.** A `WOULD_BLOCK` from Wolfram while connected and idle no longer returns to the caller — the batch keeps polling until the feed goes quiet, the budget is spent, or reconnect backoff is advertised. The CLI loop drops its 25ms inter-batch sleep and only sleeps on advertised backoff.
- **Cross-batch `max-events` accounting.** The CLI loop applied `max-events` per batch, so an event-bounded run never terminated. Frames are now counted cumulatively across batches.
- **Dictionary-compressed binary frames, on by default.** The official Jetstream zstd dictionary is fetched via the public `network.bsky.jetstream.getZstdDictionary` query on the endpoint's service host and passed to Wolfram's connect options. `ATPERSON_JETSTREAM_COMPRESS=0` opts out; fetch failure or a build without libzstd degrades to uncompressed JSON instead of failing the run.
- **`--kinds` filter.** Operator-selected event-kind predicate for the v2 `subscribeEvents` endpoint (`--kinds <file>` or `ATPERSON_JETSTREAM_KINDS_FILE`), validated against the four Jetstream v2 kinds, max four unique values. Default remains no predicate, preserving `#sync`/`#identity`/`#account` protocol evidence.

## Verification

Both build configs green: core 54/54, network 60/60. New offline tests cover the kinds loader (parse/dedup, unknown kind, limit) and client constructor validation (kinds > 4 rejects; dictionary without libzstd rejects, with it succeeds).

PR: ewanc26/atperson#138
