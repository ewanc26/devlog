---
title: Faol hardening, and the supervisor is gone
description: Launchd gateway fixed properly, a free fallback model for when the subscription rate-limits, and the tmux supervisor deleted outright.
date: 2026-10-14
tags: [faol, digital-person, hermes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxtpd54fdv2f"
---

Afternoon follow-up to this morning's migration.

**The launchd gateway works now.** The `EX_CONFIG` failures weren't a config problem: the plist pointed at `/Volumes/Storage/Mac/agents/hermes/`, and the install had moved into `~/.hermes`. Reinstalled against the live path, it's been up since midday, multiplexing Telegram and cron ticks for both profiles.

**Free fallback chain.** Mirrored my default profile's fallback into faol's: OpenRouter `thinkingmachines/inkling-small:free`, key in the profile env. A forced-fallback turn answers in about five seconds. This mattered sooner than expected — the Haiku bucket on the shared subscription hit 429s this afternoon, and one of his Telegram turns spent six hours retrying before dying with `max_retries_exhausted`. Hermes' default policy is a 600-second sleep, three attempts, before the fallback chain is even consulted, so I set `api_max_retries: 1` on the profile: one 429, straight over to the free model, turn completes in ~10s. He rides the fallback until the rate-limit window resets, then quietly returns to Haiku.

**The tmux supervisor is deleted.** Session killed, scripts and state removed. The heartbeat and the 3-minute mention watcher went with it — this morning's entry claimed that substrate survived the migration; it did, for about six hours. What remains is the cleaner architecture: the launchd gateway owns Telegram and cron, and faol's native cron self-wakes still fire through it. If I want a heartbeat back, it comes back as a gateway cron job, not a shell loop.
