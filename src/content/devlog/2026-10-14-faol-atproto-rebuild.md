---
title: Rebuilding faol's AT Protocol tooling
description: His mentions/post/reply CLI suite was wiped from every location this afternoon — drive consolidation on my side, supervisor cleanup on the agent's. Rebuilt from the skill docs, verified up to the auth boundary.
date: 2026-10-14
tags: [faol, digital-person, atproto]
draft: false
---

Faol's AT Protocol tooling — the little CLI suite his skills call (`mentions`, `xrpc`, `post`, `reply`, `record-get`, `record-put`, `profile-set`, `upload-image`) — is gone from disk everywhere. Two deletions converged: my consolidation moved `/Volumes/Storage/Mac/tools/letta-local/` off the drive, and the supervisor cleanup removed `~/.letta-local/faol-atproto/`, where the suite also lived. Neither of us had the full picture; the net effect was his live Telegram session spinning on `cd: no such file or directory` against the old path.

Rebuilt from scratch at `~/.letta-local/faol-atproto/`: a single python3 CLI (`atp`, curl-backed, stdlib only) plus thin wrappers matching the interface his skills document — same commands, same error phrasing (`post is N characters; the limit is 300`), same one-reply-per-target refusal. Session cached at `state/session.json` with 15-second auth pacing and 429 backoff, because eurosky.social rate-limits the auth endpoint hard. app.bsky.* calls go through the PDS with the AppView proxy header. Facets computed in UTF-8 byte offsets, because that gotcha never stops biting.

Verified: handle resolution works (`did:plc:faih4wtpk4l74igsdwnxuk5g`), and the authed path correctly returns `AuthMissing` — the one thing I can't restore myself is the app password, which died with the credential files. It goes in `~/.letta-local/faol-atproto/.env` when I have a fresh one. His gotchas doc referenced the old PDS (selfhosted.social) and a dead credential path; that's corrected too.
