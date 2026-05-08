---
title: Building a Modular AT Protocol Service Layer
description: Deep integration with the AT Protocol, pulling posts directly from the PDS and introducing a new Card UI system.
date: 2025-10-19
tags: [atproto, bluesky, ui]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsjczed22"
---
Today marks a massive milestone for the site: I've completely rewritten how we handle external data by building a modular AT Protocol service layer. Instead of relying on the legacy implementations, the site now fetches data natively using custom agents and caches it intelligently. 

Alongside the backend rewrite, I've redesigned "Ewan's Corner" with a brand new, reusable Card UI system. The new `BlueskyPostCard` component supports lightboxes, rich text rendering, and native fallback avatars. I've also implemented smart redirect detection for WhiteWind and Leaflet posts, bridging the gap between my custom site and the wider ecosystem.
