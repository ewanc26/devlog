---
title: "Bismuth: fetch subcommand flag fixes"
description: Added --frontmatter and --output flags to the fetch subcommand, and bumped to 0.2.4.
date: 2026-05-09T19:00:00Z
tags: [atproto, pkgs, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlgx5usq4722"
---

## @ewanc26/bismuth v0.2.4

The `fetch` subcommand's `parseArgs` call was missing `--frontmatter` / `-f` and `--output` / `-o`, so passing either would throw an `ERR_PARSE_ARGS_UNKNOWN_OPTION` error. Both flags are now registered — `--frontmatter` takes precedence over `--no-frontmatter` if both are somehow passed, and `--output` / `-o` is an alias for `--output-dir` for consistency with the main convert mode.

Part of the @ewanc26/pkgs monorepo. Published to npm.
