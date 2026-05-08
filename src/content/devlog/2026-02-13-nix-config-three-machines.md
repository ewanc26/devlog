---
title: Nix Config — Three Machines, One Config
description: One flake managing macmini, laptop, and a theoretical server — two booting successfully, one still aspirational.
date: 2026-02-13
tags: [nix, infra]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleiufmujo2k"
---

## multi-host nix config

Got three machines configured through a single Nix flake: macmini (daily driver, nix-darwin), laptop (Dell Inspiron 3501, NixOS), and a theoretical server (NixOS, not yet deployed). Two of them boot successfully. The shared config uses Nix modules with host-specific overrides, Home Manager for user-level packages, and separate configuration files for each machine. Values were scattered across too many files at this stage — the config worked but was hard to maintain. This led to the full rewrite shortly after.
