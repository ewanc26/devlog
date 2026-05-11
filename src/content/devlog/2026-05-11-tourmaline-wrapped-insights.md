---
title: "Tourmaline wrapped insights"
description: "Minutes listened, music evolution, remarkable days, discovery, and yearly wrapped card with scroll-reveal animations"
date: 2026-05-11T05:40:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlkormqlxr2s"
---

Five new profile sections, all with scroll-reveal animations.

**Minutes Listened:** Hero stat with animated counter (ease-out cubic, 1.6s duration). Shows hours listened and equivalent days of music. Uses `IntersectionObserver` at 20% threshold to trigger.

**Music Evolution:** Stacked horizontal bars per month showing genre distribution shifts. Each month row fades in from the left with 40ms stagger. Colour-coded legend for up to 6 genres. Requires at least 3 months of genre data to display.

**Remarkable Days:** Cards for peak listening day, discovery day (most first-time artists on one day), peak month, and quietest active day. Staggered 70ms per card. Uses lucide-svelte icons (Zap, Compass, BarChart2, Ghost).

**Discovery:** Artists ordered by first-listen date (most recent first). Shows up to 50 with noise-avatars for missing images. Staggered 35ms per row.

**Yearly Wrapped:** Shareable summary card with hours, unique artists, scrobbles, diversity score, top artist/track/genre. Copy-to-clipboard button. Green glow gradient background.

The aggregator now tracks `totalMinutes` (from track durations, defaulting 3.5 min per scrobble), `artistFirstListen` (earliest date per artist), `monthlyScrobbles`, and `monthlyArtistPlays` (artist plays per month for genre evolution).
