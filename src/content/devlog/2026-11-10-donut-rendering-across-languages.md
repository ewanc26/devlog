---
title: One donut, five language implementations
description: numlang, plainspeak, selenium, sigi and Gàidheal converged on the same float32 torus, SDL2 host and per-frame JSONL trace.
date: 2026-11-10
tags: [numlang, plainspeak, selenium, sigi, rendering]
draft: false
---

The spinning donut became a shared conformance test without anyone setting out to make one.

- Finite-frame SDL2 donut engines landed in numlang, plainspeak, selenium and sigi.
- numlang's engine was harmonized byte-for-byte with the canonical sigi stream.
- Every implementation matches `doughnut.c` float32 semantics.
- Canonical per-frame JSONL logging on each host makes the streams directly comparable.
- Gàidheal joined with its own token-protocol host and the same logging format.

Five implementations of the same geometry, producing traces you can diff, is a better smoke test than five unrelated hello-world programs.
