---
title: Reverse Engineering an Apple Shortcut
description: Deconstructed dame.is's dynamic avatar Apple Shortcut and rebuilt it as a Python automation — hourly profile image updates via AT Protocol.
date: 2025-02-23T12:00:00Z
tags: [atproto, tooling, python]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mleni6wlrx2y"
---

## avatar automation

Inspired by dame.is's hourly dynamic avatar, reverse-engineered the Apple Shortcut logic and rebuilt it in Python. The original Shortcut changed profile pictures based on time of day relative to timezone. Rebuilt as two Python projects working in tandem (or independently) — one generates the avatar, one publishes it to AT Protocol via `com.atproto.repo.uploadBlob` and `com.atproto.identity.updateHandle`. Runs hourly, keeping the Bluesky profile fresh. This later evolved into the dedicated avatar-updater bot.
