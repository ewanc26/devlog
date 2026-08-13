---
title: cobalt goes from network scaffold to a working client, timeline through moderation
description: Sign-in against a real PDS surfaced that curl's own TLS handshake shared the Wii U's broken entropy source, not just Wolfram's signing. From there the timeline, threads, composing, notifications, profiles, avatars, images, and mute/block landed across nine feature commits, none of it yet run on hardware.
date: 2026-08-11T15:12:31Z
tags: [cobalt, wiiu, bluesky, homebrew]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24vbkk2l"
---

## cobalt

The last post left off with app lifecycle, networking, and input wired up but no timeline or compose UI. Since then the read/write surface, notifications, profiles, avatars, images, and moderation have all landed, plus a second entropy bug worse than the one already known about.

### signing in against a real PDS

`feat(atproto): app-password sign-in against a real PDS` added a TLS trust store (`make` fetches a cert bundle via `tools/fetch_cacert.sh` into `romfs/cacert.pem`, git-ignored because the Mozilla set expires and a stale copy would fail on console months later looking like a network bug), a session layer in `src/atproto/session.c` driving `wf_session` rather than the opaque `wf_agent`, an AES-256-CTR credential store in `src/cache/session_store.c`, and a self-drawn keyboard for app-password entry since `swkbd` is a C++ `nn::` API that wants to composite into GX2 passes cobalt only reaches through SDL2. All network I/O runs on an SDL worker thread — Wolfram's transport is blocking libcurl, and since SDL owns ProcUI here, a stalled event pump is a console that won't return to the Wii U Menu.

Auditing the entropy problem for that work found it was worse than the previous post described. devkitPro's Wii U mbedTLS patch re-seeds per byte with `srand(OSGetSystemTick()); output[i] = rand() & 0xff`, and the package sets `MBEDTLS_NO_PLATFORM_ENTROPY`, so that tick-seeded PRNG is the _only_ source in the pool — not just for Wolfram's signing, but for libcurl's own TLS handshake (client randoms, ephemeral ECDHE keys) and for the credential store's device key and CTR nonces, which had themselves been drawn from the tick counter in the sign-in commit. The fix routes all three through one CTR-DRBG (`src/util/rng.c`) seeded from the provisioned `entropy.bin`, never from `mbedtls_entropy_func()`. For curl specifically, `CURLOPT_SSL_CTX_FUNCTION` calls `mbedtls_ssl_conf_rng()` on the config curl hands the callback, before `mbedtls_ssl_setup()` — verified against curl 8.7.1, what `wiiu-curl` ships. This needed a matching `wf_xrpc_client_set_tls_rng()` addition on Wolfram's side, so cobalt now requires a Wolfram build carrying it and fails to compile against an older one rather than silently building without the fix. The seed's role changed accordingly: a missing seed used to be non-fatal (only signing was disabled); now it disables networking outright, because a handshake without it would complete and look entirely normal to the user, which is exactly the failure mode that isn't acceptable.

### timeline, threads, and composing

`getTimeline` is fetched, flattened once into fixed-size structs rather than leaving `cJSON` subtrees for the UI to walk per frame, and drawn on both surfaces with cursor paging. This also moved the session layer from `wf_session` to `wf_agent` now that Wolfram exposes the CA bundle and TLS RNG on it — the agent's own refresh-and-retry and PDS re-pointing replaced cobalt's hand-rolled versions, with credentials read back out after every job since a refresh can happen inside any request.

Threads, likes, reposts, and composing followed: opening a post fetches its conversation, Left/Right like and repost, A or `+` writes a reply. Interactions apply locally and reconcile on the next refresh, with a count only moving when state actually changed (so a duplicate confirmation can't double-count and a count can't go negative). Replies use `wf_agent_reply_refs` rather than `wf_agent_reply`, which is silently wrong for a reply to a reply — an incomplete ref set is refused rather than guessed at.

A review pass across this surface (`#7`) found eleven real defects, the worst three being: auto-paging that never stopped once the fixed window filled, holding `busy` true so no interaction ever ran again; posting a reply leaving the thread cursor past the end of the re-rooted conversation, blanking the screen; and screens reading the worker's buffers with no lock while it edited them in place, poisoning the content-keyed text cache rather than merely flickering.

### notifications

