---
title: Cobalt liked-by and reposted-by lists
description: The post menu can now show who liked or reposted a post, closing issue #104
date: 2026-10-04
tags: [cobalt, atproto, c, wiiu]
draft: false
---

The post menu showed a post's counts as text but never who was behind them (issue #104). This adds "Liked by (N)" and "Reposted by (N)" entries to the post menu, opening the same avatar-row list screen the followers/following screens already use.

## Changes

- **`src/app/graph.{c,h}`** — two new `cobalt_graph_kind`s (`LIKES`, `REPOSTED`) wired into the existing list screen: `list_for`, `begin_fetch`, titles ("Liked by" / "Reposted by"), empty messages, and `cobalt_graph_view_open_likes`, which mirrors the follows open (rewind, record the post URI, fetch fresh). `cobalt_graph_kind_is_follows` covers them, so A opens a profile like every other row-list. `begin_fetch` now takes the view rather than the kind, since likes/reposts page against the URI the view remembers.
- **`src/atproto/session.{c,h}`** — `COBALT_JOB_LIKES` / `COBALT_JOB_REPOSTED_BY`, `cobalt_session_begin_likes` / `begin_reposted_by` / `likes_list`. The two kinds share one `cobalt_actor_list` (`s.likes`): only one is on screen at a time and every open resets it, so there is no cross-talk. `getRepostedBy` rides the existing `run_actor_list` with a fetch_fn; `getLikes` does not — Wolfram returns `wf_agent_actor_like_list`, whose rows carry the actor one level down, so it gets its own `run_likes` with the same locking, reset and paging shape.
- **`src/app/app.c`** — `COBALT_POPUP_LIKES` / `COBALT_POPUP_REPOSTS` entries in the post menu (with the like/repost icons and the count in the label), a `COBALT_SCREEN_LIKES_LIST` case in update and draw, and a `likes_return` so B goes back to the timeline or thread the menu was opened from.
- Tests: `test_likes_lists` covers the begin guards, the graph open (kind, actor, rewind), the wrong-kind refusal, and the is_follows classification. Host suite: 488 checks, 0 failures. Wii U cross-build clean.

Commit `be33e37`, pushed. Issue #104 closed.
