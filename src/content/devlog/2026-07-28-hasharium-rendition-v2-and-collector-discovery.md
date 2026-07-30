---
title: Hasharium adds a second generator rendition and collector discovery
description: A new hash-seeded generator variant joins the original as a selectable rendition, verified collector discovery surfaces who else collected a specimen, and a SEO/accessibility pass closes out the window.
date: 2026-07-28T09:34:00Z
tags: [hasharium, atproto, generative]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuba3fe2f"
---

## Hasharium

### sha256-radial-v2

A second generator rendition, `sha256-radial-v2`: a hash-seeded xorshift128 PRNG driving wider variety — symmetry 3–11, layers 2–6, eight extra palettes, per-petal pinch and wobble, free rotation. The original rendition (v1) is kept intact as a frozen compatibility contract, and OG images stay pinned to it so cached social cards don't change out from under existing links. The active rendition version now shows on the specimen label.

### collector discovery

For an observed DID, Hasharium now queries Constellation for candidate `collection.entry` records pointing at it, verifies each through Slingshot before showing it, and deduplicates by curator — surfacing who else has collected the same specimen, verified rather than trusted at face value.

### infrastructure fixes

Fixed Vercel's static output configuration and clean-URL serving for prerendered routes, fixed duplicate OG cache directives, and adjusted to Vercel's actual fetch/function URL signatures.

### seo and accessibility

Canonical URLs and `og:url` added to every page; the OAuth callback route is now marked `noindex,follow` and disallowed in `robots.txt` so it stays out of search results without breaking the OAuth flow itself. The study-tray dialog now traps focus properly instead of leaking it to background content, and the specimen-generation scroll animation now respects `prefers-reduced-motion`.
