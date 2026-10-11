# Tableside — Tip Calculator

A small hospitality calculator in three surfaces that share the same cream,
espresso, and copper design:

| Path | What it is |
| --- | --- |
| `apps/distribution` | Product story + GitHub Release downloads (GitHub Pages `/`) |
| `apps/web` | Interactive tip calculator (Pages `/app/`) |
| `apps/mobile` | Expo + NativeWind Android/iOS app with in-app APK updates |

Package id: `com.pushpak.tipcalculator`.

**Design read:** consumer utility + distribution landing for diners, editorial
hospitality language (Fraunces + Outfit, cream `#F6F1E8`, copper `#B85C38`), not
a purple-gradient SaaS shell. Taste skills from `Leonxlnx/taste-skill` informed
double-bezel cards, island header, and custom easing.

## Repository structure

```
apps/web              Vite + React 19 + Tailwind CSS 4
apps/distribution     Vite marketing site (latest Release APK/IPA)
apps/mobile           Expo SDK 57 + NativeWind 4 + Android updater module
packages/core         Tip math, semver, GitHub release client (Vitest)
packages/tokens       Shared color / type tokens
.github/workflows     Pages deploy, CI, tag-driven releases
```

This is an **npm workspaces** monorepo (Node 20+). Do not mix pnpm or Yarn.

## Local run

```powershell
npm install
npm test
npm run dev:web              # calculator, Vite
npm run dev:distribution     # landing + downloads
npm run dev:mobile           # Expo
```

Web and distribution Vite `base` values match GitHub Project Pages:

- Landing: `https://pushpak-jaiswal.github.io/Tip-Calculator/`
- Calculator: `https://pushpak-jaiswal.github.io/Tip-Calculator/app/`

## Usage

1. Enter the bill.
2. Choose a tip preset (or custom).
3. Set the number of guests.
4. Read tip, total, and per-person amounts.

On Android, **About / updates** checks
`https://api.github.com/repos/PUSHPAK-JAISWAL/Tip-Calculator/releases/latest`.
If `tag_name` is newer than the app version, **Update now** streams
`Tip-Calculator.apk` with progress, verifies package name + signing-cert
SHA-256, then installs via `FileProvider`. **Save to Downloads** is the fallback.
iOS shows TestFlight / site messaging instead of sideloading.

## Deploy

Push to `main`. Workflow **Deploy GitHub Pages** builds both Vite apps and
publishes them. Workflow **Release** runs on tags `v*.*.*`.

See [docs/SIGNING.md](docs/SIGNING.md) for Android keystore and Apple secrets.

## Community standards

- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) (Contributor Covenant 2.1)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [LICENSE](LICENSE) (MIT)
- [SECURITY.md](SECURITY.md)
- [ACCESSIBILITY.md](ACCESSIBILITY.md)
- Issue and pull request templates under `.github/`
- Dependabot: `.github/dependabot.yml`

## Community Wisdom

See [docs/COMMUNITY-WISDOM.md](docs/COMMUNITY-WISDOM.md). DevRelay was not
available during the first commit, so that note does not invent article citations.
