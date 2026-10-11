# Accessibility

## Commitment

Tableside should be usable with a keyboard, a screen reader, and without
relying on color alone. The calculator is a short form: bill, tip, guests,
totals.

## Supported environments

- Latest Chrome, Firefox, Safari, and Edge on desktop
- Mobile Safari and Chrome
- Android TalkBack and iOS VoiceOver on the Expo app (native build)

## What we implement

- Labels on bill, tip, and guest controls
- Visible focus on web controls
- Text that does not depend on a single accent color (values are also numeric)
- `prefers-reduced-motion` disables decorative transitions on the websites
- Minimum 44px-class tap targets on guest stepper controls

## Known limitations

- NativeWind on Expo does not expose the same focus rings as the web app
- Custom tip on mobile is a numeric field rather than a range slider
- GitHub Releases download cards on the distribution site are unavailable until
  the first tag is published

## Reporting barriers

Open a GitHub issue with the **bug** template, prefix the title with
`a11y:`, and include assistive technology + OS. Security-sensitive reports
still go through SECURITY.md.
