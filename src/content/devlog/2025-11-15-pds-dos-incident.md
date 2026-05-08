---
title: PDS DoS Incident
description: Accidentally rate-limited the entire PDS by blasting records at the API — the lesson that built Malachite's rate limiting.
date: 2025-11-15
tags: [atproto, infra, malachite]
draft: false
---

## pds rate limit incident

Accidentally DoS'd the own PDS during early Malachite development. The initial JavaScript version had no rate limiting or error handling — it just blasted records at the API as fast as possible. The Bluesky AppView rate-limited the PDS for 24 hours, making it effectively unusable for everyone on it. The incident drove the complete TypeScript rewrite with proper rate limiting, batch management via `com.atproto.repo.applyWrites`, and the 7,500 records-per-day safety limit. The AppView enforces a 10,000 records/day threshold; exceeding it affects the entire PDS instance, not just the offending user.
