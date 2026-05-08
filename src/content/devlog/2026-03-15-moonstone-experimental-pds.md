---
title: Moonstone — Experimental PDS
description: Started building a custom AT Protocol PDS in Rust, decoupled from Bluesky infrastructure.
date: 2026-03-15
tags: [atproto, rust, infra]
draft: false
---

## moonstone-pds

Began implementing a custom PDS in Rust, initially layered on top of `@atproto/pds` and progressively decoupling from Bluesky-specific infrastructure. The goal is a standalone PDS that supports native `did:web` account creation, custom moderation routes, and email validation without depending on the Bluesky appview.

Added default crawler declarations, custom HTTP lifecycle management (replacing the default `pds.start()`), and moderation/temp routes. The server is configured via NixOS module in nix-starter-configs.
