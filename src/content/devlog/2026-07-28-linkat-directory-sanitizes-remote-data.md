---
title: linkat-directory sanitizes untrusted AT Protocol data before rendering it
description: Board-card URLs, avatar/banner URLs, and PDS-resolver endpoints were previously rendered or used with no validation at all. All three are now checked before use, alongside a broken-metadata fix and a broken install.
date: 2026-07-28T09:35:00Z
tags: [linkat-directory, atproto, security]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjub2kn42f"
---

## linkat-directory

### the security fix

Nothing rendered from remote AT Protocol data was previously validated. A board card's `url` went straight into an anchor `href` — a `javascript:` or `data:text/html,` value would have worked. Avatar/banner URLs went into `<img src>` and, worse, into an inline CSS `url()`, where a crafted value could break out of the declaration and inject further CSS. The PDS endpoint from the identity resolver was concatenated into fetch targets with no scheme check.

A new `src/lib/utils/untrusted.ts` centralizes the checks: link URLs restricted to http/https/mailto, media to http/https, CSS background URLs scheme-checked and quote-escaped, PDS origin required to be https with no credentials/path/query/fragment. Board records are now parsed defensively too — bounded to 100 cards per board and 500 characters per field, where a missing `record.cards.length` used to throw outright.

### other fixes

- Same `pnpm-workspace.yaml` placeholder-boolean issue that broke `website-comm-template`'s install (pnpm 11 rejected the literal string `"set this to true or false"`) — fixed, and the Vercel adapter runtime pinned to `nodejs22.x`.
- `DynamicHead` destructured `$props()` at the top level to build its metadata fallback chain — in Svelte 5 runes mode this only captures the initial value, so title/description/canonical URL never updated after the first page load. Rewritten with `$derived`.
- Added `robots.txt`/`sitemap.xml` (self-hosted directory, so absolute URLs derive from `PUBLIC_ORIGIN`), removed a never-filled-in placeholder `<meta name="author">`, and stopped a malformed `localStorage` cache entry from breaking the whole profile load.
