---
title: The TV home tile label stops breaking mid-word
description: Six tiles a row left too little width, so Notifications wrapped inside the word. The label now uses half the tile padding on each side.
date: 2026-10-08
tags: [cobalt, wii-u, ui]
draft: false
---

On the TV home screen, the Notifications tile broke its label across two lines inside the word. Six tiles a row leave little room, and the label was measured with the tile's full padding.

## What changed

- The tile label uses half the tile padding on each side, which gives it about 24 px more width.
- The change is in the home screen's tile drawing only. Other screens are unchanged.

## Checked

- The host snapshot suite passes.
- In the rendered home screen, Notifications sits on one line.

It has not been checked on a console screen.
