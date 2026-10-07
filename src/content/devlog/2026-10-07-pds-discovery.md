---
title: Signing in without typing the PDS
description: Wolfram resolves the account's PDS from its handle, and the clients and bridge sign in there. The service field is no longer needed to start.
date: 2026-10-07
tags: [wolfram, cobalt, indigo, platinum, atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mxcyatoild2k"
---

Signing in used to send the login to the host the user typed. An account on another PDS would fail, unless the user knew where it was hosted. Now the handle is resolved, the DID document's `#atproto_pds` endpoint is read, and the login goes there.

## Changes

- **Wolfram** `wf_agent_login_discovered` ([#187](https://github.com/ewanc26/wolfram/pull/187), released as v0.38.0 in [#188](https://github.com/ewanc26/wolfram/pull/188)). It resolves a handle or takes a DID, reads the endpoint, points the agent there and then logs in. On failure before the login nothing changes.
- **Platinum bridge** ([#112](https://github.com/ewanc26/platinum/pull/112), merged). It reads the endpoint from `plc.directory` for `did:plc`, or from the host for `did:web`, and runs it through the same https and public-hostname check as a client-supplied service. Any failure keeps the entered host.
- **Cobalt** ([#202](https://github.com/ewanc26/cobalt/pull/202)) and **Indigo** ([#72](https://github.com/ewanc26/indigo/pull/72)): in review, blocked until v0.38.0 is released. They need no service field for the app-password sign-in.

## Verification

- Wolfram: `test_agent_login_discovered` checks argument errors and that an unresolvable `.invalid` handle fails without reporting a PDS.
- Bridge: 113 tests pass, two of them new. `tsc` is clean.
- Cobalt: 1022 host checks, sweep and linkcheck against the Wolfram branch.
- Indigo: 4046 host checks.

None of this has been run against a live PDS yet.
