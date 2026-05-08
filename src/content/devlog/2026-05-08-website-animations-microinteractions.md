---
title: Website — Animations and Micro-interactions
description: Animation foundation with easing tokens, staggered card entrances, scroll-triggered reveals, and View Transitions API for page crossfades.
date: 2026-05-08
tags: [feature, webdev, animations]
draft: false
---

## Animation foundation

Added a shared animation system with easing tokens, keyframes, and utility classes. All animations use the same cubic-bezier curves and duration scales for consistency.

## Scroll-triggered reveals

- Homepage: staggered card entrance animations
- Archive: scroll-triggered reveals with staggered entrance
- Work page: section reveals on scroll
- Footer: fade-in on scroll, scrollToTop slide-up entrance

## Navigation

- Progress shimmer while loading
- Mobile menu fly transitions
- Active page indicator
- View Transitions API for cross-page crossfades using `beforeNavigate`/`afterNavigate`

## Live updates

Pulse indicator on firehose card changes when the Jetstream feed updates in real time.

## Fixes

- `$state()` initialiser: pass value directly, not function wrapper (Svelte 5 pattern, not React's `useState`)
- SSR crash: initialise `$state` from data props to avoid `undefined` during server render
- Wolf mode: re-apply on navigation and async content, including decimal clock modal
