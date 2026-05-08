---
title: Implementing a Decimal Clock
description: Added a bespoke decimal clock to the footer because base-10 time just makes sense.
date: 2025-12-01
tags: [ui, components, accessibility]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsjafe22v"
---
I decided to have a bit of fun with the footer today by adding a fully functional Decimal Clock component! It calculates and displays the current time in a base-10 format. To ensure it doesn't eat up resources, I've optimized the component to only compute the time when it's actively visible in the viewport.

While I was tinkering with the layout, I also went through and audited the site's accessibility, bumping our compliance up to WCAG 2.1 Level AA standards across the main navigation and dropdown components.
