---
title: malachite dedup fixes — timestamp canonicalisation, sync window, duration, and a null-safety crash on legacy records
description: A 102,677-record audit of the Teal dataset found 3,395 duplicates with diagnosed root causes. malachite 0.19.6 and croft-click-core 0.3.6 fix the timestamp-format mismatch that defeated dedup (14Z vs 14.000Z), add a 60s sync window, populate duration from Apple Music exports, normalise Unicode in dedup keys, and harden the helpers against legacy records missing musicServiceUri or trackName. malachite.croft.click redeployed.
date: 2026-09-11T08:55:00Z
tags: [pkgs, malachite, croft-click-core, teal, atproto, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjq23rxs2y"
---

## pkgs

### malachite + croft-click-core: dedup fixes from a production data audit

A full audit of the 102,677-record Teal dataset found 3,395 duplicates. The root causes, verified against both the dataset and the source:

**Timestamp-format mismatch (2,951 duplicate groups).** Dedup keys compared raw `playedTime` strings, but two clients wrote the same instant differently — piper `2026-07-17T11:39:14Z`, malachite web `2026-07-17T11:39:14.000Z`. String comparison said different record; both published. Timestamps are now canonicalised (`toISOString()`) in every dedup key and in the published record.

**No time window in the sync filter (725 duplicates).** `filterNewRecords` only matched exact timestamps, so importing a Spotify export after Last.fm history double-counted every overlapping listen — scrobble time and stream-start time differ by seconds. The sync path now drops a new record when the same normalised artist + track exists within ±60s, configurable via `opts.windowMs`.

**Duration never populated.** The lexicon defines `duration` but no converter set it. Apple Music's `Media Duration In Milliseconds` is now used (it's true track length); Spotify's `ms_played` is play duration, not track length, so it stays unused.

**Unicode/casing in dedup keys.** The same artist appeared under multiple spellings (`DAGames`/`Dagames`, curly apostrophes, non-breaking hyphens). Dedup keys are now case-insensitive and punctuation-normalised via the shared `normalizeString`; NFKC is applied at ingest but Unicode equivalence in keys comes from punctuation/blank normalisation (U+2019/U+2011 aren't NFKC-mapped).

### null-safety on legacy records

Records predating `musicServiceUri` (and some missing `trackName`) crashed `buildDedupPlan` — `sourceOf` hit a null and the whole dedup run died. `normalizeString`/`normalizeName`/`canonicalizeTimestamp` now coerce `undefined` to empty string, and `sourceOf` returns `'unknown'` for a missing `musicServiceUri`. The `Source` type gained `'unknown'`. Two regression tests pin the crash patterns, including preferring the richer record when a duplicate group mixes a legacy row with an MBID-enriched one.

### release

All packages patch-bumped and published to npm — `@ewanc26/malachite` 0.19.6, `@ewanc26/croft-click-core` 0.3.6, plus the rest of the workspace. Full 252-test suite passes. malachite.croft.click redeployed to Vercel with the fixed core.
