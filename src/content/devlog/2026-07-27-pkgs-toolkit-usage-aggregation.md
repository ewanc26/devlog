---
title: pkgs moves toolkit-usage tracking server-side and stops hardcoding pds-landing
description: croft-click now aggregates toolkit usage across the whole network instead of trusting client-side writes from each tool, and pds-landing's components resolve their hostname at runtime instead of assuming one domain.
date: 2026-07-27T06:51:00Z
tags: [pkgs, croft-click, pds-landing, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjubqhsm2f"
---

## pkgs

### croft-click: usage aggregation, done properly

`jasper-web` and `tourmaline` each used to write their own `click.croft.toolkit.use` record after every import/share — self-reported usage, trusted at face value. `croft-click` now discovers and aggregates usage across the network itself, via `com.atproto.sync.listReposByCollection`, through a new server-side aggregator and `/api/toolkit-usage` endpoint. Both tools' client-side write calls were removed. A same-day follow-up fixed a bug in the new aggregator: it compared a per-page repo count against a cumulative DID count, which only came out right when the result cap was hit on the first page — a partial index on a later or short page could silently under-report.

Hasharium was added to the croft.click project directory; a "Crypto Contact" entry was added and then removed two days later.

### pds-landing: no longer one site's component

`PDSPage`'s `promptHost` no longer defaults to a hardcoded `pds.ewancroft.uk` — it resolves from `window.location.hostname` at runtime when left blank, and page title/OG/Twitter metadata in the layout do the same. `showNixpkg` now defaults off rather than on. A new `ResourceGrid` component surfaces live per-PDS resource stats — accounts, repos, records, blobs, storage, invite codes, and a per-account breakdown — from a `/stats` endpoint.

### housekeeping

A `TRADEMARKS.md` disclaiming Bluesky PBC affiliation was added at the monorepo root, alongside the same `AGENTS.md` add-then-correct pass that landed across the rest of the fleet this month.
