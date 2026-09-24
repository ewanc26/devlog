---
title: ATperson standing authorization envelopes
description: Bounded operator pre-approval for outbound actions that composes with the existing gates and never widens policy
date: 2026-09-24
tags: [atperson, autonomy, security, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mwbge23wi52y"
---

Per-digest approval meant the operator signed off on the exact action text or nothing ran. For recurring action classes that round trip is pure overhead. atperson now has standing authorization envelopes: the operator pre-approves a bounded class of actions, and the control gate passes when the exact digest is approved or an envelope covers the action at execution time.

## Changes

- **`control/envelope`** — envelope documents live in `<data>/envelopes/<id>.json`, written atomically. Each names kinds with `max_in_window`/`window_seconds`, optional `min_plan_score`/`min_support_score` floors, optional scope terms, and optional expiry. Parse validates against the live policy: kind must be policy-enabled, ceilings and windows must not exceed the policy budget. An envelope can only narrow.
- **Execution-time coverage** — coverage is recomputed from disk on every attempt, so revocation and expiry take effect on the very next execution. No daemon restart, no cached grant. Corrupt envelope files are skipped as non-covering.
- **Score floors fail closed** — an action without recorded decision evidence does not pass a configured floor. The scheduler now records plan/support evidence on proposals so floors can be evaluated at execution.
- **Audit distinguishes sources** — the audit log records the covering `envelope_id`, so envelope and digest authorisation are reconstructable after the fact.
- **CLI** — `atperson control envelope <list|show|grant|revoke|dry-run>`. Grant validates against the live policy before saving; dry-run reports which envelope (if any) would cover an action file, and why not.
- **Docs** — outbound-policy.md gains the envelope section; autonomy.md gains the standing authorization contract.

## Notes

- Pause and `writes_enabled` still override everything. The envelope composes with the gates; it is not a bypass.
- The scheduler's proposal pre-filter now accepts digest-approved or envelope-coverable proposals. The attempt atom re-evaluates under the lock, so the pre-filter is a cheap filter, not the authority.
- Nine new tests in `atperson-envelope-test`: qualifying action executes, expired falls back to digest approval, tighter ceiling wins over policy, pause overrides, revocation mid-cycle, wider-than-policy rejected at parse, floors fail closed, scope restriction, and no-envelope behaving exactly as before.
