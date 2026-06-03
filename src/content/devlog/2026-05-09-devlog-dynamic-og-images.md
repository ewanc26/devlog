---
title: "devlog: Dynamic OG image generation with @ewanc26/og"
description: "Each devlog post now generates its own OG image on demand using @ewanc26/og — warm amber on dark, with noise texture."
date: 2026-05-08T23:20:28Z
tags: [website, pkgs, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55aqrbp2g"
---

Each devlog post now generates its own OpenGraph image on demand at `/og`. OG images are served as PNG with 24-hour cache headers, generated using `@ewanc26/og` with the devlog colour palette (warm amber `#e2a93b` on dark `#1a1816`).

Each post page now injects:

- `og:image` — the generated image URL
- `og:type` — `article`
- `twitter:card` — `summary_large_image`
- `twitter:image` — the generated image URL

**Endpoint:** `GET /og?title=<title>&description=<description>`

Built with `@ewanc26/og`, which uses Satori for JSX-to-SVG and resvg-js for SVG-to-PNG rendering.

Part of the @ewanc26/pkgs monorepo.
