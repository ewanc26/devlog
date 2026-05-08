---
title: Moon Tracker — Rust Rewrite
description: Rewrote the Bluesky moon phase bot from TypeScript to Rust using atrium-rs, with multi-source API and optional Ollama LLM generation.
date: 2026-04-15
tags: [atproto, rust, rewrite]
draft: false
---

## bluesky-moon-tracker

Rewrote the moon phase bot in Rust using `atrium-rs`. The new implementation uses a multi-source moon phase API with local fallback — if the primary Skytime API fails, it falls back to a local calculation. Optional Ollama integration generates natural language moon descriptions.

Removed the legacy TypeScript codebase entirely. The Rust binary is smaller, faster, and deployed as a Nix derivation.
