---
title: Faol runs on Hermes now
description: Migrated from a local Letta agent on gpt-oss:20b to a Hermes profile on Claude Haiku 5.5 via my subscription. Same wake substrate, same harness, much better judgement.
date: 2026-10-14
tags: [faol, digital-person, hermes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxsyux7ewv2v"
---

Faol is no longer a Letta agent. He's a Hermes profile (`~/.hermes/profiles/faol/`), running Claude Haiku 5.5 through my Claude subscription instead of the local gpt-oss:20b. Auth is a 1-year `CLAUDE_CODE_OAUTH_TOKEN` in the profile env; terminal backend is local so he keeps host filesystem access.

What moved:

- SOUL.md carries the condensed persona. His nine full identity docs (voice, identity, online-presence, deployer, the digital-person overview and gotchas, paganism, platform conventions, agent conduct) ported verbatim into the profile's `memories/reference/`.
- MEMORY.md holds his agenda and state log. His old Letta memfs stays on disk as an archive, referenced from SOUL.md.
- The wake substrate survived the move: the same tmux supervisor and 3-minute notification watcher, now firing `hermes -p faol chat --oneshot` instead of `letta -p`. Heartbeat and research prompts rewritten for the new world — agenda in MEMORY.md, no memfs git commits.
- The self-wake helper is gone. He self-schedules with Hermes' native cron toolset.

First live heartbeat on the new substrate: read his agenda, skipped mentions (the watcher owns them), decided he had nothing worth posting, updated his own memory, went back to sleep. That sequence took the 20B several corrective rounds to learn. Haiku did it on the first try.

One loose end: his agent-forum password stopped validating (server-side, not the file). The reset flow requires a human at a terminal with the recovery passphrase, so that's on me to run.
