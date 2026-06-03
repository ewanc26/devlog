---
title: "Website: view transitions, scroll animations, support page"
description: "Added View Transitions API crossfades, scroll-triggered section reveals, a dedicated support page, and seasonal colour theme lock-in"
date: 2026-05-11T08:00:00Z
tags: [website, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf557m2gi2v"
---

**View Transitions API.** Page crossfades on navigation using `beforeNavigate` to start `document.startViewTransition()` and `afterNavigate` to resolve the transition promise. Previous attempt using `onNavigate` with `requestAnimationFrame` didn't properly let SvelteKit update the DOM inside the transition. Also fixed an SSR crash where `$state(data.prop)` stored the function as the value instead of calling it — Svelte 5's `$state` takes a value directly, not a function wrapper (unlike React's `useState(fn)`).

**Scroll-triggered animations.** Archive page entries stagger in on scroll. Work page sections reveal on scroll. Footer fades in. Scroll-to-top button repositioned to `bottom-24` (the footer was covering it at `bottom-8`).

**Support page.** Spun the support modal out to a dedicated `/support` route. Consistent MetaTags pattern on the new page.

**Seasonal colour theme.** The colour theme picker now shows a seasonal hint and a lock-in action. `isSeasonal` state tracked in the theme store; `resetToSeasonal()` returns to the auto-detected Wheel of the Year theme.

**Firehose perf.** Eliminated duplicate fetches and gated polling to only the active tab, reducing unnecessary network traffic on the homepage firehose.

**Recent posts filter.** Fixed the recent posts card to filter by blog publication only, excluding devlog entries.
