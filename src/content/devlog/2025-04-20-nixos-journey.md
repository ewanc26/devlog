---
title: My Journey to NixOS
description: Adopting NixOS on the Dell Inspiron 3501 — from macOS user to declarative Linux config, the learning curve, and what actually clicked.
date: 2025-04-20T12:00:00Z
tags: [infra]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni6s4km22"
---

## nixos adoption

Switched the secondary machine (Dell Inspiron 3501) to NixOS after stints with Arch, Fedora, Ubuntu, Debian, and Bazzite. Drawn by the declarative configuration model — the entire system described in code, reproducible from a Git repo. The learning curve was steep: Nix's functional, lazily-evaluated expression language is unlike anything in typical sysadmin work. The module system was the main source of early frustration — options nest, attributes merge, and things that look compatible sometimes aren't. Eventually it clicked, and the config-as-documentation model became the primary appeal. Rollback support changed how willing I was to experiment — worst case is a failed build and the system sits on the previous generation.
