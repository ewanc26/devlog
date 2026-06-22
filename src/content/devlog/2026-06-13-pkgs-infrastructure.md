---
title: ListenBrainz support and OG image caching in pkgs
description: Added ListenBrainz as a malachite import source (community contribution), integrated Vercel Blob for OG image caching, and added a documentation OG template.
date: 2026-06-13T12:00:00Z
tags: [pkgs, malachite, og-images, infrastructure]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwlmie2g"
---

## listenbrainz integration

Malachite gained a new import source: [ListenBrainz](https://listenbrainz.org). Contributed by [shahoob](https://github.com/shahoob), this adds support for importing listening history from the open-source music tracking platform.

The integration includes:

- A ListenBrainz record interface mapping to malachite's internal play record format
- MBID (MusicBrainz Identifier) handling for rich metadata linking
- A dedicated record converter that normalises ListenBrainz JSON exports into the standard malachite ingestion pipeline
- Updated Teal lexicons to accommodate the new source's data shape

This expands malachite's scope beyond commercial platforms (Last.fm, Spotify, Apple Music, YouTube Music) into the open-source music ecosystem. The architecture keeps the conversion logic isolated — each service gets its own converter module that implements a shared interface, so adding a new source is a matter of writing one new file and registering it in the barrel export.

The contribution was made as a feature branch merge into the monorepo, preserving full commit history and proper co-author attribution.

## og image caching with vercel blob

The shared OG image infrastructure across all pkgs tools got two improvements:

**Vercel Blob caching.** Dynamic OG images are now cached in Vercel Blob storage. On the first request, the image is generated and stored; subsequent requests serve the cached version. This reduces cold-start latency (no need to re-render the SvelteKit function and load fonts on every request) and cuts Vercel function execution costs.

**Documentation OG template.** A new `documentationTemplate` was added to the built-in OG template library, joining the existing blog, project, and generic templates. This gives docsite and similar documentation pages proper social preview images with a document-specific layout.

### noise memoization

The noise texture generator got memoization for its background patterns. Previously, every OG image generation call created new noise textures from scratch — now they reuse cached textures when the parameters match, saving several hundred milliseconds per render.
