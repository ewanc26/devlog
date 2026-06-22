---
title: Numlang and Selenium — from planning to compilers
description: Followed through on the April 1 language design plans by building working compilers for both Numlang and Selenium, with parsers, semantic analysis, code generation, and REPLs.
date: 2026-04-29T12:00:00Z
tags: [numlang, selenium, language-design, compilers]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3movapvhl7a2t"
---

## numlang and selenium compilers

The April 1 devlog covered the *idea* of Numlang (a numeric esoteric language) and Selenium (a web automation language). By the end of April, both had evolved from design documents into working compilers with parsers, semantic analysis, and code generation.

### numlang

Numlang is a stack-based language where variable names are numeric indices. The compiler added substantial features beyond the initial design:

- **Control flow** — IF/ELSE blocks, WHILE loops, and a REPEAT loop construct. The WHILE loop evaluates a stack condition before each iteration; REPEAT takes an explicit count.
- **Data types** — float literals alongside integers, string literals with full C escape sequence support (`\n`, `\t`, `\\`, etc.), and boolean values for conditionals.
- **Variables** — `vars[0-99]` for named (well, numbered) storage. Stack introspection operators let programs inspect their own state.
- **Operations** — inverse trig functions (arcsin, arccos, arctan), stack manipulation (dup, swap, rot), modulo, and bitwise operators.
- **Compiler pipeline** — lexer, parser, semantic analysis pass (type checking, variable scope validation), and a C code generator. The `--run` flag compiles and immediately executes.

The opcode table had to be carefully managed — expanding the instruction set caused collisions that required renumbering existing opcodes and updating all example programs.

### selenium

Selenium is a web automation language that compiles to browser-controlling code. Its compiler added:

- **For loops** — `orbit` keyword for iteration over ranges and collections
- **Control flow** — `break` and `continue` statements with proper scope handling
- **Expressions** — ternary conditional operator (`? :`), bitwise operators with dedicated lexer tokens and semantic checks
- **Switch statement** — multi-way branching with fallthrough control
- **Input functions** — `input()` for reading user input during script execution
- **Global scope** — variables declared at the top level are accessible throughout the script
- **`--run` flag** — compiles and immediately executes the generated code, with a `hello_world` example included

### the shared pattern

Both compilers follow the same architecture: lexer (iterator pattern) → parser (recursive descent) → semantic analyser → code generator. The code generators target different outputs (C for Numlang, browser-controlling code for Selenium), but the front-end pipeline is identical. This shared architecture means improvements to one compiler's parser or error reporting can be ported to the other.
