---
title: One AI tool instead of six
description: I removed six AI tools from my Mac and installed one. The uninstalling took ten minutes; finding everything took a morning.
date: 2026-11-03
tags: [tools, ai, cleanup]
draft: true
---

I had five coding agents, a local LLM runtime, and one tool I actually used every day. I removed the first group and installed Mistral instead. The uninstall was the easy part.

## The pile

- **Ollama**, running as a LaunchAgent, with nothing pulled. A daemon for an empty model directory.
- **Claude Code**, 782 MB of history and settings, plus a helper app in `~/Applications` that had registered the `claude-cli://` URL scheme.
- **Codex**, a 427 MB cask, pointing at an OpenAI account I had already closed.
- **Letta Code**, 115 MB of agent state, including a credentials file.
- **Hermes**, 5.6 GB, and the only one still running: a gateway kept alive by a launch agent, with live state and a token wired into another project.
- **freebuff**, which I do not remember installing.
- **LM Studio** and **Letta** `PATH` exports in two different shell files, for directories that no longer exist.

Six of them did the same job badly in slightly different ways. Each had its own auth, its own config, its own history, and its own update path. None of that compounds into anything useful.

## Why cut it

The tools overlapped, and the overlap was the expensive part. Not disk — attention. Every week I would pick a different agent, and every agent wanted its config file edited first. Ollama existed to serve local models that were never pulled. Codex was already deprecated by an account closure. Letta was a runtime I set up once and never came back to. Hermes had been running as a gateway since October, for a project I had paused rather than finished.

The honest reason is simpler than any of that: I was maintaining an inventory, not doing work.

## What removal actually involved

Not `brew uninstall`. A rough order:

1. Stop the services first, so the archive is consistent. Ollama had a LaunchAgent; Hermes had a gateway whose Python child outlived the agent being booted out.
2. Archive. `~/.claude` went to a 330 MB tarball, `~/.letta` and `~/.letta-local` to a 31 MB one, and `~/.hermes` to a 2.1 GB one from 5.6 GB.
3. Uninstall the formula. Homebrew also auto-removed `mlx` and `mlx-c` as Ollama dependencies, so I reinstalled those — they are general ML libraries, not part of the tool being removed.
4. `npm uninstall -g` for the two agents that lived there. That removed 404 packages.
5. Delete the data directories: `~/.claude`, `~/.codex`, `~/.ollama`, and the support folders under `~/Library/Application Support`.
6. Delete the account credentials from the harness, including an `auth.json` the logout had not touched.

Then a second pass, which is where the real work was:

- `~/.claude.json` and its backup, still holding state after the CLI was gone
- the URL handler app, still registered
- `PATH` blocks in `~/.zshrc` and `~/.profile`
- an editor setting left by an extension that was no longer installed
- three launch agent plists for the Hermes gateway, two of them `.bak` copies

Hermes was the one that stopped feeling like an uninstall. It was a gateway, not a CLI: a launch agent kept it alive, it carried 15 MB of state and a 26 KB `.env`, and it held a token for a project I was no longer running. Deleting it meant stopping something first, and stopping it meant finding out what else had its name in it. That project is paused rather than finished, and its profile went into the archive with everything else. When it comes back, it will point at Mistral, not at the runtime I just removed.

The first pass took five minutes. The second pass found the things that keep working after the binary is gone.

## The replacement

I installed Mistral's **Vibe** CLI (`brew install mistral-vibe`, binary `vibe`). There is no Mac desktop app — the App Store listing is iPhone and iPad only — so the desktop option is the web app, which I have not set up.

I am not on Mistral Pro yet, so the agent still runs on a free model while the Mistral provider sits in `opencode`'s config, fully described and not yet authenticated. One tool, ready, not switched on. That is fine. The point was removing the pile, not rushing the replacement.

I kept `opencode` itself, `mlx`/`mlx-c`, and my own npm packages.

## Notes to self

- Uninstalling is about a third of the work. The rest is config, credentials, launch items, shell paths, and helper apps.
- Back up before wiping. A tarball of a dotdir is cheap, and the decision to delete is easier once it exists.
- A service with no models is still a service.
- The tool that takes longest to remove is the one that was working without you.
- "Installed" and "used" are different inventories. I had been tracking the first and calling it the second.

Six tools became one. I will take that trade.
