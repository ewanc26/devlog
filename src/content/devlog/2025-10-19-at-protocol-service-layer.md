---
title: Building a Modular AT Protocol Service Layer
description: Deep integration with the AT Protocol, pulling posts directly from the PDS and introducing a new Card UI system.
date: 2025-10-19
tags: [atproto, website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsjczed22"
---
Rewrote the external data layer as a modular AT Protocol service. The site now fetches data natively using custom agents with intelligent caching. Redesigned the Card UI system with a new `BlueskyPostCard` component supporting lightboxes, rich text rendering, and native fallback avatars. Smart redirect detection for WhiteWind and Leaflet posts.
