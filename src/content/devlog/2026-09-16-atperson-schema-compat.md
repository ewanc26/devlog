---
title: "atperson: learning-schema compatibility for replay"
description: "Replay and snapshot load now refuse foreign learning schemas with a dedicated status instead of reinterpreting them."
date: 2026-09-16
tags: [atperson, c, release]
draft: false
---

atperson `81aace8` — learning-schema compatibility for replay across algorithm changes (issue #6).

Every ledger entry records the learning schema it was observed under. Replay now consults a single compatibility predicate, `atp_schema_can_replay(version)`, per entry; snapshots record the schema that produced their state in a new section 8 and load refuses foreign ones.

- `ATP_ERR_SCHEMA = 6`, distinct from `ATP_ERR_FORMAT` (corruption): the data is intact, the model generation is the mismatch.
- `atp_replay_report.failed_at_id` and `.failed_schema` name the exact entry where a mixed-schema ledger broke.
- Mixed-schema ledgers replay deterministically in id order and fail at the first unreplayable entry — old and new algorithms are never ambiguously mixed in one graph.
- Snapshot section 8 is forward-compatible: v5 readers written before section 8 skip unknown tags, and snapshots without it load as schema 1.
- The C++ layer surfaces actionable errors for both paths: replay names the entry and schema, load points at `atperson rebuild` or a new model generation.
- Fixtures cover compatible transitions (current-schema ledger replays through the table), incompatible transitions (foreign schema refused), mixed ledgers, and hand-rewritten section 8 bytes with a fixed digest.
- Docs: architecture.md gained a "Learning-schema compatibility" section with the three compatibility classes and review guidance — any PR touching tokenisation, sampling, memory selection, familiarity, or the training equations must include a schema-version decision.

20/20 tests on core, ASan, and network builds.
