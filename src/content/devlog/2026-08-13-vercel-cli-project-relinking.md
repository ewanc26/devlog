---
title: Vercel CLI reconnected and every project relinked to the current team
description: The local Vercel CLI wasn't even installed, and most existing project links pointed at an old, now-nonexistent team. Ten projects were relinked or freshly linked to ewanc26's projects, two orphaned links got brand-new projects instead, and the pkgs root build was disabled since it has no deployable output.
date: 2026-08-13T01:25:08Z
tags: [vercel, tooling, infrastructure]
draft: false
---

## Vercel CLI

`vercel whoami` came back with `command not found` -- the CLI wasn't installed at all. After installing it globally and logging in as `ewanc26`, checking existing projects turned up a bigger problem than a missing binary.

### stale team links

`devlog`, `faol-website`, `docsite`, `pkgs` (and its `packages/*` subprojects), and `inkwell-website` all had `.vercel/project.json` pointing at `team_1encBS8zAdkHiDi65xAPfAVH` -- a team the current login has no access to and that no longer exists. Only `website` and `hasharium` were already linked to the live team, `ewanc26s-projects`.

### relinking

Ten directories got relinked or linked fresh to `ewanc26s-projects`. `devlog`, `faol-website`, and `docsite` matched by exact project name. `linkat-directory`, `atproto-snake`, and `atproto-shortlink` had no prior link at all and matched cleanly. Five `pkgs/packages/*` subprojects -- `malachite-web`, `tourmaline`, `bismuth-web`, `opal-web`, `jasper-web` -- got matched by best-effort name to their current-team equivalents (`malachite`, `tourmaline`, `pkgs-bismuth-web`, `pkgs-opal-web`, `jasper`); `pkgs/packages/croft-click` was already correctly linked to `pkgs-croft-click`.

### two orphaned links

The monorepo root (`pkgs`) and `inkwell-website` had no equivalent project under the current team at all, so `vercel link` created brand-new projects for both, auto-connecting their GitHub repos in the process. The root `pkgs` project doesn't correspond to a deployable app, though -- its `build` script runs `pnpm -r run build` across the whole workspace with no static output directory, and the new GitHub connection meant every future push would trigger a build that fails. Fixed with a root `vercel.json` setting `ignoreCommand: exit 0`, which always skips the build; the six real deployable apps are separate projects scoped to their own package subdirectories and are unaffected.
