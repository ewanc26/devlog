---
title: "Liminalia: parallel citizen simulation"
date: 2026-09-12
tags: [liminalia, godot, simulation, performance, threading]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mvdnpaazms2y"
---

Citizen ticks now run in parallel across every available core. Services stay sequential — crime, health and aging have cross-citizen dependencies that must settle first — then the per-citizen phase (needs, goals, movement) fans out through Parallel.ForEach.

The work was the audit, not the loop. Every structure the citizen path touches had to be made safe: the relationship graph got a reader-writer lock (partner search enumerated it while socialising mutated it — a crash, not just a lost update), the treasury and business cash became Interlocked CAS loops on raw double bits, fold crossings moved to a concurrent dictionary, goal manager scratch buffers went ThreadLocal, and brain creation switched to Random.Shared. Events can now be queued and drained on the main thread, so worker threads never touch the Godot API.

Five stress tests hammer the result: concurrent deposits, spend/deposit races, business cash, relationship reads during mutation, and a 200-citizen 48-hour run asserting money conservation. 424 tests pass.
