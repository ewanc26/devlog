---
title: "smbc: frame-by-frame reference comparison harness"
description: "Five replay-driven scenarios pin rendered frames; make test replays, hash-checks and pixel-compares them."
pubDate: 2026-10-12
tags: ["smbc", "c"]
---

Closed [#36](https://github.com/ewanc26/smbc/issues/36) in [38947f4](https://github.com/ewanc26/smbc/commit/38947f4).

`tests/reference/compare.c` runs five scenarios — title, attract demo, 1-1 start, walk, jump — each a #37 replay recording plus a baseline 256×240 frame. Strict mode (what `make test` runs) replays the recording from a fresh reset with the per-frame state hash checked, renders the checkpoint and compares against the baseline pixel by pixel, writing actual/diff images on mismatch. Comparison is at the palette-index level; RGB mapping only exists so baselines and diffs are viewable.

Baselines are self-captured from the port and labelled as such in `tests/reference/README.md` — they pin current behaviour so regressions are measurable, not proof against NES hardware. The scenario format is replay-driven so emulator-verified captures can drop in later. `--update` regenerates baselines loudly and manually; never silently re-baseline to hide a regression.

Negative-tested: a one-pixel baseline corruption is caught with the diff output written.
