---
title: "Website: Support modal spun out to its own page"
description: "Moved the support modal from a footer overlay to a standalone /support route, matching the site's page pattern."
date: 2026-05-08T21:43:13Z
tags: [website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55avucy2v"
---

The support modal in the website footer is now a proper page at `/support`. FooterDonations simplified to a plain anchor — no more modal state management.

Also: scroll-to-top button moved to the right side and raised above the footer, fixed MetaTags to use `createDynamicSiteMeta` + `MetaTags` like all other pages.

**Changes:**
- New route: `/support` — full support UI (fiat/crypto tabs, QR codes, copy address)
- `FooterDonations` simplified to an anchor tag
- `ScrollToTop` button: `bottom-8 left-8` → `bottom-24 right-8` so footer doesn't cover it
- `website` bumped: `11.11.0` → `11.11.1`

Part of the @ewanc26/pkgs monorepo.
