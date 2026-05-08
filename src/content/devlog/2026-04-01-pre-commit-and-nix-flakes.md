---
title: Pre-commit Configs and Nix Flakes Across All Projects
description: Added pre-commit hooks to every repo and nix flake.nix files for reproducible builds across all projects.
date: 2026-04-01
tags: [infra, nix, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleepzjkx62k"
---

## Pre-commit

Added pre-commit configurations to every project: prettier for TypeScript/Svelte repos, black + isort for Python repos, nixfmt for Nix configs, and dotnet format for the C# project. All hooks use local tool installations rather than global ones.

## Nix flakes

Added `flake.nix` to every project in `~/Developer/Git`. Each flake provides a development shell with the project's language toolchain and a package derivation where applicable. This makes `nix develop` work from any project directory for reproducible builds.

Also added Tangled mirror links to every project's README.
