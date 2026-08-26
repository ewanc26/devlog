---
title: Willow gains OAuth, compose, notifications, and thread/profile views
description: An iOS AT Protocol client that went from timeline-only to full auth (OAuth + app passwords), post creation with hand-rolled facets, an in-app notification list, and basic thread and profile views in 8 commits.
date: 2026-08-19T12:20:08Z
tags: [willow, atproto, ios, swift]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35haams2a"
---

## Willow

Willow went from a read-only timeline viewer to a functional client with authentication, posting, notifications, and profile/thread navigation in 8 commits.

### authentication

`a0e46a9` added AT Protocol OAuth sign-in alongside the existing app-password flow (+1,733 lines across 17 files) — the largest single commit in the window. The OAuth implementation covers the native-app loopback flow, session persistence, and token management, with app passwords remaining as a fallback for accounts that don't support OAuth.

### compose and posting

`b22ca9e` added post creation (`feat(compose): add post creation`), and `8f20aeb` extended it to support compose for OAuth sessions with hand-rolled facet support (`feat(auth): support compose for OAuth sessions with hand-rolled facets`). Posts can be created and published with inline formatting.

### notifications

`499f0a0` added an in-app notifications screen (`feat(notifications): add a notifications screen`), showing unread notifications with clearing.

### thread and profile views

`16e5c4a` added basic thread and profile views (`feat(thread,profile): add basic thread and profile views`), completing the core navigation loop — timeline → post → thread → profile → posts.

### like/repost and build fixes

`33aaf0d` wired like/repost actions into the timeline UI and fixed a broken build, completing the engagement loop.
