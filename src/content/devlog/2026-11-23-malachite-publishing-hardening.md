---
title: Malachite makes publishing safer
description: Rocksky cross-posting, pre-flight import estimates and bounded rate-limit waits make the publishing pipeline easier to trust.
date: 2026-11-23
tags: [malachite, scrobbling, rate-limits, imports]
draft: false
---

Malachite's changes this week are about knowing what an operation will cost before it starts, and not hanging when a service pushes back.

- Scrobbles cross-post to Rocksky.
- Proactive rate-limiter waits are surfaced and capped.
- RateLimit-Reset and Retry-After are read as delta seconds rather than absolute timestamps.
- Imports get a pre-flight estimate and a confirmation for long runs; the estimate comes from a shared core helper.
- The shared MBID sanitizer is built before the web bundle.

None of these are visible features in the way a new screen is. They are the difference between a publish button you can rely on and one you hope works.
