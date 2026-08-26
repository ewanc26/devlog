---
title: website fixes blog timezone derivation and design-language token compliance
description: Blog date URLs now derive from Europe/London timezone instead of UTC, and design-language tokens were brought into compliance with a favicon sync across static assets.
date: 2026-08-18T08:48:47Z
tags: [website, design]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35hejds2a"
---

## website

`b3266a24` fixed blog date URL derivation to use Europe/London timezone instead of UTC, preventing date-boundary mismatches where posts published late in the day would appear under the wrong date in the URL. `330c6cb4` and `56f9983f` fixed design-language token compliance across the static assets and synced the favicon to match.
