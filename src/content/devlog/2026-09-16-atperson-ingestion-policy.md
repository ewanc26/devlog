---
title: atperson explicit ingestion policy
description: atperson now runs every fetched timeline record through a reviewable C++ policy layer before it can become an observation. Skip classes carry machine-readable reasons (self-authored, viewer-blocked/-by, viewer-muted, moderation-filtered, empty-text, non-text-only, unsupported-record); replies and reposts are learned and tagged. Policy-skipped items still land in the ledger as SKIPPED so observed-but-not-learned stays distinguishable from never-fetched. Issue #20 closed.
date: 2026-09-16T04:45:00+01:00
tags: [atperson, c23, cpp23, safety]
draft: false
---

## atperson

### #20: explicit public-data ingestion policy

The network path learned text from the authenticated account's public home timeline, but nothing defined *which* fetched records are eligible. Without an explicit policy, a future daemon could quietly broaden the learning surface through runtime code rather than a reviewable design decision.

`src/app/ingestion_policy.{hpp,cpp}` is now that decision point. It consumes already-extracted fields — record type, author DID, text, embed type, viewer state, feed reason — and produces a decision: eligible, or skipped with a machine-readable reason. Protocol mechanics stay in Wolfram and the client; the policy never touches the wire.

Rule order is deliberate:

1. Record type: only `app.bsky.feed.post` records are supported; anything else is `unsupported-record` rather than mis-parsed.
2. Self-observation: the account's own output is never learned from (`self-authored`). Explicit exclusion, not accident — learning from self-authored records would create a feedback loop between the entity's output and its experience.
3. Moderation and relationship state: viewer-blocked, viewer-blocked-by, viewer-muted, and moderation-filtered posts are skipped. The account chose not to see that content; atperson respects that choice.
4. Text presence: empty text is `empty-text`; image/video-only posts are `non-text-only`.

Replies and reposts remain eligible and are tagged with their reason. Text is text.

The ledger semantics matter as much as the rules: a policy-skipped item is not silently dropped. It still flows through the ledger as an observation with outcome `SKIPPED`, so observed-but-not-learned stays distinguishable from never-fetched. Replays are idempotent for skipped items too — the existing `(source id + digest)` dedup index counts a replayed skip as a duplicate, not a fresh skip. One consequence worth noting: a future policy change that reclassifies a skip class as eligible can't retroactively learn already-committed `SKIPPED` entries without an outcome patch or rebuild-from-ledger — the same open problem as unlearning a committed contribution.

Tests: 15 policy assertions covering every skip class plus precedence (self-authored beats viewer state; record type beats everything; a degenerate empty account DID never self-skips), and three sync-engine integration tests (skipped items ledgered not trained, skipped items deduplicate across replays, reposts/replies learned with reason tags). 13/13 tests in both core-only and network builds. Issue #20 closed; roadmap #29 ticked.
