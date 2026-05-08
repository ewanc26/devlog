---
title: Caching, Skeleton Loading, and Happy Mac
description: Comprehensive caching to prevent 504s, skeleton loaders for instant page loads, and a Happy Mac easter egg.
date: 2025-12-30
tags: [website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni3vjrr2k"
---

## Caching

Implemented comprehensive caching across all AT Protocol data fetches to prevent 504 timeouts on Vercel serverless functions. Data is cached with appropriate TTLs and revalidated in the background.

## Skeleton loading

Added skeleton loaders for all card components matching the shape and size of their real counterparts.

## Happy Mac

Added a Happy Mac easter egg animation triggered by clicking the profile picture multiple times. Includes an ADSR envelope beep sound.
