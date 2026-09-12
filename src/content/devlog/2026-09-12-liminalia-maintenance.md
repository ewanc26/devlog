---
title: "Liminalia: maintenance costs"
date: 2026-09-12
tags: [liminalia, godot, simulation, economy, design]
---

Infrastructure now bills the treasury daily. Every road edge costs 20/day — folds and transit edges cost the same; the city maintains whatever it built. Civic buildings cost by type: parks 10, police and fire 80, schools 90, hospitals 100. Homes, workplaces and shops cost nothing — privately maintained, upkeep is not another tax on residents.

Maintenance is the closing pressure of the fiscal loop: taxes fund services, services raise land value, land value raises revenue — and infrastructure quietly bills the treasury every day regardless. A city that builds beyond its tax base goes broke on upkeep alone.

When the treasury cannot cover upkeep, the shortfall accumulates like UBI shortfalls do. Unpaid maintenance does not yet degrade infrastructure; that is the next step once wear is modelled.

The toll and fare tests asserted exact treasury values, which upkeep now shaves fractions per tick. They carry a precision tolerance now, or subtract Maintenance.Paid for an exact expectation.

459 tests pass. That closes all five researched city-builder gaps: migration, congestion, demand-driven development, land value and building levels, maintenance.
