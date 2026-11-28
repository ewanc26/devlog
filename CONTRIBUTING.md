# Contributing to devlog

Changelog and devlog for ewan's projects, published at [devlog.croft.click](https://devlog.croft.click). Thanks for wanting to help!

SvelteKit + Svelte 5, Tailwind CSS 4, unified (remark + rehype) for Markdown, [Sequoia](https://sequoia.pub) for AT Protocol publishing, Vercel for deployment.

## Entries

Entries are Markdown files in `src/content/devlog/` with frontmatter:

```markdown
---
title: Entry Title
description: One-line summary.
date: 2026-05-08
tags: [website, tooling]
---

Prose content here.
```

- URLs are date-based (`/YYYY/MM/DD/slug`); the `stripDatePrefix` option in `sequoia.json` strips the date prefix from filenames so URLs stay clean. Don't rename existing files — their URLs are published.
- Tags get hash-derived colours (`tags.ts`); no registration step.
- Headings drive the per-entry table of contents.

## Commands

```bash
pnpm dev
pnpm build
pnpm preview
```

## Publishing

Entries publish to AT Protocol via Sequoia (`site.standard.document`) and the devlog site renders those records; `sequoia publish` is a maintainer step after merge. PRs change the site and entries, not the network.

## Notes

- Fix prose typos in the Markdown source, not in generated output.
- Keep one entry's timestamp stable once published (it's also the URL).
- Conventional commits (`docs:` for entries); short, focused PRs.
- AI-assisted PRs welcome; stand behind every line and verify the site builds.

## Licence

AGPL-3.0-only. Contributions accepted under the same terms. Write access note: this is a personal devlog, so contributions are fixes and corrections only.
