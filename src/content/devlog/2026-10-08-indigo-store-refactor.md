---
title: Indigo's store codecs share one line reader
description: The session and settings codecs read lines the same way now, and a test-only wrapper around file removal is gone
date: 2026-10-08
tags: [indigo, refactor, 3ds]
draft: false
---

The session and settings codecs each had their own line reader and their own break check. They share one now, in a small header, and the test-only settings clear is gone ([#75](https://github.com/ewanc26/indigo/pull/75), merged). The code change is roughly neutral in size.

## What is left

The duplication audit ([#53](https://github.com/ewanc26/indigo/issues/53)) is not done. Three job files in the session code still repeat each other, and they are not compiled for the host, so they need a device or a 3DS cross-build check in their own PR.

## Verification

- Host: 4063 checks, 0 failures; warnings clean. The 3DS cross-build ran on the earlier branch with the same store code.
- Not run on a 3DS or in Azahar.
