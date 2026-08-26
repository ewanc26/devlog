---
title: Inkwell ships v2.4.0 — Kotlin Multiplatform shared core, writer, accessibility, and F-Droid distribution
description: From a single-platform iOS app to a Kotlin Multiplatform monorepo with shared core, writer, discover, settings, notifications, legal docs, accessibility, customisation, F-Droid/AltStore publishing, and CI pipelines across iOS and Android. 140+ commits, v2.0.0 to v2.4.0.
date: 2026-08-25T20:04:37Z
tags: [inkwell, atproto, ios, swift, kotlin]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35gty2c2a"
---

## inkwell

Inkwell went from a single-platform iOS reader to a full Kotlin Multiplatform monorepo covering iOS and Android, shipping v2.0.0 through v2.4.0 across 140+ commits. The shared KMP core now handles markdown parsing, facet conversion, record verification, and AT Protocol utilities; the iOS and Android apps each gained writer, discover, settings, notifications, legal docs, accessibility, and customisation features; and both platforms publish to F-Droid and AltStore alongside the App Store.

### Kotlin Multiplatform shared core

The biggest structural change was extracting a shared KMP module at the repo root (`shared/`), moving from duplicated per-platform logic to a single source of truth. `FacetConverter` (byte-range to markdown), `MarkdownConverter` (Leaflet/Markpub/pckt/Offprint block parsing), `VerificationUtils`, `ConstellationClient`, and URL utilities all migrated to shared Kotlin, with iOS consuming them through a `SharedKMP.swift` bridge and Android importing them directly. Wire models on both sides were updated to match the authoritative lexicons (`pckt`, `Offprint`, `Leaflet`), and a neutral shared-model DTO layer was added to avoid platform-specific type drift.

The migration happened incrementally: Android moved first (`feat(android): migrate app to shared KMP core`), iOS followed (`feat(ios): complete markdown type migration`), then facet conversion was unified (`feat(ios,android): complete FacetConverter migration to shared KMP`), and finally verification, constellation, and URL utilities were extracted (`feat(shared): migrate verification, constellation, and URL utilities to KMP`). A shared record-list pagination cap, inline rendering dispatch, and content-dispatch utilities rounded out the shared layer.

### writer and format-aware publishing

Both platforms gained a writer with format-aware publishing. iOS got a split-pane `WriteView` with `FormattingToolbar` and a `WriterViewModel`; Android got a matching `FormattingToolbar`, preview toggle, and loss reporting. The writer supports Leaflet, Markpub, pckt, and Offprint formats, with cursor-position-aware formatting buttons on both platforms. Android also gained image upload and blob handling in the writer, and both platforms can create and edit documents with proper facet rendering.

### reader and discover

The reader was brought to full Leaflet content parity: all 18 block types render, `pub.leaflet.comment` support landed with full CRUD (fetch, create with threaded/page-anchored replies, delete), and blob pages load from blobs rather than inline records. Android added Bluesky post embeds (fetcher, data models, live embeds), verification badges, publication theming, and interactive poll voting. Discover gained cross-repo discovery via `ConstellationClient` for comments and related records, with concurrent profile resolution for display names and avatars.

### settings, notifications, and legal

A full Settings screen shipped on both platforms with notification toggles and foreground banners. Android gained `WorkManager` background notification polling; iOS got actionable tapped notifications and fixed unread counts. Legal documents (Privacy Policy, Terms of Service, EULA) were generated from a single Markdown source in shared KMP, with native rendering on Android and a Swift wrapper on iOS. UK GDPR coverage was added. An in-app feedback submission to `userinput.app` was wired up.

### accessibility and customisation

Text size, bold text, increased contrast, and underline-links accessibility controls shipped alongside paid accent/font/appearance overrides with an honour-system unlock. A one-time tip nudge replaced the earlier license gate. The credits screen gained Bluesky supporter display, and a Ko-fi tip prompt appears occasionally.

### OAuth scopes and identity

A new `uk.ewancroft.inkwell.user` lexicon was added with `REPO_USER` and `REPO_PUT_RECORD`/`REPO_UPLOAD_BLOB` OAuth scopes, powering an Inkwell-user declaration toggle on both platforms. The OAuth flow was hardened with real DPoP/PKCE fixes found during dogfooding, and the shared `XrpcEndpoints` model was extended.

### CI, distribution, and release engineering

GitHub Actions workflows were added with path-scoped triggers for iOS, Android, and website. CI gained F-Droid mirror checks, a shared KMP JVM test step, Xcode 26 SDK selection with Simulator runtime fallback, and proper version bump policies. A `tools/release/publish.mjs` script automates the release checklist. The AltStore listing got a real icon (1024x1024 flat render) and accurate IPA size. F-Droid repo backfilled missing releases. The website expanded into a multi-page marketing site with an Open Graph cover image and a users-using-Inkwell carousel.

### modularisation and testing

Oversized files on both platforms were split into focused per-responsibility modules. Mock screenshot modes were replaced with real-data testing modes. Credits became reachable without signing in. A shared KMP regression test covers inline code followed by plain text. The deployment target was lowered from iOS 26.0 to iOS 18.0.
