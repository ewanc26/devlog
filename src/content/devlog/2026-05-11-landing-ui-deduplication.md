---
title: "Removed analytics references and duplicate links across landing-ui projects"
description: "Replaced analytics taglines, removed duplicate footers from LandingPage and all about pages, deduplicated Tourmaline header navLinks"
date: 2026-05-11T12:48:00Z
tags: [pkgs, tourmaline, typescript, svelte]
draft: false
---

**Analytics references removed.** Footer taglines in malachite-web and opal-web changed from "privacy-first analytics" to "privacy-first scrobble import" and "privacy-first social import" respectively. Neither tool does analytics.

**Duplicate links removed.** LandingPage had its own footer (About & privacy, GitHub, Support) that overlapped with LandingLayout's footer (Source, Privacy, copyright). Removed the LandingPage footer entirely -- LandingLayout already provides these links. Similarly removed duplicate footers from all about pages (tourmaline, malachite, opal, bismuth) since they also linked to GitHub and Support, which LandingLayout's Source and Privacy links already cover.

**Tourmaline header deduplicated.** Removed the GitHub navLink from the header since the footer Source link and the hero View on GitHub CTA both point to the same repo. Header now only has the About link.

**LandingPage cleanup.** Removed `aboutHref` prop and `ExternalLink`/`Heart` icon imports that were only used by the removed footer. `githubUrl` prop retained -- it's still used for the hero CTA button.
