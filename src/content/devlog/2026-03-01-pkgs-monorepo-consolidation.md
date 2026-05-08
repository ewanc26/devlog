---
title: Pkgs Monorepo Consolidation
description: Migrated all @ewanc26 packages into a single pnpm workspace monorepo with shared tooling and CI.
date: 2026-03-01
tags: [infra, monorepo, pnpm]
draft: false
---

## Monorepo migration

Consolidated all standalone `@ewanc26/*` packages into a single pnpm workspace monorepo. Packages migrated via `git subtree add` to preserve history: `@ewanc26/tid`, `@ewanc26/atproto`, `@ewanc26/ui`, `@ewanc26/utils`, `@ewanc26/svelte-standard-site`, `@ewanc26/malachite`, and `@ewanc26/malachite-web`.

The monorepo uses a shared `pnpm-workspace.yaml`, unified `CONTRIBUTING.md` and `LICENCE`, and a `release.sh` script for publishing. All packages now resolve workspace dependencies locally during development and from npm for consumers.

## New packages added

- **@ewanc26/noise** — deterministic value-noise avatar generation, extracted from the website's inline fallback
- **@ewanc26/noise-avatar** — thin wrapper around `@ewanc26/noise` for AT Protocol avatar fallbacks
- **@ewanc26/supporters** — Ko-fi webhook parsing and AT Protocol event storage
- **@ewanc26/og** — dynamic OG image generation with base64-embedded fonts for serverless compatibility
- **@ewanc26/pds-landing** — SvelteKit component library for PDS landing pages, rebuilt from scratch for Svelte 5

## CI

Switched from `NPM_TOKEN` secrets to npm Trusted Publishing (OIDC) for all package releases. Tagged pushes now publish automatically via GitHub Actions.
