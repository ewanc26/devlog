---
title: "Malachite: ATProto OAuth CLI and did:web Support"
date: 2026-06-06
description: Malachite gains OAuth-based CLI authentication for ATProto and did:web DID resolution, alongside a restructured web frontend.
tags: [malachite, atproto, pkgs, authentication]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlen2qhzrt2s"
---

### OAuth CLI authentication

Malachite's CLI now uses ATProto OAuth rather than app passwords. App passwords work, but they're a stopgap — rough-edged, not scoped, and increasingly at odds with where the protocol is heading. The OAuth flow is browser-based: the CLI opens a local callback server, launches the authorization URL, and exchanges the code on return. Credentials persist in the OS keychain.

The main friction was DPoP — the AT Protocol requires it for OAuth, and implementing the proof-of-possession header correctly took longer than the rest of the flow combined. Got there eventually.

### `did:web` resolution

Added `did:web` support to the DID resolver alongside the existing `did:plc` path. Any identity hosted outside the PLC directory — including `did:web` identities — would previously fail silently. The resolver now checks the method prefix and fetches `/.well-known/did.json` accordingly. Consistent with what I've since applied to the main website's `resolveDid` utility.

### web frontend

Restructured the SvelteKit frontend at [malachite.croft.click](https://malachite.croft.click). The old layout was functional but the navigation became unwieldy as more services were added. Now uses a sidebar with a cleaner service-selector for the import flow. The underlying logic is unchanged — just more room to breathe.
