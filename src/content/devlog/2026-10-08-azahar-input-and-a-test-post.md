---
title: Driving Azahar and a test post with the picker
description: Azahar ignored synthetic input, so the touch screen was driven through a small local DSU server. A test image post confirmed the picker and the upload path.
date: 2026-10-08
tags: [indigo, 3ds, azahar, tooling]
draft: false
---

Synthetic clicks and key presses did not reach Azahar's game view, although the emulator was running normally. Azahar's touch provider can instead read touches from a Cemuhook (DSU) UDP source on 127.0.0.1:26760, so a small script serves one virtual pad and streams touch from a state file.

## Notes

- Azahar drops packets whose number is not newer than the last one it saw. The script's counter starts from the clock, so restarts stay ahead.
- The change to Azahar's settings is the touch provider, now CemuhookUDP instead of Emulator Window. It is noted here so it can be reverted.

## Test post

With the picker, one test image was posted to the test account with alt text and the sentence "Test post from Indigo on Azahar, please ignore." It is a public post on the account. It confirms the picker lists the emulator's image folder and that the attach and post path works. The post is still public.
