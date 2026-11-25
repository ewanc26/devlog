---
title: Wolfram builds for more platforms and retries politely
description: CI gains console and Raspberry Pi cross-builds while lexicons drift-check and the network client learns bounded, rate-limit-aware retries.
date: 2026-11-23
tags: [wolfram, ci, atproto, networking]
draft: false
---

Wolfram widened at both ends this week: more targets in CI, and better behaviour when a remote service says "slow down".

- CI cross-builds Wii, Wii U, 3DS and Raspberry Pi 1 targets.
- The RPi1 cross-compile runs in a bare `ubuntu:24.04` container.
- Vendored Ozone inbox and newer lexicons are regenerated into wrappers.
- A tools command drift-checks vendored lexicons against upstream atproto.
- The Node addon exposes typed APIs for `chat_group`, `notification_v2` and age assurance.
- The network client parses RateLimit headers and applies bounded retries.

Releases at v0.45.0 and v0.46.0 mark the work. Cross-building four targets is a logistics win; bounded retries are a manners win. Both matter for a library other clients depend on.
