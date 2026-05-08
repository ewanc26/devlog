---
title: Migrating the Site to SvelteKit
description: Rebuilding the website from scratch using SvelteKit for better performance and a more modern development experience.
date: 2025-03-18
tags: [sveltekit, webdev, redesign]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsjf6oc2v"
---
I've spent the last couple of days completely overhauling the website's architecture. The old setup was starting to show its cracks, so I've officially ripped out the old codebase and migrated everything over to SvelteKit. 

This initial integration brings over the core blog functionality, but with a much cleaner component structure. I've also set up a fresh CSS foundation, standardizing our typography and variables. The new `Navigation.svelte` and `ThemeSwitch.svelte` components feel incredibly snappy. There is still a lot of data fetching to wire up properly, but the foundation is solid.
