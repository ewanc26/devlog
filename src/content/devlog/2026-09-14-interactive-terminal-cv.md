---
title: interactive terminal CV at /cv
description: Added a content-negotiated /cv route serving the same AT Protocol records as /about — browsers get a styled landing page, curl gets a self-contained interactive bash script. Menu-driven, plain-text fallback when piped, carries the site's terminal design language.
date: 2026-09-14T21:43:00Z
tags: [website, cv, terminal, atproto, sifa]
draft: false
---

## website

### /cv — interactive terminal CV

Added a new route at `/cv` that serves the same AT Protocol records as `/about`, tailored into CV form. Content negotiation:

- **browsers** (Accept: text/html) get a terminal-styled landing page showing the curl command, using the site's design language (dark surface, green accent, JetBrains Mono, prompt-style headers)
- **curl/wget/httpie** get a self-contained interactive bash script

The script aggregates live from SIFA records (skills, education, languages, projects, external accounts) via `@ewanc26/atproto` fetchers, blended with tailored constants for the things that don't exist as records (summary, methodology, selected infrastructure, experience). Menu-driven, reads from `/dev/tty`, plain-text fallback when piped. Tested with bash 3.2 (macOS) — single quotes escaped as `'\''` for the heredoc-in-`$()` bug.

Location: `src/routes/cv/+server.ts`, `src/lib/server/cv/`
