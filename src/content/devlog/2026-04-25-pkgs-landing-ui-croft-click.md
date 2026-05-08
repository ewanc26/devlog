---
title: croft.click Landing Page and Shared Landing UI
description: New landing page for croft.click and a shared @ewanc26/landing-ui package consumed by all web packages.
date: 2026-04-25
tags: [feature, webdev, monorepo]
draft: false
---

## @ewanc26/landing-ui

Extracted a shared landing page layout package consumed by `bismuth-web`, `jasper-web`, and `malachite-web`. Provides consistent hero sections, feature cards, and footer patterns across all croft.click subdomains.

## croft.click

Added a landing page at croft.click that lists all projects with logo images and live iframe previews. Project cards show the app running in a preview window. The page is deployed as `@ewanc26/croft-click` in the pkgs monorepo.

## Other monorepo changes

- Modularised croft.click into components
- Added project card preview styles and layout
- Replaced iframes with logo images in project cards (later iteration)
- Added Umami analytics disclosure to all about pages (later removed)
