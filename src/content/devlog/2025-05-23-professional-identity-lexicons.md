---
title: Professional Identity & Lexicon Expansion
date: 2025-05-23
description: Integrating professional profile data from AT Protocol and expanding status lexicons.
tags: [website, atproto, identity]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55fsmzw2i"
---

### Professional Profile
I've integrated a new professional info section into the website, powered by custom AT Protocol lexicons. This allows the site to dynamically pull professional background and experience directly from my PDS.

- **Lexicon Expansion:** Added new JSON lexicon files for `uk.ewancroft` to support status messages and professional information.
- **Dynamic Loading:** The site info and professional data now load dynamically from the PDS, ensuring the website reflects my latest status without manual updates.
- **RSS Feeds:** Added RSS feed endpoints for both the blog and "now" (status) pages, making it easier to follow updates across different platforms.

### Refinements
- **Navigation:** Simplified the navigation by moving to dynamic breadcrumbs.
- **UX:** Added fade transitions to the status component for a smoother visual feel.
