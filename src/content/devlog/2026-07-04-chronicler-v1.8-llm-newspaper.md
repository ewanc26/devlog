---
title: Chronicler v1.8.x — LLM newspaper generator and issue backfill
description: Chronicler shipped v1.8.2 with a configurable LLM newspaper generator, server-log issue backfill, and an AGPL license.
date: 2026-07-04T15:47:00Z
tags: [chronicler, minecraft, ai]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzuxq22k"
---

## Chronicler

The Minecraft "living newspaper" plugin moved from v1.7.0 to v1.8.2, with the LLM-driven `NewspaperGenerator` getting real test coverage and configurability.

### changes

- Released **v1.8.2** (after a `paper-plugin.yml` version fix to 1.8.1).
- `NewspaperGenerator` now uses a configurable system prompt instead of a hardcoded string; added a `FakeLlmProvider` and LLM integration tests.
- Bumped LM Studio `max_tokens` to 800 to suit reasoning models.
- Backfill **issue #0** from server logs, and auto-remove issues after they are read (plus a listener).
- Added the GNU AGPL v3 license and fixed the plugin manifest version.
