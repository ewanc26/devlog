---
title: pkgs ships 20+ tourmaline charts, fixes malachite's Apple Music and ListenBrainz pipelines, and migrates to @bsky/sdk
description: Tourmaline gained word clouds, bar-chart races, region breakdowns, cumulative charts, dataset explorer, Eddington stats, rank history, anniversaries, and dozens of stat tiles. Malachite fixed Apple Music schema, MusicBrainz enrichment, ListenBrainz export support, Last.fm API fetch, and Spotify/YouTube name fabrication. The entire monorepo migrated from @atproto/api to @bsky/sdk + @atproto/lex, and landing pages got a design facelift.
date: 2026-08-22T01:23:08Z
tags: [pkgs, tourmaline, malachite, atproto, typescript, design]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35h5vgk2a"
---

## pkgs

### tourmaline: 20+ new charts and stat tiles

Tourmaline's analysis layer expanded from a handful of charts to a full listening-statistics dashboard. New visualisations include an animated bar-chart race for top artists, a cumulative top-artists line chart, a word cloud of catalogue terms, a tag chart of raw genre/strings, an Artists by Region ranked breakdown (parsed from MusicBrainz area/country metadata), a dataset explorer with per-item detail modals and rank charts, a starting-letter distribution chart, and a punchcard heatmap refinement.

Stat tiles added: biggest single-artist day, biggest discovery month, best new-artist debut, latest new artist, deepest catalogues (top artists by track count), longest gap between listens (artists and tracks), most regular listening (average listen intervals), scrobbles without album, tracks without album, and days-to-next-Eddington with artist cut-over point. The Eddington chart now surfaces these projections directly.

Catalogue analysis gained: every-year/every-completed-year artist lists, golden oldies (oldest first-listened artists) and latest discoveries, per-month rank history with biggest climbers/fallers, weeks-active alternate top-artist ranking, and artist anniversaries (years since first scrobble, with milestone highlighting).

Bug fixes across the analysis layer: one-hit wonders now means one song not one play, local calendar day is used consistently in range filtering, mood and obscurity compute from full artist history not just the filtered range, mostPopularYear/Month fallback handles empty data, track play counts dedupe by track+artist not name alone, and the receipt card's dotted leader no longer overlaps track counts.

### malachite: Apple Music, MusicBrainz, and ListenBrainz fixes

Apple Music import was fixed end to end: the correct CSV is now targeted (the earlier version pointed at the wrong one), the schema was completed with proper `releaseName` carry-through for album names, and MusicBrainz enrichment was added as a new pipeline that looks up recording/artist MBIDs from Apple Music's metadata. The `musicbrainz.ts` module in `croft-click-core` handles the lookups, with a test suite covering real API shapes.

ListenBrainz support was completed: real ListenBrainz exports (which come in `{ payload: { listens: [] } }` or bare-array shapes, not the previously assumed format) are now accepted and parsed, MusicBrainz URIs are emitted correctly (the old code wrote `artistMbid` instead of the lexicon-defined `artistMbId`), and the CSV date-parsing bug that landed timestamps in 1970 was fixed. A native Last.fm API fetch module (`lastfm-api.ts`) was added to `croft-click-core`, extended to the CLI, with the web frontend gaining a matching import mode.

Spotify and YouTube import stopped fabricating artist and track names — the old code used fallback strings when the API returned empty fields, producing records with placeholder names that merged silently. The rate-limiter now refunds reservations on failed batch publish, and the publisher drops malformed MusicBrainz IDs before they reach the API.

### @atproto/api → @bsky/sdk + @atproto/lex migration

The entire monorepo migrated from the deprecated `@atproto/api` to `@bsky/sdk` + `@atproto/lex` across 70 files. `svelte-standard-site` completed its migration in a follow-up commit. Every web frontend (bismuth-web, jasper-web, malachite-web, opal-web), the CLI tools (malachite, opal, jasper), and shared packages (atproto, croft-click-core, supporters, tangled-sync, tourmaline) were updated. The migration touched OAuth flows, agent construction, record operations, pagination, and publishing pipelines.

### design facelift

Landing pages got a visual refresh: each project was given a distinct colour drawn from its logo, with per-mineral palette tuning across all SVG logos and hero artwork. The `landing-ui` package gained a `SectionHeading` component and reworked layout with support and sibling CTAs. The design went through three iterations — distinct colours, then palette reduction to one or two hues per project, then a revert of the logo/hero artwork to original colours while keeping the CSS palette changes. Support links were added to all package READMEs and the monorepo footer.

### croft-click-core fixes

PDS resolution through service-proxy targets was fixed (`never read the PDS off a Client's service-proxy target`), and CAR export now resolves the PDS through the session agent rather than hardcoding it. The `rate-limiter.ts` gained reservation refund on failure. Apple Music's `releaseName` field was added to the publish pipeline.
