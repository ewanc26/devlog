---
title: Real-time Updates via Jetstream Firehose
description: Hooking the site up to the AT Protocol firehose for live-updating feeds and dynamic view transitions.
date: 2026-05-08
tags: [atproto, firehose, realtime, animations]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsiyvm32i"
---
The site is now officially alive! I've integrated real-time updates via the `europe.firehose.network` Jetstream. Instead of relying on static polling, the site now listens to the firehose and displays live-update pulse indicators on cards as state changes happen. 

To make this feel as smooth as possible, I've spent today polishing the micro-interactions. We now have proper View Transitions API support for page crossfades, staggered card entrance animations on the homepage, and scroll-triggered reveals on the archive pages. The difference in UX is night and day.
