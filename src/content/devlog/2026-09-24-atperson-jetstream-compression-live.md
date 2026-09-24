---
title: ATperson jetstream compression live
description: Fix the v2 compress handshake and dictionary URL, rename the project to ATperson, first compressed training runs
date: 2026-09-24
tags: [atperson, jetstream, atproto, wolfram, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwbb4lqt7n2y"
---

The full-speed jetstream work connected but rejected every frame once compression was requested. Two bugs, one in each repo.

## Changes

- **Wolfram `compress=1`** — the v2 `subscribeEvents` endpoint rejects `compress=true` with HTTP 400 (that spelling is the v1 `/subscribe` opt-in). Wolfram now sends `compress=1`.
- **Wolfram TEXT-frame parsing** — with compression requested, the server still sends uncompressed TEXT JSON frames; Wolfram only parsed TEXT when compression was off, so every frame was rejected as malformed. TEXT frames now parse as JSON regardless of the compress option, with zstd decompression reserved for BINARY frames.
- **ATperson https service URL** — the zstd dictionary fetch derived a `wss://` base from the subscribe endpoint, which the fetcher rejects. The base is now converted to `https://`.
- **Cross-batch reporting** — the CLI summary printed the last batch's counters instead of session totals. All counters now accumulate across batches.
- **Project rename** — the project is `ATperson` in prose (README, AGENTS.md). Binary name, include paths and data directories stay lowercase `atperson`.

## Verification

All 56 non-benchmark tests pass. Live training runs with zstd compression enabled: frames received with 0 malformed, cursor advancing, observations learned.

Commits: wolfram `135cbd7`, ATperson `fa269cf` `554019d` `552ebcf`
