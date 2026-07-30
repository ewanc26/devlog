---
title: MetalBear goes from single-account prototype to a federating PDS
description: MetalBear rebuilt its account model twice, migrated storage off wolfram, validated records against the lexicon corpus, and is now crawled by Bluesky's relays and indexed by the AppView. 0.2.0 to 0.7.0.
date: 2026-07-28T09:02:00Z
tags: [metalbear, atproto, pds, c, federation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubjk4u2f"
---

## MetalBear

`MetalBear` — the AT Protocol Personal Data Server written in C, built on `wolfram` — went from a single-account, non-federating prototype to a multi-tenant server that actually federates with the Bluesky network. Nine version bumps landed, 0.2.0 through 0.7.0.

### account model, twice over

The account model was rebuilt twice. First, multi-account hosting went on top of the original single "bootstrap" account: per-account data directories, resolvers, and an isolated `createAccount`. Then the bootstrap account was torn out entirely (`refactor!: remove the bootstrap account`) so the server holds only a PLC rotation key and mints accounts on demand, like the reference PDS. OAuth tokens, well-known DID docs, and public reads all had to stop assuming "the one account" along the way — the old `METALBEAR_ACCOUNT_DID`/`METALBEAR_HANDLE`/`METALBEAR_PASSWORD` config keys are gone, replaced by an optional `METALBEAR_PLC_ROTATION_KEY`, and `invite_required` now defaults to `true`.

### storage, identity, and federation

PDS repository and blob storage were migrated off wolfram and into MetalBear's own store. Record validation against the wolfram lexicon corpus was wired up — records were previously accepted unchecked. `did:plc` minting and `did:web` hosting were added, including a fix for a self-deadlock where the PDS resolved its own `did:web` through its own ingress and wedged every worker thread.

A long federation-debugging arc followed — canonical DAG-CBOR encoding, firehose sequencing bugs, read-after-write consistency — and ended with the PDS being crawled by Bluesky's relays and indexed by the AppView.

### catching up to the reference PDS

Reference-PDS endpoint parity closed a lot of ground: AppView proxying with per-requester service-auth, chat routes (fixed from a bogus NSID to the correct `chat.bsky.convo.*`), timeline/thread endpoints, and push notification registration. Moderation landed and is actually enforced at read time now, not just recorded — takedowns outrank deactivation, and blob takedowns are correctly keyed on the `(did, uri, blob_cid)` triple. DNS-managed handle resolution shipped for four providers: Cloudflare, DigitalOcean, deSEC, and RFC2136.

### operations and release engineering

Docker images (Debian, Alpine, and a dev variant with the full toolchain), CI-published prebuilt binaries for Linux and macOS, a Prometheus `/metrics` endpoint, structured JSON logging, an admin CLI mirroring the reference `pdsadmin`, and backup/restore tooling with CRC32 checksums. The static landing page was replaced with a prerendered SvelteKit site that queries the server's own XRPC endpoints live instead of showing build-time state. The README now documents measured throughput (~1,000 req/s sustained reads, ~200 signed commits/s writes) rather than leaving performance unstated.
