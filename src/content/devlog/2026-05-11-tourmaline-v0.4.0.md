---
title: "Tourmaline v0.4.0 — tabs, sessions, story recap, date ranges, phases"
description: "Profile redesign with tabbed layout, listening sessions, on this day, story-mode recap, date range filtering, and listening evolution phases"
date: 2026-05-11T06:50:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf557plt62i"
---

**Tabbed profile redesign.** The single long scroll is now 4 tabs: Overview (minutes, streaks, personality, yearly wrapped), Taste (genre, mood, era, evolution, remarkable days), Habits (clock, heatmap, service origins, sessions), Catalogue (top artists/tracks/albums, discovery, on this day). Stats row stays above tabs. Tab state syncs to `?tab=` URL param.

**Listening sessions.** Derives contiguous sessions from scrobbles where consecutive plays are ≤30 minutes apart. Shows session count, longest session, average per session, total session time. Detects a pattern: Night Owl (>50% sessions after 10pm), Commuter (peak sessions during travel hours), Marathon Runner (>20% of sessions 2+ hours), Snack Listener (>60% of sessions ≤3 scrobbles), or Balanced.

**On This Day.** Shows what the user listened to on this date in previous years — top artist and scrobble count for each year, up to 5 years back.

**Story-mode year recap.** Horizontally-scrollable card deck turning the year into a narrative: intro, totals, top artist/track/album, mood, evolution phases, standout day, streak, discovery, outro. Auto-advances every 5 seconds, pauses on hover/touch, keyboard-navigable with arrow keys.

**Custom date range picker.** Pill selector (7d, 30d, 90d, 365d, All) filters raw scrobbles and recomputes the full analysis pipeline on the fly — genres, mood, era, sessions, phases all update without re-enriching artist data.

**Listening phases.** Derives 2–6 musical phases by grouping consecutive months with the same dominant genre. Each phase gets a seasonal label (e.g. "Metal Winter", "Electronic Summer"), dominant mood, top 3 artists, and scrobble count. Short phases (<2 months) merge into adjacent ones. Vertical timeline with genre-coloured badges.

**Bug fixes** (from earlier in the session): scrobbles now validate `playedTime` before incrementing counts, cursor comparison uses strict `<` to avoid same-timestamp skips, MusicBrainz user agent version mismatch corrected, API proxies no longer cache error responses, negative enrichment results get a 7-day TTL instead of being treated as cache misses, late-night mood hour slice fixed from `slice(0, 4)` to `slice(0, 5)`.
