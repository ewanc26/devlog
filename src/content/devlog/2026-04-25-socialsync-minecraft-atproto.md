---
title: Social Sync — Minecraft Meets AT Protocol
description: Syncing Minecraft stats, achievements, and play sessions to AT Protocol with OAuth, privacy controls, and encrypted session storage.
date: 2026-04-25
tags: [atproto, feature, minecraft]
draft: false
---

## socialsync

Built a Minecraft mod that syncs player statistics and advancements to AT Protocol records. The server tracks play sessions with OAuth authentication type, and the client integrates AT Protocol OAuth with PKCE, DPoP, and PAR for secure login.

### Privacy and consent

Implemented a 4-category sync consent system: players control which data types (stats, sessions, achievements) are synced. Client-side session storage is encrypted with AES-256-GCM. The security auditor logs sync preference changes.

### Server features

- Play session tracking with start/end timestamps
- Server status snapshots
- Sync preferences persistence and packet handling
- Unified branding as "Social Sync" v0.5.0

### Config screen

Redesigned the ModMenu config screen with OAuth login button and sync preference toggles. Removed the deprecated server-side login flow in favour of the browser-based OAuth path.
