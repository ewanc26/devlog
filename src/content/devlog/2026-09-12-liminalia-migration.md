---
title: "Liminalia: migration"
date: 2026-09-12
tags: [liminalia, godot, simulation, population]
---

Households now arrive and depart based on city attractiveness. Jobs, tax burden, service coverage, and safety all feed into a score. Above 0.6: households move in. Below 0.4: unhappy households consider leaving.

The system is capped — at most 3 arrivals and 2 departures per day — to keep growth and death spirals bounded. Arriving households get 1-4 members with names from their birth decade in the ONS data. They need a residential building with capacity.

Events flow through the existing log. 430 tests pass.
