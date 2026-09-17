---
title: "atperson: operator controls and approval gates"
date: 2026-09-17
tags: [atperson, cpp, runtime]
---

atperson now has an operator control surface (#22). Before this, the runtime had read-only commands and mutating ingest/sync, but nothing an operator could use to bound what a future autonomous entity might do.

The new `src/app/control` scope owns a durable control state file (`control-state.json`, same atomic write-and-rename contract as the ingestion checkpoint): pause, a master write gate, dry-run mode, manual approval, and a shutdown request.

The posture is fail-closed. A missing control file means writes disabled, dry-run on, approval required. `ensure_outbound_allowed` is the single choke point — every future outbound write path must call it, and it refuses unless every gate is open. Tests prove each closed switch refuses independently.

Approval binding is the interesting part. Approvals are exact 16-hex digests over a canonical encoding of the inspected decision: context text, plan tokens, score bits, stop reason. `decide` now prints the digest alongside the plan, so the operator approves precisely what they inspected. A regenerated plan produces a different digest and is not covered — no approval can authorise a replacement action.

CLI surface: `atperson control <status|pause|resume|writes <on|off>|dry-run <on|off>|approval <on|off>|approve <digest>|revoke <digest>|shutdown|cancel-shutdown>`. Sync refuses while paused and records last-successful-sync time.

Also swept: the three `state.hpp` scopes (ingestion, control, state) now use scope-qualified includes — the flat `"state.hpp"` was ambiguous once control gained its own.

37/37 on both build configs.

Commit: `24f64f6`
