---
title: Liminalia CLI game loop
description: Interactive command-line interface for testing the simulation: per-crime sentences, reputation, city events, affinity, save/load.
date: 2026-09-12T12:00:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`7c6475b` — an interactive CLI for testing the simulation without the Godot editor.

### Usage

```bash
dotnet run --project csharp/CLI/cli.csproj
```

### Commands

- `tick <hours>` — advance simulation, see crime stats
- `citizens` — all citizens with reputation, money, debt, active crime, jail status
- `crime` — committed/resolved/expired counts, active crimes, full sentence table
- `events` — recent city event log entries
- `economy` — treasury and tax rate
- `reputation <name>` — single citizen's standing
- `build <type> <node> <name>` — place buildings
- `road <from> <to> <cost>` — build roads
- `tax <rate>` — adjust tax rate
- `save <id>` / `load <id>` — persist and restore
- `affinity <firstA> <lastA> <firstB> <lastB> <delta>` — modify relationships
- `help`, `quit`

### Features exercised

Per-crime sentencing (vandalism 15/12h through murder 100/72h), reputation loss on conviction and slow recovery, 0-100 affinity, city event log persistence, and Format-1 save migration on load.
