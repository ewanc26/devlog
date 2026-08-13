---
title: malachite gains a polish migration subtool
description: A new -m polish mode (and matching web wizard card) backfills legacy fm.teal.alpha.feed.play scrobbles into production fm.teal.feed.play, preserving rkeys, then removes the legacy copies after each backfill succeeds. The migration logic is shared through croft-click-core.
date: 2026-08-13T02:53:26Z
tags: [pkgs, malachite, malachite-web, croft-click-core, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswnh6enrs2l"
---

## malachite: polish mode

`malachite` gained a migration subtool, exposed as `-m polish` on the CLI and option 13 in the interactive menu. It moves legacy `fm.teal.alpha.feed.play` scrobbles into the production `fm.teal.feed.play` collection, then deletes the legacy copies.

Backfills preserve each record's rkey and rewrite only its `$type`. Alpha records whose rkey already exists in production are not backfilled at all — their production counterpart exists, so the legacy copy is dropped directly. Backfill failures are reported and the affected legacy copies are retained, so re-running polish finishes the job without ever losing data. Dry-run analyzes both collections over CAR and reports the plan (backfill vs drop counts) without writing anything.

The logic is browser-safe and lives in `croft-click-core` (`buildPolishPlan`, `analyzeLegacyRecords`, `migrateLegacyRecords`), consumed by both the CLI wrapper and `malachite-web`. The web wizard gained a "Polish" mode card — no files needed, options limited to dry run — and its run step reports backfilled/removed counts. Both the CLI and web write a `click.croft.toolkit.use` record with `mode: 'polish'` on completion. The help text and menu carry the disclaimer that this is a migration subtool, not a Polish-language version of Malachite.
