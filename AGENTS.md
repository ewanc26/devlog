# AGENTS.md

Guidance for agents working on `devlog.croft.click`, a SvelteKit 5/Vercel web view and RSS feed for Markdown entries also published to AT Protocol with Sequoia.

## Read First

- Read `PRODUCT.md`, `DESIGN.md`, `README.md`, `sequoia.json`, and the touched source/content. Product tone is terse and factual; the warm amber timeline design is intentional, not a generic blog theme.
- `src/content/devlog/` is the publication corpus. `src/lib/posts.ts` synchronously loads frontmatter at build time, constructs date paths, filters drafts, caches metadata, and sorts newest first.
- `src/lib/markdown.ts` renders GFM through remark/rehype and builds the h2/h3 table of contents. `src/routes/[...path]/` prerenders detail pages; `rss.xml` serializes metadata; `api/og` delegates dynamic images to `@ewanc26/og`.
- `sequoia.json`, `.well-known/site.standard.publication`, and Sequoia's state link the same files to the `site.standard.document` publication. Treat web URLs, AT URIs, and record state as separate but coordinated identities.

## Content and URL Contracts

- Entry filenames should be `YYYY-MM-DD-slug.md`; required frontmatter is `title`, `description`, `date`, and `tags`, with optional `time` and `draft`. The canonical web path is `/YYYY/MM/DD/slug`, with the date prefix stripped from the slug.
- Renaming a file, changing its date, or changing Sequoia's `pathTemplate`/`stripDatePrefix` breaks stable URLs, RSS GUIDs, and possibly publication reconciliation. Add redirects or migration intent when doing so.
- The loader currently defaults malformed/missing fields instead of rejecting them: an empty date can produce `undefined/undefined/undefined/...`, non-array tags can break consumers, and duplicate date/slug paths are not detected. Validate content explicitly when adding tooling.
- `listPosts()` is process-cached. That is fine for a production build, but can make newly added files stale in a long-lived dev process; confirm dev behavior before relying on hot content discovery.
- Do not publish drafts or local notes accidentally. Preserve the user's existing content deletions/edits and do not stage `.env` or `.sequoia-state.json` without explicit publication intent.

## Rendering and Feeds

- Markdown is repository-authored, converted without raw-HTML passthrough, and inserted with `{@html}`. If raw HTML/plugins or remote content are introduced, add an explicit sanitization policy before rendering.
- Keep ToC IDs exactly aligned with `rehype-slug`. The hand-written slug calculation does not fully model duplicate headings or every GitHub-slugger Unicode case, so test those when touching headings.
- RSS currently interpolates titles, descriptions, tags, and URLs without XML escaping. Treat frontmatter as unsafe for XML and do not add `&`, `<`, or similar content without fixing/validating the feed.
- `PUBLIC_SITE_URL` drives OpenGraph URLs while RSS and Sequoia hard-code the production origin. Verify all three together for preview deployments and production.
- Preserve accessibility, reduced-motion behavior, keyboard search/tag controls, responsive 680px layout, readable prose/tables/code, and the design bans in `DESIGN.md`.

## Tooling and Validation

- pnpm is authoritative (`pnpm-lock.yaml` and `pnpm-workspace.yaml` are tracked; there is no npm lockfile). Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm lint`, and `pnpm build`; there is no automated test script.
- Preview the production build and check chronological ordering (including same-day time ordering), draft exclusion, direct/catch-all 404 routes, duplicate headings, code/tables/links, search/tag counts, narrow screens, reduced motion, RSS XML validity, and OG images.
- Before `sequoia publish`, inspect the exact content diff, configured DID/publication URI, `.env` credentials, and Sequoia state. After publication, verify the AT record and corresponding `.well-known`/web canonical link rather than treating a local build as proof.
- Do not commit `node_modules/`, `.svelte-kit/`, `build/`, `dist/`, `.vercel/`, OS files, secrets, or unintended content drafts/deletions.