Replies, likes, follows, and the rest, with mark-as-seen, drawn in a compact row layout since a like has no text and a follow has nothing to open. Wording and subject resolution both happen at parse time — an unrecognised reason shows verbatim rather than as something generic, and which field holds the thing to open (`self` for reply/mention/quote, `reasonSubject` for like/repost) is a tested function, because getting it backwards opens a plausible-looking wrong post. `updateSeen` only fires at the top of the list, so paging back through history doesn't mark unread items read.

### profiles and avatars

Profiles gained follow/unfollow and an author feed, with X/Y bound to compose and open-profile. Avatars were, in the commit's own words, "the biggest visible gap against social-app," and the whole of the work was the threading: SDL's Wii U render and video backends have no locking of any kind, so a texture created on a worker thread would write into the same GX2 command buffer the frame is being built in — corruption, not tearing. Loader threads do the HTTPS GET, decode, and downscale (pure CPU work on an `SDL_Surface`); only the main thread creates or destroys textures, during a pump before drawing. Slots carry a generation counter so a stale result gets discarded instead of overwriting whatever took its place, and eviction skips anything in flight so a fast scroll doesn't keep re-paying for requests it already made. Scaling uses a real box filter rather than `SDL_BlitScaled` (nearest-neighbour here, which would discard 99.6% of the pixels shrinking a 1000x1000 avatar to 64px), averaging premultiplied so transparent pixels don't bleed colour into edges. A missing avatar — no SDL2_image, no trust store, a failed fetch — falls back to a disc tinted from a hash of the handle with the author's first codepoint on it, not a grey circle, because a column of identical grey circles reads as one voice. `net/http.c` is a plain HTTPS GET kept deliberately outside the ATProto layer, so fetching images doesn't serialise behind whatever the session worker has in flight.

### images, link cards, and alt text

`app.bsky.embed.images` and `app.bsky.embed.external` (including the media half of `recordWithMedia`) now draw through a second per-surface image cache, decoded CONTAIN rather than the avatar cache's CIRCLE fit. Video and quote posts still fall back to the existing bracket marker. A follow-up commit added alt text: any image with alt text gets a small "ALT" corner badge, and the focused card shows its first image's alt text as a wrapped caption underneath — described as "the accessibility affordance actually available here," since Wii U homebrew has no OS-level screen reader to hand the text to instead. Only the first image's alt text is shown; there's no per-image selection in this list-based UI yet.

### mute and block

Landed in two commits. First, Left/Right on a profile's header row mute/unmute and block/unblock the viewed account — mirroring the Left/Right = like/repost binding a post row already uses, guarded so it never applies to the viewer's own profile. Then dedicated muted- and blocked-accounts screens: `cobalt_actor_list` is a flattened list shared by both, and `cobalt_graph_view` draws both from one implementation parameterised by kind rather than two files that would drift apart, reachable from what used to be a single sign-out button and is now a three-row account menu. Wiring this up surfaced a latent bug: `run_mute`/`run_block` updated the loaded profile's viewer state unconditionally, which would have corrupted an unrelated profile's mute/block flags the first time either fired from a list row instead of the profile screen — now guarded on a DID match. This completes "mutes and blocks" from the compliance roadmap.

### build and testing hygiene

A test-suite pass (`#6`) pointed out that the `-fsyntax-only` sweep never resolves a symbol, so a function deleted while callers remained would slip through if it lived behind `COBALT_HAS_WOLFRAM`. `linkcheck` now links that configuration against a host build of Wolfram into a binary it never runs, skipped when no host build exists — verified by deleting a Wolfram-side function and confirming the sweep passed while the link check failed. It also caught a real `-Wrestrict` warning where a post's own `uri` was copied into its `root_uri` with `snprintf`. Running the suite on macOS for the first time found `linkcheck` silently skipping a real host Wolfram build because CMake names the shared library `.dylib` there, not `.so`. Separately, a `wolfram/version.h` include that could never have shipped — the version string is a CMake usage-requirement, and cobalt links Wolfram from a plain Makefile outside that graph — was replaced with a fixed "wolfram (linked)" string.

### status

None of this has been run on hardware yet — the commit messages for the timeline, thread, and notification work all say so explicitly, and each stacks on the last as an unverified milestone. AGENTS.md also now formalises when C++ is allowed (RAII around a manual free/close, state-management boilerplate) and names `wolfram-cpp` as the adoption path for new Wolfram-facing code, rather than leaving the existing "may use C++ where it earns its place" line unapplied.
