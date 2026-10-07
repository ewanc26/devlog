---
title: Wolfram keeps a video's poster frame
description: wf_post_display and wf_post_embed now carry a video embed's poster, alt text and aspect ratio, so clients that cannot play video can still draw it
date: 2026-10-07
tags: [wolfram, atproto, c, video]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatkngm2f"
---

Clients could only show a video post as a one-line note. Wolfram now reads the poster frame, its alt text and its declared aspect ratio from an `app.bsky.embed.video#view`, in both `wf_post_display` and `wf_post_embed`.

## Changes

- **`video_thumb`, `video_alt`, `video_width`, `video_height`** on both structs. The playlist is deliberately not kept: no client here plays video. A ratio is kept only when both sides are present, so half a ratio never reaches a caller that divides by it.
- The recordWithMedia case reads the same fields from its media half.
- Tests: `test_embed_video` in `test_post_display.c`, and a video case in `test_post_view_typed.c`.

## Verification

- `post_display` and `post_view` ctests pass on the macOS host build. Other platforms were not run locally; the release's CI covers them.

Shipped in v0.37.0 (wolfram#184, released via #185). Cobalt and Indigo consume it: see [the video poster entry](/2026/10/07/cobalt-indigo-video-poster).
