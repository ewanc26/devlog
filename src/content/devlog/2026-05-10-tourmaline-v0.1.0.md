---
title: "tourmaline v0.1.0 — AT Protocol scrobble analyser with share-to-Bluesky"
description: "First release of tourmaline — personality archetypes, genre profiles, mood mapping, and OAuth-powered sharing to Bluesky."
date: 2026-05-10T01:50:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
---

Released tourmaline v0.1.0. An AT Protocol scrobble analyser that reads `fm.teal.alpha.feed.play` records from any PDS and builds a listener personality profile.

**What it does:**

- Resolves any Bluesky handle or AT Protocol DID to a PDS URL via Slingshot
- Fetches Teal.fm scrobbles page by page with incremental loading
- Aggregates top artists, tracks, albums, daily counts, genre profiles, mood mapping, era preference, diversity scoring, and obscurity indexing
- Enriches top artists with genre data from MusicBrainz, listener counts from Last.fm, and images from Deezer
- Caches scrobbles in both IndexedDB (client) and SQLite (server) for fast revisits
- Builds a personality archetype from genre/mood/intensity/obscurity signals (e.g. "Voltage Chaser", "Midnight Librarian", "Sonic Omnivore")
- Generates a personality profile card SVG and shares it as a PNG attached to a Bluesky post with a proper `@ewancroft.uk` mention

**Share flow:**

The only write operation. Uses `@atproto/oauth-client-browser` with granular scope (`atproto repo:app.bsky.feed.post blob:image/png`). The share button stores personality data in `sessionStorage` and redirects to `/share`, which handles the OAuth handshake and posts the image with RichText facet resolution.

**Colour palette:**

Chrome tourmaline green (`#4ade80`) on dark backgrounds with green undertone (`#0a0f0a`). Named after the mineral — tourmaline is pleochroic, showing different colours from different angles.

**Stack:** SvelteKit 5 + Svelte 5 + Tailwind CSS 4 + TypeScript. Chart.js for genre, mood, and era visualisations. Vercel deployment.

Part of the @ewanc26/pkgs monorepo.
