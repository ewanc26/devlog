---
title: New project — plainspeak, an esoteric language with English sentence grammar
description: A deterministic, non-ML esolang whose syntax is a constrained subset of English, compiling through a C++20 frontend to portable C99 and then a native binary via the system C compiler.
date: 2026-08-10T21:38:54Z
tags: [plainspeak, esolang, compilers, c, cpp]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24xews2l"
---

## plainspeak

A new project, built in a single day (2026-08-10, 40 commits start to finish): a deterministic, non-ML esoteric programming language whose surface syntax is a constrained subset of English. `Say "Hello, world!".` and `Set total to 0.` are programs, not pseudocode — sentences are the unit of syntax, not symbols.

### the pipeline, and the "no LLM" rule

`plainspeak` source (`.eng`) goes through a lexer, sentence splitter, recursive-descent/Pratt parser, semantic analysis, and a C code generator, then hands the emitted C99 off to whatever system C compiler is available (`cc`/`gcc`/`clang`) for the native binary. The compiler frontend itself is C++20; that's an implementation detail, not part of the language's public surface.

`AGENTS.md` is explicit about the one invariant the whole design hangs off: there is no LLM, no statistical model, and no fuzzy/edit-distance matching anywhere in the toolchain, including as a dev tool or fuzzer oracle. "Sounds like English" is a property of a fixed grammar, not of runtime behavior — every valid program is accepted by that grammar, and every rejection is a precise parse error naming the offending word and its source location. Synonym support (`set` / `let` / `make` all resolving to one canonical `Set` token) is a flat alias-table lookup, never a heuristic.

### what's actually in the grammar

By the end of the day the language covers: `Say`/`Set`/`Add`/`Subtract`/`Read`/`ReadFloat`, `#` and `comment`-statement comments, `Repeat`/`If`/`Else`/`While` blocks, `Call`/`Procedure`/`Return`, boolean literals, and a full expression grammar with `and`/`or`/`not`, six comparison operators, `plus`/`minus`/`times`/`divided by`/`mod`, `to the power of`, parentheses, unary `minus`, and a math-function set (`square root of`, `absolute value of`, `sine`/`cosine`/`tangent`/`sqrt`/`log`/`abs`/`floor`/`ceil`). Two types exist beyond `string`: `number` (a C `long`) and `decimal` (a C `double`), with mixed `number`/`decimal` arithmetic promoting to `decimal` and `plus` also doing string concatenation against any type.

Every one of those is backed by a golden test (`.eng` source compiled, run, and diffed against a `.expected` stdout file) — `docs/grammar.md` states plainly that a parser accepting something the grammar doc doesn't describe is a bug, and there's a rule that grammar changes and `docs/grammar.md` changes land in the same commit.

### errors have a catalogue, not just messages

Diagnostics carry stable `E00xx` codes registered in `docs/errors.md` rather than one-off inline strings — `E0001` undeclared variable, `E0002`/`E0003` type mismatches in `plus`/`Add`, `E0007`/`E0008` undefined procedure and wrong argument count, and so on. The style guide asks for messages a first-time reader would understand from the grammar docs alone, e.g. pointing at the exact word plainspeak didn't recognize and listing what it expected instead. Negative golden tests under `tests/golden/errors/` pin eight of these end to end: undeclared vars, type mismatches in comparisons and `not`/`plus`, missing `Else` colons, undefined procedures, and wrong arg counts.

### building it out: floats and math

The last five commits of the day form one coherent feature arc: adding `Double`/float support from the ground up. A `Float` token and `LParen`/`RParen` land in the lexer; `FloatLit`, `MathCallExpr`, `PowExpr`, `ReadFloatStmt`, and unary-minus land in the AST; the runtime gets a `PS_DOUBLE` tag plus `ps_sin`, `ps_cos`, `ps_tan`, `ps_sqrt`, `ps_log`, `ps_abs`, `ps_floor`, `ps_ceil`, and `ps_pow`; sema learns mixed int/decimal promotion and type-checks math calls and power expressions; codegen emits calls into all of it; and a batch of golden/unit tests locks the whole thing down. It closes with `examples/calculator.eng`, a 15-operation menu-driven scientific calculator (add through ceiling, with divide-by-zero and negative-sqrt/log guards) that exercises effectively the whole language at once — floats, math functions, `ReadFloat`, procedures, loops, and conditionals together.

### status

Working v0 scaffold: ~1,900 lines across the compiler and runtime, CMake as the sole build system (with a fallback raw g++ invocation documented in the README for anyone without CMake), Catch2 for unit tests, and a shell-script golden-test runner. No arrays, lists, or user-defined types yet, and string concatenation results are heap-allocated and never freed — both called out explicitly in `docs/grammar.md` as known v0 gaps rather than oversights.
