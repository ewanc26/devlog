---
title: Formant finds its voice
description: From a sine-wave engine and full IPA input to distributable voices, SSML prosody and deterministic neural intonation.
date: 2026-11-25
tags: [formant, speech-synthesis, ipa, prosody]
draft: false
---

Formant grew from a first synthesis engine into something with voices, timing and a way to describe how a line should be said.

### the engine

- Initial sine-wave voice synthesis engine.
- Full IPA and X-SAMPA input, with apical/laminal diacritics and tie-bar forms recognised.
- Diphthong targets and suffix rules; English `ck`, `gh` and `tch` handled as single units, and silent word-final `b` dropped in `mb` clusters.
- Edge-case tests, a fix for negative WAV clipping, and double-precision sample accumulation during normalization.
- Tagged releases automated, with checksums and a version test.

### the voice

- Voice definition files and a parameter lab, then distributable voice packages and an examples gallery.
- A minimal SSML subset, ToBI-style symbolic intonation tags, and direct F0/duration override files.
- Sample-accurate timing output, configurable audio paths and deterministic dither.
- A performance benchmark and byte-identical hot-path tuning, with objective metrics in the verification harness.
- Data-defined nonverbal vocalizations, breath-group planning for long-form reading, and deterministic growing neural prosody.

Getting a waveform out was week one. Making the same waveform come out twice, with a stated intonation, is the part that turns a synthesizer into an instrument.
