---
title: "devlog: fix OG metatags"
description: OG image URLs were relative — crawlers need absolute URLs. Index page was also missing an OG image entirely.
date: 2026-05-09T20:00:00Z
tags: [devlog, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlgxemvxhp2k"
---

OG image URLs in both the post page and the index were relative (`/api/og?...`), which crawlers can't resolve. Prefixed with `PUBLIC_SITE_URL` throughout.

The index page had no OG image at all and was using `twitter:card: summary` (small image). Now has a proper image and `summary_large_image` to match the post pages.

Also removed a duplicate pair of `og:image:width` / `og:image:height` tags on the post page.
