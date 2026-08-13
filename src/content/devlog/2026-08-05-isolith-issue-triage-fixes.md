---
title: Isolith fixes a batch of bugs filed after the July release
description: A single triage pass closes out issues across settings persistence, camera zoom performance, sync error handling, generation fairness, and UI state, verified against the existing smoke test.
date: 2026-08-05T10:07:18Z
tags: [isolith, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtfz5c2l"
---

## isolith

The [July devlog](/2026/07/30/isolith-new-project) covered Isolith's first three days of existence. Since then the project picked up an issue tracker, and this commit works through the backlog it accumulated — settings, sync, camera, generation, and UI, all in one pass, verified against the project's 43-check smoke test and a full `dotnet build`.

### settings and camera

`Settings.Reset()` left its internal `_loaded` flag set to `true` after resetting, which silently skipped reloading defaults on the next read. `Settings.CameraZoom` was re-running the engine's full `Apply()` — audio bus and window mode included — on every zoom tick, which caused audio glitches during what should have been a cheap per-frame camera adjustment.

### sync robustness

`SyncService.SignOut` treated a failed remote logout as if the user were still signed in locally, instead of falling back to a local sign-out; `SignIn` disposed a half-created agent on a failed login instead of leaking it. `RunRecord.FromRecord` now rejects records missing `courseId` or `createdAt` outright, rather than defaulting them to empty/zero values and letting corrupt records reach leaderboard queries.

### generation and camera behavior

`SectionGenerator`'s risky shard placement now reads height off the actual jump arc at the gap's midpoint via `JumpEnvelope.HeightAtDistance`, instead of a fixed range that ignored gap size. `IsometricCamera.SnapToTarget` resets rotation state so an in-progress rotation doesn't keep spinning through a respawn or restart snap. `GameManager.BeginEndless` now rolls `ActiveSeed` once per session instead of on every `Restart()`, so restarting an endless run replays the same layout and a debug seed stays reproducible after a death.

### UI and smoke test

`Hud`'s "new best" detection switched from comparing time alone to `RunStats.CompareForLeaderboard` (shards, deaths), and `Hud` now unsubscribes from `SettingsPanel.Closed` in `_ExitTree` instead of leaking the subscription. `PlayerController` applies the jump-cut factor before gravity rather than after, so releasing jump actually cuts the arc by the configured amount. `MainMenu.BestText` hashes the live ascent course instead of querying history with an empty hash that could never match. `CourseBuilder` now logs a warning when a block kind falls through to the default solid-geometry path instead of doing so silently. The smoke test itself got firmer: settle timeout is time-based instead of a fixed frame count, drop-test clearance is a single derived constant instead of three trial-and-error offsets, node counts are scoped to `CourseRoot`, and kill-plane-below-geometry is now explicitly asserted.
