---
title: MetalBear adds a single-user mode
description: A config flag, server enforcement, frontend metadata and setup provisioning make one-account hosts a first-class deployment option.
date: 2026-11-25
tags: [metalbear, self-hosting, atproto, config]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342apkji62e"
---

Not every host wants signups. MetalBear now has a deployment mode that believes that instead of simulating it.

- Config flag for single-user mode, with server-side enforcement of the restrictions.
- Frontend follows operator metadata to hide surfaces that do not apply.
- Setup provisions one-account hosts.
- Tests cover bootstrap and the disabled surfaces.
- SvelteKit lint baseline cleared and compatible toolchain pins refreshed.
- Version 0.64.0, with a 0.64.1 patch following.

A mode is only real when the server enforces it and the frontend stops offering things the server will refuse. Both halves landed here.
