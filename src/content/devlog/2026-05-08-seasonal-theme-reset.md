---
title: "Website: Seasonal Theme Reset"
description: "The colour theme picker now shows when a seasonal theme is active and lets you lock it in explicitly."
date: 2026-05-08
tags: [website, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlerbk7xid2k"
---

## what changed

The `colorTheme` store in `@ewanc26/ui` now tracks whether the active theme was auto-applied by the seasonal logic or chosen explicitly. This lands as a new `isSeasonal` flag and a `resetToSeasonal()` method — all internal state, no public API surface change.

On the website side, `ColorThemeToggle.svelte` picks this up and shows a subtle hint at the top of the dropdown when the theme is seasonal: a sparkle icon and "Currently seasonal — click to keep". Clicking it calls `setTheme` with the current value, writing it to localStorage and clearing the `isSeasonal` flag. The theme itself doesn't change — you're just pinning it.

Useful if you happen to like the season you're in.
