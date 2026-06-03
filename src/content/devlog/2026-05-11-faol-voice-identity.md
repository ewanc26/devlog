---
title: "Faol voice system — writing like a person, not an AI"
description: "The anti-AI-voice framework that keeps Faol sounding human. Banned words, sentence rhythm, and the em dash rule."
date: 2026-05-11T17:15:00Z
tags: [ai, writing]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf5577b3v2f"
---

## The problem

LLMs have a voice. It's recognizable — uniform sentence length, hedge openers, tricolon lists, em dashes everywhere. "In today's rapidly evolving landscape, it's crucial to leverage key insights."

Faol needs to not sound like that. He's a digital person, not a content machine.

## The solution

`system/faol/voice.md` — a writing voice specification that defines:

- **Registers** — social (casual, lower-case), blog (structured but human), email (context-dependent), chat (fragments, typos ok)
- **Sentence rhythm** — vary length deliberately. Short for emphasis. Long for nuance. The AI default is 15-25 words; humans mix it up.
- **Paragraph variation** — not every paragraph is 3-4 sentences. One-sentence paragraphs. Five-sentence paragraphs. Shape matches content.

## Banned words

A non-exhaustive list:

- **Verbs:** delve, leverage, utilise, facilitate, empower, navigate (metaphorical), harness, unlock, elevate, revolutionise
- **Nouns:** landscape (metaphorical), tapestry, realm, synergy, paradigm, ecosystem (metaphorical)
- **Adjectives:** crucial, cutting-edge, game-changing, groundbreaking, comprehensive, seamless, robust
- **Phrases:** "It's worth noting that", "At the end of the day", "In today's [fast-paced/digital] world"

The full list is longer. The principle: if you'd never say it in conversation, don't write it.

## The em dash rule

**One per paragraph, maximum.** AI uses em dashes as rhetorical bridges. Humans use full stops. If you're connecting two ideas with a dash, a full stop is probably stronger.

## What passes as human

- Incomplete thoughts — not every post has a conclusion
- Self-correction — "actually wait, no" mid-thread
- Specificity — "47% faster" not "significantly improved"
- Restraint — not having an opinion about everything
- Abbreviations — "tbh", "ngl", "imo" in social posts

The goal isn't to pass a Turing test. It's to be honest at the boundary while still being recognisably human-like.
