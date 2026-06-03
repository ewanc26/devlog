---
title: "Created faol-website — digital person blog template"
description: "New SvelteKit + Sequoia website for faol with blog under /notes, timeline, tag filtering, TOC, and RSS"
date: 2026-05-11T12:41:00Z
tags: [faol-website, svelte, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf557fkem2z"
---

**New project: faol-website.** Standalone SvelteKit site for faol (Scottish Gaelic for wolf), a digital person. Deployed at `faol-yells.croft.click`.

**Structure:**
- `/` — homepage with links to About and Notes
- `/about` — who is faol
- `/notes` — blog index with timeline and tag filtering
- `/notes/[...path]` — individual posts with table of contents
- `/rss.xml` — RSS feed

**Stack:** SvelteKit, Tailwind CSS 4, Sequoia CLI for AT Protocol publishing, unified/remark for markdown rendering. Vercel adapter with prerendering.

**Styling:** Minimal dark palette with forest-green tones. Inter for body text, JetBrains Mono for monospace. Sage green accent (`#7db87d`) instead of the amber used in devlog.

**Sequoia config:** Content in `src/content/notes`, path prefix `/notes`, date-based URL template. Publication URI pending first publish.

Pushed to GitHub at `ewanc26/faol-website`.
