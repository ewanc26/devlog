---
title: atperson paginated sync and persistent ingestion cursor
description: atperson sync now consumes bounded multi-page timeline catch-ups through Wolfram's cursor-aware API with a versioned ingestion-state checkpoint at ~/.ewanc26/atperson/ingestion-state.json. The cursor is runtime fetching metadata only — the observation ledger stays the sole authority for what has been learned. Cursor advancement is page-granular (every observation durably processed before checkpointing), rejected cursors reset to the head, and all atperson data now defaults to ~/.ewanc26/atperson/.
date: 2026-09-16T04:10:00+01:00
tags: [atperson, wolfram, atproto, c23, cpp23, ci]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvm62ohesk2y"
---

## atperson

### #19: paginated catch-up and persistent ingestion cursor

`sync` was a one-shot single-page sample — posts between runs were missed and repeated runs leaned entirely on ledger dedup with no defined catch-up boundary. It now consumes up to `max-pages` bounded timeline pages per run through Wolfram's cursor-aware `wf_agent_get_timeline`, resuming interrupted traversals from a persisted cursor.

The ingestion state lives at `~/.ewanc26/atperson/ingestion-state.json` — a versioned `atperson-ingestion-state` JSON document (v1). It's C++ runtime metadata, deliberately outside the C23 model snapshot: no cursor fields touched `atp_graph`, `atp_ledger_entry`, or snapshot v4. The cursor is bound to the authenticated account DID (`wf_agent_get_did`, never the login handle), normalised service URL, endpoint, and algorithm — a cursor from another account or service is reported and never reused.

Authority hierarchy, now explicit in the architecture doc:

```text
observation ledger = authority for what has been committed
model snapshot     = durable learned state
ingestion state    = fetching optimisation/checkpoint only
```

The AT Protocol cursor stays opaque — read, persisted, passed back to Wolfram, never parsed or compared. Cursor advancement is page-granular: every observation in a page goes through the durable pipeline (ledger PENDING → remember → outcome commit → snapshot mirror) before that page's cursor is checkpointed. A failure anywhere aborts without advancing anything; restart refetches the same page and ledger dedup suppresses committed items. Refetch + deduplicate, never skip.

Exhaustion clears the cursor so the next sync starts at the current head again — an expired cursor can never cause new head posts to be skipped, because the ledger filters already-seen `(source id, digest)` pairs. A cursor the service rejects (HTTP-layer failure) is reported, discarded, and the run restarts from the head: a fetching-state failure, never a model-state failure.

New CLI: `sync [max-pages]` (page size via `ATPERSON_SYNC_PAGE_SIZE`), `cursor status`, `cursor reset`. All atperson data now defaults to `~/.ewanc26/atperson/` instead of a `.atperson/` directory in the working directory, overridable with `ATPERSON_HOME` or the existing per-path env vars.

cJSON (the parser Wolfram already uses) is now fetched unconditionally so the runtime layer builds and tests without the network stack; the network build reuses the same FetchContent.

18 new offline tests cover the format (round trip, malformed JSON, unsupported version, impossible field combinations, source mismatch, leftover `.tmp` never winning) and the restart semantics (active cursor survives restart, exhaustion clears cursor, transport failure keeps the old cursor, mid-page processing failure doesn't advance, refetch deduplicates via the ledger, state operations never mutate learned state). Core-only and Wolfram-backed builds both pass 29/29. Issue #19 closed; roadmap #29 updated.

One CI follow-up: cJSON's `bool` macro broke the Linux Clang and ASan jobs under `-Werror`. Two-part fix — the same `-Wno-keyword-macro` flag Wolfram's build applies to its own cJSON dependency, plus disabling cJSON's vendored test suite (it compiles `cJSON.c` without the suppression and duplicates parser coverage atperson's tests already exercise through real usage).
