---
title: DNS split toggle and Bitwarden CLI
description: Added a split DNS toggle to nix-config and set up Bitwarden CLI (bw) for the EU-hosted vault.
date: 2026-05-08
tags: [infra, nix, config]
draft: false
---

## Split DNS toggle

The retired server's CoreDNS was still configured in nix-config. Added `myConfig.services.splitDns.enable` (default `true`) to `modules/options.nix` and wired it into `modules/server/infra/network/split-dns.nix` so CoreDNS, firewall rules, and the systemd service can be cleanly disabled when the server is offline.

Set `myConfig.services.splitDns.enable = false` in `hosts/server/default.nix`. Toggle back to `true` when the server returns.

Also removed the dead `100.78.91.100` nameserver entry from the Tailscale admin console, which was intercepting all `ewancroft.uk` queries.

## Bitwarden CLI

Swapped `rbw` for the official `bitwarden-cli` package. Added it to `packages.darwin` in nix-config. Configured with `bw config server https://vault.bitwarden.eu` to point at the hosted EU vault.

Also fixed the Forgejo clone script in home-manager activation: added API response validation before piping through `jq`, so a dead server returns a clean message instead of a parse error.
