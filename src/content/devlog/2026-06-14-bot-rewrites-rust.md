---
title: Rewriting four bots from Python to Rust
description: Converted the avatar updater, gradient generator, Markov chain bots (Bluesky + Mastodon) from Python scripts to Rust binaries. Same pattern, same day, four repos.
date: 2026-06-14T12:00:00Z
tags: [rust, bots, bluesky, mastodon]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3movapvera62m"
---

## bulk rust migration

Four standalone bots — the Bluesky avatar updater, the gradient generator, the Bluesky Markov chain bot, and the Mastodon Markov chain bot — were all converted from Python to Rust on the same day. Each followed the same migration pattern: rewrite the core logic as a Rust binary using the `atrium-rs` AT Protocol library, add a Nix flake for reproducible builds, and drop the old Python `requirements.txt` in favour of `cargo build --release`.

### what changed

- **bluesky-avatar-updater** — the avatar rotation script that cycles profile pictures based on the Wheel of the Year seasonal calendar. Rewritten as a statically-linked Rust binary. The logic is the same — fetch the current season from the date, pick the matching avatar from a pre-defined set, call the Bluesky API — but it now runs as a single binary with no Python runtime dependency.
- **bluesky-gradient** — generates gradient-based profile banners using colour interpolation and uploads them via the Bluesky API. The Rust version uses the same colour math but compiles to a native binary that runs on the NixOS server without needing a virtualenv.
- **bluesky-markov** — the Markov chain post generator that builds language models from a user's Bluesky feed and generates new posts. The Rust rewrite uses `atrium-rs` for both feed fetching and post creation, keeping the entire pipeline in one process.
- **mastodon-markov** — the Mastodon equivalent of the Markov chain bot. Same rewrite pattern: Python out, Rust + Nix flake in.

### why

These bots are long-running cron jobs on the home server. Python scripts worked fine but carried a heavy runtime footprint — each bot needed its own venv with pip dependencies, and startup time for a cold Python interpreter on an hourly cron trigger added up. Rust binaries start instantly, use less memory, and compile to a single file with no runtime dependencies beyond libc.

### the pattern

The migration pattern is now well-established across the project ecosystem:

1. Replace `requirements.txt` / `pyproject.toml` with `Cargo.toml`
2. Add a `flake.nix` for NixOS deployment
3. Rewrite core logic in Rust using `atrium-rs` (or raw HTTP for Mastodon)
4. Build with `cargo build --release` for a single static binary
5. Wire into the existing cron schedule on the NixOS server

This is the same pattern used for the moon-tracker rewrite in April and the Sigi rewrite in June. The four-bots-on-one-day pace was possible because the Python versions were already well-structured with clear single-responsibility modules — translating to Rust was mechanical rather than architectural.
