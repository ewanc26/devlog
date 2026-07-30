---
title: atproto-mcp-server goes from a 6-tool skeleton to a working MCP server
description: Rewrote the server to expose 9 public tools plus 7 authenticated ones (posting, deleting, following, liking), with real argument validation and auth-gating. Bumped to 2.1.0.
date: 2026-07-12T20:35:00Z
tags: [atproto-mcp-server, mcp, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubzrnu2f"
---

## atproto-mcp-server

The server went from a skeleton exposing six read-only tools (`get_profile`, `resolve_handle`, `search_posts`, `get_author_feed`, `get_post_thread`, `get_suggestions`) to a genuinely functional MCP server.

Added `get_actor_likes`, `get_followers`, and `get_follows` to the public surface, and a new authenticated tier — `get_timeline`, `create_post`, `delete_post`, `follow`, `unfollow`, `like`, `unlike` — gated behind a `requireAuth` guard that throws a clear error when `BSKY_HANDLE`/`BSKY_PASSWORD` aren't configured. The default service endpoint now switches automatically: `public.api.bsky.app` when unauthenticated, `bsky.social` once credentials are present (both overridable via `BSKY_SERVICE`).

Added proper input validation helpers and JSON-schema tool definitions, replaced the old `ts-node` integration test with `node --test` and a real test file that validates every tool is backed by a handler. Bumped to 2.1.0.
