# devlog.croft.click

## Users

Ewan. Just Ewan. This is a personal changelog — a record of what changed across his projects, written by his agent as part of the normal development workflow. Secondary audience: anyone curious about what's being built and shipped.

## Product Purpose

A living changelog. Every meaningful change to a project gets a devlog entry: features shipped, bugs fixed, infrastructure changed, configs updated. Not a blog — no editorialising, no hot takes. Just what changed, when, and why.

Entries are written automatically by the agent as part of the git commit and push workflow. The site itself is published to AT Protocol via Sequoia, making every entry a `site.standard.document` record on the network.

## Brand

**Register:** brand. The design IS the product — a changelog should feel like a changelog, not a blog wearing a changelog costume.

**Tone:** Factual, terse, specific. Commit messages, not essays. "Added split DNS toggle to nix-config" not "We're excited to announce a new networking feature."

**Identity:** This is ewan's devlog. It lives at devlog.croft.click. It should feel like a ship's log or a lab notebook — a record of events, not a marketing page. Warm, specific, human, but not chatty.

**Anti-references:**
- Not a generic dark dev tools dashboard (dark blue + neon)
- Not a SaaS changelog (cards with emoji headers)
- Not a blog with a timeline skin
- Not the docsite's terminal aesthetic (that's already taken)
- Not Linear's changelog (too polished, too corporate)

**References:**
- A ship's log book — entries in chronological order, terse, factual
- A well-kept CHANGELOG.md — semantic, structured, scannable
- The feel of `git log --oneline` — dense, informative, fast to scan

## Strategic Principles

1. **Timeline is the page.** The vertical timeline isn't decoration — it's the primary navigation. Every entry lives on it.
2. **Dates first.** The most important piece of information is when. Entries are grouped by month, sorted newest-first.
3. **Tags are semantics.** Feature, fix, infra, breaking — tags carry meaning, not just colour. They're the taxonomy.
4. **Agent-authored.** Entries are written by the agent as part of the workflow. The design should make agent-generated content look good — structured, not creative.
5. **AT Protocol native.** Published via Sequoia. Every entry is a record on the network. The site is the web view of that record.
