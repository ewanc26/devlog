---
title: Groupboxes and images in ECCL
description: Added groupbox containers and image support to the ECCL login interface, improving the visual structure of the authentication UI.
date: 2026-05-15T12:00:00Z
tags: [ecci, ui]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mov7fwobh42g"
---

## eccl ui improvements

The ECCL (Ewan Croft Coding Login) interface got two new UI primitives: groupboxes and images.

### groupboxes

Groupboxes provide a visual container that groups related form fields and controls. They render with a subtle border, a label in the top-left corner, and consistent internal padding. This replaces ad-hoc field grouping with a semantic container that communicates hierarchy — fields inside a groupbox are visually related, fields outside are separate concerns.

The implementation uses a lightweight component with named slots for the label and content, keeping the markup declarative even as the visual structure gets more complex.

### images

Image support adds inline graphics to the authentication interface — logos, icons, and contextual illustrations. The image component handles responsive sizing, aspect ratio preservation, and alt text for accessibility.

These additions bring the ECCL interface closer to a polished authentication experience, moving beyond the functional-but-sparse initial implementation.
