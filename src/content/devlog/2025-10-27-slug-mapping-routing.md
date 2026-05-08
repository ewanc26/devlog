---
title: Website — Slug Mapping and Robust Routing
description: Configurable slug-to-publication mapping and slug param matcher for clean URLs.
date: 2025-10-27
tags: [atproto, website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni4oelv2g"
---

## Slug mapping

Added a configurable slug-to-publication mapping system. Publications can now be accessed via human-readable slugs that map to AT Protocol rkeys. Slugs are normalised and extracted to a data module.

## Robust routing

Added a slug param matcher and global error page for robust routing. Invalid slugs and missing publications now get proper error pages instead of 500s.
