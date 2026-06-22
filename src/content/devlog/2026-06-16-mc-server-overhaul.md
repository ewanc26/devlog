---
title: Minecraft server infrastructure overhaul
description: Replaced TCP Shield with playit.gg, added automated backups, refactored plugin management to Modrinth, switched to Aikar's JVM flags, and built a configuration-driven sync engine.
date: 2026-06-16T12:00:00Z
tags: [minecraft, infra, devops]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3movapvbsiw2m"
---

## minecraft server overhaul

The home Minecraft server got its most significant infrastructure update since the hardware migration in January. Nearly every operational concern — networking, plugins, backups, JVM tuning, and config management — was touched.

### networking: tcp shield to playit.gg

The TCP Shield tunnel was replaced with [playit.gg](https://playit.gg). The new tunnel provides more reliable connection routing without requiring players to install additional software. The switch involved updating the Docker Compose networking configuration and rewriting the connection scripts to use playit's agent-based tunnel model.

### plugin management

The plugin management system was refactored from a manual list of JAR files to a Modrinth projects list. Instead of tracking individual plugin files, the configuration now specifies which Modrinth projects and versions to pull. This means plugin updates are a configuration change — edit a version string, restart, done. No more downloading JARs and copying them into the plugins directory.

### automated backups

An [itzg/mc-backup](https://github.com/itzg/docker-mc-backup) sidecar container was added to the Docker Compose stack, providing automated world backups. The backup container runs on a schedule, creates compressed archives of the world data, and manages retention — old backups are automatically pruned. This replaced the previous manual backup workflow.

### jvm tuning

The server JVM flags were switched to [Aikar's recommended flags](https://aikar.co/mcflags) for PaperMC servers. Memory allocation was set to 6 GB with an ARM64-optimised container image. The `CREATE_CONSOLE_IN_PIPE` flag was enabled for easier RCON-free console access.

### configuration engine

The `sync_from_server` script — which copies server configs into the Git repo for version control — was refactored from a hardcoded file list into a configuration-driven engine. A single TOML file declares which paths to sync, whether they're files or directories, and optional exclusion patterns. Adding a new tracked file is now a one-line config change instead of editing the sync script.

### homebrew and orbstack checks

The server setup scripts now include pre-flight checks for Homebrew and OrbStack (the Docker runtime), with clear installation instructions when dependencies are missing. This makes the server reproducible on a fresh Mac without tribal knowledge.
