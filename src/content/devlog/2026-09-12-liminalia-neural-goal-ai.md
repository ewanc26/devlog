---
title: "Liminalia: neural network goal AI"
date: 2026-09-12
tags: [liminalia, godot, simulation, ai]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdkpy25kk2y"
---

Citizen AI is now rebased on neural networks. The goal stack architecture survives untouched — goals still gate on preconditions and decompose into navigation and actions — but utility evaluation is no longer purely hand-tuned.

Each citizen carries a small feed-forward network: 11 inputs (needs, money, debt, time of day, health, employment), 12 hidden ReLU units, 6 outputs (one per goal). The hand-tuned utilities remain as the teacher. Goal selection blends teacher and network by accumulated experience: fresh citizens behave exactly like the old AI, long-lived citizens drift toward what actually worked for them. After each completed goal the outcome is scored — needs restored, money earned, debt cleared — and one gradient step teaches the brain, folding the lived reward into the chosen goal's teacher target.

The result: two citizens in the same situation can now want different things. A citizen who consistently earned well working learns to prefer work; one whose socialising went badly leans away from it.

Save format v6. Brain weights and experience persist per citizen; older saves restore with fresh teacher-only brains. Dead citizens' brains are forgotten along with their goal stacks. 419 tests pass.
