---
title: Website design formalisation and verification badges
description: Wrote DESIGN.md to codify the website's design intent, standardised motion easing, added verification badges with profile cards, and unified the modal architecture.
date: 2026-06-15T12:00:00Z
tags: [website, design-system, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwkbm52p"
---

## design formalisation

The website's design language had been evolving organically — tweaks to typography, spacing experiments, colour adjustments — but there was no single document describing the *intent* behind the design. That changed with [`DESIGN.md`](https://github.com/ewanc26/website/blob/main/DESIGN.md), a design intent document that captures the site's visual philosophy, typographic hierarchy, spacing rhythm, colour semantics, and motion principles.

### what DESIGN.md covers

- **Typographic hierarchy** — the serif stack for headings (custom `@font-face` declarations), the monospace stack for labels and code (JetBrains Mono), and the vertical rhythm that ties them together. Line heights tightened across the board for denser, more intentional reading.
- **Colour semantics** — how semantic tokens map to the seasonal colour system (the Wheel of the Year rotation), with explicit guidance on when to use `--primary` vs `--accent` vs `--muted`.
- **Motion system** — easing curves standardised to `ease-out-quart` for UI transitions, with a defined duration scale (100ms for micro-interactions, 250ms for page transitions, 500ms for ambient animations).
- **Spacing scale** — a base-4 rhythm (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px) applied consistently to padding, gaps, and margins.

### verification badges

A new verification badge system displays standard.site verifications directly on the homepage. Profile cards dynamically render verifier information — who verified this identity, through which service, and when. The modal architecture was unified into a single `BaseModal` component that handles positioning, focus trapping, and animation, reducing duplication across the codebase.

### density and layout

The blog listing got a denser layout with tighter line heights and more entries visible above the fold. About and Meta page copy was refined for clarity. The TOC sidebar scroll behaviour was improved to track reading position more accurately.

These changes moved the website from "looks good" to "has documented intent" — making future design decisions deliberate rather than accidental.
