---
title: New project — Isolith, an isometric platformer with an adaptive endless mode
description: A Godot 4/C# isometric platformer whose endless mode reads exactly how the player's last section went and reshapes the next one, with an optional AT Protocol stat-sync side feature.
date: 2026-07-30T00:11:00Z
tags: [isolith, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuaf7ze2f"
---

## isolith

A brand-new project, built almost entirely over three days (2026-07-27 to 2026-07-30): an isometric 3D platformer in Godot 4.7 with C#, targeting .NET 10.

### the core game

A true isometric camera (orthographic, pitched at `atan(1/√2)`, rotating in 90° steps), a forgiving platformer feel (coyote time, jump buffering, variable jump height, separate rise/fall gravity), and gamepad-first input with keyboard fallback. Levels are authored as JSON and built into geometry at load time — no binary scene files for level content, so every level is a readable diff. Course hazards include ride-able moving platforms, crumbling platforms, bounce pads, spike pits, and checkpoints.

### adaptive endless mode

The standout feature. Endless mode generates sections ahead of the player and adapts based on exactly how the previous section went — not just "died" or "didn't," but *how*: dying on a moving platform specifically makes moving platforms rare before they gradually return; ignoring bounce pads makes fewer of them appear; clearing a section cleanly stretches the next gap toward the jump limit; near-misses hold difficulty steady even without a death; hesitating before jumps makes gaps more consistent. Difficulty falls faster than it rises, by design — relief is immediate, pressure is earned. Every generated jump is guaranteed traversable, clamped against a jump envelope computed from the character's own tuning constants, proven over 3,200 generated jumps across the full difficulty range in the test suite.

### honest assets and optional sync

Every sound is synthesized by a committed Python script and every mesh is built in code; only sky/PBR material packs are third-party, fetched CC0 with pinned checksums. An optional AT Protocol stat sync copies completed run stats to the player's own PDS — local history is saved unconditionally first, sync is off by default and never prompted, and every sync failure is non-fatal. There's no persisted session token; sign-in uses an app password for a single `createSession` call per session.

### testing

A headless Godot smoke test loads every course, verifies every checkpoint and the goal are standable, checks generation reproducibility from a seed, and runs in CI alongside a check that every vendored CC0 asset is present and every generated audio asset is reproducible.
