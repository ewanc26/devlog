---
title: Website — OG Images, Work Page, GitHub Integration
description: Dynamic OG image generation, Sifa professional profile on /work, and live GitHub contribution graph.
date: 2026-03-20
tags: [feature, webdev, atproto]
draft: false
---

## Dynamic OG images

Integrated `@ewanc26/og` for server-side OG image generation on every route. Each page renders its own `MetaTags` component with route-specific titles and descriptions. Fonts are embedded as base64 in the OG package for serverless compatibility — no CDN dependency at render time.

## /work route

Added a `/work` route displaying Sifa professional profile data pulled from the PDS. Supports all Sifa lexicon types: education, certifications, skills, external accounts, and projects. The GitHub profile page shows a live contribution graph.

## Fediverse integration

Added webfinger well-known routes, fediverse creator metatags, and dynamic `@ewancroft.uk@ewancroft.uk` resolution. The site now properly identifies as a fediverse actor for Mastodon/AT Protocol cross-visibility.

## Self-hosted Inter

Replaced Google Fonts Inter with a self-hosted variable font file for performance and privacy.
