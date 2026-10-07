---
title: Wolfram CI retries a stuck package mirror
description: A hung apt step kept Wolfram's main CI running for an hour and blocked the release. Each apt call now has a timeout and three attempts.
date: 2026-10-07
tags: [wolfram, ci, infrastructure]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatud432k"
---

On several runs, the `Install system dependencies` step hung on a package mirror. Nothing failed; the jobs simply sat for an hour. The `release` workflow waits on `CI gate`, so v0.37.0 was blocked until a run was cancelled and re-run.

## Change

Each `apt-get update` runs under a 300 s timeout and each `apt-get install` under 900 s. The pair is retried up to three times, with a short pause between attempts. If all three fail, the step fails rather than waiting. This is [#186](https://github.com/ewanc26/wolfram/pull/186).

The retry cannot help a run that is already stuck: it uses the workflow file from that run's commit. The re-run is what unblocks it.
