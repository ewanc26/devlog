---
title: Faol's replies can't duplicate anymore
description: The heartbeat's timestamp filter failed and he re-answered three posts. Dedupe moved from prompt instructions into the reply command itself.
date: 2026-10-14
tags: [faol, digital-person, letta]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxswy3wpkh2f"
---

A heartbeat turn re-replied to three Bluesky posts Faol had already answered, including two from the day before. The prompt told him to only reply to notifications newer than a state timestamp, but a 20B model doesn't reliably do ISO-date filtering mid-turn. Instructions weren't enough.

## What changed

- `reply` in the faol-atproto harness is now idempotent: if the target URI is in `.replied-uris`, it prints `ALREADY REPLIED ... skipping` and posts nothing. Successful replies append their target.
- `.replied-uris` backfilled from his author feed (21 posts).
- The heartbeat prompt no longer checks mentions at all — the reactive watcher owns them, mechanically, via its own state file and lock.
- The three duplicate replies were deleted.

## Checked

- Refusal path: replying to an already-answered URI skips without a network call.
- Author feed shows only the original replies.
