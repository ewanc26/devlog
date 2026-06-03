---
title: Kibun Status & Custom Slug Routing
date: 2025-11-22
description: Integrating Kibun status records and implementing a configurable slug-to-publication mapping system.
tags: [website, atproto, architecture]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55dx3f32z"
---

### Kibun Status
I've introduced the `KibunStatusCard`, which surfaces my current "Kibun" (mood/status) directly on the homepage. This involved adding a new AT Protocol fetcher and type definitions for the Kibun lexicon.

### Custom Slug Routing
To better manage internal links and publications, I've implemented a configurable slug-to-publication mapping system. This allows for clean, readable URLs that automatically route to the correct AT Protocol publication (e.g., WhiteWind or Leaflet).

### Video & Interactivity
- **HLS Video:** Added support for HLS (HTTP Live Streaming) using `hls.js`, allowing for high-quality video playback within posts.
- **Wolf Mode:** Added a "WolfToggle" to the header—a fun Easter egg that enables a "wolf-speak" mode across the site.
- **Runes:** Migrated several core components, including the `BlueskyPostCard`, to Svelte 5 runes for improved reactivity and performance.
