---
title: atperson withdrawal and unlearning
description: "atperson gains ATP_LEDGER_OUTCOME_WITHDRAWN and atperson withdraw — durable, append-only, idempotent exclusion of observations by id, source URI, or author DID. Rebuild produces the state that would have existed without them. Issue #4 closed."
date: 2026-09-16T05:40:00+01:00
tags: [atperson, c23, persistence]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvmcsvgzf22y"
---

## atperson

### #4: source withdrawal, deletion, and unlearning semantics

Learned contributions were permanent: once an observation reached the graph, nothing could remove its influence. #4 closes that. The design insight is that the ledger already had the right primitive — `atp_ledger_set_outcome` appends a 9-byte patch record and never rewrites log bytes — so withdrawal is a fifth outcome, `ATP_LEDGER_OUTCOME_WITHDRAWN`, flowing through the existing patch mechanism. Append-only, durable, idempotent for free, and the patch sequence on disk is the audit trail.

Three scopes: withdraw by ledger id, by source URI (a deleted AT record), and by author DID (an excluded account). Edited records needed no new machinery — the dedup index keys on `(source id + content digest)`, so the same URI with new content appends a fresh entry. Withdrawing the old content excludes it while the edit trains normally.

The deliberate design decision: withdrawal never mutates the live graph. The graph has no inverse-observe, and approximate subtraction from neural parameters wouldn't restore the state that would have existed without the source — the architecture explicitly rejects that. Instead withdrawal patches the ledger, and the next rebuild produces the corrected state atomically. Already-evicted episodic memories need no special handling either: eviction is deterministic from replay order, so a rebuilt graph never contains episodes from withdrawn observations. The ledger is the authority; the snapshot is a cache.

A withdrawn entry is committed history — it blocks re-append (the observation stays deduplicated) and cannot regress to PENDING. Rebuild excludes withdrawn entries from graph, neural training, familiarity, memory, counters, and the snapshot mirror entirely; the replay report counts them as `excluded_withdrawn` so exclusions are visible at rebuild time.

The CLI surfaces this as `atperson withdraw <id|source|author> <target>`, which prints a reminder to run `atperson rebuild` to apply it to learned state. Verified end-to-end: rebuild → withdraw one source → rebuild shows the observation count drop and `1 withdrawn` in the report; re-withdrawing the same source withdraws nothing new.

Tests: withdraw-by-id with siblings untouched, idempotency at both API and log level, PENDING regression rejected, withdraw-by-source (including re-withdrawal and missing sources), withdraw-by-author (already-withdrawn entries not recounted), re-append blocked after withdrawal, edited-record behaviour, restart persistence of withdrawal patches, rebuild exclusion (the withdrawn text's distinctive tokens never enter the rebuilt graph), rebuild determinism with withdrawals present, and argument validation. 19/19 tests in both build configurations, clean under ASan/UBSan.

Also this session: the #3 replay work's CI run caught a payload-buffer leak on the failure paths that local ASan missed (macOS doesn't support `detect_leaks`; Linux CI does). `atp_replay_ledger` was restructured to a single exit point so every failure path frees — that class of bug is now structurally impossible there. Issue #4 closed; roadmap #29 ticked. Next: #5, portable snapshot format and migration.
