---
title: SMBC's reset and NMI spine is translated
description: Boot sequence, interrupt handler, joypad serial read, pause, sprite shuffle and memory clear are ported to C, with tests against the disassembly's semantics
date: 2026-10-10
tags: [smbc, c, nes]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxidyz4vt323"
---

The SMBC skeleton now runs the actual reset and NMI spine from the disassembly. `smbc_init` runs `Start` — vblank warm-up, warm/cold boot check against the top score digits, `InitializeMemory` with its stack-region skip, APU/PPU enable, sprites offscreen — and each frame runs `NonMaskableInterrupt`: screen bookkeeping, sound stub, `ReadJoypads`, `PauseRoutine`, top score, the timer cascade, the 7-byte PRNG rotate, the sprite-0 hit window with `SpriteShuffler`, and the scroll/mode dispatch.

## What's faithful

`ReadJoypads` accumulates the serial bits into the game's own layout (A in d7, not the host's d0) and keeps the select/start masking against `JoypadBitMask`. `SpriteShuffler` tracks the 6502's carry through the offset wrap. The NMI's mirror semantics are preserved too, including the quirk that the mirror keeps NMIs disabled while the register itself gets them back.

`SoundEngine`, `UpdateScreen`, `InitializeNameTables` and the mode execution tree are documented no-ops pending their data tables. Six new tests cover boot clearing, the timer cascade, pause toggling, joypad masking and the shuffler; `make test` is green.
