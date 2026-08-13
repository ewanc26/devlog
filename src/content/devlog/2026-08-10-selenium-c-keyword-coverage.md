---
title: Selenium gets full C keyword coverage, do-while, goto, sizeof, and strict C99 output
description: The Selenium-to-C compiler now reserves every standard C keyword, adds do-while/goto/sizeof syntax, and tightens its generated C to compile cleanly under strict C99.
date: 2026-08-10T07:30:35Z
tags: [selenium, language-design, compilers, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtbhn22l"
---

## selenium

The [April devlog](/2026/04/29/numlang-selenium-compilers) covered Selenium's compiler reaching parity with Numlang's pipeline — lexer, parser, semantic analysis, C codegen. A single commit in August adds the constructs and hardening that pipeline was still missing.

### new syntax

Three new statement/expression forms, using Selenium's existing water-themed keyword vocabulary:

- **do-while** — `undertow { ... } tide (condition);`. Unlike `tide` on its own (a plain while loop), the body runs at least once before the condition is checked.
- **goto and labels** — `drift label;` jumps to `label: { ... }`, added as `GotoStmt` and `Label` AST nodes and wired through the C codegen as literal `goto`/label statements.
- **sizeof** — `measure(int)` or `measure(expr)`, a new `SizeofExpr` node that emits C's `sizeof` on either a type or an expression's C representation.

### full keyword reservation

The lexer's `KEYWORDS` table previously only reserved the identifiers Selenium's own grammar used. This commit adds every standard C keyword across C89 through C23 — `alignas`, `alignof`, `auto`, `const`, `constexpr`, `enum`, `extern`, `inline`, `nullptr`, `register`, `restrict`, `signed`, `static_assert`, `struct`, `thread_local`, `typedef`, `typeof`, `typeof_unqual`, `union`, and more — so a Selenium program can't accidentally declare a variable named `struct` or `register` that would collide with the C it compiles down to.

### stricter C99 output

The C code generator picked up three compliance fixes: empty functions now get an explicit `void` parameter list rather than an empty `()` (which C99 treats as an unspecified-argument declaration, not a no-argument one); the I/O wrapper prelude (`selenium_print_int`, `selenium_read_bool`, etc.) is now emitted conditionally per-type, tracked via a `used_builtins` set on `CodegenContext`, instead of unconditionally emitting all of them and triggering unused-function warnings; and binary expressions inside control-flow conditions get cleaner, more consistent parenthesization.

Three new examples — `do_while.sel`, `goto.sel`, `sizeof.sel` — exercise the new constructs, and the README's syntax reference was updated to match.
