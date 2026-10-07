---
title: The Wii U library links again
description: A 64-bit atomic in Wolfram's DID cache did not link on the Wii U, so Cobalt's .wuhb build failed once sign-in began resolving DIDs
date: 2026-10-08
tags: [wolfram, cobalt, wiiu, bug]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxd5npqy5g2f"
---

Once Cobalt's sign-in resolved a DID, the Wii U build failed at link time. The cache's TTLs were `_Atomic time_t`, and a 64-bit `time_t` has no lock-free atomic load on the 32-bit PowerPC. The linker wanted `__atomic_load_8`, which devkitPPC does not provide.

## Fix

The TTLs are plain values under the cache's existing lock ([#191](https://github.com/ewanc26/wolfram/pull/191), released in v0.38.2 via [#192](https://github.com/ewanc26/wolfram/pull/192)). The Wii U library now builds with no undefined references. Cobalt's `.wuhb` build is the real check, and it runs on each Cobalt PR.

Cobalt's sign-in branch that hit this is [#207](https://github.com/ewanc26/cobalt/pull/207), which replaced the conflicting #202 and merged.
