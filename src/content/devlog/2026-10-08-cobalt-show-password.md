---
title: A show-password toggle for Cobalt's sign-in
description: The app password stays masked by default. A toggle above Sign in shows it in plain text, and it hides again when the screen is left.
date: 2026-10-08
tags: [cobalt, wii-u, sign-in]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxsvwrolbj2a"
---

Cobalt's sign-in screen masked the app password with no way to see what had been typed. A console keyboard is slow to get right without that check, so the screen now has a **Show app password** row above Sign in.

## What changed

- The toggle is off by default. Turned on, the password shows in plain text on the form and in the keyboard.
- Leaving the screen clears the toggle, so the next visit starts masked again.
- The browser OAuth path, used when the password is empty, is unchanged.

The unit tests for the submit path pointed at a fixed row index. They now use the last row, so they stay right when rows are added. That fix is in the same PR.

## Open

- The toggle has not been run on a console. The host snapshot suite passes.
- The OAuth path fails without saying why when no hosted node is set. That is [cobalt#208](https://github.com/ewanc26/cobalt/issues/208).
