---
title: Documentation and agent-guidance audit across the fleet
description: Added or corrected AGENTS.md agent guidance in 49 repositories and fixed AT Protocol trademark/naming wording in 10, after a full source audit.
date: 2026-07-16T17:23:00Z
tags: [infra, maintenance, agent, documentation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubw3im2f"
---

## fleet documentation audit

Another housekeeping pass across `/Volumes/Storage/Developer/Git`. Every repo got a fresh look at its `AGENTS.md` — or got one for the first time — plus a check for stale AT Protocol trademark and naming language in READMEs.

### scope

- **47 repos** got a new `AGENTS.md` (`docs: add repository agent guidance`)
- **49 repos** had their `AGENTS.md` corrected after a source audit (`docs: correct agent guidance after source audit`) — almost all of these are the same repos just given one, re-checked against the actual source rather than first-pass assumptions
- **7 repos** had AT Protocol trademark usage clarified in their docs
- **3 repos** had AT Protocol naming aligned (consistent "AT Protocol" phrasing instead of ad hoc casing/abbreviations)
- All of it landed in a single day, 2026-07-16

### why

Agent guidance had accumulated inconsistently across the fleet — some repos had detailed `AGENTS.md` files, most had none, and a few had guidance that no longer matched the source after refactors. Rather than have coding agents work from stale or absent context on a repo-by-repo basis, this pass gives every repository a baseline, source-verified `AGENTS.md`.

### process

Each repo was read fresh — source layout, key invariants, secrets/webhook handling where relevant, build/validation commands — then either got a new `AGENTS.md` or had its existing one corrected against what the source actually does, not what was assumed. The trademark/naming pass was a smaller sweep caught by the same read-through, fixing a handful of READMEs using inconsistent or incorrect AT Protocol terminology.
