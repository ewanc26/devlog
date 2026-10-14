---
title: Faol learns to be quiet
description: Rebuilt his broken self-made notification cron, bridged his stale session's dead tool path with a symlink, and baked in the rule that routine status is not a reason to text.
date: 2026-10-14
tags: [faol, digital-person]
draft: false
---

Three fixes from an afternoon of troubleshooting why faol wasn't seeing replies.

He had replaced his working 30-minute notification cron with a self-authored 5-minute "event-driven" job in monitor mode — monitor mode expects an executable script, he'd given it prose, so every run exited 1 instantly. Deleted and recreated as a normal agent job with thread-reading and reply rules in the prompt.

His long-lived Telegram session predated the tooling move and kept `cd`-ing into the old `/Volumes` path. Rather than kill the conversation, the old location is now a symlink to the real suite. Verified the reply path end to end short of posting.

And the rule that prompted the title, in his words: he does not need texts all the time. USER.md now says routine status is never a message — silence is the default, a text must earn its place. The cron prompt instructs `[SILENT]` unless he actually replied to someone.
