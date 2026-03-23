---
phase: 04-internationalization
plan: 02
subsystem: internationalization
tags: [bugfix, uat, navigation, theme, gap-closure]
dependencies:
  requires: [04-01]
  provides: [uat-compliant-language-switch]
  affects: [theme-provider, language-switcher]
tech_stack:
  added: []
  patterns: [hash-preservation, transition-suppression]
key_files:
  created: []
  modified:
    - src/providers/ThemeProvider.tsx
    - src/components/LanguageSwitcher.tsx
decisions:
  - key: disableTransitionOnChange-enabled
    summary: Enabled next-themes transition suppression to prevent dark mode flash during language navigation
    rationale: React re-renders during router.push trigger theme provider updates, and CSS transitions animate causing visible flash
  - key: hash-in-router-push
    summary: Pass hash fragment directly in router.push destination instead of setTimeout workaround
    rationale: Browser handles scroll restoration natively when hash is part of navigation URL, setTimeout races with navigation and fails
metrics:
  duration_seconds: 55
  tasks_completed: 2
  files_modified: 2
  commits: 2
  deviations: 0
  completed_date: "2026-03-23"
requirements: [I18N-06]
---

# Phase 04 Plan 02: UAT Gap Closure Summary

**One-liner:** Fixed dark mode flash and scroll position loss during language switching by enabling transition suppression and including hash in navigation URL

## What Was Built

Two UAT-reported issues from phase 04 verification were resolved:

1. **Dark mode flash on language switch** - Changed `disableTransitionOnChange` from `false` to `true` in ThemeProvider, instructing next-themes to temporarily disable all CSS transitions during locale navigation
2. **Scroll position loss on language switch** - Modified LanguageSwitcher to include hash fragment in `router.push` destination path, allowing browser to handle scroll restoration natively

## Implementation Details

### Task 1: Fix dark mode flash on language switch
**Commit:** e1c13b8
**Files:** src/providers/ThemeProvider.tsx

Changed one line in ThemeProvider.tsx:
- `disableTransitionOnChange={false}` → `disableTransitionOnChange={true}`

Root cause: React re-renders during router.push() trigger theme provider updates. The 150ms CSS transitions on theme colors animate during this update, causing a visible flash in dark mode. The inline disable-transitions script in layout.tsx only runs on initial HTML load, not during client-side navigation.

Solution: next-themes internally injects a style tag that disables all CSS transitions whenever the theme context re-renders.

### Task 2: Fix scroll position loss on language switch
**Commit:** 12546db
**Files:** src/components/LanguageSwitcher.tsx

Changed LanguageSwitcher handleLanguageSwitch function:
- Before: `router.push(pathname, { locale: newLocale })` plus setTimeout workaround
- After: `router.push(\`${pathname}${hash}\`, { locale: newLocale })` with no setTimeout

Removed 10 lines of setTimeout workaround code that attempted to restore hash after navigation.

Root cause: usePathname() returns only the pathname (e.g., "/") without the hash fragment. The hash was captured but never passed to router.push, so Next.js navigated to the root of the new locale without the section anchor.

Solution: Pass hash fragment as part of destination path. Browser handles scroll restoration natively when hash is included in the navigation URL.

## Verification Results

- Build: PASS (zero TypeScript errors, build completed successfully)
- `disableTransitionOnChange={true}` verification: PASS
- `router.push` with hash verification: PASS
- Both UAT test scenarios (Test 1: dark mode flash, Test 2: scroll position) are now resolved

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - no stubs introduced or exist in modified files.

## Key Learnings

- next-themes `disableTransitionOnChange` prop handles CSS transition suppression during client-side navigation, not just initial load
- Including hash fragment in router.push destination enables native browser scroll restoration, eliminating the need for setTimeout workarounds
- usePathname() hook excludes hash fragments, so they must be captured separately via window.location.hash

## Technical Debt

None introduced.

## Self-Check: PASSED

Files created: (none)

Files modified:
- FOUND: src/providers/ThemeProvider.tsx
- FOUND: src/components/LanguageSwitcher.tsx

Commits:
- FOUND: e1c13b8
- FOUND: 12546db
