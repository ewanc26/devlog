---
title: "atperson: split main.cpp into scoped CLI command atoms"
description: "The 500-line command/runtime composition unit is now process bootstrap and dispatch only, with every command body in a focused atom under src/app/cli/."
date: 2026-09-17
tags: [atperson, cpp, release]
draft: false
---

atperson `96a3c66` closes the last remaining monolith from issue #42's checklist: `src/app/main.cpp` no longer combines environment helpers, path resolution, usage text, and seventeen command bodies in one translation unit.

## What moved

| Atom | Owns |
|---|---|
| `cli/config.{hpp,cpp}` | Environment variables, durable-path resolution, bounded integer parsing |
| `cli/usage.{hpp,cpp}` | The command and environment reference text |
| `cli/ledger_maintenance.{hpp,cpp}` | `rebuild`, `compact`, `withdraw` |
| `cli/graph_inspection.{hpp,cpp}` | `assoc`, `candidates`, `familiarity`, `recall` |
| `cli/ingest.{hpp,cpp}` | `ingest`, `ingest-file` |
| `cli/cursor.{hpp,cpp}` | `cursor status`, `cursor reset` |
| `cli/sync.{hpp,cpp}` | `sync` — client construction, per-page budget refresh, cursor-rejection recovery |

Every body is moved byte-faithfully: behaviour, ordering, and output text are unchanged. `main.cpp` keeps only process bootstrap (home-directory bootstrap notice), snapshot load-or-create, resource probing, and one dispatch stanza per command — 231 lines, down from 500.

## Conventions

Atoms follow the established pattern: explicit parameters with the same identifiers the moved statements used, plus caller-owned callbacks (`print_stats`, `usage`) so text rendering stays with main. Network-only atoms (`cursor`, `sync`) construct their own Wolfram-backed `AtprotoClient` from the documented environment, keeping credentials out of the dispatch layer.

Both `ATPERSON_BUILD_NETWORK=OFF` and `ON` configurations build and pass all 32 tests; CLI smoke-tested end to end (`ingest`, `stats`, `assoc`, `candidates`, `familiarity`, `recall`, `withdraw`, `rebuild`, `compact`).
