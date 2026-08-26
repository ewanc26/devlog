---
title: MetalBear gains account-cache eviction, durable blob storage, multipart video uploads, and a modular build profile
description: Account contexts are now bounded with configurable resident budgets and count-based eviction. Blob payloads persist to disk instead of memory. Video uploads support durable multipart with reservations and lexicon-aligned limits. The frontend shows multipart capability. AppView proxies getUnreadCount. Per-route metrics replaced per-handler ones. A modular build profile (uncommitted) compiles out optional modules for constrained targets.
date: 2026-08-24T18:16:09Z
tags: [metalbear, atproto, c, performance]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35gwxqs2a"
---

## MetalBear

### account-cache bounding and eviction

`account.cpp`'s resident account contexts were unbounded — every authenticated session that hit the server pinned a context in memory with no eviction path. `feat(account): bound resident account contexts` added a configurable `max_resident_accounts` budget (exposed via `accounts.max_resident_accounts` in TOML/YAML config), count-based eviction that records evictions when the budget is exceeded, and a `/metrics` assertion that resident count stays bounded under load. End-to-end tests parse the config value and verify it reaches the cache.

### durable blob storage

`feat(blob-store): keep file-backed payloads on disk` refactored the blob store to persist uploaded payloads as files rather than holding them in memory. This is a prerequisite for the video upload work — large multipart payloads would exhaust memory if buffered entirely in-process.

### multipart video uploads

`feat(video): add durable multipart uploads` introduced a multipart upload system with reservations, aligning with the current lexicon's upload limits. The implementation spans 11 files (+1682/−6), covering reservation lifecycle, blob-store integration, and upload completion. `fix(video): align upload limit with current lexicon` corrected the limit after the lexicon changed. `fix(video): migrate to wf_cid_of_bytes` updated the CID computation after wolfram dropped `wf_cid_hasher`. The frontend gained a multipart video capability display.

### appview and metrics

`fix(appview): proxy getUnreadCount` replaced a hardcoded `{"count":0}` response with a real proxy to the upstream endpoint, with a 360-line test file covering the route. `fix(metrics): record per-route metrics via the single request observer` replaced per-handler metrics with a unified observer pattern.

### server recovery

`fix(server): register multipart video routes; recover corrupted server.c` fixed a corrupted `server.c` file (+2835 lines) that had lost its route registrations and multipart handling.

### modular build profile (uncommitted)

On `feat/modular-profile`, uncommitted work introduces CMake options to compile out optional modules — `APPVIEW`, `VIDEO`, `EMAIL`, `DNS`, `WEBAUTHN`, `UPDATE_WATCHER` — guarded by `#ifdef METALBEAR_MODULE_*` preprocessor macros. A `METALBEAR_PROFILE=minimal` preset disables all modules for constrained targets (Raspberry Pi 1B/Zero). The full build is unchanged when no profile is set. A new `test/test_seq_shutdown_race.c` covers sequential shutdown race conditions.
