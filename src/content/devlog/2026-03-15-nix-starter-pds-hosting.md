---
title: Nix Config — PDS Hosting and New Hosts
description: Added PDS and Mastodon configuration to nix-starter, plus a new host profile for the server.
date: 2026-03-15
tags: [infra, nix, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleepzrmpm2g"
---

## nix-starter-configs

Added AT Protocol PDS configuration to the server host, deployed via Cloudflare Tunnel. The PDS config is consolidated into a `pdsConfig` module with recommended settings for `/srv` disk and Resend for email.

Also added a `pds-gatekeeper` module for PDS signup gating. Fixed flake check errors and deprecation warnings, and added the `as-the-gods-intended` host profile.
