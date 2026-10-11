# Contributing

## Workspace

This repository uses **npm workspaces**. From the repo root:

```powershell
npm install
npm test
npm run dev:web
npm run dev:distribution
npm run dev:mobile
```

Do not add a second package manager (pnpm/yarn) unless the whole repo migrates.

## Layout

- `packages/core` — tip math, semver, GitHub release helpers (unit tests live here)
- `packages/tokens` — cream / espresso / copper tokens shared by web and mobile
- `apps/web` — Vite + React + Tailwind calculator (`base` `/Tip-Calculator/app/`)
- `apps/distribution` — marketing + GitHub Release downloads (`base` `/Tip-Calculator/`)
- `apps/mobile` — Expo + NativeWind + Android OTA updater

Keep web and mobile visually aligned. If you change a color or radius, update
`packages/tokens` and both apps.

## Pull requests

1. Branch from `main`.
2. Add or update tests in `packages/core` when math or version comparison changes.
3. Fill out `.github/PULL_REQUEST_TEMPLATE.md`.
4. Do not commit keystores, `.env` files, or `android/` / `ios/` prebuild trees.

## Releases

Push a tag matching `v*.*.*` (for example `v1.0.0`). The **Release** workflow
builds the Android APK, attempts iOS when Apple secrets exist, and publishes a
GitHub Release. See `docs/SIGNING.md`.
