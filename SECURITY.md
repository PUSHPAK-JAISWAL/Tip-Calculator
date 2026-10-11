# Security policy

## Supported versions

The latest GitHub Release (`v*.*.*`) is the supported build.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

1. Use GitHub **Security Advisories** on
   [PUSHPAK-JAISWAL/Tip-Calculator](https://github.com/PUSHPAK-JAISWAL/Tip-Calculator/security/advisories/new)
   if you have access, or email the repository owner through their GitHub profile.
2. Include the affected surface (web, Android updater, CI signing), steps to
   reproduce, and impact.
3. We will acknowledge the report and work on a fix before any public disclosure.

## Android sideload updates

The Expo Android app downloads `Tip-Calculator.apk` from this repository's own
GitHub Releases and verifies:

- `packageName` matches `com.pushpak.tipcalculator`
- SHA-256 of the APK signing certificate matches the installed app

This is an OTA channel for **this** app, similar to an enterprise/sideload
pipeline. It is not a store bypass for other applications.

Keep `ANDROID_KEYSTORE_*` secrets in GitHub Actions only. Never commit a
production keystore.
