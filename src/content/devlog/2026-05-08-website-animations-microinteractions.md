---
title: Website — Animations and Micro-interactions
description: Animation foundation with easing tokens, staggered entrances, scroll reveals, and View Transitions API.
date: 2026-05-08
tags: [website, ui, animations]
draft: false
---

## Animation foundation

Added a shared animation system with easing tokens, keyframes, and utility classes. All animations use the same cubic-bezier curves and duration scales.

## Scroll-triggered reveals

Staggered card entrance on homepage, scroll-triggered reveals on archive and work pages, footer fade-in, and scrollToTop slide-up entrance.

## Navigation

Progress shimmer while loading, mobile menu fly transitions, active page indicator, and View Transitions API for page crossfades using `beforeNavigate`/`afterNavigate`.

## Live updates

Pulse indicator on firehose card changes when the Jetstream feed updates in real time.
