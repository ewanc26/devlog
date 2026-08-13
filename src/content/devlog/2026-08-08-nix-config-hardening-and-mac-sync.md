---
title: nix config hardening, PGP-only secrets, and a Mac defaults resync
description: A month-old syntax error that had silently broken the server evaluation got caught by a new CI check, which led to a broader pass -- PGP as the sole secrets recipient, gatekeeper actually running, and a full resync of installed apps, dock, and macOS defaults to match the real machine.
date: 2026-08-08T11:17:35Z
tags: [nix, infra, macos, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mswg24yzoc2l"
---

## nix

Two separate sessions of work on the personal Nix config since the last coverage: a July 30 pass that hardened CI, secrets, and a couple of modules that had quietly stopped working, and an August 8 pass that resynced the Mac-specific config (installed apps, dock, defaults) against what's actually on the machine.

### ci finally evaluates every host

Nothing in this repo evaluated the configurations except a manual rebuild of whichever host happened to be in front of you. That's why a syntax error from an earlier "add doc comments" commit had sat on `main` for a month without anyone noticing: it replaced the opening of four server modules (`modules/server/infra/network/firewall.nix`, `intrusion.nix`, `ssh.nix`, `packages.nix`) -- the function arguments, the `let cfg = ...; in` block, and the attrset's first attribute -- with a comment block, leaving files that began mid-expression. `nixosConfigurations.server` hadn't evaluated since. The headers were restored verbatim from the parent commit, comments kept above them.

The actual fix was to stop that from happening again: `flake.nix` now exposes all four hosts (laptop, server, server-arm, macmini) under `checks`, so `nix flake check --all-systems` covers everything. With `--no-build` this is eval-only, so a nix-darwin config evaluates fine even from a Linux CI runner. A GitHub Actions workflow runs that check plus an nixfmt check on every push and PR, and the pre-commit hook now parses staged `.nix` files before handing them to nixfmt -- nixfmt aborts on unparseable input under `set -e` but doesn't name the offending file, so this catches it earlier with a useful error. 12 of 60 `.nix` files weren't nixfmt-clean and got reformatted in the same pass so the new check would actually pass on its first run.

While hosts were being made to evaluate for the first time, `server-arm` turned out to be broken too: `minimal-hardware.nix` was documented as common to both x86_64 and aarch64 server builds but hardcoded `kvm-intel` and unconditional Intel microcode, so the aarch64 build failed outright. Both are now gated on `pkgs.stdenv.hostPlatform.isx86`.

### secrets move to pgp as the primary recipient

The personal `age` key used as the sops-nix user recipient is replaced with a PGP key. Host keys stay on `age` -- sops-nix decrypts at activation as root with no controlling terminal, so `gpg-agent` has nowhere to prompt, and a passphrase-less private key on every machine would be strictly more to manage than an SSH-host-key-derived age key is now. `.sops.yaml` keeps the PGP and age keys in a single key group rather than splitting them into two groups, which would silently switch sops from "either key works" to Shamir sharing requiring both.

`secrets/setup.sh` gained a `--rekey-only` mode, a `gnupg` dependency, and a preflight that refuses to run while the PGP fingerprint placeholder is unset or the secret key isn't in the keyring. `scripts/check-secrets.sh` now reports PGP and age recipient counts separately. `docs/secrets.md` gained a "Recovering secrets" section, since losing the personal age key doesn't mean the committed secrets are lost -- every file is also encrypted to the relevant host keys, and a host's age identity can be re-derived from its SSH host key to recover anything that host can read.

A following commit removed Faol from the config entirely: `modules/darwin/common.nix` no longer decrypts its Telegram/Bluesky/Letta secrets at activation, and `home/programs/zsh.nix` no longer exports them. That was also the last unattended age decryption happening on macOS, so with it gone the personal age key no longer needs to be reachable at activation time at all -- every remaining reference to the old keyfile path was cleaned up in favour of an externally supplied `SOPS_AGE_KEY_FILE`. On August 8 the actual rekey landed: every secret in `secrets/` was re-encrypted with the real PGP fingerprint in place of the placeholder, alongside a routine `flake.lock` input update.

### gatekeeper module was never running

`modules/darwin/gatekeeper.nix` hung its script off `system.activationScripts.removeQuarantine`, but nix-darwin only executes a fixed set of activation-script names -- the exact trap `modules/darwin/common.nix` already warns about elsewhere in the repo. The assembled activation script contained no trace of it; it had been evaluated and built but never run. Moved onto `postActivation`, where it now actually executes. While it was dead it had also accumulated two bugs: activation runs as root, so its `$HOME/Applications` loop was looking in root's home instead of the user's, and it ran `chmod -R +x` over every app bundle's `MacOS` directory unconditionally. Both dropped. Because this switches on a module that has genuinely never run before, it's now behind `myConfig.darwin.gatekeeper.enable` (default true), with the per-app `spctl` scan behind a separate `checkSignatures` flag (default false, since it shells out once per app on every rebuild).

Same session, smaller fixes: `programs.zsh.initExtra` migrated to the non-deprecated `initContent` (a semantics-preserving rename via home-manager's compatibility shim), and the Dock's `persistent-apps` list stopped hardcoding `/Users/ewan` in favour of deriving from `myConfig.user.username`.

### resyncing the mac

A separate, hand-authored (not agent-session) pass on August 8 brought `modules/options.nix` and `modules/darwin/settings/default.nix` back in line with what's actually installed and configured on the Mac, rather than what the config had drifted to describe. The Homebrew cask list was substantially rewritten -- WhatsApp, Google Chrome, Android Studio, Ghostty, VSCodium, Cemu, Dolphin, OrbStack, ngrok, and Stats went in; Element, Obsidian, NetNewsWire, Spotify, VLC, Firefox, Parsec, Logitech peripheral tools, and the Microsoft Office casks came out. VS Code's module now targets VSCodium on macOS specifically (`pkgs.vscodium`, with the settings path updated to match), while still targeting stock VS Code on Linux.

Language tooling was extended in the same window: `typescript`, `kotlin`, `kotlin-language-server`, `gradle`, `clang`, `clang-tools`, and `cppcheck` were added to the shared package set, plus the Swift toolchain and `swiftlint` as macOS-native Homebrew packages (Swift's Linux support is still marked experimental in the comment). VS Code got the Swift and C++ Tools extensions to match.

The Dock and macOS defaults got a full resync to match current usage: dock tile size down to 40 with magnification back on (`largesize = 82`), a reordered persistent-apps list reflecting which apps are actually pinned now, one hot corner changed from Mission Control to Screen Saver, the menu bar clock's day-of-week re-enabled, Finder's status bar switched back on, and a batch of `CustomUserPreferences` additions with no native nix-darwin option yet -- screen capture defaults, mouse double-click threshold and force-click, trackpad spring-loading, and a full set of Magic Mouse gesture bindings.

### smaller

`README.md`'s support section was reworked from a single Ko-fi link into Ko-fi and GitHub Sponsors badges. The `.claude/skills` directory was converted to a symlink into a new `.agents/skills` convention, with `desloppify` added as the first skill and `.factory`, `.opencode`, `.qwen`, and `.rovodev` all symlinked to the same shared location -- one skill directory serving every agent-specific config path instead of duplicating skill files per tool.
