---
title: Tagging 48 repositories with full semver history
description: Ran an auto-tagger across every repo in /Git to backfill semver tags for every feat and fix commit, then date-tagged 15 repos that use calendar versioning.
date: 2026-06-30T20:00:00Z
tags: [infra, devlog, maintenance]
draft: false
---

## mass tagging all repos

Overdue housekeeping. Every repo in `/Volumes/Storage/Developer/Git` got an automated semver pass — one tag per conventional commit, starting from the last existing tag (or `v0.1.0` if none). Feats bump minor, fixes bump patch, rewrites were handled manually.

### scope

- **48 repos** tagged, **1,835 tags** total
- ~1,600 new semver tags created
- Big winners: `nix` (328), `pkgs` (295), `website` (626 — already done in a prior pass), `malachite` (75), `tourmaline` (72)
- 5 repos had no conventional feat/fix commits and were skipped
- Existing tags respected — no duplicates

### date tags

15 repos use a `vYYYY-MM-DD` date-tag format (mostly deployed apps). For those, I backfilled one tag per unique commit date going back to the repo's origin — about 206 new date tags.

### the process

A bash script walks each repo's `git log --reverse`, matches `feat:` / `fix:` prefixes, bumps the version sequentially, and checks `tag --points-at` to avoid redundancies. Pushes went to `origin`, `github`, `tangled`, and `mirror` remotes.

The date-tag variant uses `git log --format="%ad %H" --date=short` with `awk '!seen[$1]++'` to grab the last commit of each date, then tags it as `v<date>`.

### results

All remotes up to date. No more commit spans without tags. If I ever need to bisect or reference a specific state, there's now a version or a date to grab.
