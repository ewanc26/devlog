---
title: "Tourmaline analysis algorithm improvements"
description: "Era analysis, time-of-day mood weighting, genre blending, Gini-based loyalty, full-artist genre profile"
date: 2026-05-10T16:15:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlj5wso53h2i"
---

Six improvements to the tourmaline analysis pipeline.

**Era analysis (was a dead stub):** Now builds decade preference from MusicBrainz artist start years (`life-span.begin`), weighted by play count. It measures when the artists you listen to emerged — a proxy for era preference, not exact track release dates.

**Time-of-day mood weighting:** Night listening (22:00–05:00) boosts Dark, Melancholic, and Atmospheric by up to 15%. Late-night hours (00:00–04:00) add an extra 10% boost to Dark and Atmospheric. Morning listening (06:00–11:00) boosts Happy and Energetic by up to 15%. A night owl metal listener and a morning gym-goer now get different mood profiles even with the same genres.

**Mood normalisation fix:** Was normalising against the max mood score (making second place always 50 or less). Now normalises against the total mood weight, giving the actual distribution.

**Full-artist genre profile:** Was only using the top 50 artists. Now iterates the full `artistPlayCounts` map to capture the long tail of less-played genres.

**Genre blending in archetype selection:** When the top two genres are within 70% of each other's weight, a blended archetype is chosen from a new `BLENDS` map. Covers Metal+Rock, Electronic+Metal, Electronic+Pop, Folk+Rock, Hip Hop+R&B, Pop+Rock, and Rock+Soundtrack — each with mood-specific variants.

**Loyalty trait:** Replaced the `uniqueTracks/totalScrobbles` ratio with the Gini coefficient. Gini is scale-invariant — a listener with 500 scrobbles of 500 tracks and one with 50,000 scrobbles of 25,000 tracks no longer get the same score.
