---
title: New project — a Godot 4 C#/Mono RPG starter template
description: A from-scratch top-down RPG scaffold for Godot 4.7's .NET build, built because no existing template combined Godot-Mono with an RPG-specific structure.
date: 2026-08-04T19:54:10Z
tags: [rpg, godot, csharp, game, template]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtjeks2l"
---

## RPG Template

A new project: a minimal top-down RPG starter for Godot **4.7**'s C#/Mono build. A survey of existing options found nothing that fit — `godot-open-rpg` is RPG-specific but GDScript, and existing C# templates (like Chickensoft's) are generic project scaffolding, not RPG-oriented — so this repo builds the combination directly, informed by the conventions of both.

### what's in the scaffold

Player movement, stats, and leveling; an event-bus-driven HUD; NPC dialogue through an `IInteractable` pattern; an `Inventory`/`ItemPickup` system; JSON save/load; and a playable test level wiring all of it together. Roughly 955 lines across 27 files in the initial commit.

- **`EventBus`** is a global signal hub (`PlayerHealthChanged`, `PlayerLeveledUp`, `DialogueStarted`, `DialogueEnded`, `InventoryChanged`) — UI listens to it rather than polling the player directly, keeping HUD and dialogue decoupled from gameplay code.
- **`PlayerStats`** is a `Resource` (health, attack, defense, leveling via `AddExperience`), so it can be saved, swapped, or authored as a preset.
- **`Inventory`** is a plain component `Node` that can attach to any actor and exposes `AddItem`/`RemoveItem`.
- **`IInteractable`** is implemented by `NPC.cs`; `PlayerController` tracks interactables in range through an `InteractionArea` and calls `Interact()` on the nearest one.
- **`SaveSystem`** is a static utility that (de)serializes `PlayerStats` to `user://savegame.json` — not wired to a menu yet, left for whoever adds save points.

### platform guidance

A same-day follow-up commit added `AGENTS.md` documenting the setup paths that actually differ per platform: the `godot-mono` Homebrew cask on macOS versus the GodotSharp Flatpak on SteamOS (whose immutable root rules out `pacman`, and whose sandbox relocates `user://`). It also flags the cross-platform traps this project is exposed to — case-sensitivity differences between APFS and ext4, and the interact action being bound to keyboard `E` only, which leaves it unreachable on a Steam Deck — plus the code conventions to keep: `EventBus` signal wiring paired with matching `_ExitTree` unsubscribes, and exported property names kept in sync between C# scripts and their `.tscn` files.
