---
title: ATperson Jetstream kind-7 replay rows
description: Backfill blocker found and fixed — the archive decoder rejected create_resync rows and the translate layer dropped them
date: 2026-09-25
tags: [atperson, wolfram, jetstream, c]
draft: false
---

The backfill loop died at segment seg_00000005b0 and the first diagnosis — a dead archive token — was wrong. Block 705 of that segment decodes structurally perfectly: 3862 events, every column total exact. It fails because it contains 118 kind-7 rows, and kind 7 is `create_resync` — a commit create re-witnessed while the server rebuilt a repository slice. Wolfram's block decoder rejected any kind outside 1-6, an assumption baked in when the decoder was written, so one kind-7 row made the entire block undecodable.

## Changes

- **Wolfram decoder** — the kind bound is gone; only kind 0 (never a valid row kind) is rejected. The column arithmetic already validates the envelope exactly, so the bound added nothing but brittleness. Callers skip kinds they don't consume. Header docs list the known values 1-7.
- **Wolfram `WF_ERR_AUTH`** — an authenticated request answered with 401 / ExpiredToken / InvalidToken and no refresh path that fixes it now returns `WF_ERR_AUTH` instead of generic `WF_ERR_HTTP`, so archive consumers with a static token fail fast instead of retrying or misreading the rejection envelope as data. Unauthenticated 401s stay `WF_ERR_HTTP`.
- **ATperson translate** — `translate_jetstream_replay_events` only accepted kinds 1 and 2, so kind-7 rows would have been silently dropped once the decoder passed them through. Kind 7 now maps to create. For a backfill from the archive head those re-witnessed rows can be the only witness of a record.

## Notes

- Verified against the real production block: block 705 decodes cleanly — 3862 events, 118 kind-7 rows — including under ASan+UBSan.
- Wolfram PR ewanc26/wolfram#56; ATperson translate PR ewanc26/atperson#169. The wolfram pin bump lands after #56 merges.
- The offline spool PR (#167) merged after two infra-killed GCC reruns — runner termination mid-compile, not code. #154 is ticked in the umbrella.
