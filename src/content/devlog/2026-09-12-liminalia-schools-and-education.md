---
title: Liminalia schools and education
description: Teacher was the one job with a wage and no way to be hired. Schools are the fourth civic institution — school-age citizens learn, education gates the professions.
date: 2026-09-12T10:55:00Z
tags: [liminalia, godot, csharp, game]
draft: false
---

## liminalia

`9aafe9d` — Teacher earns a wage.

### schools

`BuildingType.School` (180k) joins the civic institutions: placing one founds a public business staffed to four teachers, hired from the unemployed pool like any civic role. Until now `JobKind.Teacher` had a base wage and no code path that could ever hire one.

### education

Citizens aged 7-18 attending a staffed school accumulate education points — 0.5 per simulated hour present at the school node, 500 points per level: none, primary, secondary, further. Graduation raises `CitizenGraduatedEvent`. Education gates the labour market: Engineer requires secondary, Doctor and Teacher require further. A city that schools its citizens can staff its own hospital; one that doesn't cannot — which ties education into the poverty and crime loop already running.

Four existing doctor-hire fixtures gained `Education = 3`, since doctors are now qualified professionals rather than whoever was standing nearest. Seven new tests cover staffing, the qualification gate, attendance, graduation, adult exclusion, unstaffed schools and save/load round-trip. 305 tests.
