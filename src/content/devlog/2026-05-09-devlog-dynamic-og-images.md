---
title: "devlog: Dynamic OG image generation with @ewanc26/og"
description: "Each devlog post now generates its own OG image on demand using @ewanc26/og — warm amber on dark, with noise texture."
date: 2026-05-09
time: "15:11"
tags: [website, pkgs, tooling]
draft: false
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
