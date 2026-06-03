---
title: Tourmaline Polish — PDS Rate Limiting & Component Reactivity
date: 2026-05-18
description: Implementing PDS rate limiting, fixing routing issues, and refining component reactivity for Tourmaline.
tags: [tourmaline, pkgs, atproto, performance]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf556xq5o2i"
---

### PDS Rate Limiting
Implemented intelligent PDS rate limiting to handle high-volume requests gracefully. This ensures that the application remains stable and responsive even when interacting with heavily loaded PDS instances.

### Component Reactivity & Routing
- **Routing:** Fixed several routing and profile rendering issues that were causing inconsistent states during navigation.
- **Reactivity:** Refined component reactivity, particularly in the profile card and date range selectors, to ensure that the UI always reflects the latest data.
- **Bug Fixes:** Resolved a `ReferenceError` in the story-recap component and fixed duplicate key errors in the `RemarkableDays` list.
