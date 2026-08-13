---
title: Inkwell reaches standard.horse content parity and ships on AltStore
description: Since launch, inkwell added pub.leaflet.comment support, all 18 Leaflet block types, Constellation-backed cross-repo discovery, and fixed PDS resolution for DIDs — then shipped a real AltStore sideloading source with a signed IPA.
date: 2026-08-12T14:44:39Z
tags: [inkwell, atproto, ios, swift]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24dwuk2l"
---

## inkwell

Since the app-launch post, inkwell's work split between deepening interoperability with the standard.site/Leaflet content ecosystem and getting the app into people's hands outside the App Store.

### standard.horse content parity

`ContentProvider.swift`'s `LeafletProvider` was brought to full parity with `standard.horse`'s markdown conversion. A `lossLabels` map now reports _which_ Leaflet block types can't round-trip to markdown — embeds, website cards, Bluesky posts, linked posts, sub-pages, polls, buttons, post lists, signup forms — using the same human-readable labels standard.horse's `LOSS_LABELS` uses, instead of a generic "an unsupported block" message. Math code blocks (` ```math `) now convert to `pub.leaflet.blocks.math` with a `tex` field rather than falling through to a plain code block, and empty image blocks (no blob CID) are dropped instead of rendering as broken images.

`pub.leaflet.comment` support landed as a new lexicon type (`SiteStandardComment.swift`) with full CRUD: `fetchComments(documentURI:)` lists all comment records referencing a document as `subject`, sorted newest first; `createComment` supports optional `replyTo` and `onPage` fields for threaded, page-anchored comments; `deleteComment` removes by record key. `ReadView` gained comment UI in the same push, alongside `blobPages` support for pages loaded from blobs rather than inline records.

Separately, all 18 Leaflet block types were added to both the data model (`LeafletContent.swift`) and the reader (`ReadView.swift`): `bskyPost`, `standardSitePost`, `website`, `button`, `postsList`, `signup`, `poll`, `page`, and `iframe` each got dedicated renderers (several as placeholders) rather than falling into the generic "unsupported block" fallback.

### a personality pass that broke touch input

A pass to "give Inkwell personality" added motion, haptics, a custom `InkwellLoader`, and header fade-slide transitions to `ReadView`. It surfaced a bug where buttons at the top of the screen became unpressable while viewing a document, and stayed unpressable after navigating away. Chasing it took several commits: stripping live embed views, reverting the loader back to `ProgressView`, removing the `VStack`/header animations, and finally removing the `ConditionalHaptic` modifiers and `animate` parameter from `ReaderActionPill`. By the end, `ReadView` was back to its pre-personality state, with only logging and the new block-type renderers surviving. The root causes turned out to be a `Color.ignoresSafeArea` splash view intercepting touches at 0 opacity, a `toolbarBackground` blending the back button into publication theme colors, a stray `buttonStyle(.plain)` on a feed `NavigationLink`, and a tint `accentColor` left on `ReadView`'s `ScrollView`.

### pds and did resolution fixes

`repositoryPDSURL()` was calling `resolver.resolveHandle()` with a DID (e.g. `did:plc:abc123`) when that resolver expects a handle. For DIDs, the fix fetches the PLC directory document directly (`https://plc.directory/<did>`) and reads the `AtprotoPersonalDataServer` service's `serviceEndpoint` instead. The same commit invalidates the cached subscriptions list on create and delete so new Discover subscriptions show up immediately rather than waiting for the next full refresh.

### reader discovery and profiles

`BrowseDocumentsView` now resolves Bluesky profiles for the DIDs behind each subscription concurrently (`resolveProfiles(dids:)`), attaching an `authorProfile` to each `ReaderFeedItem` so following-feed cards can show a real display name and avatar instead of a bare DID. A larger pass the same week ("replicate leaflet.pub reader features") added pagination with prev/next navigation, more block embed types, and cross-repo discovery via `ConstellationClient.swift` — a new client for microcosm.blue's Constellation index, used to find comments and related records that live outside a document's own repo. App Intents (`InkwellIntents.swift`) and a tab-selection binding were added alongside retry logic in `LoginStateManager`.

App Store submission readiness work landed the same week: `PrivacyInfo.xcprivacy` now declares collection of a linked user ID and name (both scoped to app functionality, not tracking), `LoginView` gained an onboarding pass, and `Info.plist` picked up additional required keys.

### AltStore distribution

An `altstore/` directory was added with a `source.json` listing and setup docs for distributing inkwell via AltStore Classic sideloading, as an alternative to the App Store. The initial listing shipped with a placeholder `size: 0` and no icon. Months later, both were filled in for real: `altstore/icon.png` is a 1024x1024 flat render of the app's letter-and-drop icon mark (composited from the `dot.svg`/`letter.svg` Icon Composer layers, using the light-appearance fill colors — black letter, the Display P3 green converted to sRGB for the drop — on a white background), and `source.json`'s `size` field was updated to the real exported IPA byte count, `6982403`, from a development-signed export of the app archive.

`SupportView.swift` was updated to match: the header comment claiming StoreKit 2 `ProductView` was wired up was stale (it was never implemented), so the comment now correctly describes the tip jar as external links only, since AltStore distribution has no App Store billing to hook into. The Ko-fi link got a suggested one-off amount (`?amount=2.99`, "Buy me a tea — £2.99 suggested"), and the Monero/Ethereum/Bitcoin donation address rows were removed entirely, leaving Ko-fi and GitHub Sponsors as the only tip options.

The icon and README wording were finished off in parallel on two branches. `work/altstore-fdroid` (merged first, as PR #2) added the signed-IPA and real `source.json` work along with its own icon render. A separate Claude-authored branch (`claude/altstore-listing-inkwell-d6m5l9`, merged as PR #1) independently added its own icon — its commit message notes the listing previously had a placeholder `iconURL` — plus a tightened `altstore/README.md`. Merging PR #1 on top of #2 hit a conflict on `altstore/icon.png`, resolved in favor of the Claude branch's render (8752 bytes vs. 8544).
