---
title: Balla gets a client and independent hosts
description: An Expo client gains chat, discovery and moderation, while accounts move to native resolution and sign-in through independent PDS hosts.
date: 2026-11-23
tags: [balla, react-native, atproto, identity]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342apyaoz2v"
---

Balla had an architecture and no app. This week it got both the app and a more honest account model.

### the client

- Expo/React Native scaffold through login and compose, with shareable URLs for every screen and nested paths served without a `.html` destination.
- Private messages over the chat-service proxy, then group chat, embeds, reactions and moderation.
- Safe multi-account switching, plus account, privacy and session-security settings.
- Hashtag, topic, video and Discover pages; starter-pack actions and owner editing.
- Profile verification, pinned posts and scoped search; video, GIF and caption posts.

### the hosts

- Handles resolved natively, with hosting diagnostics and sign-in through independent PDS hosts.
- NetworkBackend seam with an AT Protocol adapter.
- Read-only public account pre-flight, migration pre-flight and pre-sign-in account checks.
- Public health checks for the AppView, labeler reachability and the video endpoint.
- Configurable public `did:plc` directory, cached DID/handle resolution and PDS-profile fallback.
- Bounded retries, rollback and truthful errors, with PDS-origin blob fallbacks for post images.

The pre-flight checks are the interesting choice. Instead of assuming the default host is healthy, the client asks first and says what is wrong when it isn't.
