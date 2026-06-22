---
title: Rewriting Sigi in Rust
description: A complete reimplementation of the Sigi symbolic stack language from Python to Rust — lexer, parser, AST, C code generation, CLI, interpreter, and REPL.
date: 2026-06-08T12:00:00Z
tags: [sigi, rust, language-design]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwmyif2k"
---

## sigi rust rewrite

Sigi — the symbolic stack language — got a complete reimplementation in Rust. The original Python prototype (covered in the April 2026 [Sigi devlog](/2026/04/01/sigi-symbolic-stack-language)) proved the concept, but Rust brings performance, safety, and the ability to compile to native binaries. The entire stack was rebuilt from scratch in a single session.

### architecture

The rewrite follows a classic compiler pipeline:

- **Lexer** — implemented as a Rust Iterator that yields tokens lazily. Comes with a full test suite.
- **Parser** — consumes the token stream and produces an AST. Handles the stack-based expression grammar.
- **AST** — the intermediate representation, with semantic analysis for named identifiers, type checking, and scope resolution.
- **Code generation** — emits C source code from the AST. This is the key feature: Sigi programs compile to portable C that can be built anywhere.
- **Interpreter** — a tree-walking interpreter for direct execution without the C compilation step.
- **REPL** — an interactive read-eval-print loop for experimentation.

### memory management

The AFREE system handles dynamic array management at the language level. Rather than relying on Rust's ownership model for user-facing arrays, Sigi implements its own allocation and deallocation primitives that compile down to explicit C memory operations. This gives Sigi programs control over their memory footprint while keeping the runtime predictable.

### file i/o

The file I/O layer supports reading `.sigi` source files, writing generated C output, and managing build artifacts. Combined with the CLI, the workflow is: write a `.sigi` file, run `sigi build`, and get a compiled C program.

### why rust

The Python prototype was great for exploration but slow and hard to distribute. Rust's pattern matching makes AST manipulation natural, its ownership model prevents the memory bugs that plague interpreter implementations, and `cargo build --release` produces a single static binary with no runtime dependencies. The compiler-as-library pattern (where the lexer, parser, and codegen are all library crates with a thin CLI on top) keeps the architecture clean.
