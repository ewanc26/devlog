---
title: MetalBear matures its hosted accounts
description: Self-serve signup, trusted devices and scoped consent land alongside blobs, quotas, admin visibility and operator tooling.
date: 2026-11-23
tags: [metalbear, atproto, auth, operations]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n342apuby62e"
---

MetalBear's hosted-account work stopped being about getting an account created and started being about running a service.

- Self-serve account creation with per-domain signup admission policy.
- Trusted devices for two-factor login and per-scope OAuth consent selection.
- Opt-in custom-domain handles with DID ownership proof, and a read-only repo browser for hosted accounts.
- Blob lifecycle with temporary uploads and an expiry sweep; per-account repo and blob byte quotas.
- Operator-visible admin audit log and one-shot account migration bundles.
- Frontend moved to SvelteKit 3 aliases and config; deployment gained optional Prometheus and Grafana monitoring.

Running a PDS is mostly the unglamorous parts: quotas, blob expiry, audit logs, and a way to migrate an account out. Those landed together, which is why this is a milestone rather than a list of commits.
