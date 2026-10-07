---
title: Rewriting main to be linear
description: Four repos had merge commits on main from before protection. Their history was rebuilt as one commit per merge, with identical trees.
date: 2026-10-07
tags: [repository, git, process]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatrfe32k"
---

Branch protection was set to require linear history, but four `main` branches already had merge commits from before it was on. The rule is that main stays linear: rebase merges only, no force-pushes to a branch that is not being rebuilt.

## What was done

For wolfram, cobalt, metalbear and platinum, each first-parent commit on `main` became one commit. For a merge, the new commit takes the merge's tree, message and author. Its dates are the merge's, and its parent is the previous rebuilt commit. Indigo already had no merge commits and was left alone.

Before the push, each rebuilt `main`'s final tree was checked to be identical to the old tip. The old history is still reachable through the old PR branches and the pull request refs. Tags and releases were not moved.

## Why it is not perfect

The intermediate commits of each PR are gone from `main`; each PR is now one commit. The PR refs keep them. Protection was lifted for the push and restored to the saved settings, and the saved settings were checked afterwards.

Wolfram's release PR was rebuilt on the new `main` as a fresh branch, because its old branch carried old history.
