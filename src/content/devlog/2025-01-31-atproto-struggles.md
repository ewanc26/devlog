---
title: Struggles Adapting to the AT Protocol
description: Early experiences with the AT Protocol SDK — confusing docs, Python and TypeScript friction, and the learning curve of a new API paradigm.
date: 2025-01-31
tags: [atproto, reflection]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleiuh7mhu22"
---

## adapting to atproto

Initial experiences with the AT Protocol as a hobbyist. The API structure is foreign compared to typical REST APIs — XRPC methods, lexicon-based validation, DID resolution, and repository semantics all require a mental model shift. The Python SDK (`atproto`) was unfamiliar territory despite Python being my primary language. TypeScript SDK (`@atproto/api`) felt more natural but still required understanding the underlying protocol concepts. Documentation was sparse and confusing at the time — mostly spec documents rather than practical guides. Built initial projects (markov bot, awoo bot, moon tracker) despite the friction, learning the protocol by doing rather than reading.
