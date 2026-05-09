---
title: Timeline Scroll Reveal Fix
description: Every devlog entry was invisible on load — $state on an IntersectionObserver variable caused the effect to disconnect it before it could fire.
date: 2026-05-08T19:35:53Z
tags: [website, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlgifdxnoh22"
---

## The problem

The devlog launched with 94 posts and showed none of them. Data was fine, build was fine — the scroll reveal was broken.

Entries start at `opacity: 0` and get a `revealed` class from an `IntersectionObserver` when they enter the viewport. The observer variable was declared as `$state`, and the `$effect` that sets it up reads it in a guard:

```ts
let observer: IntersectionObserver | undefined = $state();

$effect(() => {
  if (!timelineEl || observer) return;
  observer = new IntersectionObserver(...);
});
```

Reading `$state` inside `$effect` creates a reactive dependency. Setting `observer` triggers a re-run — which fires the cleanup (`observer.disconnect()`) before the observer's async callback had a chance to run. Every entry stayed invisible.

## Fix

```ts
let observer: IntersectionObserver | undefined;
```

`observer` is internal to the effect and not read anywhere in the template. It didn't need to be reactive.
