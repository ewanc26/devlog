---
title: Liminalia income tax reaches the treasury
description: Income tax was counted and then dropped — every wage cycle silently deflated the money supply by 15 percent of payroll. Now it is deposited.
date: 2026-09-12T10:45:00Z
tags: [liminalia, godot, csharp, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdjpyovh22y"
---

## liminalia

`18e5aa9` — a quiet leak in the money supply, closed.

Income tax was calculated per wage, counted in `IncomeTaxCollected`, and then dropped: the money left the business and went nowhere. Every wage cycle silently deflated the money supply by 15 percent of payroll. The garnishment and unpaid-meal flows were already correct; tax was the odd one out.

Tax is now deposited to the treasury alongside the rest. Two existing tests asserted the leaky behaviour with exact treasury values — the debt garnishment test and the business closure test — and are updated to the corrected arithmetic; the closure test's `TreasuryBefore` snapshot legitimately includes the tax deposited earlier in the same tick. One new test pins the deposit.

The side effect is that civic institutions are now genuinely funded: they pay wages from the treasury, and the treasury now collects what it was always owed. 298 tests.
