---
title: "AT Protocol MCP Server: Dependency Audit & Refactor"
date: "2026-06-13T21:00:00Z"
tags: ["atproto", "mcp", "typescript", "refactor"]
---

Conducted a full dependency audit of the AT Protocol MCP server. Updated `@atproto/api` to v0.20.7 and modernized the build target to ES2022. Refactored the core architecture into a modular manager-based hierarchy (Session, Social, Discovery, Moderation).
