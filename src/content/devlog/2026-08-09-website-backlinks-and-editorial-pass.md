---
title: Canonical ATProto backlinks, a security pass, and a two-month editorial refit
description: "Blog posts now render real backlinks from Constellation, remote AT Protocol URLs are sanitized against javascript:/data: injection, and the homepage/about/blog templates went through a long editorial and accessibility pass. Plus a Zcash address added then removed, a PGP key, and the AGPL."
date: 2026-08-09T18:11:48Z
tags: [website, atproto, sveltekit, security]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtdca22l"
---

## website

Nothing since [the DESIGN.md formalisation post](/devlog/2026-06-13-website-design-formalisation/) got its own writeup, so this covers everything from mid-June to `Add Gaelic name subtitle and footer links` — roughly fifty commits across backlinks, security hardening, and a long-running editorial pass on the homepage/about/blog templates.

### canonical ATProto backlinks

Blog posts render real backlinks now instead of nothing. `fetchBacklinkRefs` in `src/lib/services/atproto/fetch.ts` asks Constellation (`/links/all`) which record fields actually point at a subject, then pages through `blue.microcosm.links.getBacklinks` for each of those exact `collection:path` sources — rather than hardcoding one lexicon/path pair, which would silently miss a rich-embed link. `src/routes/api/backlinks/+server.ts` fronts this: it caps requests to 10 targets of ≤500 chars each, and `isOwnTarget` restricts targets to `at://<own-did>/...` URIs or `https://ewancroft.uk` (and subdomains), so the endpoint can't be used as an open proxy for arbitrary Constellation lookups. Responses cache for 5 minutes (`s-maxage=300, stale-while-revalidate=1800`).

A site-wide avatar modal shows who's linked to a given post — handle, display name, avatar, mention count — sourced from the same endpoint.

### sanitizing untrusted AT Protocol URLs

`Sanitize untrusted AT Protocol URLs and improve modal accessibility` added `src/lib/utils/url.ts`: `safeLinkUrl` and `safeResourceUrl` helpers that parse a candidate URL against an allowlist of schemes (`http:`, `https:`, `mailto:`, `at:` for links; `http:`/`https:` only for image/iframe `src`) and return `undefined` for anything else. Leaflet blocks, facets, publication records, and profile data all come from remote repositories the site doesn't control, and interpolating an unvalidated string into `href`/`src` would let a `javascript:` or `data:` URL execute in the page. The blog post loader now runs the publication's `url` field through `safeResourceUrl` before using it to build an RSS link.

`BaseModal.svelte` was rendered with a plain `open` attribute rather than `showModal()`, so it got neither Escape-to-close nor initial focus from the browser for free. Both were added by hand: an `$effect` focuses the dialog on open, listens for `Escape` to call `onClose`, and restores focus to whatever element had it before the modal opened.

### editorial and layout pass

A long string of `feat(design)`/`fix(design)` commits on 16–17 July reworked the homepage, about, and blog templates: site hierarchy and navigation, responsive content flows, homepage editorial hierarchy, blog archive metadata (denser cards with more context per entry), balanced publication rows, and project provenance labelling on the pinned-repo cards. Smaller fixes rode alongside: post dates kept to one line, Bluesky embed links normalized in `LeafletBskyPost`, and consistent loading states (skeletons rather than layout jumps) added across the homepage, about, blog, and subscriptions routes, followed by a pass animating those async content transitions and page-to-page motion.

A later commit, `Fix editorial-language inconsistencies in nav, footer, and copy buttons`, cleaned up leftovers from that pass: the mobile nav dropdown had lost the primary-accent hover treatment the desktop nav already had; the footer's Bluesky/Eurosky/source links were missing `target="_blank" rel="noopener"` that every other external link on the site carried; and the copy-to-clipboard buttons on `/about` and `/support` didn't announce their "Copied" state change via `aria-live`, unlike `ShareButtons`. `refactor: fluid page gutters; responsive nav/projects; hide empty ToC` and `0451bc3a` rounded this out with fluid gutters and hiding the table-of-contents sidebar when a post has no headings to link to.

