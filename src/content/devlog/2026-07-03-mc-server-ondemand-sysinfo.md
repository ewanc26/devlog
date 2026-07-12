---
title: mc-server on-demand sysinfo via bundled minefetch watcher
description: The Minecraft server now refreshes host sysinfo on demand using a bundled minefetch watcher and a configurable path.
date: 2026-07-03T19:56:00Z
tags: [mc-server, minecraft, minefetch]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzzrre24"
---

## mc-server

Tightened how the server pulls host stats from the `minefetch` companion.

### changes

- Read the minefetch location from the `MC_MINEFETCH_DIR` environment variable instead of a hardcoded path.
- Bundle the sysinfo watcher from the minefetch repo and use a Minefetch-specific fastfetch config.
- On-demand sysinfo refresh via a host-side watcher driving fastfetch.
