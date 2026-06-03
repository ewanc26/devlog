---
title: did:web ATProto Identity Proof of Concept
description: Created @web.ewancroft.uk as a functional did:web identity within the AT Protocol ecosystem — research experiment, not a permanent switch.
date: 2025-08-10T12:00:00Z
tags: [atproto]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55f65lu2z"
---

## did:web experiment

Created a functional did:web identity (`@web.ewancroft.uk`) as a proof of concept within the AT Protocol ecosystem. The did:web method allows DID documents to be hosted on a web domain rather than on the PLC directory. Set up the `.well-known/did.json` endpoint, resolved the identity through the AT Protocol stack, and verified it works with standard PDS operations. Purely a research experiment — no plans to switch from did:plc as the primary identity method. The exercise demonstrated that did:web identities are viable but come with trade-offs around domain dependency and portability.
