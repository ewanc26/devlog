---
title: "Tourmaline: analysis moves to web worker"
description: "Moved the entire analysis pipeline from server-side POST to a browser web worker, fixing Vercel body size limits for large scrobble histories"
date: 2026-05-11T09:50:00Z
tags: [atproto, pkgs, music, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf557kfqh2g"
---

Analysis pipeline moved from server-side computation to a **web worker**. The previous approach POSTed scrobbles to `/api/profile/[did]`, but Vercel's 4.5MB serverless function body limit meant users with 50K+ scrobbles (~8.5MB JSON) got silently empty profiles.

The web worker runs the full pipeline (Aggregator, genre/mood/era/timeline profiling, diversity, obscurity, sessions, personality, story recap) off the main thread. Scrobbles pass from client memory to the worker via structured clone — no network round-trip, no body size limits. The worker bundle is 56KB. Client strips scrobbles to essential fields (`playedTime`, `trackName`, `releaseName`, `artists[0].name`, `duration`, `musicServiceBaseDomain`) before posting to the worker.

Two dead ends preceded this: first, a GET endpoint that relied on server-side SQLite cache (ephemeral on Vercel — each serverless invocation gets a fresh filesystem), then a POST endpoint that hit the body limit. The worker is the right architecture — the data is already in the browser, the computation is pure, and there are no deployment constraints.
