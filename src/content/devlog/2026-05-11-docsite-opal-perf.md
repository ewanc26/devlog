---
title: "Docsite: Opal docs, client bundle perf, devlog sidebar"
description: "Added Opal documentation, eliminated 1.3MB client bundle from markdown/atproto deps, and added devlog link to sidebar"
date: 2026-05-11T04:00:00Z
tags: [atproto, website, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlkvmvx6xx2y"
---

Added Opal documentation page with atUri frontmatter. Eliminated a 1.3MB client bundle by removing markdown and AT Protocol dependencies from the client-side code — these were only needed server-side for content rendering. Added devlog link to the sidebar navigation.

Also added and then reverted a Sequoia documentation page — docsite is for own projects only, not third-party tools.
