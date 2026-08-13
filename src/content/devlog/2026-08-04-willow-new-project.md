---
title: New project — Willow, a native SwiftUI Bluesky client
description: A native SwiftUI Bluesky/AT Protocol client for iOS and macOS from one shared codebase, built on ATProtoKit, with app-password login, a read-only timeline with embeds, and like/repost support landing next.
date: 2026-08-04T04:30:47Z
tags: [willow, atproto, bluesky, ios, macos, swift]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg252vak2l"
---

## Willow

A new project: a native SwiftUI Bluesky/AT Protocol client for iOS and macOS, one shared codebase branching only where the platforms genuinely differ. It started from Xcode's default SwiftData template on 2026-07-30 and has had five days of work since. `ATProtoKit` (the Swift AT Protocol library) does the protocol work; Willow's own code stays in domain types and UI.

### auth and the first timeline

The first real slice: sign in with an app password, and read the home timeline. `ATProtoClient` wraps `ATProtoKit` behind `AuthService` and `TimelineService` protocols, so the rest of the app never touches the SDK directly — it speaks only `Account` and `TimelinePost`. Sessions come from `ATProtoKit`'s session handling; tokens go into the Keychain, with only non-secret restore pointers (handle, PDS URL) kept in `UserDefaults`. `LoginView` takes a handle, an app password, and a PDS host (defaulting to `https://bsky.social`, but not locked to it), and points out explicitly that it wants an app password from Bluesky's settings, not the main account password.

`homeTimeline(cursor:)` calls `app.bsky.feed.getTimeline` and maps the lexicon's `FeedViewPostDefinition` into `TimelinePost`, driving pull-to-refresh and cursor-based paging in `TimelineView`.

### rendering embeds

A following commit added `PostEmbed` and `EmbedView` to map `app.bsky.embed.*` view types into UI: image grids (a single image keeps its own aspect ratio, two to four lay out in a square grid), external link cards, quoted posts, and the `recordWithMedia` combination (a quote with attached media). Unavailable quotes — blocked, deleted, or detached — and any embed type Willow doesn't know about yet (video, galleries) degrade gracefully instead of crashing the row. The layout intentionally follows the patterns in the official `social-app` client rather than inventing new ones.

### the sandbox network gotcha

Once the timeline code was in, requests on macOS just silently failed — the app reported the server wasn't responding when the PDS was fine. The cause was the App Sandbox: outbound connections are blocked by default, and the fix isn't the `Willow.entitlements` file (which isn't wired into the build at all — `CODE_SIGN_ENTITLEMENTS` is unset) but the `ENABLE_OUTGOING_NETWORK_CONNECTIONS` Xcode build setting, under Signing & Capabilities → App Sandbox → Outgoing Connections (Client). Fixed alongside a trim of the entitlements file down to sandbox, network client, and user-selected read-only.

### logging without leaking secrets

Auth and timeline calls in `ATProtoClient` now log through `os.Logger` under the subsystem `uk.ewancroft.Willow` — handles, DIDs, PDS URLs, and error descriptions, never passwords or tokens.

### likes and reposts, in progress

The most recent code adds an `InteractionService` protocol — `like`, `unlike`, `repost`, `removeRepost` — implemented on `ATProtoClient` via `ATProtoBluesky`'s `createLikeRecord`/`createRepostRecord`/`deleteRecord`, each create returning the new record's AT URI so the UI can undo it later. `TimelinePost` is gaining a `cid` field (needed alongside the URI to like or repost a post), viewer-state fields (`likeURI`, `repostURI`, `isLiked`, `isReposted`) meant to update optimistically, and a `webURL` computed property that derives a shareable `bsky.app` link from the handle and the AT URI's record key. This part isn't committed yet — it's the current working state of the tree, wiring the write path in before it reaches the timeline UI.
