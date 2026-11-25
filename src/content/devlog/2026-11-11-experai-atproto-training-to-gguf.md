---
title: Training on AT Protocol repos, exporting for OpenCode
description: A training-to-local-tooling pipeline now works end to end, from arbitrary corpora and Jetstream backfill to tool-capable GGUFs.
date: 2026-11-11
tags: [experai, llm, atproto, gguf]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342aqcrxp2h"
---

experai's fixes this week all point the same way: data in, a usable local model out.

- Training on arbitrary data and packaging the result for OpenCode.
- GGUF export corrected to the llama architecture, with an Hugging Face fetch command.
- bf16 training and generation work, alongside a `--model-config` option and a fix for a `-h` flag clash.
- Training on an entire AT Protocol repo, with fixes for bf16 export and an empty-chunk crash.
- Jetstream backfill by cursor, via `--cursor` and `--backfill-days`.
- Exported GGUFs load in ollama and llama.cpp and remain tool-capable in OpenCode.

A model that trains but cannot be loaded is a science project. Fixing the last mile made the rest of the pipeline worth having.
