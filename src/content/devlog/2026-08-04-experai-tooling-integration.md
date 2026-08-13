---
title: experai gets machine-readable output, opencode/MCP integration, and AT Protocol weight publishing
description: The CLI now supports --json and --support for scripting and tooling, an opencode plugin and stdio MCP server expose it as agent tools, and a new publish-weight command writes trained checkpoints to a PDS as chunked blobs.
date: 2026-08-04T05:29:52+01:00
tags: [experai, rust, machine-learning, atproto, opencode, mcp]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg254vp22l"
---

## experai

A week of follow-up work on `experai` since the initial write-up: the CLI grew a stable machine-readable interface, that interface got wired into opencode as a plugin and a standalone MCP server, and a new subcommand lets a trained checkpoint be published straight to an AT Protocol PDS.

### `--support` and `--json`

`experai --support` prints Ko-fi and GitHub Sponsors links and exits 0. Landing it also meant making the top-level subcommand optional in the clap parser — previously a bare `experai` invocation errored; now it prints help.

The following commit added a global `--json` flag (works before or after the subcommand). `experai --support --json` prints the sponsor links as an object, bare `experai --json` prints CLI metadata — name, version, and the subcommand list — derived directly from the clap `Command` definition rather than hand-maintained, and `generate --json` emits `{"text": ..., "tokens": N}` instead of raw text. The version string also switched from a hardcoded `"0.3.0"` to reading `CARGO_PKG_VERSION`, so it can't drift from `Cargo.toml` again. Both changes came with unit tests exercising the parser directly via `Cli::try_parse_from`.

### opencode plugin and MCP server

`.opencode/plugin/experai.ts` registers `experai_*` tools (`support`, `commands`, `generate`, `train`, `preprocess`, `package`, `atprotocol`, `jetstream`, and later `publish_weight`) that shell out to the compiled binary. Binary resolution checks `./target/release/experai`, falls back to `./target/debug/experai`, then `PATH`, with an `EXPERAI_BIN` override for all three. A `/experai <args>` slash command runs the CLI with arbitrary arguments and summarizes the result.

The same set of tools is exposed a second way: `mcp/experai-server.mjs`, a stdio MCP server built on `@modelcontextprotocol/sdk`, wired into the project's `opencode.json` so any MCP client — not just opencode — can drive the toolkit. It uses the same binary-resolution logic as the plugin, just resolved relative to the repo path instead of cwd. Getting the MCP server running requires `cd mcp && npm install` once; its `node_modules` and lockfile are gitignored, same as the plugin's.

### publish-weight

The most substantial addition: `experai publish-weight` publishes a trained checkpoint to a Bluesky/AT Protocol PDS under a new `click.croft.experai.weight` record collection. `src/at_protocol.rs` gained an `ATProtocolPublisher` that authenticates via `com.atproto.server.createSession`, splits the checkpoint's `.safetensors` file into chunks no larger than 1MB (the rough per-blob limit PDS servers enforce) via repeated `com.atproto.repo.uploadBlob` calls, and then writes a record referencing all the chunks with `com.atproto.repo.createRecord`. Authentication uses a `AuthXrpcClient` wrapper around `atrium_xrpc_client::ReqwestClient` that injects the session's bearer JWT into every request after login.

The command reads the password from `--password` or the `EXPERAI_ATP_PASSWORD` environment variable (the README recommends a Bluesky app password over the account's real password, and the password is never logged). `--pds-url` defaults to `https://bsky.social`, `--chunk-size` defaults to 1,000,000 bytes, and `--rkey`/`--collection` can override the record key and NSID if needed. The checkpoint directory must contain both the `.safetensors` file and `model_config.json`. This landed with 4 new unit tests (67 total passing at the time), and both the opencode plugin and MCP server picked up a matching `publish_weight`/`experai_publish_weight` tool in the same commit so the new capability was reachable from tooling immediately rather than as a follow-up.

### housekeeping

The last three commits in this window moved skill definitions out of `.claude/skills` into a shared `.agents/skills` directory, with `.claude/skills` and equivalents for droid, opencode, qwen, and rovodev left behind as symlinks — one set of skill content shared across every agent-specific config directory the repo supports, rather than duplicated per tool. A `desloppify` skill was added in the same pass.
