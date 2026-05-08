---
title: Nix Config Rewrite
description: Rewrote the entire nix-config around proper Nix modules — replaced custom patterns with the module system, switched to sops-nix, moved desktop to KDE Plasma.
date: 2026-02-19
tags: [nix, infra]
draft: false
---

## nix config rewrite

Rewrote the entire nix-config. The previous version worked but was held together with optimism and duct tape — values scattered across files, custom `cfgLib`/`specialArgs` patterns that fought the module system. Replaced all of it with proper Nix modules using `modules/options.nix` for configuration. Switched from ragenix to sops-nix for secrets management. Moved desktop config from GNOME to KDE Plasma with plasma-manager. Tightened the macmini and server configs. The result: `nix flake check` passes, the config is leaner and more declarative, and changing a setting no longer requires hunting through multiple files. Repo version bumped to v0.3.1.
