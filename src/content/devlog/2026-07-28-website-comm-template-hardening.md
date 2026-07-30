---
title: website-comm-template unbreaks install and closes a header-injection hole
description: Fixed a broken pnpm install and a no-op Prettier config, then shipped real SEO routes and fixed an email header-injection and unsafe social-link bug in the contact form.
date: 2026-07-28T10:36:00Z
tags: [website-comm-template, tooling, security, a11y]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuauq4e2f"
---

## website-comm-template

A cluster of fixes, in dependency order: the template couldn't be installed, then couldn't be formatted, then had a real security hole in its one dynamic feature.

### build and tooling

- `pnpm-workspace.yaml` still had the literal placeholder text `"set this to true or false"` where a boolean belonged — pnpm 11 rejected it outright, breaking `install`/`check`/`build` for anyone who cloned the template. Resolved to `true` (esbuild needs its native postinstall).
- `.prettierrc` was JSON prefixed with `//` comments — valid in neither JSON nor YAML, so Prettier silently fell back to defaults (or aborted), quietly breaking the pre-commit hook too. Rewritten as YAML with the same options.

### seo

- `robots.txt` and `sitemap.xml` converted from static files to routes so they can resolve an absolute origin from `PUBLIC_SITE_URL`. Added a placeholder favicon (previously 404'd). `SETUP.md` now lists replacing the favicon and setting the site origin as commissioning steps.

### security and accessibility

- The contact form's `Subject` header was built from the unnormalized submitted name — a newline let an attacker inject arbitrary headers. Control characters are now stripped, and sending validates its own config instead of silently attempting a send with leftover placeholder values (API key, template addresses). Footer social links are now restricted to http(s) instead of rendering whatever string was configured, closing a `javascript:`-href path. The rate limiter's map now prunes expired entries with a hard ceiling instead of growing unbounded.
- Mobile nav toggle now sets `aria-expanded`/`aria-controls` with a proper label; the panel closes on navigation, Escape, and outside click. Contact form validation and status messages are now announced.
