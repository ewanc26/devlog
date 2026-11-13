# AGENTS.md

Guidance for AI coding agents working in **devlog**.

## Project overview

devlog.croft.click — changelog and devlog

- Language: Svelte
- Default branch: main

## Working rules

- Inspect the README, manifests, CI workflows, and nearby code before editing.
- Preserve existing architecture, naming, formatting, and error-handling conventions.
- Use project scripts for validation; never claim checks you did not run.
- Keep changes scoped and update tests or documentation when behavior changes.
- Use feature branches and pull requests.
- Treat generated files, credentials, deployment configuration, and release metadata as sensitive.

## Recent history

docs: atUri for one-ai-tool-instead-of-six entry; devlog: publish one AI tool instead of six; devlog: one AI tool instead of six (#11); docs: atUri for faol quiet-by-default entry; docs: devlog — faol quiet-by-default rule, cron rebuild, path shim; devlog: atUri for hermes home entry; devlog: faol atproto tooling moves into hermes profile; devlog: atUri for atproto rebuild entry

<!-- allowed-agents -->
## Allowed agents

Only **Claude** (Anthropic) and **Mistral** (Mistral AI) may be used as coding agents in this repository. This rule supersedes any earlier agent-attribution guidance in this file.

- Agent-assisted commits must credit only one of those agents:
  - `Co-Authored-By: Claude <noreply@anthropic.com>`
  - `Co-Authored-By: Mistral Vibe <vibe@mistral.ai>`
- Allowed agent footers are `🤖 Generated with [Claude Code](https://claude.com/claude-code)` and `🤖 Generated with [Mistral Vibe](https://mistral.ai)`.
- Do not add `Co-Authored-By:` trailers, `Generated with` footers, author names, or committer identities for any other agent or AI tool.
- Do not credit another agent in commit metadata.
