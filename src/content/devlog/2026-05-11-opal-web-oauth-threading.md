---
title: "Opal: web OAuth import, thread splitting, TID rkeys"
description: "Added web OAuth import flow, post threading for long content, and TID-based record keys to the Twitter/Mastodon/Threads to Bluesky converter"
date: 2026-05-11T07:00:00Z
tags: [atproto, pkgs, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlkvmvruyq2k"
---

**Web OAuth import flow.** opal-web now has a full OAuth import flow: sign in with AT Protocol, authorise, and import posts directly from the browser. Includes a publisher, rate limiter, and import UI. Landing page got about page and import footer link.

**Post threading.** Long posts now thread as replies instead of truncating. The publisher splits content at natural boundaries and creates a reply chain.

**TID-based record keys.** Switched from random rkeys to TID-based ones via `@ewanc26/tid`, giving deterministic, sortable record keys aligned with AT Protocol conventions.

**Parser rewrite.** Rewrote parsers based on export format research — more accurate parsing of Twitter, Mastodon, and Threads export data.

**Other fixes.** Removed `fs/promises` from the library entry point (was breaking browser builds). Added request timeouts to atproto package to prevent serverless function hangs. Fixed opal-web build order (tid must build before opal). Added missing dark theme tokens to opal-web layout. Added Opal logo.
