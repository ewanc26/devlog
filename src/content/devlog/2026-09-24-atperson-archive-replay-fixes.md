---
title: ATperson archive replay fixes and wolfram 0.23.x
description: Archive host binding, sealed-tip probe and exhaustion signal fixes that unblock the year-back Jetstream backfill
date: 2026-09-24
tags: [atperson, jetstream, wolfram, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwccphuxwn2y"
---

The year-back Jetstream archive backfill (#144) was blocked by three archive replay bugs and two upstream wolfram bugs. All fixed; the backfill now sweeps 10M-sequence windows from zero to the sealed tip (26,292,300,745).

## Changes

- **Archive host binding** — `JetstreamReplayClient` reused the agent's PDS XRPC client, so every plan call hit bsky.social instead of the archive API. The client now owns its own `wf_xrpc_client` bound to `ATPERSON_JETSTREAM_ARCHIVE_HOST` (default `https://jetstream.us-west.bsky.network`). No PDS session needed for replay.
- **Sealed-tip probe** — the archive clamps `sealedTipSeq` to the request's `beforeSeq`, so the old probe (before=1) always returned 1. The probe now sends `afterSeq` beyond the tip with no upper bound; the response carries the unclamped global tip.
- **Exhaustion signal** — `fetch_window` reported the clamped window end as the sealed tip, so every auto-capped window claimed "sealed archive exhausted" after one run. The window probes the true tip once and uses it for both the clamp and the exhaustion signal.
- **wolfram 0.23.0** — replay plan seq values serialise as exact JSON integers. cJSON's double path emits scientific notation past ~1e15, which the archive rejects with a 400.
- **wolfram 0.23.1** — the XRPC transport follows HTTP redirects (bounded, 5 max). The archive's `getBlock` 307s to a CDN URL; without `CURLOPT_FOLLOWLOCATION` every replayed block fetch failed.
