---
title: New project — bluesky-dadaist, a markov-chain oracle bot for Bluesky
description: A C23 bot that builds a live word-level markov chain from the AT Protocol firehose and replies to mentions with surreal "oracle" text, presented as mystical AI but actually a statistical collage of real posts.
date: 2026-08-03T18:43:38Z
tags: [bluesky-dadaist, atproto, bots, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtlzjk2l"
---

## bluesky-dadaist

A new project, initially named `bsky-dada` and renamed to `bluesky-dadaist` the same day: a Dadaist oracle bot for Bluesky, written in C23 against the [Wolfram](https://github.com/ewanc26/wolfram) SDK.

### the joke

The bot is presented as a mystical AI channeling the collective consciousness of Bluesky. It's actually a word-level bigram markov chain fed by whatever people are posting on the firehose right now — every reply is a statistical collage of real posts, absurd and never the same twice.

### how it works

A firehose collector thread subscribes to `wss://bsky.network` via `wf_subscribe_start`, parses each commit event's embedded CAR blocks with `wf_car_parse` and `wf_car_find_block`, decodes the DAG-CBOR with `wf_cbor_parse`, and feeds extracted post text into the markov model via `markov_add_text`. A separate oracle-bot side logs in via `wf_agent_login`, polls `app.bsky.notification.listNotifications` for unread mentions, and replies with text sampled from `markov_generate` via `wf_agent_reply`; it also posts a standalone "fortune" on a timer. The initial commit shipped four modules (`markov`, `firehose_collector`, `dada_bot`, `main`) plus an offline test suite for the markov chain, at roughly 1,900 lines.

### swapping pthread polling for libuv

The same day, the threading model was reworked: the original design ran two POSIX threads polling on fixed sleep intervals. That became a single libuv event loop (`uv_default_loop`) on the main thread driving two `uv_timer_t` handles — a 15-second notification-poll tick and a configurable (default 30-minute) fortune timer — plus `uv_signal_t` handles for `SIGINT`/`SIGTERM`, while the firehose subscription keeps running on its own blocking side thread. The markov model's internal mutex still serializes access between the firehose writer and the bot's timer callbacks, and the firehose and bot continue to use separate `wf_xrpc_client`/`wf_agent` curl handles, so nothing is shared across threads. The change drops the manual `sleep(1)` polling loop in favor of libuv driving dispatch directly, and `CMakeLists.txt` picked up a `find_path`/`find_library` check for libuv with a clear "install with `brew install libuv`" error if it's missing.
