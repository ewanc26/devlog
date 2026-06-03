---
title: "Tourmaline folded into pkgs monorepo, landing-ui improvements"
description: "Moved Tourmaline from standalone repo into packages/tourmaline, enhanced landing-ui with backdrop blur, nav links, snippet props, and fixed source URLs across all projects"
date: 2026-05-11T12:36:00Z
tags: [atproto, pkgs, tourmaline, typescript, svelte]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf557h5yz2g"
---

**Tourmaline into the monorepo.** Moved from `github.com/ewanc26/tourmaline` to `packages/tourmaline` in the pkgs monorepo. Added `@ewanc26/landing-ui` and `@ewanc26/noise-avatar` as workspace dependencies. Removed `.git`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` from the package. Updated all GitHub links to point to the monorepo path (`pkgs/tree/main/packages/tourmaline`), including the MusicBrainz user agent string.

**LandingLayout improvements.** Added backdrop-blur to the sticky header (`color-mix` at 90% opacity + `backdrop-filter: blur(8px)`). Added optional `navLinks` prop for header navigation (Tourmaline passes About and GitHub). Made `webVersion`/`cliVersion` optional -- when absent, the version strip is hidden. Header right side now stacks nav links and version strip side by side.

**LandingPage snippet props.** Added optional `heroAction` and `ctaAction` snippet props. When provided, they replace the default hero CTA buttons and bottom CTA section respectively. Tourmaline passes its search form with Bluesky actor autocomplete as both `heroAction` and `ctaAction`. Made `ctaHref`, `ctaLabel`, `ctaSub`, and `githubUrl` optional so projects without a CLI pair (like Tourmaline) can omit them. Changed `FeatureIcon` type to `import('svelte').Component | string` to accept lucide icons from any version.

**Fixed source URLs.** `footerSourceUrl` in malachite-web, jasper-web, and bismuth-web now point to the correct subpath in the monorepo (`pkgs/tree/main/packages/<name>`). Opal was already correct.
