---
title: "Tourmaline new profile cards"
description: "Listening clock, listening stats, and service origins"
date: 2026-05-10T16:35:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55a3vy32z"
---

Three new cards on the tourmaline profile page.

**Listening Clock:** A 24-hour radar chart showing when this person listens. The hours are laid out in a circle, and the radius for each hour corresponds to scrobble count. Made with Chart.js radar (same as MoodRadar).

**Listening Stats:** Four stat badges — longest streak, current streak, biggest day (with date), and average scrobbles per active day. Uses lucide-svelte icons (Flame, TrendingUp, Calendar, Hash).

**Service Origins:** Small badges showing which music services the scrobbles came from (ListenBrainz, Last.fm, Spotify, etc.). The aggregator already tracked this in `serviceOrigins`. Added a friendly name map for common domains.
