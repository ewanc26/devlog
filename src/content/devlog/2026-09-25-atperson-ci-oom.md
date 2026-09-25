---
title: ATperson CI OOM fix
description: Bound build parallelism to stop hosted-runner OOM kills on the network job
date: 2026-09-25
tags: [atperson, ci, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwefdiybs226"
---

Recent CI failures on main (runs 36087511878, 36085523282) and PR #171 (run 36128959450) were killed with exit 137/143 — runner OOM, not test failures. Unbounded `cmake --build` parallelism let GCC consume the entire 7 GB hosted-runner memory on the network job.

## Changes

- `CMAKE_BUILD_PARALLEL_LEVEL=2` set at workflow scope in `.github/workflows/ci.yml`, capping peak compiler memory without reducing test coverage. Slower builds, but they finish.
- `docs/ci-matrix.md` documents the bounded setting and the smoke-fuzz job.

## Notes

- The `src/app/state/time.cpp:110` snprintf truncation warnings are non-fatal and pre-existing; not addressed here.
- PR ewanc26/atperson#172 is its own verification: the same Network (Linux GCC) job that was dying completed in 4m4s, all six checks green. Once merged, #171 can re-run clean.
