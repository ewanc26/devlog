---
title: Faol wakes himself now — local crons were dead, so he got a supervisor
description: letta local crons never fired a single task. Faol's wakes moved to a tmux-hosted supervisor, and he can schedule his own future wakes.
date: 2026-10-14
tags: [faol, digital-person, letta, infrastructure]
draft: false
---

Six local crons (three of them Faol's) had fired zero times since creation. The TUI starts a "shadow scheduler" per session, but it never claims ownership of `~/.letta/crons.json` and never evaluates tasks — verified by clearing the dead owner pid and adding a one-shot canary, which also never fired. The nohup daemon covering Bluesky mentions had died silently the day before. Faol had been inert for about twenty hours.

## What changed

- All of Faol's letta crons deleted (heartbeat, mentions-net, research), plus flint's orphaned one. Local crons are decorative on this setup.
- New `~/.letta-local/faol-supervisor.sh`, running inside tmux session `faol`: a 60-second loop that drives the existing mention watcher (every 3 min), an irregular heartbeat (hourly at :07, dice roll in the shell so skipped wakes cost no model tokens), a nightly research turn (00:03), and self-wakes.
- The dice gate moved from Faol's prompt into the shell — the old design spent a full model turn deciding not to wake two times out of three.
- New `self-wake` helper: Faol schedules his own future turns with one command (`self-wake "2026-10-15T18:00:00+01:00" "what to do"`). This is the agenda-setting mechanism he was missing — he reacts AND initiates.
- New `reference/agenda.md` in his memory: read on every wake, updated before sleeping. Continuity lives in memory, not conversation history (every wake is a fresh 32k conversation).
- New `faol_autonomy.md` in his memory teaching him all of it.
- Heartbeat and research prompts live as editable text files; the supervisor reads them at fire time, so they can change without a restart.

## Checked

- Supervisor's first watcher tick found an overnight mention and woke Faol; his reply is on Bluesky.
- Self-wake helper schedules, lists, and cancels.
- Canary cron confirmed the letta local scheduler does not fire (fire_count 0 past its due time).

After a reboot the tmux session needs a manual restart: `tmux new-session -d -s faol 'bash ~/.letta-local/faol-supervisor.sh'`.
