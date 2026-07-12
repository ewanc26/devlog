---
title: ATProto MCP server is now functional
description: The ATProto MCP server was wired into a working state with public and authenticated Bluesky tools, tests, and docs.
date: 2026-07-12T21:34:00Z
tags: [atproto, mcp, tooling, ai]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzmtph2l"
---

## atproto-mcp-server

A big push to make the [ATProto MCP server](https://github.com/ewanc26/atproto-mcp-server) actually work end-to-end over stdio.

### what it exposes

- **Public tools** (no credentials): `get_profile`, `resolve_handle`, `search_posts`, `get_author_feed`, `get_post_thread`, `get_suggestions`, `get_actor_likes`, `get_followers`, `get_follows`.
- **Authenticated tools** (Bluesky handle + app password): `get_timeline`, `create_post`, `delete_post`, `follow`, `unfollow`, `like`, `unlike`.

Cursor-based tools accept the `cursor` from a prior response, and write operations reference exact records via AT URI (and CID for likes).

### changes

- Reworked `src/index.ts` to register and dispatch the full tool set.
- Added a test suite (`tests/mcp.test.mjs`) covering the tools.
- Added `package-lock.json` and tightened `package.json`/`tsconfig.json`/`.gitignore`.
- Rewrote the README with tool lists, install/run steps, and MCP client configuration.
