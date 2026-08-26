---
title: New project — streemskle, a SwiftUI Streamplace video client
description: A native SwiftUI app for browsing and watching Streamplace video content, built from scratch in 29 commits over under a week. Creator profiles, video navigation, search, resilient native playback, rich-text video descriptions, and persisted Streamplace node settings, all wired through AT Protocol.
date: 2026-08-23T21:05:38Z
tags: [streemskle, atproto, swift, ios]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mty35h2vq22a"
---

## streemskle

A new project, built from initial commit to functional app in 29 commits across under a week: a SwiftUI client for Streamplace video content, discovering and playing videos and live streams through AT Protocol.

### foundation and discovery

`d283560` bootstrapped the entire app in one commit — 23 files, +1482 lines: Xcode project, `RootTabView` with live streams, videos, and settings tabs, `ATIdentifier` for AT Protocol identifiers, `AppConfiguration`, `LiveStream`/`Video` data models, `LiveStreamRepository` with paginated fetching, `StreamplaceNode` abstraction, and detail/row views for both content types. `a8ac699` completed viewer discovery and native playback in the next commit (+1947 lines): `LivePlaybackURLProvider`/`VideoPlaybackURLProvider` resolve Streamplace playback URLs, `NativePlaybackView` handles AVKit integration, and 12 test files cover the repository and model layers.

### creator profiles and search

Creator profiles shipped across four commits. `c5e5e94` added `AuthorProfileView` and `AuthorProfileLink` with navigation from live streams, videos, and detail views. `4ad20a5` hydrated profiles with `ActorProfileRepository` and `ActorProfileModel`, resolving Bluesky actor metadata (+564 lines, 3 test files). Profile views were progressively enriched: website/pronouns, starter pack metadata, account labels, status and verification, created date, pinned post, and indexed date — each commit adding fields to the repository and view while extending the test suite.

`b8f3136` added `ActorSearchRepository`/`ActorSearchModel`/`ActorSearchView` with a search tab (+471 lines), and `ac0180b` added `ShareURLProvider` for canonical Streamplace link sharing across all views.

### video playback and metadata

Video playback was extended with resilient native playback (`ff81665`, +335 lines), record thumbnails resolved from AT Protocol blob CIDs (`0523612`), published video metadata display (`82b770e`, +339 lines covering `StreamplaceRecordMetadata`, `StreamMetadataView`, and live-stream tags/activity), and video description facets rendered through a new `StreamplaceRichText`/`StreamplaceRichTextView` pair (`aee7b2a`, +479 lines).

### node settings and dependency injection

`beefa68` added `StreamplaceNodeSettingsModel` for persisted Streamplace node configuration. `35900ac` wired dependency recomposition when the node changes — `AppDependencyBuilder` rebuilds the entire dependency graph when the user switches nodes, with `RootTabView` and `StreemskleApp` recomposing accordingly. Tests cover persisted node composition and builder correctness.
