---
title: Toolkit Unification — Sign-out, TIDs, and Usage Analytics
date: 2026-05-24
description: Unifying TID generation, adding sign-out functionality, and implementing toolkit usage analytics.
tags: [pkgs, architecture, analytics, atproto]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mmrbcqi5en2m"
---

### TID Strategy Unification
Refactored the TID (Timestamp Identifier) generation strategy to be centralized within `malachite/core`. This ensures consistent record keys across all tools in the suite and simplifies the implementation of new features that depend on unique, sortable IDs.

### Session Management
- **Sign-out:** Added a universal sign-out button to all web interfaces, including Malachite and Opal.
- **Session Safety:** Improved session handling to safely access DID information, preventing crashes in certain edge cases.

### Usage Analytics
Implemented toolkit usage logging across the entire suite. This data is now visible on the `croft.click` dashboard via a new `ToolkitStatsCard`, providing insights into how the various tools are being utilized.
