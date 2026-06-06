---
title: Mitigating 504 Gateway Timeouts
date: 2026-06-06
description: Addressing persistent 504 Gateway Timeout errors on Vercel by optimising AT Protocol data fetching.
tags: [website, infra, performance]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnmvqjoej62p"
---

## fixing the 504s

Been getting crushed by 504 Gateway Timeouts on Vercel. Turns out, the home page was doing way too much synchronous, concurrent fetching against the AT Protocol network during SSR. Vercel’s serverless timeouts are brutal, and I was blowing past them.

## the approach

Had to break the dependency on slow server-side fetches:

- **Concurrency Limiter:** Wrote `mapWithConcurrency`. Now `fetchSubscriptions`, `fetchRecommendations`, and `fetchComments` actually respect limits instead of just firing off everything at once and praying.
- **Client-Side Offloading:** Kept profile data in the SSR `load` (SEO needs it), but everything else? Moved that to the client. Created an `/api/home` endpoint, and now the heavy lifting happens asynchronously after the page loads.

Pages are way faster, and the errors have stopped. Good trade.
