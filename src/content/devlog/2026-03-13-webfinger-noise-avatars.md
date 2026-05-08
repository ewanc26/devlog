---
title: Webfinger and Noise Avatars
description: Webfinger well-known routes for fediverse resolution and deterministic noise avatars for AT Protocol fallbacks.
date: 2026-03-13
tags: [atproto, website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni37ggx2s"
---

## Webfinger

Added webfinger well-known routes so `@ewancroft.uk@ewancroft.uk` resolves in Mastodon and other fediverse clients. The site identifies as a fediverse actor with proper `rel=me` links and dynamic well-known routes.

## Noise avatars

Extracted `@ewanc26/noise` as a standalone package for deterministic value-noise avatar generation. The `NoiseImage` component replaces all inline fallback boilerplate for AT Protocol media missing images. Every DID gets a unique, deterministic pattern.
