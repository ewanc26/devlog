---
title: Cobalt full-size image viewer
description: The post menu can now open a picture at full size on both screens, closing issue #100
date: 2026-10-04
tags: [cobalt, atproto, c, wiiu]
draft: false
---

Images only ever rendered as thumbnails inside the card — a fraction of the TV's 720p, with no way to see the whole picture (issue #100). This adds a full-size viewer, opened from the post menu.

## Changes

- **`src/ui/imageview.{c,h}`** — new `cobalt_imageview` overlay. It opens on a post, holds copies of that post's image list (a background refresh cannot rewrite the pictures mid-view), and draws the focused picture contain-fitted to the whole surface, centred. Alt text sits beneath (up to 3 lines), "N of M" top-right, Left/Right cycles multi-image posts, and B, A or a tap closes. `cobalt_imageview_update` consumes the frame whenever the viewer is open, so the screen underneath never acts on a press the viewer already saw.
- **`src/ui/imagecache.{c,h}`** — `cobalt_imagecache_create_sized(max_dimension, fit, entries, loaders)` takes slot and loader counts at creation where `cobalt_imagecache_create` fixed them at compile time. The viewer's caches are two slots and one loader each — a person looks at one picture at a time — decoded CONTAIN at the surface's own height (720 TV, 480 GamePad), where a card thumbnail stays capped at 320.
- **`src/ui/render.{c,h}`** — `cobalt_render_set_viewer()` / `cobalt_render_viewer()`: a third borrowed cache pointer per surface, alongside the avatar and thumb ones.
- **`src/app/app.c`** — `COBALT_POPUP_IMAGE` ("View image", with the image icon) joins the post menu when the selected post carries pictures; `popup_choose` re-derives the post from the thread or timeline selection and opens the viewer. The update gate checks the viewer before the popup; the draw path draws the overlay instead of the screen.
- **`src/main.c`** — `tv_viewer` / `drc_viewer` caches, created, pumped and destroyed alongside the others.
- Tests: `test_imageview` covers open on a bare post (no-op), copy semantics, cycle-with-wrap both directions, close clearing state, and the single-image no-cycle case. Host suite: 476 checks, 0 failures. Wii U cross-build links clean (needed a Wolfram `build-wiiu` rebuild for the OAuth node's `wf_agent_set_bearer`).

Opened from the post menu rather than direct tap-on-thumbnail: the card layout has no per-cell rects to hit-test today. That stays a follow-up.

Commit `3afe065`, pushed. Issue #100 closed.
