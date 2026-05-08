---
title: Website — OG Images, Work Page, GitHub Integration
description: Dynamic OG images, /work route for Sifa professional profile, and GitHub metadata integration.
date: 2026-03-20
tags: [website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlefp32d4r2k"
---

## OG images

Added dynamic OG image generation using `@ewanc26/og` with font fallbacks.

## Work page

Added a `/work` route displaying Sifa professional profile data from AT Protocol lexicons. Supports all Sifa profile lexicons.

## GitHub integration

Added `@ewanc26/github-metadata` for fetching repository metadata. Replaced local implementations with `@ewanc26` package re-exports.
