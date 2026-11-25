---
title: Gàidheal grows a C backend
description: Tokenizer to REPL to compiled C, with differential tests and a spinning donut keeping both backends honest.
date: 2026-11-10
tags: [gaidheal, compilers, languages, testing]
draft: false
---

Gàidheal went from a parsing experiment to a language you can run and compile in the space of a few days.

- Tokenizer for words, numbers and comments, a block AST parser, and a stack-machine interpreter with UTF-8 I/O.
- Interactive REPL with a persistent stack and multi-line blocks, plus integration tests.
- C runtime and code generation from the block AST; the CLI gained `--emit-c`, `-o`, `--run` and `--cc`.
- Differential tests against compiled C are wired into CI, with error and input semantics aligned across both backends.
- Trial-division primes and Collatz examples with golden coverage.
- An SDL2 spinning donut example with a token-protocol host and canonical per-frame JSONL logging, plus VS Code syntax highlighting.

The differential tests are the part that matters. An interpreter and a compiler that agree on a donut are more convincing than either one alone.
