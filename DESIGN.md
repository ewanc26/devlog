# devlog.croft.click — Design System

## Scene

A developer scanning their own project history between work sessions, on a laptop, usually evening. Quick check-ins: what changed, what shipped, what broke. They want to see the shape of recent activity at a glance, then read details when something catches their eye.

## Colour Strategy

**Committed.** Warm amber carries the identity. Not a subtle accent — it's the colour of the timeline, the markers, the links, the identity. The base is a near-black warm grey, not pure black. Neutrals are tinted toward amber.

## Palette (OKLCH)

| Token | OKLCH | Hex | Role |
|-------|-------|-----|------|
| bg | oklch(0.12 0.01 75) | #1a1816 | Page background |
| surface | oklch(0.16 0.012 75) | #232019 | Cards, code blocks |
| surface-1 | oklch(0.20 0.014 75) | #2d2a22 | Hover states |
| border | oklch(0.25 0.015 75) | #38342b | Borders, dividers |
| border-1 | oklch(0.30 0.016 75) | #44403a | Stronger borders |
| text | oklch(0.93 0.01 80) | #ede9e0 | Primary text |
| muted | oklch(0.65 0.02 75) | #9e9688 | Secondary text |
| dim | oklch(0.45 0.02 75) | #665e54 | Tertiary, dates |
| accent | oklch(0.78 0.16 75) | #e2a93b | Amber — primary accent |
| accent-dim | oklch(0.78 0.16 75 / 0.15) | — | Accent background tint |
| tag-feature | oklch(0.78 0.16 75) | #e2a93b | Feature tag (amber) |
| tag-fix | oklch(0.65 0.15 25) | #6b9fbf | Fix tag (cool blue) |
| tag-infra | oklch(0.70 0.10 155) | #7dba8a | Infra tag (sage) |
| tag-breaking | oklch(0.60 0.20 25) | #d45454 | Breaking tag (red) |

## Typography

- **Body:** Inter, 16px base, line-height 1.6
- **Mono:** JetBrains Mono, for dates, tags, code
- **Scale:** 1.5em h1 → 1em body (1.5 ratio). Strong weight contrast: 600 headings, 400 body.
- **Line length:** 65ch max on prose content.

## Layout

Single-column. No sidebar. The timeline runs down the left edge of the content area. Max-width 680px for readability. Entries are grouped by month with a date header that breaks the timeline.

## Timeline

The vertical spine of the page. 2px line in `border-1`. Entry markers are small filled circles (6px) in `dim`. The most recent entry's marker is `accent` with a subtle glow. Month headers sit on top of the timeline, breaking it visually.

## Tags

Semantic, not decorative. Four fixed categories with distinct colours:
- **feature** / **feat** / **new** → amber
- **fix** / **bugfix** → cool blue
- **infra** / **config** / **nix** → sage green
- **breaking** / **major** → red

All other tags get a neutral treatment. Tags are set in JetBrains Mono, lowercase, small, with a tinted background.

## Entry Detail

The individual entry page drops the timeline. Full-width prose with a date, title, tags, then the content. Table of contents on the right for long entries (900px+ breakpoint).

## Motion

Subtle. Entry hover: slight opacity shift on the title. Link hover: accent colour fade. No animations on layout properties. No bounce, no elastic.

## Bans

- No side-stripe borders on entries
- No gradient text
- No glassmorphism
- No hero metrics
- No identical card grids
- No emoji in tag labels
