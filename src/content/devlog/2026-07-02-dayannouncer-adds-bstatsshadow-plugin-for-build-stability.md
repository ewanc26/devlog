---
title: DayAnnouncer adds bStatsShadow plugin for build stability
description: DayAnnouncer add bStatsShadow plugin to prevent build conflicts
date: 2026-07-02T23:00:00Z
tags: [dayannouncer, build]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mprj34pfxy27"
---

The DayAnnouncer plugin adds bStatsShadow for build stability. This release brings 11 commits focused on plugin improvements, most notably switching from manual jar bundling to the Shadow plugin for bStats relocation, which prevents conflicts with other plugins.

### improvements
- Add Shadow plugin for bStats relocation (prevents conflicts)
- Fix listener leaks and remove dead code
- Add bStats, update checker, config versioning, toggle persistence

### features
- Add multi-world support with commands, multi-channel output, sounds
- Implement message pools, per-world output, new placeholders, dynamic defaults
- Add GNU Affero General Public License v3
- Add configurable dawn threshold and prevent double announcements

### organization
- Add GNU Affero General Public License v3

