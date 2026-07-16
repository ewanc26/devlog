# AGENTS.md

Guidance for agents working on devlog, a SvelteKit static publishing site whose entries are repository content.

## Structure

- `src/routes/` owns index, entry, and feed/page routing.
- `src/lib/` contains entry loading, metadata, and reusable UI.
- `static/` contains files served unchanged.
- Follow the entry format and URL rules in `README.md`; filenames, dates, slugs, and metadata are publishing contracts.

## Rules

- Use npm and preserve `package-lock.json`.
- Keep content parsing deterministic at build time. Reject or clearly report malformed entries rather than silently omitting them.
- Preserve stable URLs and feed identifiers; changing a slug can break external links and readers.
- Escape or sanitize rendered content according to its trust level.
- Match the existing restrained visual system and maintain responsive, accessible markup.

## Validation

Run `npm run check`, `npm run lint`, and `npm run build`. Preview the production output and verify entry ordering, direct URLs, missing entries, metadata, feed output, code blocks, images, and narrow-screen rendering. Do not commit `.svelte-kit/`, `build/`, or local drafts not intended for publication.
