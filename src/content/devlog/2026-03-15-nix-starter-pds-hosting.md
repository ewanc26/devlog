---
title: Nix Config — PDS Hosting and Gatekeeper
description: Added PDS and gatekeeper configuration to nix-starter for the server host.
date: 2026-03-15
tags: [infra, nix, atproto]
draft: false
---

## nix-starter-configs

Added AT Protocol PDS configuration to the server host, deployed via Cloudflare Tunnel. The PDS config is consolidated into a `pdsConfig` NixOS module with recommended settings for `/srv` disk and Resend for email. Added `pds-gatekeeper` module for signup gating.
