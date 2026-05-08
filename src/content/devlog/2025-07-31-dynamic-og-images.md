---
title: Website — Dynamic OG Images
description: Server-side Open Graph image generation with SvelteKit — fonts that wouldn't load, endpoints that worked in dev but not production, and the eventual working solution.
date: 2025-07-31
tags: [website]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleiugrcuf2i"
---

## og image generation

Implemented dynamic Open Graph image generation for the website. Each page gets a contextual preview image for social media sharing rather than a generic fallback. Built with SvelteKit server endpoints rendering HTML to images. The development process was painful — fonts refusing to load in the production build, endpoints mysteriously working in dev but failing when deployed, and Vercel's serverless function constraints. Eventually resolved by ensuring fonts were bundled correctly and the rendering pipeline worked without filesystem access.
