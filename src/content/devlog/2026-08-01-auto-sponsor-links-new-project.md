---
title: New project — auto-sponsor-links, a monthly sponsor-badge PR bot
description: A GitHub Actions workflow that scans all of an account's non-fork, non-archived repositories for missing Ko-fi/GitHub Sponsors badges and opens a PR to add them, shaken out over three same-day bugfix commits.
date: 2026-08-01T03:09:55Z
tags: [auto-sponsor-links, github-actions, automation, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswgdtoyas2l"
---

## auto-sponsor-links

A new project: a monthly GitHub Actions workflow that scans every non-fork, non-archived repository owned by an account, checks each one's `README.md` for existing Ko-fi/GitHub Sponsors badges, and opens a pull request adding a `## Support` section to any repository missing them.

### how it works

`scripts/detect_and_add_sponsor_links.sh` lists repositories via `gh repo list`, filters out forks and archived repos, and for each remaining one fetches the README through `gh api repos/{repo}/readme` and greps the decoded content for the sponsor link. If it's missing, the script clones the repo, checks out an `add-sponsor-links` branch, appends the Support section, commits, pushes, and opens a PR with `gh pr create`. The workflow (`.github/workflows/detect_missing_sponsor_links.yml`) runs on the 1st of every month at 00:00 UTC, or manually via `workflow_dispatch`, and needs `contents: write` and `pull-requests: write` permissions.

### three bugs, same day

The initial commit didn't survive first contact with `gh` and the GitHub API:

- The workflow referenced a `use: actions/setup-gh@v2` step (the correct YAML key is `uses:`, and no such action exists) — replaced with a plain `gh auth login --with-token` step against `apt-get`-installed `jq`.
- The script's repo-listing `jq` filter checked an `archived` field that the GitHub CLI doesn't return under that name (it's `isArchived`), so the archived-repo filter silently matched nothing. Fixed by requesting `isArchived` explicitly and filtering on it.
- A few smaller robustness fixes landed alongside: `gh pr create` now tolerates a PR that already exists instead of failing the whole run, and the repo count logged before the scan loop is computed from the actual line count instead of `${#repos[@]}` (which doesn't do what it looks like it does against a newline-separated string in bash).