### atmosphere: paw trails, moon phases, live seasonal colour

A `WolfPawTrail` component draws a trail of paw prints (geometry adapted from a CC0 Wikimedia SVG) that only appears when wolf mode is toggled on. `moonPhase.ts` gained `getMoonPhaseName` and `getMoonPhaseGeometry` — the latter builds an illuminated-silhouette SVG path for any point in the lunar cycle by combining a fixed circle path with a cosine-scaled terminator curve, used for lunar visuals added alongside a cursor paw trail. `BlogArchiveEggs.svelte` weaves easter eggs into the blog archive, including a Happy Mac icon (CC0/BSD-licensed assets, credited in `static/licenses/`). Separately, `SeasonalThemeUpdater` plus `/api/theme` fixed seasonal colours not refreshing live when the Wheel of the Year rotated mid-session.

`atmentions` (a custom element library) was integrated for AT Protocol reaction display on blog posts, dynamically imported in `AtMentions.svelte` so it doesn't block initial render.

### pinned GitHub repos replace SIFA projects

The homepage and about page's project listings switched from `fetchSifaProjects` (an AT Protocol lexicon-backed source) to `fetchPinnedGitHubProjects`, reading a configurable `GITHUB_USERNAME` (defaulting to `ewanc26`) and an optional `GITHUB_TOKEN` for rate limits. Both `api/home` and `about/+page.server.ts` were updated in the same commit.

### site meta page rewrite

`/site/meta` dropped its ad-hoc inline `Credit`/`TechItem`/`Repository`/`SiteInfo` types in favour of a shared `NormalizedSiteInfo` type from `$lib/services/atproto/siteInfo`, and its section numbering (`[01]`, `[02]`, ...) is now derived from which sections actually have data rather than hardcoded — a site info record missing a privacy statement no longer leaves a numbering gap. A new `src/routes/+layout.server.ts` fetches and normalizes the site info record once at the layout level.

### identity: PGP key and a Gaelic subtitle

The About page's identity section gained a PGP entry alongside DID/handle/PDS: the public key is served verbatim at `/pgp-key.asc`, with its fingerprint shown and copy/download actions next to it. `AGENTS.md` now documents that the file is intentionally public and should only ever be replaced with a new public-key export, never a private key.

The most recent commit, `Add Gaelic name subtitle and footer links`, added "eòghann croit" as a subtitle under the display name on both the homepage hero and the about page, added Ko-fi and GitHub Sponsors links to the footer, and fixed a date-computation bug in the blog post loader — it was deriving a post's year/month/day from the server's local timezone instead of `Europe/London`, which could misfile a post published near midnight.

### support page: Zcash added, then all crypto removed

`feat(support): add Zcash address` added a ZEC entry to the support page's crypto list on 17 July. `Remove cryptocurrency support addresses from support page` deleted the entire crypto-grid section — Bitcoin, Zcash, and its ~150 lines of dedicated CSS — on 28 July, leaving Ko-fi and GitHub Sponsors as the only support routes.

### housekeeping

- `Add GNU Affero General Public License v3` added a full `LICENSE` file, and a separate `docs:` commit added Ko-fi/GitHub Sponsors badges to `README.md`'s new Support section (ahead of the footer links added later).
- `chore(deps): pin dependency ranges instead of floating on latest` replaced every `"latest"` specifier in `package.json` with a caret range pinned to what was already installed — prompted by a sibling package pulling in TypeScript 7, which `svelte-check` 4.x can't load, and breaking the typecheck. The lockfile diff is specifier-only; no resolved versions changed.
- `build(vercel): target Node.js 24 runtime` bumped the deployment runtime in `svelte.config.js`.
- `.claude/skills` moved to the `.agents/skills` convention, with `.factory/skills`, `.opencode/skills`, `.qwen/skills`, and `.rovodev/skills` symlinked to it so the same skill directory serves every agent tool.
- Site version is at 12.10.0.
