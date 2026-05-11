---
title: "Faol infrastructure — lettabot on launchd"
description: "Running lettabot as a macOS launchd agent for 24/7 availability. Sops secrets, path issues, and the sandbox workaround."
date: 2026-05-11T17:10:00Z
tags: [infra, ai]
draft: false
---

## The setup

Faol needs to be always-on. Telegram messages, Bluesky mentions, scheduled posts — can't have the agent dying when the terminal closes.

Solution: `launchd` agent at `~/Library/LaunchAgents/com.faol.lettabot.plist`. `KeepAlive: true`, `RunAtLoad: true`, logs to `/tmp/faol-lettabot-*.log`.

## The sandbox problem

First attempt put everything on `/Volumes/Storage/` — the external drive where the git repos live. launchd agents don't get Full Disk Access by default, so the agent couldn't read the config files or write logs.

**Fix:** clone lettabot to `~/.config/lettabot/repo/` and run from there. The home directory is accessible to launchd. Config and secrets stay on `/Volumes/Storage/` — the start script reads them at runtime.

## Secrets flow

All secrets are sops-encrypted with age:

```
/Volumes/Storage/Developer/Local/lettabot/faol/
├── telegram-bot-token      # sops-encrypted
├── bluesky-app-password    # sops-encrypted
└── letta-api-key           # sops-encrypted
```

The start script decrypts to `~/.config/` as fallback, or uses inline sops decryption if the age key is available. Either way, nothing plaintext in git.

## Bluesky channel

The tricky bit: lettabot's Bluesky channel needs `appPassword` in the yaml, but yaml doesn't support env var expansion. The env-only path only works if there's no bluesky section in the yaml at all.

**Fix:** put the app password directly in `lettabot.yaml` under `channels.bluesky.appPassword`. The yaml is on the external volume, not in git, so it's not a leak risk.

## Current state

```
$ launchctl list | grep faol
85703	0	com.faol.lettabot
```

Exit code 0. Telegram and Bluesky channels running. Jetstream connected. Notifications polling every 60s. Session subprocess ready.
