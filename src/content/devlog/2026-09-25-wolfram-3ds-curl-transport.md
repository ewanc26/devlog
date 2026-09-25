---
title: Wolfram 3DS curl transport and hardware-seeded crypto
description: Route the 3DS target through the shared libcurl transport and back P-256 signing with the console hardware RNG
date: 2026-09-25
tags: [wolfram, atproto, c, sdk, 3ds]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwefdiutgs26"
---

Issue #30 asked to cross-build-verify the 3DS transport and crypto. The real defect was worse than the issue implied: the 3DS target was mis-wired to the libogc-only socket transport, so any executable linking `libwolfram.a` hit undefined `wii_tls_*` symbols — invisible inside the static archive, a hard link failure for consumers. The Wii U had already fixed this exact defect by switching to the shared curl transport; the 3DS now mirrors that.

## Changes

- **Transport** — `WOLFRAM_USE_SOCKET_TRANSPORT` is Wii-only again; the 3DS links devkitPro portlibs (3ds-curl, 3ds-zlib, 3ds-mbedtls) with `WOLFRAM_CURL_MBEDTLS` / `CURL_STATICLIB`. The issue said "httpc-based", but libctru's HTTPC has no WebSocket support and curl satisfies the same acceptance with far less new surface.
- **Crypto** — new `src/crypto/3ds_random.c` supplies `wii_tls_random()` (the f_rng callback `crypto_wii.c` uses for P-256 and ECDSA) from a CTR-DRBG seeded by `sslcGenerateRandomData` → `ps:ps GenerateRandomData`. Unlike Wii/Wii U, whose only entropy is a timer-seeded libc PRNG, the 3DS has real hardware entropy — no application-provisioned seed. `RAND_bytes` now delegates to the DRBG instead of returning failure.
- **Pre-existing gaps** — `openssl_compat` gained the missing `EVP_MD_CTX` streaming digest (mbedTLS SHA-256) that `repo/cid` needs; `3ds_platform` updated for libctru 2.7 (`socInit` context buffer, no `LightLock_Destroy`) and dropped the unused httpc service.
- **Roadmap** — item 60 updated to the verified state.

## Verification

- Cross-build with devkitARM (devkitpro/devkitarm container): `libwolfram.a` builds clean and a real executable exercising the curl XRPC client, incremental CID hasher, and DRBG links with zero undefined symbols into a `.3dsx`. Cross-build verified only, not run on hardware.
- Desktop suite unchanged: 126/126 pass.
- PR ewanc26/wolfram#57, all six CI checks green. Closes #30.
