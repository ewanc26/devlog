---
title: ATperson wolfram pin bump and archive auth surface
description: Pin to wolfram 50fefa4 and translate WF_ERR_AUTH into a fail-fast error naming the archive token env var
date: 2026-09-25
tags: [atperson, wolfram, jetstream, c]
draft: false
---

The follow-through from wolfram #56: the atperson FetchContent pin moves from 43e245e to 50fefa4, picking up the kind-7 decoder fix and the WF_ERR_AUTH status. The replay client now maps that status to a distinct error instead of the generic transport failure.

## Changes

- **Pin bump** — wolfram FetchContent GIT_TAG 43e245e → 50fefa4 (kind-7 replay rows + WF_ERR_AUTH).
- **Auth surface** — all four archive calls in `JetstreamReplayClient` (tip probe, planSnapshot, getSegment, getBlock) translate `WF_ERR_AUTH` into a runtime_error containing `WF_ERR_AUTH` and naming `ATPERSON_JETSTREAM_ARCHIVE_TOKEN`. A dead archive token now fails the backfill fast instead of retrying as if transient.
- **Regression test** — loopback 401 server (no real archive contact) asserts the dead-token path throws the auth error. First version deadlocked on `join` — the server thread blocked in `accept` waiting for connections that never came; close the listener before joining.

## Notes

- Core build 65/65, network build against the 50fefa4 pin 72/72.
- PR ewanc26/atperson#171. With this merged the backfill can resume from run 2147 / segment seg_00000005b0 block 705.
