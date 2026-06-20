---
title: "Maintenance: Separation of Concerns"
description: Removed sequoia.json from pkgs to maintain clear separation of project-specific configurations.
date: 2026-06-14
tags: [pkgs, tooling]
---

Removed `sequoia.json` from the `ewanc26/pkgs` repository. 

This move reinforces the separation of concerns by ensuring that project-specific publishing configurations reside only in their respective repositories. The governance path for these packages continues to be correctly managed via the `ewanc26/devlog` lifecycle configuration.
