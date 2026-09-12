---
title: pkgs fixes landing-ui mobile layout, iOS input zoom, and jasper-web's missing background tokens
description: landing-ui gained 16px form inputs to stop iOS focus zoom, reduced-motion support, and tighter small-screen padding. Jasper-web's import page cards rendered with no background because --bg-secondary and --bg-hover were never defined. Opal-web's upload step showed a raw file input instead of a drop zone. Bismuth-web's header overflowed on narrow screens.
date: 2026-09-10T12:36:00Z
tags: [pkgs, landing-ui, jasper-web, opal-web, bismuth-web, design, mobile, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjq26snk2y"
---

## pkgs

### landing-ui: mobile and input zoom fixes

Form inputs in `.field` were 0.9rem, which makes iOS Safari zoom the viewport on focus. All `.field input` and `.field textarea` are now 1rem (16px). SearchInput's input went from `text-sm` to `text-base` for the same reason.

Added `text-size-adjust: 100%` to the base styles and a `prefers-reduced-motion: reduce` block that collapses animations and transitions. LandingLayout's header and footer tighten their padding under 480px. LandingPage's main padding drops from 4rem to 2.5rem under 640px, section spacing shrinks, and the feature grid goes single-column under 360px.

### jasper-web: missing background tokens

The import page styles choice cards, target options, gallery items, saved-state cards, and upload-mode buttons with `--bg-secondary` and `--bg-hover` — neither was defined in layout.css, so every one of those surfaces rendered with no background. Both are now aliased to the existing surface tokens in layout.css.

Also: form inputs to 16px (iOS zoom fix), tighter mobile padding, and the resume prompt, saved-state card, upload-mode selector, and inline action rows wrap on narrow screens.

### opal-web: file input and narrow-screen layout

The upload step rendered a raw visible `<input type="file">` instead of a styled drop zone. It's now a `<label>` with the input hidden and prompt text shown, matching jasper's pattern, with hover accent on the border.

Also: handle input to 16px, the auth form and step-action rows wrap instead of overflowing, the platform grid goes single-column under 480px, and mobile padding tightened.

### bismuth-web: header overflow and input zoom

The convert page's header row — back link plus a fixed 11rem auth input — overflowed on screens under ~400px. The row now wraps and the input flexes to available space. The auth input was 0.8rem (iOS zoom); it's 1rem now, capped at 100% width. The output header wraps on narrow screens.
