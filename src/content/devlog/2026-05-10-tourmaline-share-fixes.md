---
title: "Tourmaline share page fixes"
description: "Fixed personality card SVG clipping and switched to aturi.to for post links"
date: 2026-05-10T12:45:00Z
tags: [atproto, pkgs, tooling]
draft: false
---

Fixed the personality card SVG being clipped in the share page preview. The SVG now uses `width="100%"` with `viewBox` only (no fixed height) and `display:block` to prevent inline gaps. Removed `overflow-hidden` from the preview container.

Switched the "View post" link after sharing from `bsky.app/profile/{did}/post/{rkey}` to `aturi.to/{did}/{collection}/{rkey}` — universal links that let the viewer choose their preferred ATProto client rather than hardcoding Bluesky's web app.
