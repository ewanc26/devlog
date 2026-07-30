---
title: atproto-shortlink closes an open-redirect and header-injection hole
description: Redirect targets sourced from remote blue.linkat.board records were never validated. They're now checked before use, alongside a broken install, a favicon that never resolved, and a run of accessibility fixes.
date: 2026-07-28T09:35:00Z
tags: [atproto-shortlink, atproto, security]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjub5w2m2f"
---

## atproto-shortlink

### the security fix

Redirect targets come from remote `blue.linkat.board` records and were never validated: a `javascript:`/`data:` URL could become a `Location` header, and CR/LF characters in a target opened response-header injection. A new validation module now requires an absolute http(s) target (scheme-less values are upgraded to https), rejects control characters and anything over 2048 characters, and escapes shortcodes before they're interpolated into HTML. Unusable upstream records now respond `502` instead of `404`, and a per-request debug log that printed every URL to the server log was removed.

### other fixes

- `pnpm-workspace.yaml` had the same placeholder-boolean bug that broke several other sites in this fleet this month — fixed, and the project fully consolidated onto pnpm (the tracked `package-lock.json` was removed, since Vercel was nondeterministically picking between the two lockfiles).
- The favicon's no-content handler lived at `/favicon/favicon.ico`, but browsers request `/favicon.ico` directly — moved.
- Accessibility: the QR modal, copy control, and theme toggle all gained proper ARIA labels, pressed/expanded state, and focus management.
- Corrected the README: shortcodes are 10-character mixed-case, not the previously documented 6-character.
