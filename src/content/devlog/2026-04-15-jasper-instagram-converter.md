---
title: Jasper — Instagram to Grain/Spark Converter
description: Full OAuth implementation, web UI, Spark story and video support, and gallery-based import workflow for the Instagram migration tool.
date: 2026-04-15
tags: [atproto, feature, oauth]
draft: false
---

## @ewanc26/jasper

Built a complete Instagram → Grain/Spark converter with proper AT Protocol OAuth using `NodeOAuthClient`. The CLI handles interactive import with structured logging, and the web UI (`@ewanc26/jasper-web`) provides a browser-based gallery selection and batch import flow.

### Spark support

Added Spark story and video import alongside the existing Grain photo flow. The OAuth scopes now include gallery and gallery item permissions. Spark collections are declared in the client metadata.

### Web UI

The web interface supports gallery-based photo selection, orphan organization, batch limits, and alt text overrides. Rate-limited publishing prevents hitting PDS limits on large imports. Daily chunking with resumable imports handles large Instagram exports that would otherwise time out.

### Other improvements

- Profile information fetched and displayed on OAuth sign-in
- Version derived from package.json instead of hardcoding
- `@ewanc26/tid` used for TID-based rkey generation
- Facet trimming for leading/trailing spaces in inline marker spans
