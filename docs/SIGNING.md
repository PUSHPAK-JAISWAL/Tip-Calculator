# Signing and release secrets

Releases are produced **only** by GitHub Actions when you push a `v*.*.*` tag.
Local packaging is not the source of truth.

## Android (required for a stable APK)

Create a keystore, then add these repository secrets:

| Secret | Purpose |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | `base64 -w0 release.keystore` (Git Bash) or `[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore"))` |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_KEY_PASSWORD` | Key password |
| `ANDROID_STORE_PASSWORD` | Store password |

If those secrets are missing, CI generates a **debug-ci** keystore so the first
tag can still attach `Tip-Calculator.apk`. That APK will not match later
production-signed builds, and in-app cert checks will reject a mix of the two.
Replace the fallback before you ask people to keep the app.

## iOS (optional)

GitHub-hosted `macos-latest` runners can archive an IPA when these secrets exist:

| Secret | Purpose |
| --- | --- |
| `APPLE_CERTIFICATE_BASE64` | Distribution or ad-hoc `.p12` |
| `APPLE_CERTIFICATE_PASSWORD` | Password for that `.p12` |
| `APPLE_PROVISION_PROFILE_BASE64` | Matching `.mobileprovision` |
| `APPLE_TEAM_ID` | Apple Developer Team ID |

Without them the iOS job writes `IOS-BUILD-SKIPPED.txt` and the Android release
still publishes. iOS cannot sideload like Android; TestFlight / App Store remain
the install path for users.

## In-app updates

Android queries `https://api.github.com/repos/PUSHPAK-JAISWAL/Tip-Calculator/releases/latest`,
compares `tag_name` to the app version, downloads `Tip-Calculator.apk`, checks
package name + cert SHA-256, then uses `FileProvider` + `ACTION_VIEW`.
A **Save to Downloads** fallback is available if the installer intent fails.
