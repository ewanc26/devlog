---
title: MetalBear gets a local dev instance and fixes its own did:web self-resolution
description: "Standing up a real localhost-only PDS surfaced two bugs -- did:web never resolved its own DID document when the DID encoded a port, and account creation had no way to avoid minting a real did:plc on the live PLC directory. Both fixed. 0.39.0 to 0.39.1."
date: 2026-08-13T00:24:58Z
tags: [metalbear, atproto, pds, c, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswezbz2222l"
---

## MetalBear

`scripts/setup.sh --local` now provisions a full MetalBear PDS on `http://localhost:2583` with no hostname, TLS, or DNS required -- `createAccount`, repo writes, OAuth, and the firehose all behave the same as a production instance. Getting there surfaced two real bugs.

### self-resolution over a port

A local instance's service DID has to be `did:web:localhost%3A2583` -- did:web percent-encodes a non-default port, and Wolfram's did:web resolver already special-cases a `localhost`/`localhost:<port>` host to resolve over plain HTTP instead of HTTPS. `handle_well_known_did` didn't know about that shape, though: it compared the request's Host header, stripped of its port, against the DID's host, which still carried the literal `%3A<port>` text. The two could never be equal, so a port-bearing service DID could never serve its own `/.well-known/did.json`, regardless of what Host header was actually sent. Fixed by decoding the percent-encoded port and comparing against the raw Host header in that case; the common no-port case is untouched. A regression test pins both the positive match and a clean miss on an unrelated host.

### did:key instead of did:plc

`identity.plc_url` is left unset for a local instance, so `createAccount` falls back to minting a self-certifying `did:key` (a fallback that already existed in `account_routes.c`) instead of a `did:plc`. That matters beyond convenience: a `did:plc` genesis operation is a permanent, public write to the live PLC directory, and a throwaway local account has no business making one. `firehose.crawlers` is left empty too, so a local instance never announces itself to a relay.

`--local` implies `--dev`. CONTRIBUTING.md documents the whole flow under "Running a local instance." 0.39.0 to 0.39.1.
