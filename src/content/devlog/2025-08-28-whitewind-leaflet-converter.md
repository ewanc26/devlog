---
title: WhiteWind to Leaflet Converter
description: Built a conversion tool to migrate blog content between AT Protocol publishing platforms — out of spite for the lack of one.
date: 2025-10-15T20:07:36Z
tags: [atproto, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55ekdor2g"
---

## blog platform converter

Built a tool to convert WhiteWind blog posts to Leaflet format. Both are AT Protocol publishing platforms, but there was no migration path between them — you were stuck manually copy-pasting and reformatting. The converter reads WhiteWind records from the PDS, transforms the content structure to match Leaflet's schema, and republishes. Built out of frustration that nobody had solved this in an ecosystem that claims to be about data portability. This later became the basis for the full Leaflet migration.
