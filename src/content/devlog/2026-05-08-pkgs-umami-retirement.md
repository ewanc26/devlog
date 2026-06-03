---
title: "pkgs: Remove Umami analytics from all packages"
description: "Umami analytics retired — all Umami script tags removed from bismuth-web, malachite-web, jasper-web, opal-web, and croft-click."
date: 2026-05-08T15:17:32Z
tags: [tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55ayvxy2v"
---

Umami analytics retired — the server laptop that was running it is no longer in use. Removed the Umami script tag from all web packages in the monorepo:

- `bismuth-web/src/routes/+layout.svelte`
- `malachite-web/src/routes/+layout.svelte`
- `jasper-web/src/routes/+layout.svelte`
- `opal-web/src/routes/+layout.svelte`
- `croft-click/src/routes/+layout.svelte`
- `jasper/PRIVACY.md` (Umami reference in privacy policy)

Part of the @ewanc26/pkgs monorepo.
