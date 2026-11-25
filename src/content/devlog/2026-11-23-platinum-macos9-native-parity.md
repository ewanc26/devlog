---
title: Platinum moves more actions onto the native session
description: Profile reads, search, follows, mutes, blocks, muted words and post deletion now go through the native macOS 9 session first.
date: 2026-11-23
tags: [platinum, macos9, atproto, parity]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342apt22p2h"
---

Platinum's macOS 9 client got a parity sweep: the actions that used to take a detour now start in the native session.

- Profiles are read natively first.
- Account and post search moves to the native path.
- Follows, mutes and blocks are written natively.
- Muted words are read and written natively first.
- Post deletion goes through the native session.
- Text that cannot be represented collapses to a single placeholder instead of breaking the layout.

"Natively first" is the right framing. The old path still exists as a fallback, but the native session is now the one that gets exercised in ordinary use.
