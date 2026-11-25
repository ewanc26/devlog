---
title: Fathom charts the listening history
description: A cross-platform dashboard over teal.fm history, with OAuth 2.1 and DPoP, statistics and signed release channels.
date: 2026-11-10
tags: [fathom, kotlin-multiplatform, swiftui, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342aqhq2g2e"
---

Fathom started from an existing listening history rather than a blank app. The data was there; what was missing was a way to see it.

- Shared models compute plays and listening statistics once; Compose draws them on Android and SwiftUI on iOS.
- The app reads the whole play history instead of the newest thousand, saves it as it loads, and resumes a refresh from what it has.
- Stats include top tracks and a report of undated plays; the loaded history is searchable and jumps to a month.
- Shared OAuth 2.1 core with DPoP signing, secure credential storage and sign-in sequencing on both platforms.
- Signed artifacts are published from version tags, with provenance attestation.
- Release channels include AltStore Classic and F-Droid, with AltStore downloads verified by bytes and hash.

Two platforms, one statistics layer. The interesting engineering is in the seam between them, not in either screen.
