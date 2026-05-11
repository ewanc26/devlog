---
title: "Landing-ui polish: shared layout, cross-references, icon cleanup, support consolidation"
description: "LandingLayout improvements (subtitle, expanded footer, @theme bridge), cross-references between all five tools, inline symbols replaced with Lucide icons, support links consolidated to ewancroft.uk/support"
date: 2026-05-11T12:06:00Z
tags: [pkgs, typescript, svelte]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mll7q2f3vd2k"
---

**LandingLayout improvements.** Added `subtitle` and `footerAboutUrl` props. Footer now shows source URL, privacy link, and copyright. Added `@theme` token bridge in `landing.css` so CSS custom properties map to Tailwind utility classes. Added font-smoothing. Deduplicated `@keyframes spin`. Per-project `layout.css` files now expose their own `@theme` blocks for tokens like `--border-subtle`, `--accent-bright`, `--text-muted`, `--text-dim`. Added `.svelte-kit` to root `.gitignore`, removed opal-web's tracked svelte-kit output.

**Cross-references.** Added `siblings` prop to `LandingPage`. Each project's landing page now links to the other four in a "More tools" section. Malachite, Opal, Jasper, and Bismuth use the shared component. Tourmaline has its own inline implementation matching the same pattern.

**Inline symbols replaced with Lucide icons.** `ExternalLink` for external links, `ArrowLeft` for back navigation, `ArrowRight` for step indicators, `Heart` for support links, `Menu` for hamburger icon. Removed redundant `checkmark`/`cross` from StatusGrid (status styling already communicates the same). Touched 16 files across bismuth-web, croft-click, jasper-web, landing-ui, malachite-web, opal-web, and pds-landing.

**Support links consolidated.** All ko-fi.com and GitHub Sponsors links replaced with `ewancroft.uk/support`. LandingPage hero buttons collapsed from two (Sponsor + Ko-fi) to a single Support link. Removed `target=_blank` from own-domain links.

**Bug fixes in the same pass.** Fixed literal `\n` escape sequences in malachite-web, opal-web, and jasper-web `+page.svelte` that broke the Svelte parser. Fixed `__WEB_VERSION__`/`__CLI_VERSION__` declarations outside `declare global` in malachite-web `app.d.ts`. Fixed `$core/rate-limit-headers` and `$core/rate-limiter` imports in malachite-web (use `@ewanc26/malachite/core` instead of broken alias). Fixed relative `../../../bismuth/src/types.js` import in bismuth-web (use `@ewanc26/bismuth` package). Added `ArrowLeft` back links to opal-web and jasper-web about pages.
