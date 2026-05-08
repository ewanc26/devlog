---
title: Supporters via AT Protocol
description: Ko-fi and GitHub Sponsors integration with custom lexicons and webhook handling, published as @ewanc26/supporters.
date: 2026-03-01
tags: [atproto, feature, lexicons]
draft: false
---

## @ewanc26/supporters

Built a library for parsing Ko-fi webhook payloads and storing supporter events as AT Protocol records. Uses custom lexicon collections `uk.ewancroft.support.kofi` and `uk.ewancroft.support.github` for typed storage.

The website integrates this via a `/webhook` endpoint that accepts Ko-fi POSTs, validates the verification token, and appends events to the PDS. The supporters timeline is displayed on the homepage alongside other AT Protocol data.

## GitHub Sponsors

Added GitHub Sponsors webhook support alongside Ko-fi. Both sources feed into the same unified supporters timeline on the website. The webhook parsing accepts secret and test tokens as explicit options rather than relying on environment variable bridging.
