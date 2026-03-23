---
status: diagnosed
phase: 04-internationalization
source: [04-VERIFICATION.md]
started: 2026-03-23T18:15:00Z
updated: 2026-03-23T19:50:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Visual Language Switcher State
expected: EN bold on /en/ route, ES bold on /es/ route. Inactive button changes color on hover.
result: issue
reported: "in dark mode when the language is switched there is a flash when the page loads"
severity: minor

**Test:** Visit /en/ and /es/ in a browser. Check that the correct language button appears bold and the inactive language appears gray with hover effect.

### 2. Scroll Position Preservation
expected: URL changes to /es/#experience and page remains scrolled to Experience section (not jumping to top).
result: issue
reported: "after navigation to a section, when the language is switched, the navigation restart to the root"
severity: major

**Test:** Navigate to /en/#experience (scroll to Experience section), then click ES button in navigation.

### 3. Browser Language Detection
expected: Middleware redirects to /es/ automatically.
result: pass

**Test:** Clear browser data/cookies, set browser language preference to Spanish (es), visit the root path /, observe redirect behavior.

### 4. Shareable URL Language
expected: Spanish content displays immediately without requiring manual language selection.
result: pass

**Test:** On /es/, copy URL, open in new incognito window or share with another user.

## Summary

total: 4
passed: 2
issues: 2
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "EN bold on /en/ route, ES bold on /es/ route. Inactive button changes color on hover."
  status: failed
  reason: "User reported: in dark mode when the language is switched there is a flash when the page loads"
  severity: minor
  test: 1
  root_cause: "The disable-transitions inline script in layout.tsx only executes on initial HTML load, not during client-side navigation. When LanguageSwitcher uses router.push() for locale changes, React re-renders without re-executing the inline script, so the 'disable-transitions' class is never added during language switches. This causes 150ms CSS transitions to animate theme colors during hydration."
  debug_session: ".planning/debug/dark-mode-flash-language-switch.md"
  artifacts:
    - src/providers/ThemeProvider.tsx
    - src/app/[lang]/layout.tsx
  missing: []
  fix: "Change disableTransitionOnChange from false to true in ThemeProvider.tsx to let next-themes handle transition suppression internally during theme changes"

- truth: "URL changes to /es/#experience and page remains scrolled to Experience section (not jumping to top)."
  status: failed
  reason: "User reported: after navigation to a section, when the language is switched, the navigation restart to the root"
  severity: major
  test: 2
  root_cause: "Hash fragment is not included in the pathname when calling router.push(). The usePathname() hook returns only the pathname portion (e.g., '/') and excludes the hash fragment (e.g., '#experience'). When router.push(pathname, { locale }) is called, it navigates to the new locale without the hash, causing the page to scroll to the top."
  debug_session: ".planning/debug/language-switch-scroll-loss.md"
  artifacts:
    - src/components/LanguageSwitcher.tsx
  missing: []
  fix: "Append the hash to the pathname before router.push: router.push(`${pathname}${hash}`, { locale: newLocale })"
