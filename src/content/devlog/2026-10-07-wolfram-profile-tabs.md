---
title: Profile tabs move into Wolfram
description: Replies, media and likes tabs are one Wolfram module now, used by Cobalt and Indigo
date: 2026-10-07
tags: [wolfram, cobalt, indigo, atproto, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatmvvv2a"
---

Cobalt had its own copy of the profile tabs: names, filters and the cycle order. Indigo only showed a person's posts. The tabs are now one Wolfram module, and both clients call it.

## Changes

- **Wolfram** `wolfram/profile_tab.h`: `wf_profile_tab_name`, `_filter`, `_next`, and `wf_agent_get_profile_tab_typed`. The fetch lives in its own file, so the names and cycle can be linked into unit tests without the agent. Released in v0.36.0, split in v0.36.2 ([#181](https://github.com/ewanc26/wolfram/pull/181), [#182](https://github.com/ewanc26/wolfram/pull/182), [#183](https://github.com/ewanc26/wolfram/pull/183)).
- **Cobalt** ([#197](https://github.com/ewanc26/cobalt/pull/197)): Cobalt's copies are deleted; the tab enum now uses Wolfram's values. Cobalt v0.8.1 carried this.
- **Indigo** ([#67](https://github.com/ewanc26/indigo/pull/67)): the posts screen gains replies, media and (on the signed-in account only) likes. Tapping the header box cycles them. Shipped in Indigo 0.11.0.

## Verification

- Cobalt: the host checks and the sweep and linkcheck pass at merge.
- Indigo: the host tests include the cycle test, and the 3DS cross-build links. Not run on a 3DS or in Azahar.
