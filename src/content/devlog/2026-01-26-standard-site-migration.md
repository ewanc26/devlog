---
title: Transitioning to Standard.site Lexicons
description: Retiring legacy WhiteWind and Leaflet support in favor of the new Standard.site implementation.
date: 2026-01-26
tags: [atproto, lexicons, standards]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mldxsj62nd2i"
---
It’s time to clean house. Over the past few weeks, I’ve been heavily migrating the site's data layer to exclusively use Standard.site lexicons, and as of today, I've completely retired the old WhiteWind and Leaflet support. 

This vastly simplifies the backend routing (specifically the rkey-based routing for publications) and cuts down on technical debt. I also took the opportunity to clean up our RSS feed utilities, ensuring that publications syndicate beautifully regardless of the client reading them.
