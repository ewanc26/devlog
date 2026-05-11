---
title: "Nix: Bitwarden CLI, server retirement, path fixes"
description: "Swapped rbw for official bitwarden-cli, fixed activation scripts for retired server, added splitDns toggle"
date: 2026-05-11T03:00:00Z
tags: [infra]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mlkvmvzdus22"
---

Swapped **rbw** for the official **bitwarden-cli** package. rbw needed pinentry-mac configured with an absolute nix store path, and was pointed at the Bitwarden EU hosted server instead of the now-retired Vaultwarden instance.

Home-manager activation scripts for Forgejo and Nextcloud gracefully skip when the server is unreachable — the server is retired as of May 2026. Added `splitDns` toggle (disabled while server is offline). Fixed npm global bin PATH for the declarative Letta install.

Removed xmrig miner configuration entirely — wallet, pool, darwin/linux modules, and all related files.
