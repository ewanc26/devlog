---
title: "Cross-references and unified support links"
description: "Added More tools sections linking each project to the other four, and pointed all support links to ewancroft.uk/support"
date: 2026-05-10T12:40:00Z
tags: [atproto, pkgs, website, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlj4ub26up2i"
---

Added a "More tools" section to each of the five projects (malachite, opal, jasper, bismuth, tourmaline) linking to the other four. The four monorepo projects use a new `siblings` prop on the landing-ui `LandingPage` component. Tourmaline has its own inline implementation matching the same card style.

Replaced all `ko-fi.com/ewancroft` and `github.com/sponsors/ewanc26` links with `ewancroft.uk/support`. Consolidated the landing-ui hero from two separate buttons (Sponsor + Ko-fi) into a single "Support" button. Removed `target="_blank"` from own-domain links since they're internal navigation.

Also switched tourmaline's "View post" link from bsky.app to aturi.to — universal links that let the viewer pick their preferred ATProto client.
