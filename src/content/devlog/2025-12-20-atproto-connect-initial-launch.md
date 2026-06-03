---
title: Initial Launch of atproto-connect
date: 2025-12-20
description: Bootstrapping a Minecraft-to-AT-Protocol bridge for Fabric 1.21.10.
tags: [socialsync, atproto, minecraft, fabric]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnf55dourr2g"
---

### Project Genesis
Started work on `atproto-connect` (now Social Sync), a Minecraft mod built for Fabric 1.21.10. The goal is to create a seamless bridge between the game and the AT Protocol, allowing players to link their identities and eventually sync their in-game accomplishments to a decentralized social graph.

### Core Features
- **Fabric/Kotlin:** Set up the project with Kotlin support and Fabric loader.
- **Identity Linking:** Implemented the base command system (`/atproto link`) to associate Minecraft UUIDs with AT Protocol DIDs.
- **Auth System:** Built the initial identity linking and command-based authentication system.
