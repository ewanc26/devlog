---
title: Inkwell — a native iOS AT Protocol client
description: Built an iOS client for AT Protocol with OAuth, standard.site interoperability, reader/writer flows, a subscription system, and a companion marketing website — all in one week.
date: 2026-06-22T16:00:00Z
tags: [inkwell, atproto, ios, swift]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwios725"
---

## inkwell ios app

The inkwell project is a native iOS AT Protocol client built in Swift. It started as an exploration of ATProto's client ecosystem on mobile and grew into a full-featured app with OAuth authentication, standard.site content support, and granular repo/blob scoping.

### oauth and identity

The authentication stack went through several iterations. Initially using a Slingshot-based identity resolution approach, it moved to germ-network OAuth with ATResolve for proper AT Protocol OAuth flows. The final setup uses RFC 8252 redirect URIs with granular OAuth scopes — repo read/write and blob upload — rather than the blanket atproto scope, giving users precise control over what the app can access.

Account persistence landed on June 19, storing session state so users don't need to re-authenticate on every launch. The branded launch screen and dark mode support were polished the same day.

### standard.site integration

The core differentiator is deep integration with the standard.site lexicon. A tolerant record decoder handles gracefully degraded content from the network, while dedicated reader and writer flows let users browse and create standard.site documents directly. The reader supports subscribe, recommend, and discovery patterns with thumbnail previews and overflow guards.

### app design

The markdown renderer switches to theme-driven fonts and colors, adapting to the user's system appearance. Dynamic Type is respected throughout, with overflow guards for edge cases. The tab bar, ReaderTheme, and updated app icon were all in place by June 21. A Swift 6 actor isolation fix hardened the concurrency model.

### companion website

The [inkwell.ewancroft.uk](https://inkwell.ewancroft.uk) marketing site launched alongside the app. Built as a SvelteKit project in the pkgs workspace, it shares the croft.click design language — JetBrains Mono, semantic color tokens, and the custom serif heading stack. It serves as the OAuth metadata endpoint and includes documentation for the app's AT Protocol scopes.
