---
title: A /memory route and fediverse presence for the FAOL website
description: Added a GitHub commit timeline to the FAOL website, plus an llms.txt file, RSS feed fixes, fediverse integration, and layout refinements.
date: 2026-05-14T12:00:00Z
tags: [faol, website, github]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwpmg42g"
---

## the /memory route

The FAOL (Faerie's Acolyte Online) website got a new `/memory` route — a chronological timeline of GitHub commits pulled from the public API. Each entry shows the repository, commit message, and timestamp, creating a living archive of development activity across projects.

The route serves as a public-facing development journal: instead of writing separate changelogs, the commit history becomes the changelog, automatically updated. It's a lightweight alternative to a full activity feed — no database, no cron jobs, just a SvelteKit server-side fetch to the GitHub API with a reasonable cache duration.

## supporting infrastructure

- **`llms.txt`** — an [`llms.txt`](https://llmstxt.org/) file at the site root, giving AI crawlers structured access to the site's key pages. This is part of a broader experiment with making personal websites machine-readable without sacrificing human readability.
- **RSS feed fix** — the RSS feed was missing the proper discovery `<link>` tag in the `<head>`, so feed readers couldn't auto-discover it. Fixed with the standard `<link rel="alternate" type="application/rss+xml">` element.
- **Fediverse presence** — the about page now links to the FAOL Mastodon account and displays recent fediverse activity.

## layout improvements

The site layout was centred (previously left-aligned at larger viewports), giving it a more focused reading experience. The blog post sidebar was added, showing related posts and a table of contents for longer entries.
