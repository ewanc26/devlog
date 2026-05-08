---
title: Moon Tracker — Rust Rewrite
description: Rewrote the moon phase bot from TypeScript to Rust using atrium-rs.
date: 2026-04-15
tags: [atproto, bots, infra]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni2c6xs2v"
---

## bluesky-moon-tracker

Rewrote the moon phase bot in Rust using `atrium-rs`. Multi-source moon phase API with local fallback — if the primary Skytime API fails, it falls back to a local calculation. Optional Ollama integration generates natural language moon descriptions. Removed the legacy TypeScript codebase entirely.
