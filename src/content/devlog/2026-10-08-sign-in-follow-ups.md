---
title: Sign-in discovery, with a fallback and the clients merged
description: Discovery falls back to the typed host when it can't resolve the account, and the Cobalt, Indigo and Platinum sign-ins now use it
date: 2026-10-08
tags: [wolfram, cobalt, indigo, platinum, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxd5npsnjo2t"
---

Yesterday's entry described sign-in discovery. Two things changed after it.

## Changes

- **Fallback** ([#189](https://github.com/ewanc26/wolfram/pull/189), released in v0.38.1 via [#190](https://github.com/ewanc26/wolfram/pull/190)). A handle that cannot be resolved to a PDS now signs in at the current host, as before discovery existed. Cobalt's end-to-end test found this: its mock PDS does not serve handle resolution.
- **Cobalt** ([#207](https://github.com/ewanc26/cobalt/pull/207)) replaced #202, which conflicted with `main` after the v0.39.0 pin. The same commit, on a fresh branch from `main`. Cobalt also merged a blank-server fallback to the default host.
- **Indigo** ([#72](https://github.com/ewanc26/indigo/pull/72)) merged on 7 October; it pins Wolfram v0.39.0 on `main` now.
- **Platinum bridge** ([#112](https://github.com/ewanc26/platinum/pull/112)) reads the account's PDS from its DID document and falls back the same way.

Nothing has been signed in against a live PDS on a console or in an emulator.
