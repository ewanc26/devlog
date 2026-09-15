---
title: malachite dedup batching — applyWrites deletes instead of one deleteRecord per record
description: removeDuplicateRecords in croft-click-core now batches dedup deletions via com.atproto.repo.applyWrites (200 per call, the PDS hard limit) instead of one deleteRecord call per record with a 100ms pacing delay. A few thousand duplicates collapses from thousands of HTTP round-trips to a few dozen. Failed batches fall back to per-record deletes.
date: 2026-09-15T22:55:00+01:00
tags: [pkgs, malachite, croft-click-core, teal, atproto, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvlppd3lic2y"
---

## pkgs

### croft-click-core: batched dedup deletions via applyWrites

`removeDuplicateRecords` previously deleted one record at a time — a dedicated `com.atproto.repo.deleteRecord` call per duplicate with a 100ms pacing delay between each. Running the plan against the 3,395 duplicates from the September audit meant 3,395 HTTP round-trips plus ~5.6 minutes of artificial delay.

The executor now chunks deletions into `com.atproto.repo.applyWrites#delete` writes, 200 per call — the PDS hard limit (`InvalidRequestError` beyond that). Same pattern the publisher already uses for creates: transient network errors retry with exponential backoff (3 attempts, 1s/2s/4s).

`applyWrites` is atomic — one bad rkey fails the whole batch. On batch failure after retries, the executor falls back to per-record `deleteRecord` calls so salvageable deletions still go through, preserving the previous "remove what we can" behaviour.

DELETE costs 1 rate-limit point per record either way (5,000/hour, 35,000/day), so batching saves HTTP requests, not quota. `swapCommit` is left unset — nothing else writes during a dedup run, so batches stay independent.

Both the CLI (`malachite deduplicate`) and malachite-web delete through this shared executor, so both get the speedup. Full 252-test suite passes.
