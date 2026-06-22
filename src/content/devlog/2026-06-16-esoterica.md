---
title: Esoterica — a constructed language workshop in Rust
description: Built a TUI tool for generating constructed languages with a comprehensive linguistic taxonomy, Ratatui terminal interface, and AT Protocol publishing via standard.site.
date: 2026-06-16T12:00:00Z
tags: [esoterica, rust, linguistics, tui, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3movapvdddg2m"
---

## esoterica

Esoterica is a constructed language (conlang) workshop — a Rust TUI application that generates fictional languages using a comprehensive linguistic taxonomy. It started as a Python script and was rewritten into a full Ratatui-based terminal application with AT Protocol publishing.

### the taxonomy

The linguistic engine models language structure across multiple dimensions:

- **Phonology** — consonant and vowel inventories, phonotactic constraints, syllable structure rules. Configured via TOML files that specify which sounds the language uses and how they combine.
- **Morphology** — word formation rules, inflection patterns, derivational affixes. The system generates morpheme tables from high-level parameters (agglutinating vs fusional, prefixing vs suffixing).
- **Sound changes** — diachronic sound change rules that apply to the generated vocabulary, simulating historical linguistic evolution. Specified as ordered rules in TOML.
- **Syntax archetypes** — word order templates (SOV, SVO, VSO, etc.), alignment systems (nominative-accusative, ergative-absolutive), and phrase structure rules.
- **Lexicon generation** — vocabulary generation from the phonological and morphological rules, producing OED-like dictionary structures with etymologies, definitions, and usage notes.

All of this is configured through modular TOML files — swap out a phonology file to change how the language sounds, swap a syntax file to change how it structures sentences.

### the tui

The terminal interface uses Ratatui, the Rust TUI library. It provides:

- Interactive language generation — tweak parameters and see the output update in real time
- A component composition system that lets different UI panels (phonology viewer, lexicon browser, syntax inspector) share state without coupling
- Keyboard-driven navigation following terminal application conventions

### at protocol publishing

Generated languages can be published to AT Protocol via the `standard.site` lexicon. Each language becomes a document with structured metadata — the phonological inventory, syntax profile, and sample lexicon — making conlangs discoverable and shareable through the AT Proto network. The publishing pipeline serialises the internal Rust types directly to the lexicon JSON format.

### why rust for linguistics

Linguistic data is deeply structured. Rust's enum system models phonological features (place of articulation, manner, voicing) as exhaustive variants, making invalid states unrepresentable. The borrow checker prevents accidental mutation of shared linguistic data during generation. And the TOML configuration format (via `toml` and `serde`) maps naturally to the hierarchical structure of linguistic rules.
