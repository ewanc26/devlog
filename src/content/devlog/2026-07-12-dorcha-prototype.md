---
title: dorcha controller-first Godot roguelike prototype
description: A new Godot Mono roguelike with controller-first input, procedural floors, data-driven enemies/items, turn-based inventory, and victory runs.
date: 2026-07-12T22:46:00Z
tags: [dorcha, godot, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mqi6jzlawh2l"
---

## dorcha

A brand-new **Godot Mono** roguelike prototype, built controller-first with a strong test/docs-per-subsystem discipline.

### gameplay and content

- Controllers are the primary input; a controller-first run flow with menu and run-summary scenes.
- Procedural generation gained **crypt** and **cavern** floor families, with connectivity invariants tested.
- Data-driven enemies and items, plus a turn-based carried inventory with explicit turn semantics.
- Reactive dungeon progression and a finite descent with a **victory state** and summary contract.

### feel and polish

- Responsive turn and menu audio cues (credited Kenney UI pack).
- Per-subsystem contracts covered by tests: procgen connectivity, authored resources, inventory turns, audio cues, UI scenes, and full victory progression.
