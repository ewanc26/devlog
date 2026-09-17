---
title: atperson — fuzz and property harnesses
description: libFuzzer targets for snapshot, ledger, and tokenizer boundaries plus deterministic round-trip property tests.
date: 2026-09-17
tags: [atperson, testing, fuzzing, libfuzzer, c23]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvptjxfj622y"
---

Issue #11 landed (`eb67ffe`): fuzz and property testing for the binary
persistence and text ingestion boundaries.

**Fuzz targets** (`fuzz/`, behind `ATPERSON_BUILD_FUZZ`, Clang +
libFuzzer + ASan/UBSan, never built by default):

- `snapshot_load_fuzzer` — `atp_graph_load` over arbitrary bytes; loaded
  graphs are queried so decoder-trusted values flow downstream.
- `ledger_open_fuzzer` — `atp_ledger_open` over arbitrary bytes; opened
  ledgers are enumerated and payloads re-verified against digests.
- `tokenize_fuzzer` — both schema contracts over arbitrary byte
  sequences, checking token bounds, emptiness, and the schema-2 U+FFFD
  separator rule.

One contract subtlety the fuzzer surfaced immediately: schema 1 is
deliberately byte-oriented, so U+FFFD's encoding legitimately forms a
token there — the U+FFFD exclusion is a schema-2 rule only. The harness
is schema-aware now, and that distinction is documented in the target.

**Seed corpora** (`fuzz/corpus/`) hold real-format fixtures — valid and
rich snapshots, a ledger with payloads/patches/withdrawals, tokenizer
inputs covering invalid UTF-8, NFC text, emoji — plus the
coverage-increasing inputs the smoke runs evolved, retained as
regression seeds.

**Property tests** (`tests/property_test.cpp`, in the normal suite):
reproducible xorshift inputs drive snapshot save/load equivalence,
ledger append/reopen equivalence with dedup-key survival, and replay
convergence to directly-observed state.

CI gains a bounded smoke-fuzz job (30s per target) that runs alongside
the existing matrix without slowing ordinary checks. Both ordinary
configurations pass 34/34.
