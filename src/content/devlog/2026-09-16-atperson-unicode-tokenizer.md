---
title: "atperson: Unicode tokenization contract"
description: "Token identity is now a schema-versioned contract — NFKC_Casefold equivalence, category boundaries, UTF-8 sanitization — replacing four byte-oriented tokenizer copies."
date: 2026-09-16
tags: [atperson, c, release]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvmjgybq522y"
---

atperson `807893a` — Unicode normalization and tokenization semantics (issue #8).

Token identity is durable learning state: vocabulary, edges, episodes, and snapshots all key on token bytes. The old tokenizer was byte-oriented and duplicated in four places (observation, action context, recall, lookup), with locale-dependent `tolower`, no UTF-8 validation, and truncation that could split a multibyte character mid-sequence.

All four copies are gone. One schema-versioned implementation (`atp_tokenize` in src/core/tokenize.c) drives every token-producing path, selected by the entry's schema version:

- **Schema 1** preserves the legacy byte scanner byte-for-byte, so schema-1 ledger entries replay with identical token identity. Adapter migration, not a break.
- **Schema 2** sanitizes invalid UTF-8 to U+FFFD separators first (utf8proc's map rejects invalid input outright, so sanitization has to run before it), then normalizes with NFKC_Casefold + LUMP, then selects token bytes by Unicode category: letters, marks, and numbers, plus apostrophe, hyphen, underscore. Everything else separates.

What that buys: `café` in NFC and NFD spellings land on one vocabulary node. `STRASSE`, `Straße`, and `straße` collapse under case folding, as do Cyrillic ГОРОД and Greek Γάλα. The fi ligature decomposes, the Kelvin sign folds to `k`, and typographic apostrophes lump to ASCII — `don’t` and `don't` are the same token. Emoji are separators on purpose: ZWJ sequences and skin-tone modifiers would explode the vocabulary with visually-identical variants. Truncation now lands on codepoint boundaries.

utf8proc (MIT, pure C, pinned v2.11.0) provides normalization without dragging a C++ or Wolfram dependency into the core.

Tests cover canonical equivalence, script case folding, CJK single tokens, emoji/ZWJ separators, malformed UTF-8 (lone continuation, truncated, overlong), codepoint-boundary truncation, legacy dispatch, and graph-level identity. 24/24 on core, ASan, and network builds.
