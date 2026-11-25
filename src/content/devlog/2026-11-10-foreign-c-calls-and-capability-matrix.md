---
title: Foreign C calls, new opcodes and a capability matrix
description: The language toolchain gained C FFI and compiler opcodes, then made differential testing follow a shared capability matrix.
date: 2026-11-10
tags: [numlang, sigi, selenium, ffi, testing]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342aqgiov2u"
---

Calling out to C stopped being a special case in one repo and became a capability the toolchain can describe and check.

- numlang gained general foreign C function calls: `@N` declarations and `$N` calls.
- sigi lowers foreign C declarations and calls to C on the `x/c` path.
- The capability matrix now records `ffi.call-c` as implemented in selenium and sigi.
- numlang's C++ compiler gained runtime opcodes 60–64 and integer division opcode 55.
- selenium ported its end-to-end suite to the C++ compiler binary and gated differential tests by the matrix in CI.
- sigi added a matrix-gated differential runner, also wired into CI.

The matrix is the useful part. It turns "which backend supports what" from a fact in someone's head into a file the tests can read.
