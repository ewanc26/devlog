---
title: AI Discoverability — AGENTS.md and llms.txt
date: 2026-05-19
description: Adding AGENTS.md and llms.txt files across repositories to improve AI discoverability and documentation.
tags: [tooling, ai, documentation, pkgs]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mmrbcqldg62y"
---

### Standardizing AI Metadata
To better support AI-driven exploration and development, I've started standardizing metadata files across all repositories.

- **AGENTS.md:** Added detailed agent-specific documentation to all packages in the monorepo. These files provide context for LLM-based agents to understand the project structure, goals, and workflows.
- **llms.txt:** Integrated `llms.txt` files to provide a condensed, machine-readable summary of project capabilities and APIs.

### Profile & Story Recap Polish
Continued the polish phase for the toolkit UI:
- **Story Recap:** Refactored the story recap to use dynamic titles and labels, ensuring a more personalized experience.
- **Accessibility:** Added missing labels and fixed mounting issues in the `OverviewTab` and `ListeningStats` components.
- **Performance:** Optimized day conversion logic and added debug logging to track minutes listened more accurately.

### Devlog Improvements
- **Timeline Fix:** Resolved an issue where timeline entries would stop being observed (for scroll animations) after changing filters.
- **Cleanup:** Removed the unused `bluepy` dependency.
