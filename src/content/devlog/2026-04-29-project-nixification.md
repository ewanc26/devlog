---
title: Project Nixification
date: 2026-04-29
description: Adding Nix flakes and pre-commit hooks to standardize development environments across the ecosystem.
tags: [nix, infra, automation]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55bnrrj2g"
---

### Standardizing Environments
Over the last few days, I've been systematically adding Nix flakes to all active projects. This ensures that anyone (including my agent-based collaborators) can spin up a consistent development environment with a single command.

- **Nix Flakes:** Added `flake.nix` and `flake.lock` files to `atproto-snake`, `bluesky-moon-tracker`, `scripts`, `socialsync`, `tangled-sync`, and the main website.
- **Pre-commit Hooks:** Integrated `pre-commit` hooks using `nix-shell` or flakes to automate linting and formatting (Prettier, Black, isort) before every commit.
- **Automation:** Standardized on `pnpm` for Svelte projects and optimized build scripts for compatibility with the Nix store.
