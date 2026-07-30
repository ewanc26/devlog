---
title: pds-status-tophhie fixes its install and types its remote responses
description: Unbroke a pnpm install, replaced the untouched scaffold README with a real one, and typed the remote PDS responses instead of trusting them as any.
date: 2026-07-28T09:37:00Z
tags: [pds-status-tophhie, tooling, security]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjuaxzle2f"
---

## pds-status-tophhie

`pnpm-workspace.yaml` was missing entirely, which meant pnpm 11 had no `allowBuilds` declaration for esbuild's native postinstall — install/check/build all failed outright. Fixed.

The README was still the unedited `sv` CLI scaffold. It's now a real description of what the status page shows and exactly where each figure comes from: the PDS's own `_health` and `describeServer`, `sync.listRepos`, a plc.directory lookup, and Tophhie Cloud API's heatmap and blob-usage figures.

`src/lib/api.ts`'s remote PDS response shapes were previously typed `any`. They're now typed properly, `describeServer`'s privacy-policy and terms URLs are validated as http(s) before being rendered as links, the DID passed to the plc.directory lookup is URL-encoded, and the heatmap/blob-usage numeric parsing is defensive against malformed upstream data instead of assuming it's always well-formed.
