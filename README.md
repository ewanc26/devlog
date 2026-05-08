# devlog

Changelog and devlog for ewan's projects. Published at [devlog.croft.click](https://devlog.croft.click).

---

## Stack

- [SvelteKit](https://svelte.dev) + [Svelte 5](https://svelte-5.preview.vercel.app)
- [Tailwind CSS 4](https://tailwindcss.com) + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- [unified](https://unifiedjs.com) (remark + rehype) for markdown
- [Sequoia](https://sequoia.pub) for AT Protocol publishing
- [Vercel](https://vercel.com) for deployment

---

## Structure

```
src/
├── content/devlog/     # markdown entries (frontmatter + prose)
├── lib/
│   ├── components/     # Header, Footer, Tag, Timeline, TableOfContents
│   ├── posts.ts        # post loading, types, path building
│   ├── date.ts         # date formatting
│   ├── markdown.ts     # markdown rendering, ToC extraction
│   └── tags.ts         # dynamic hash-based tag colours
└── routes/
    ├── css/            # tokens, base, timeline, tag, prose
    ├── layout.css      # imports only
    ├── +page.svelte    # timeline index
    ├── [...path]/      # individual entry pages
    └── rss.xml/        # RSS feed
```

---

## Entry format

```markdown
---
title: Entry Title
description: One-line summary.
date: 2026-05-08
tags: [website, tooling]
---

Prose content here.
```

Tags get dynamic colours derived from their name via FNV-1a hash — no manual registration needed.

---

## URLs

Entries use date-based paths: `/YYYY/MM/DD/slug`. The `stripDatePrefix` option in `sequoia.json` strips the `YYYY-MM-DD-` prefix from filenames so URLs stay clean.

---

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm preview      # preview production build
sequoia publish   # publish entries to AT Protocol PDS
```

---

## Publishing

Entries are published to [eurosky.social](https://eurosky.social) via Sequoia using the `site.standard.document` lexicon. The devlog site at [devlog.croft.click](https://devlog.croft.click) is the web frontend for those records.

---

License: AGPL-3.0-only
