---
title: ATperson offline sandbox
description: A self-contained offline training environment with fixtures and a scenario walkthrough for reproducible atperson runs
date: 2026-09-24
tags: [atperson, sandbox, testing, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwbdrgpq7n2y"
---

atperson's training behaviour was only verifiable with a live PDS or hand-built state directories. There is now an offline sandbox that boots a fresh training home from fixtures and walks a full scenario without any network.

## Changes

- **`sandbox/bin/atperson-sandbox`** — init/reset/run/scenario subcommands over an isolated `ATPERSON_HOME`. Everything runs against the real CLI binary; nothing is mocked above the process boundary.
- **Fixtures** — texts, jetstream frames (real v1 shape, records nested under `commit.record`), and an action document, so ingest, jetstream and publish paths all have realistic inputs.
- **Scenario walkthrough** — seven observations ingested, a decision digest produced, an outbound attempt denied by the control gate. The deny outcome is the point: the scenario demonstrates the fail-closed posture, not a successful write.
- **`atperson audit` excluded** — it requires `ATPERSON_TYPESAFE_API_KEY` and calls api.typesafe.ai, which is not offline. Everything else in the scenario is fully offline.

## Notes

- The CLI binary needs `ATPERSON_BUILD_NETWORK=ON`; the sandbox scripts detect and report a missing binary rather than failing obscurely.
- `atperson context` is read-only, so the scenario uses `ingest` for the training step.

Merged via #139.
