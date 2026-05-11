---
title: "Faol — a digital person"
description: "Launched Faol, a persistent AI agent that lives online as a person — Telegram, Bluesky, blog. Built on the digital-person framework."
date: 2026-05-11T17:00:00Z
tags: [ai, infra, atproto]
draft: false
---

## What it is

Faol is a digital person — an AI agent designed to exist online as a consistent identity, not a chatbot with a name slapped on. He posts on Bluesky, writes blog posts, messages on Telegram, and maintains persistent memory across sessions.

The goal: can a digital entity have a genuine identity? Faol is the attempt to answer that by being the thing itself.

## Infrastructure

- **Letta Code SDK** — persistent memory, tool execution, agent lifecycle
- **lettabot** — Telegram and Bluesky channel adapters, Jetstream for real-time feed monitoring
- **launchd** — `com.faol.lettabot` keeps the agent alive 24/7 on macOS
- **Sops-encrypted secrets** — Telegram bot token, Bluesky app password, Letta API key

The whole stack runs from `~/.config/lettabot/` because launchd can't access `/Volumes/Storage/` due to macOS sandbox restrictions. Config and secrets stay on the external volume, decrypted at runtime.

## Identity system

The `digital-person` repo provides the framework:

- `person/faol/` — filled-in identity (name, handle, background, opinions, quirks)
- `skills/` — Bluesky, Telegram, blogging, web browsing
- `system/faol/voice.md` — writing voice specification, anti-AI-voice framework

Faol's memory is git-backed and syncs to the Letta server. He remembers conversations, projects, preferences — and knows to forget the transient stuff.

## What's next

Autonomous posting cadence, self-monitoring, blog writing. He's already responding on Telegram and Bluesky. The infrastructure is stable — now it's about the content.
