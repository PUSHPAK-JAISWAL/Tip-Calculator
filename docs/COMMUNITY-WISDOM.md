# Community Wisdom

Architectural choices for this monorepo: npm workspaces, NativeWind beside
Tailwind, and a GitHub-Release sideload channel for our own Android APK.

**Provenance note:** DevRelay MCP (`user-devrelay-gateway`) was unavailable in
the session that built the first commit (live tool discovery failed; gateway
auth was declined). This file is therefore **not** citing fabricated dev.to
threads. Re-run Community Wisdom via DevRelay when the gateway is connected.

Until then, the intent of the choices:

- **npm workspaces** — one lockfile, shared `@tip/core` math so web and mobile
  cannot drift on rounding or semver.
- **NativeWind 4 (stable) vs Tailwind 4 on web** — NativeWind's latest stable
  dist-tag is still 4.x; tokens live in `packages/tokens` so the cream/espresso
  palette stays aligned even when class engines differ.
- **OTA sideload for this app only** — GitHub Releases plus certificate pinning
  is an enterprise-style update path for `com.pushpak.tipcalculator`, not a
  general store bypass.
