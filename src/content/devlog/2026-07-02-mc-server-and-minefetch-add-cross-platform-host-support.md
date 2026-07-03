---
title: mc-server and minefetch add cross-platform host support
description: mc-server and minefetch add cross-platform host support with PowerShell file watcher
date: 2026-07-02T23:30:00Z
tags: [mc-server, minefetch, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mprj34naqs2l"
---

The mc-server and minefetch projects add cross-platform host support. This release brings 10 commits focused on cross-platform compatibility, adding PowerShell file watcher support for Windows hosts alongside native shell scripts.

### features
- Add cross-platform host support (Windows, Linux, macOS)
- Add scripts/sysinfo-watcher.ps1 - PowerShell file watcher for Windows hosts
- Add LogBlock integration for Timber with minefetch-specific fastfetch config

### improvements
- Use MC_MINEFETCH_DIR environment variable instead of hardcoded paths
- On-demand sysinfo refresh via host-side watcher
- Fix server compatibility and plugin configuration

