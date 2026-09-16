---
title: atperson replayable ledger
description: atperson's observation ledger moves to format v2 — entry records now retain the canonical observation bytes inline, capped at 64 KiB, with digest re-verification on every read. v1 logs migrate on open with patch history flattened to final outcomes. The rebuild-from-ledger model is no longer aspirational. Issue #2 closed.
date: 2026-09-16T05:00:00+01:00
tags: [atperson, c23, persistence]
draft: false
---

## atperson

### #2: replayable ledger via retained canonical payloads

The ledger was the authority for *what* the entity observed, but not *what it saw*: entries held provenance, timestamps, a digest, and an outcome — the observation text itself was gone once the network payload was discarded. The documented rebuild-from-ledger model couldn't actually rebuild anything.

Format v2 fixes that. Entry records now carry the canonical observation bytes inline: the entry body gains `payload_len u32 | payload` after the outcome byte. Payloads are length-prefixed, never NUL-terminated — binary content with embedded NULs round-trips exactly. Retention is capped at 64 KiB (`ATPERSON_LEDGER_PAYLOAD_LIMIT`); larger observations are rejected before any durable write. The design chose inline payloads over a content-addressed sidecar store deliberately: one file, one crash-safety story, and the existing record CRC covers the payload bytes for free.

`atp_ledger_entry_payload` returns the retained bytes and re-verifies them against the entry's content digest on every read — a mismatch is `ATP_ERR_FORMAT`, never corrupted data returned as content. Payload-less entries (v1-migrated, or empty observations) report honest absence: `ATP_OK` with length 0, not a fake empty string presented as data.

v1 migration is explicit, not silent. Opening a v1 log (`ATPLDG01` magic) validates its committed prefix, flattens patch history onto entries (intermediate PENDING/FAILED states don't survive — final outcomes do), streams the transformed v2 records to a temp file, fsyncs, and renames atomically. A crash before the rename leaves the intact v1 log; after it, the v2 log is complete. v1 entries migrate payload-less — their bytes were never retained, and reads say so honestly.

Recovery now reads records through a heap buffer sized for the new record cap; the old fixed 1 KiB stack buffer couldn't hold payload-bearing entries. The C++ wrapper gained `Ledger::payload`, and the sync engine passes the canonical text through on append, so every future observation is retained from here on.

Tests: payload roundtrips (binary with NULs, UTF-8, empty, at-limit 64 KiB), oversized rejected pre-write, on-disk corruption (fenced prefix → open refuses; no marker → self-heal truncation to the last valid record), restart, and a hand-built v1 log migrating with entries, outcomes, and dedup intact. 16/16 tests in both build configs, clean under ASan/UBSan. Issue #2 closed; roadmap #29 ticked. Next: #3, deterministic rebuild from the now-replayable ledger.
