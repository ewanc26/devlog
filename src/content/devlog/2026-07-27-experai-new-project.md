---
title: New project — experai, an LLM training toolkit that refuses to swap
description: A Rust LLM training toolkit on Candle with hardware-aware auto-tuning, AT Protocol data sources, and a memory governor that throttles training rather than let the OS dip into swap.
date: 2026-07-27T14:44:00Z
tags: [experai, rust, machine-learning, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjublwce2f"
---

## experai

A new project, built in about three days (2026-07-24 to 2026-07-27): a small language model training toolkit in Rust, built on the Candle ML framework, with CUDA/Metal/CPU backends.

### training from AT Protocol data

Beyond the usual local-JSONL training path, `experai` can fetch a Bluesky account's posts via REST and train on them directly, or stream posts live from the AT Protocol Jetstream firehose with English-only filtering — training data sourced straight from the network rather than a static export.

### the memory governor

The most distinctive piece. A system load monitor tracks CPU, memory, and swap with EMA smoothing and enforces a zero-tolerance swap policy: any swap in use at all triggers a hard throttle — batch size cut to a quarter, learning rate halved, precision forced to f32. If swap creeps past 2% of capacity, or free memory drops below 2GB, training pauses for two seconds to let the OS reclaim memory before continuing. Softer CPU/memory thresholds scale batch size and learning rate down well before it gets that far. The design goal, stated plainly in the README: never stutter, never dip into swap.

### hardware-aware training and export

`--auto-tune` detects available VRAM and sets batch size, gradient accumulation, sequence length, and precision accordingly. Trained checkpoints can be exported to GGUF (with configurable quantization) for direct use in LM Studio.

### correctness fixes

Three real bugs were fixed in the final commits of this window: a negated cross-entropy loss sign, non-reproducible seeding, and RoPE positional encoding — all three landed together, right before the docs-only tail confirming the project only builds locally on macOS/Metal (the default `cuda` feature doesn't compile there; CUDA paths are verified in CI on a GPU runner instead).
