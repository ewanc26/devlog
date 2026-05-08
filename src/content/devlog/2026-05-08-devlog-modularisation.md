---
title: Devlog Modularisation
description: Split the monolithic layout.css and inline page logic into focused modules and components.
date: 2026-05-08
tags: [website, tooling]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlenhzl4i72y"
---

## What changed

The devlog had accumulated into a handful of large files — a 221-line CSS monolith, page components with inline header/footer/timeline logic, and a `format.ts` that mixed client-side date formatting with server-only markdown rendering. Time to break it apart.

## CSS split

`layout.css` was doing everything: design tokens, base reset, timeline, tags, prose. Now it's just imports:

```
src/routes/
├── css/
│   ├── tokens.css     # custom properties
│   ├── base.css      # reset, html/body
│   ├── timeline.css   # timeline spine, markers, pulse
│   ├── tag.css       # .tag base styles
│   └── prose.css     # typography, code, links
└── layout.css         # @import only
```

Each file owns one concern. `layout.css` went from 221 lines to 9.

## Component extraction

The page components had header, footer, timeline grouping, and table of contents all inline. Pulled them into `src/lib/components/`:

- **Header.svelte** — logo, back arrow, RSS link, external link
- **Footer.svelte** — sequoia + github links
- **Tag.svelte** — tag span with dynamic hash-based colour
- **Timeline.svelte** — month grouping + entry rendering
- **TimelineEntry.svelte** — single entry (date, title, description, tags)
- **TableOfContents.svelte** — h2/h3 sidebar

The index page went from 73 lines of inline logic to a `<Timeline>` component. The post page went from 59 lines to a clean article + `<TableOfContents>` composition.

## Lib split

`format.ts` mixed two unrelated concerns: `formatDate` (runs in the browser) and `renderMarkdown`/`extractToc` (server-only, depends on unified/remark/rehype). Split into:

- **date.ts** — `formatDate()`
- **markdown.ts** — `remarkStripH1`, `renderMarkdown()`, `extractToc()`, `TocEntry`

## Result

Same output, same CSS bundle size (26.16 KB), cleaner structure. Each file does one thing. Adding a new tag, tweaking the timeline, or changing the prose styling now means editing a single focused file instead of navigating a monolith.
