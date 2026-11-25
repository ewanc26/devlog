---
title: Raindrop, a browser that understands at://
description: A branded Firefox fork gains strict at-uri handling, DID and handle resolution, and record CID verification.
date: 2026-11-21
tags: [raindrop, firefox, atproto, browser]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342apzjr426"
---

Raindrop started with an imported Firefox 160.0.1 tree and an identity of its own. By the end of the day it could resolve an `at://` URI properly.

- Imported the Firefox 160.0.1 release source and reconciled metadata after the import.
- Raindrop branding with original artwork, and the application identity carried through the build.
- `at://` protocol handler registered with an opaque authority, backed by a strict URI parser and Gecko tests.
- DID resolution for `did:plc` and `did:web`.
- Handle authorities resolved via DNS TXT with an HTTPS fallback.
- AT Protocol record CIDs verified against canonical DAG-CBOR.

The parser and the CID check are the foundation. A browser that merely opens `at://` links would be a URL handler; one that verifies the record is a place you can trust what you are looking at.
