---
title: devlog.croft.click launch
description: New changelog site for tracking project updates, published to AT Protocol via Sequoia.
date: 2026-05-08
tags: [infra]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldwgx4s552g"
---

## devlog.croft.click

Launched a dedicated changelog site at devlog.croft.click. Built with SvelteKit 5, Tailwind CSS 4, and published to AT Protocol via Sequoia.

The design is a changelog/timeline aesthetic — warm amber accent on near-black base, vertical timeline spine with semantic tag colours (feature = amber, fix = blue, infra = sage, breaking = red). Not the docsite's terminal green; its own identity.

## Integration

- Added to croft.click project list in the pkgs monorepo
- Linked from docsite sidebar under "overview"
- Deployed to Vercel with prerendering enabled

## Automation

Devlog entries are written as part of the normal development workflow. When making meaningful changes (features, fixes, infra, config), a devlog entry gets written, committed, pushed, and published via Sequoia.
